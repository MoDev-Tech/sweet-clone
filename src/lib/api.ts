/**
 * API Utility for External Node.js Server
 * ========================================
 * This file handles all API calls to your external Node.js server.
 * Update apiConfig.baseUrl in src/config/site.ts to point to your server.
 */

import { apiConfig } from '@/config/site';

interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

// Sanitize string input to prevent XSS
function sanitizeString(str: string): string {
  return str
    .replace(/[<>]/g, '') // Remove angle brackets
    .trim()
    .slice(0, 1000); // Limit length
}

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${apiConfig.baseUrl}${endpoint}`;

  // Validate URL format
  try {
    new URL(url);
  } catch {
    return {
      success: false,
      error: 'Invalid API URL configuration',
    };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      signal: controller.signal,
      ...options,
    });

    clearTimeout(timeoutId);

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || data.error || 'Something went wrong',
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return {
        success: false,
        error: 'Request timed out. Please try again.',
      };
    }
    console.error('API Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error. Please try again.',
    };
  }
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
  // Sanitize form data before sending
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

  return fetchApi(apiConfig.endpoints.sendOrder, {
    method: 'POST',
    body: JSON.stringify({
      type: 'order',
      formData: sanitizedFormData,
      orderData: data.orderData,
    }),
  });
}

export async function sendContactWhatsApp(data: ContactData): Promise<ApiResponse> {
  // Sanitize form data before sending
  const sanitizedData = {
    firstName: sanitizeString(data.firstName),
    lastName: sanitizeString(data.lastName),
    email: sanitizeString(data.email),
    phone: sanitizeString(data.phone),
    message: sanitizeString(data.message),
  };

  return fetchApi(apiConfig.endpoints.sendContact, {
    method: 'POST',
    body: JSON.stringify({
      type: 'contact',
      formData: sanitizedData,
    }),
  });
}

export { fetchApi };
