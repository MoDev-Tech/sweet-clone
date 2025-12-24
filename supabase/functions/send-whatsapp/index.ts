import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface OrderData {
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  totalAmount: number;
  notes?: string;
}

interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim()
    .slice(0, 1000);
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, data } = await req.json();
    
    const accessToken = Deno.env.get('WHATSAPP_ACCESS_TOKEN');
    const phoneNumberId = Deno.env.get('WHATSAPP_PHONE_NUMBER_ID');
    const recipientPhone = Deno.env.get('WHATSAPP_RECIPIENT_PHONE');

    if (!accessToken || !phoneNumberId || !recipientPhone) {
      console.error('Missing WhatsApp configuration');
      return new Response(
        JSON.stringify({ success: false, error: 'WhatsApp not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let messageText = '';

    if (type === 'order') {
      const orderData = data as OrderData;
      const itemsList = orderData.items
        .map(item => `• ${sanitizeInput(item.name)} x${item.quantity} - ${item.price.toFixed(2)} MAD`)
        .join('\n');

      messageText = `🍦 *NEW ICE CREAM ORDER*

👤 *Customer:* ${sanitizeInput(orderData.customerName)}
📱 *Phone:* ${sanitizeInput(orderData.customerPhone)}
📍 *Address:* ${sanitizeInput(orderData.customerAddress)}

🛒 *Items:*
${itemsList}

💰 *Total:* ${orderData.totalAmount.toFixed(2)} MAD
${orderData.notes ? `\n📝 *Notes:* ${sanitizeInput(orderData.notes)}` : ''}

⏰ Order received at ${new Date().toLocaleString('en-MA', { timeZone: 'Africa/Casablanca' })}`;
    } else if (type === 'contact') {
      const contactData = data as ContactData;
      messageText = `📧 *NEW CONTACT MESSAGE*

👤 *Name:* ${sanitizeInput(contactData.name)}
📧 *Email:* ${sanitizeInput(contactData.email)}
📋 *Subject:* ${sanitizeInput(contactData.subject)}

💬 *Message:*
${sanitizeInput(contactData.message)}

⏰ Received at ${new Date().toLocaleString('en-MA', { timeZone: 'Africa/Casablanca' })}`;
    } else {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid message type' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Sending WhatsApp message to:', recipientPhone);

    const response = await fetch(
      `https://graph.facebook.com/v18.0/${phoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: recipientPhone,
          type: 'text',
          text: { body: messageText },
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error('WhatsApp API error:', result);
      return new Response(
        JSON.stringify({ success: false, error: result.error?.message || 'Failed to send message' }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('WhatsApp message sent successfully:', result);

    return new Response(
      JSON.stringify({ success: true, messageId: result.messages?.[0]?.id }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in send-whatsapp function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
