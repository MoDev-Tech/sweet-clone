import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  category: string;
}

interface CategoryGroup {
  category: string;
  items: OrderItem[];
  subtotal: number;
}

interface WhatsAppPayload {
  type: 'order' | 'contact';
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message?: string;
    state?: string;
    city?: string;
    zipCode?: string;
  };
  orderData?: {
    itemsByCategory: CategoryGroup[];
    subtotal: number;
    shipping: number;
    grandTotal: number;
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const accessToken = Deno.env.get('WHATSAPP_ACCESS_TOKEN');
    const phoneNumberId = Deno.env.get('WHATSAPP_PHONE_NUMBER_ID');
    const recipientPhone = Deno.env.get('WHATSAPP_RECIPIENT_PHONE');

    if (!accessToken || !phoneNumberId || !recipientPhone) {
      console.error('Missing WhatsApp configuration');
      return new Response(
        JSON.stringify({ error: 'WhatsApp configuration missing' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const payload: WhatsAppPayload = await req.json();
    console.log('Received payload:', JSON.stringify(payload, null, 2));

    // Build the message based on type
    let messageText = '';

    if (payload.type === 'order' && payload.orderData) {
      const { formData, orderData } = payload;
      
      messageText = `🍦 *NEW ORDER RECEIVED*\n\n`;
      messageText += `*Customer Details:*\n`;
      messageText += `👤 Name: ${formData.firstName} ${formData.lastName}\n`;
      messageText += `📧 Email: ${formData.email}\n`;
      messageText += `📞 Phone: ${formData.phone}\n`;
      messageText += `📍 Address: ${formData.city}, ${formData.state} ${formData.zipCode}\n`;
      
      if (formData.message) {
        messageText += `📝 Notes: ${formData.message}\n`;
      }
      
      messageText += `\n*Order Items:*\n`;
      messageText += `━━━━━━━━━━━━━━━━━━\n`;
      
      orderData.itemsByCategory.forEach(({ category, items, subtotal }) => {
        messageText += `\n📁 *${category}*\n`;
        items.forEach(item => {
          messageText += `  • ${item.quantity}x ${item.name} - $${(item.price * item.quantity).toFixed(2)}\n`;
        });
        messageText += `  _Subtotal: $${subtotal.toFixed(2)}_\n`;
      });
      
      messageText += `\n━━━━━━━━━━━━━━━━━━\n`;
      messageText += `📦 Subtotal: $${orderData.subtotal.toFixed(2)}\n`;
      messageText += `🚚 Shipping: $${orderData.shipping.toFixed(2)}\n`;
      messageText += `💰 *GRAND TOTAL: $${orderData.grandTotal.toFixed(2)}*\n`;
      
    } else if (payload.type === 'contact') {
      const { formData } = payload;
      
      messageText = `📩 *NEW CONTACT MESSAGE*\n\n`;
      messageText += `*From:*\n`;
      messageText += `👤 Name: ${formData.firstName} ${formData.lastName}\n`;
      messageText += `📧 Email: ${formData.email}\n`;
      messageText += `📞 Phone: ${formData.phone}\n`;
      messageText += `\n*Message:*\n`;
      messageText += `${formData.message}\n`;
    }

    console.log('Sending message to WhatsApp:', messageText);

    // Send to WhatsApp Business API
    const whatsappResponse = await fetch(
      `https://graph.facebook.com/v18.0/${phoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: recipientPhone,
          type: 'text',
          text: { body: messageText },
        }),
      }
    );

    const result = await whatsappResponse.json();
    console.log('WhatsApp API response:', JSON.stringify(result, null, 2));

    if (!whatsappResponse.ok) {
      console.error('WhatsApp API error:', result);
      return new Response(
        JSON.stringify({ error: 'Failed to send WhatsApp message', details: result }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, messageId: result.messages?.[0]?.id }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in send-whatsapp function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});