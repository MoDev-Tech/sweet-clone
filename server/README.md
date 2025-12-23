# IceDelights WhatsApp Server

Node.js Express server for handling WhatsApp Business API integration.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy `.env.example` to `.env` and fill in your credentials:
```bash
cp .env.example .env
```

3. Configure your environment variables:
- `WHATSAPP_ACCESS_TOKEN`: Your WhatsApp Business API access token
- `WHATSAPP_PHONE_NUMBER_ID`: Your WhatsApp phone number ID
- `WHATSAPP_RECIPIENT_PHONE`: The phone number to receive notifications (with country code, e.g., 1234567890)
- `ALLOWED_ORIGINS`: Comma-separated list of allowed origins for CORS

## Running Locally

```bash
npm run dev
```

## Deploying to Render

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set the following:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `server`
4. Add environment variables in the Render dashboard
5. Deploy!

## API Endpoints

### Health Check
```
GET /api/health
```

### Send Order
```
POST /api/send-order
Content-Type: application/json

{
  "formData": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "message": "Optional notes"
  },
  "orderData": {
    "itemsByCategory": [...],
    "subtotal": 25.99,
    "shipping": 5.00,
    "grandTotal": 30.99
  }
}
```

### Send Contact Message
```
POST /api/send-contact
Content-Type: application/json

{
  "formData": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "message": "Your message here"
  }
}
```

## Security Features

- Helmet.js for security headers
- CORS with configurable origins
- Rate limiting (100 requests per 15 minutes)
- Input validation and sanitization
- Request body size limit (10kb)
