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

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${apiConfig.baseUrl}${endpoint}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

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
  return fetchApi(apiConfig.endpoints.sendOrder, {
    method: 'POST',
    body: JSON.stringify({
      type: 'order',
      ...data,
    }),
  });
}

export async function sendContactWhatsApp(data: ContactData): Promise<ApiResponse> {
  return fetchApi(apiConfig.endpoints.sendContact, {
    method: 'POST',
    body: JSON.stringify({
      type: 'contact',
      formData: data,
    }),
  });
}

export { fetchApi };
