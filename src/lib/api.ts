/**
 * API Utility for WhatsApp Integration via Lovable Cloud
 * =======================================================
 * This file handles all WhatsApp API calls through Supabase Edge Functions.
 */

import { supabase } from '@/integrations/supabase/client';

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

    const { data: result, error } = await supabase.functions.invoke('send-whatsapp', {
      body: {
        type: 'order',
        data: {
          customerName: `${sanitizedFormData.firstName} ${sanitizedFormData.lastName}`,
          customerPhone: sanitizedFormData.phone,
          customerAddress: `${sanitizedFormData.city}, ${sanitizedFormData.state} ${sanitizedFormData.zipCode}`,
          items,
          totalAmount: data.orderData.grandTotal,
          notes: sanitizedFormData.message,
        },
      },
    });

    if (error) {
      console.error('Edge function error:', error);
      return { success: false, error: error.message };
    }

    return { success: result?.success ?? false, data: result };
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
      subject: `Contact from ${sanitizeString(data.firstName)}`,
      message: sanitizeString(data.message),
    };

    const { data: result, error } = await supabase.functions.invoke('send-whatsapp', {
      body: {
        type: 'contact',
        data: sanitizedData,
      },
    });

    if (error) {
      console.error('Edge function error:', error);
      return { success: false, error: error.message };
    }

    return { success: result?.success ?? false, data: result };
  } catch (error) {
    console.error('API Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error. Please try again.',
    };
  }
}
