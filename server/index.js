require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001; // Backend port

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from React build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
}

// PayU API Configuration
const IS_SANDBOX = process.env.PAYU_SANDBOX === 'true' || process.env.NODE_ENV !== 'production';
const PAYU_BASE_URL = IS_SANDBOX ? 'https://secure.snd.payu.com' : 'https://secure.payu.com';

// Sandbox public credentials (for testing only)
const SANDBOX_CREDENTIALS = {
  clientId: '300746',
  clientSecret: '2ee86a66e5d97e3fadc400c9f19b065d',
  merchantPosId: '300746'
};

// Use environment variables or fallback to sandbox public credentials
const PAYU_CLIENT_ID = process.env.PAYU_CLIENT_ID || (IS_SANDBOX ? SANDBOX_CREDENTIALS.clientId : null);
const PAYU_CLIENT_SECRET = process.env.PAYU_CLIENT_SECRET || (IS_SANDBOX ? SANDBOX_CREDENTIALS.clientSecret : null);
const PAYU_MERCHANT_POS_ID = process.env.PAYU_MERCHANT_POS_ID || (IS_SANDBOX ? SANDBOX_CREDENTIALS.merchantPosId : null);

// Frontend URL for redirects
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// Validate PayU configuration
console.log('PayU Configuration:', {
  environment: IS_SANDBOX ? 'SANDBOX' : 'PRODUCTION',
  baseUrl: PAYU_BASE_URL,
  clientId: PAYU_CLIENT_ID,
  merchantPosId: PAYU_MERCHANT_POS_ID,
  hasClientSecret: !!PAYU_CLIENT_SECRET,
  usingEnvVars: {
    clientId: !!process.env.PAYU_CLIENT_ID,
    clientSecret: !!process.env.PAYU_CLIENT_SECRET,
    merchantPosId: !!process.env.PAYU_MERCHANT_POS_ID,
    sandboxMode: process.env.PAYU_SANDBOX
  }
});

if (IS_SANDBOX) {
  console.log('🧪 Running in SANDBOX mode with public test credentials');
  console.log('📝 To use your own sandbox credentials, set PAYU_CLIENT_ID, PAYU_CLIENT_SECRET, and PAYU_MERCHANT_POS_ID in .env');
} else {
  console.log('🚀 Running in PRODUCTION mode');
}

if (!PAYU_CLIENT_ID || !PAYU_CLIENT_SECRET || !PAYU_MERCHANT_POS_ID) {
  console.warn('Warning: Some PayU configuration values are missing. Using fallback values.');
}

// Store OAuth token in memory (in production, use Redis or database)
let accessToken = null;
let tokenExpiry = null;

// Function to get OAuth token
async function getAccessToken() {
  // Check if we have a valid token
  if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
    return accessToken;
  }

  try {
    const response = await axios.post(
      `${PAYU_BASE_URL}/pl/standard/user/oauth/authorize`,
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: PAYU_CLIENT_ID,
        client_secret: PAYU_CLIENT_SECRET
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    accessToken = response.data.access_token;
    // Set expiry time (subtract 60 seconds for safety margin)
    tokenExpiry = Date.now() + (response.data.expires_in - 60) * 1000;
    
    console.log('New OAuth token obtained');
    return accessToken;
  } catch (error) {
    console.error('OAuth Token Error:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        clientId: PAYU_CLIENT_ID,
        merchantPosId: PAYU_MERCHANT_POS_ID
      }
    });
    throw new Error(`Failed to obtain OAuth token: ${error.response?.data?.error_description || error.message}`);
  }
}

// Endpoint to create a PayU order
app.post('/api/create-order', async (req, res) => {
  const { 
    customerIp, 
    description, 
    currencyCode = 'PLN', 
    totalAmount, 
    products,
    extOrderId 
  } = req.body;

  // Validate required fields
  if (!customerIp || !description || !totalAmount || !products || !Array.isArray(products)) {
    return res.status(400).json({ 
      error: 'customerIp, description, totalAmount, and products array are required.' 
    });
  }
  try {
    // Get OAuth token
    const token = await getAccessToken();
    
    // Validate products array
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      if (!product.name || !product.unitPrice || !product.quantity) {
        return res.status(400).json({
          error: `Product at index ${i} is missing required fields (name, unitPrice, quantity).`
        });
      }
      if (isNaN(product.unitPrice) || isNaN(product.quantity)) {
        return res.status(400).json({
          error: `Product at index ${i} has invalid numeric values.`
        });
      }
    }
    
    // Create order payload
    const orderPayload = {
      customerIp,
      merchantPosId: PAYU_MERCHANT_POS_ID,
      description,
      currencyCode,
      totalAmount: totalAmount.toString(), // PayU expects string
      products: products.map(product => ({
        name: product.name,
        unitPrice: product.unitPrice.toString(),
        quantity: product.quantity.toString()
      })),      ...(extOrderId && { extOrderId }),
      // Add return URLs for better user experience
      continueUrl: `${FRONTEND_URL}/payment-success`,
      notifyUrl: `${req.protocol}://${req.get('host')}/api/payu-webhook`
    };

    console.log('Creating PayU order with payload:', JSON.stringify(orderPayload, null, 2));    // Create order with PayU
    const payuResponse = await axios.post(
      `${PAYU_BASE_URL}/api/v2_1/orders`,
      orderPayload,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        maxRedirects: 0, // Don't follow redirects automatically
        validateStatus: function (status) {
          return status >= 200 && status < 400; // Accept 2xx and 3xx status codes
        }
      }
    );

    console.log('PayU response status:', payuResponse.status);
    console.log('PayU response headers:', Object.keys(payuResponse.headers));

    // Handle 302 redirect (normal PayU response)
    if (payuResponse.status === 302) {
      const redirectUri = payuResponse.headers.location;
      console.log('✅ PayU order created successfully! Redirect URL:', redirectUri);
      
      res.json({
        status: { statusCode: 'SUCCESS' },
        redirectUri: redirectUri,
        orderId: payuResponse.headers['correlation-id'] || null,
        extOrderId: orderPayload.extOrderId
      });
    } 
    // Handle JSON response (alternative flow)
    else if (payuResponse.status === 200 && payuResponse.data && typeof payuResponse.data === 'object') {
      console.log('✅ PayU JSON response received:', payuResponse.data);
      
      res.json({
        status: payuResponse.data.status || { statusCode: 'SUCCESS' },
        redirectUri: payuResponse.data.redirectUri,
        orderId: payuResponse.data.orderId,
        extOrderId: payuResponse.data.extOrderId || orderPayload.extOrderId
      });
    }
    // Handle unexpected response
    else {
      console.log('⚠️ Unexpected PayU response format');
      console.log('Status:', payuResponse.status);
      console.log('Data type:', typeof payuResponse.data);
      
      res.json({
        status: { statusCode: 'SUCCESS' },
        redirectUri: `${PAYU_BASE_URL}/summary`,
        orderId: payuResponse.headers['correlation-id'] || null,
        extOrderId: orderPayload.extOrderId,
        message: 'Order created but response format unexpected'
      });
    }
  } catch (error) {
    console.error('PayU Create Order Error:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers
      }
    });
    
    // More specific error messages based on status code
    let errorMessage = 'Failed to create order with PayU.';
    let statusCode = 500;
    
    if (error.response) {
      statusCode = error.response.status;
      switch (error.response.status) {
        case 400:
          errorMessage = 'Invalid request data sent to PayU. Please check the order details.';
          break;
        case 401:
          errorMessage = 'Authentication failed with PayU. Please check API credentials.';
          break;
        case 403:
          errorMessage = 'Access forbidden. Please check your PayU merchant configuration.';
          break;
        case 422:
          errorMessage = 'PayU validation error. Please check the order data format.';
          break;
        case 429:
          errorMessage = 'Too many requests to PayU. Please try again later.';
          break;
        case 500:
          errorMessage = 'PayU server error. Please try again later.';
          break;
        default:
          errorMessage = `PayU API error (${error.response.status}): ${error.response.statusText}`;
      }
    } else if (error.request) {
      errorMessage = 'Unable to connect to PayU. Please check your internet connection.';
      statusCode = 503;
    }
    
    res.status(statusCode).json({
      error: errorMessage,
      details: error.response ? error.response.data : error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Endpoint to check order status
app.get('/api/order-status/:orderId', async (req, res) => {
  const { orderId } = req.params;

  if (!orderId) {
    return res.status(400).json({ error: 'Order ID is required.' });
  }

  try {
    const token = await getAccessToken();

    const payuResponse = await axios.get(
      `${PAYU_BASE_URL}/api/v2_1/orders/${orderId}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );

    res.json(payuResponse.data);

  } catch (error) {
    console.error('PayU Order Status Error:', error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).json({
      error: 'Failed to get order status from PayU.',
      details: error.response ? error.response.data : error.message
    });
  }
});

// Webhook endpoint for PayU notifications (optional)
app.post('/api/payu-webhook', (req, res) => {
  console.log('PayU Webhook received:', req.body);
  
  // Process the webhook data according to PayU documentation
  // Verify the signature, update order status, etc.
  
  res.status(200).send('OK');
});

app.get('/', (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  } else {
    res.send('PayU Backend Server is running!');
  }
});

// Catch-all handler for SPA in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});