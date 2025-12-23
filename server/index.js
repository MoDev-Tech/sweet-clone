require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
  : ['http://localhost:5173'];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

// Body parser
app.use(express.json({ limit: '10kb' }));

// Validation middleware
const validateOrderPayload = [
  body('formData.firstName').trim().notEmpty().isLength({ max: 100 }).escape(),
  body('formData.lastName').trim().notEmpty().isLength({ max: 100 }).escape(),
  body('formData.email').trim().isEmail().normalizeEmail().isLength({ max: 255 }),
  body('formData.phone').trim().notEmpty().isLength({ max: 20 }),
  body('formData.state').optional().trim().isLength({ max: 100 }).escape(),
  body('formData.city').optional().trim().isLength({ max: 100 }).escape(),
  body('formData.zipCode').optional().trim().isLength({ max: 20 }).escape(),
  body('formData.message').optional().trim().isLength({ max: 1000 }).escape(),
  body('orderData').isObject(),
  body('orderData.grandTotal').isFloat({ min: 0 }),
];

const validateContactPayload = [
  body('formData.firstName').trim().notEmpty().isLength({ max: 100 }).escape(),
  body('formData.lastName').trim().notEmpty().isLength({ max: 100 }).escape(),
  body('formData.email').trim().isEmail().normalizeEmail().isLength({ max: 255 }),
  body('formData.phone').trim().notEmpty().isLength({ max: 20 }),
  body('formData.message').trim().notEmpty().isLength({ max: 1000 }).escape(),
];

// Helper function to send WhatsApp message
async function sendWhatsAppMessage(messageText) {
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const recipientPhone = process.env.WHATSAPP_RECIPIENT_PHONE;

  if (!accessToken || !phoneNumberId || !recipientPhone) {
    throw new Error('WhatsApp configuration missing');
  }

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
        to: recipientPhone,
        type: 'text',
        text: { body: messageText },
      }),
    }
  );

  const result = await response.json();
  
  if (!response.ok) {
    console.error('WhatsApp API error:', result);
    throw new Error('Failed to send WhatsApp message');
  }

  return result;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Send order endpoint
app.post('/api/send-order', validateOrderPayload, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Validation failed', details: errors.array() });
    }

    const { formData, orderData } = req.body;

    let messageText = `🍦 *NEW ORDER RECEIVED*\n\n`;
    messageText += `*Customer Details:*\n`;
    messageText += `👤 Name: ${formData.firstName} ${formData.lastName}\n`;
    messageText += `📧 Email: ${formData.email}\n`;
    messageText += `📞 Phone: ${formData.phone}\n`;
    
    if (formData.city || formData.state || formData.zipCode) {
      messageText += `📍 Address: ${formData.city || ''}, ${formData.state || ''} ${formData.zipCode || ''}\n`;
    }

    if (formData.message) {
      messageText += `📝 Notes: ${formData.message}\n`;
    }

    messageText += `\n*Order Items:*\n`;
    messageText += `━━━━━━━━━━━━━━━━━━\n`;

    if (orderData.itemsByCategory) {
      orderData.itemsByCategory.forEach(({ category, items, subtotal }) => {
        messageText += `\n📁 *${category}*\n`;
        items.forEach(item => {
          messageText += `  • ${item.quantity}x ${item.name} - $${(item.price * item.quantity).toFixed(2)}\n`;
        });
        messageText += `  _Subtotal: $${subtotal.toFixed(2)}_\n`;
      });
    }

    messageText += `\n━━━━━━━━━━━━━━━━━━\n`;
    messageText += `📦 Subtotal: $${orderData.subtotal?.toFixed(2) || '0.00'}\n`;
    messageText += `🚚 Shipping: $${orderData.shipping?.toFixed(2) || '0.00'}\n`;
    messageText += `💰 *GRAND TOTAL: $${orderData.grandTotal.toFixed(2)}*\n`;

    const result = await sendWhatsAppMessage(messageText);

    res.json({ success: true, messageId: result.messages?.[0]?.id });
  } catch (error) {
    console.error('Error sending order:', error);
    res.status(500).json({ error: error.message || 'Failed to send order' });
  }
});

// Send contact message endpoint
app.post('/api/send-contact', validateContactPayload, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Validation failed', details: errors.array() });
    }

    const { formData } = req.body;

    let messageText = `📩 *NEW CONTACT MESSAGE*\n\n`;
    messageText += `*From:*\n`;
    messageText += `👤 Name: ${formData.firstName} ${formData.lastName}\n`;
    messageText += `📧 Email: ${formData.email}\n`;
    messageText += `📞 Phone: ${formData.phone}\n`;
    messageText += `\n*Message:*\n`;
    messageText += `${formData.message}\n`;

    const result = await sendWhatsAppMessage(messageText);

    res.json({ success: true, messageId: result.messages?.[0]?.id });
  } catch (error) {
    console.error('Error sending contact message:', error);
    res.status(500).json({ error: error.message || 'Failed to send message' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
