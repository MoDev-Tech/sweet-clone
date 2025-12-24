/**
 * API Utility for WhatsApp Integration via Render Server
 * =======================================================
 * This file handles all WhatsApp API calls through the deployed Node.js server.
 */

const API_BASE_URL = 'https://sweet-clone.onrender.com';

interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

// Sanitize string input to prevent XSS
function sanitizeString(str: string): string {
  return str
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, 1000);
}

// ========================================
// WHATSAPP API
// ========================================

interface OrderData {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    state: string;
    city: string;
    zipCode: string;
    message?: string;
  };
  orderData: {
    itemsByCategory: Array<{
      category: string;
      items: Array<{
        name: string;
        price: number;
        quantity: number;
        category: string;
      }>;
      subtotal: number;
    }>;
    subtotal: number;
    shipping: number;
    grandTotal: number;
  };
}

interface ContactData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

export async function sendOrderWhatsApp(data: OrderData): Promise<ApiResponse> {
  try {
    // Sanitize form data
    const sanitizedFormData = {
      firstName: sanitizeString(data.formData.firstName),
      lastName: sanitizeString(data.formData.lastName),
      email: sanitizeString(data.formData.email),
      phone: sanitizeString(data.formData.phone),
      state: sanitizeString(data.formData.state),
      city: sanitizeString(data.formData.city),
      zipCode: sanitizeString(data.formData.zipCode),
      message: data.formData.message ? sanitizeString(data.formData.message) : undefined,
    };

    // Build items list for WhatsApp message
    const items = data.orderData.itemsByCategory.flatMap(category =>
      category.items.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      }))
    );

    const response = await fetch(`${API_BASE_URL}/api/send-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        formData: sanitizedFormData,
        orderData: data.orderData,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      return { success: false, error: result.error || 'Failed to send order' };
    }

    return { success: true, data: result };
  } catch (error) {
    console.error('API Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error. Please try again.',
    };
  }
}

export async function sendContactWhatsApp(data: ContactData): Promise<ApiResponse> {
  try {
    // Sanitize form data
    const sanitizedData = {
      name: sanitizeString(`${data.firstName} ${data.lastName}`),
      email: sanitizeString(data.email),
      phone: sanitizeString(data.phone),
      subject: `Contact from ${sanitizeString(data.firstName)}`,
      message: sanitizeString(data.message),
    };

    const response = await fetch(`${API_BASE_URL}/api/send-contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        formData: {
          firstName: sanitizeString(data.firstName),
          lastName: sanitizeString(data.lastName),
          email: sanitizeString(data.email),
          phone: sanitizeString(data.phone),
          message: sanitizeString(data.message),
        },
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      return { success: false, error: result.error || 'Failed to send message' };
    }

    return { success: true, data: result };
  } catch (error) {
    console.error('API Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error. Please try again.',
    };
  }
}
