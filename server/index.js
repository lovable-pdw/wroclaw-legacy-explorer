const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3001; // Backend port

// Middleware
app.use(cors());
app.use(express.json());

// Placeholder for PayU API Key - replace with environment variable
const PAYU_API_KEY = process.env.PAYU_API_KEY || 'YOUR_PAYU_PRIVATE_KEY';
const PAYU_API_LOGIN_MERCHANT = process.env.PAYU_API_LOGIN_MERCHANT || 'YOUR_PAYU_API_LOGIN_MERCHANT'; // Or similar, depending on PayU's auth

// PayU API Configuration (placeholders - use environment variables in production)
const PAYU_BASE_URL = 'https://api.paymentsos.com'; // Or the specific URL for your PayU region if different
const PAYU_APP_ID = process.env.PAYU_APP_ID || 'YOUR_PAYU_APP_ID';
const PAYU_PRIVATE_KEY = process.env.PAYU_PRIVATE_KEY || 'YOUR_PAYU_PRIVATE_KEY';
const PAYU_API_VERSION = '1.3.0';
const PAYU_ENV = process.env.NODE_ENV === 'production' ? 'live' : 'test'; // Example, adjust as needed

// Endpoint to create a payment object with PayU
app.post('/api/create-payment', async (req, res) => {
  const { amount, currency, statement_soft_descriptor } = req.body;

  if (!amount || !currency) {
    return res.status(400).json({ error: 'Amount and currency are required.' });
  }

  const idempotencyKey = `payment-${Date.now()}`; // Basic idempotency key

  try {
    const payuResponse = await axios.post(
      `${PAYU_BASE_URL}/payments`,
      {
        amount: Math.round(amount * 100), // PayU expects amount in cents
        currency,
        statement_soft_descriptor: statement_soft_descriptor || 'Your Product/Service',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'api-version': PAYU_API_VERSION,
          'x-payments-os-env': PAYU_ENV,
          'app-id': PAYU_APP_ID,
          'private-key': PAYU_PRIVATE_KEY,
          'idempotency-key': idempotencyKey,
        },
      }
    );

    // Assuming PayU returns the payment_id in the response body directly or under an 'id' field
    const paymentId = payuResponse.data.id;
    if (!paymentId) {
      console.error('PayU Create Payment Error: No payment_id in response', payuResponse.data);
      return res.status(500).json({ error: 'Failed to create payment with PayU - no payment_id returned.' });
    }

    res.json({ paymentId });

  } catch (error) {
    console.error('PayU Create Payment Error:', error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).json({
      error: 'Failed to create payment with PayU.',
      details: error.response ? error.response.data : error.message
    });
  }
});

// Endpoint to create a charge with PayU using a payment_id and a token
app.post('/api/create-charge', async (req, res) => {
  const { paymentId, token, customer, billing_address, order_details } = req.body; // Added customer, billing_address, order_details

  if (!paymentId || !token) {
    return res.status(400).json({ error: 'Payment ID and token are required.' });
  }

  const idempotencyKey = `charge-${paymentId}-${Date.now()}`; // Basic idempotency key

  // Construct the payload, including optional fields if provided
  const payload = {
    payment_method: {
      type: 'tokenized', // Assuming tokenized card payment
      token: token,
    },
    // Optional: Add customer, billing_address, and order_details if they are part of your requirements
    // These might be required by PayU or your specific integration setup
    ...(customer && { customer }),
    ...(billing_address && { billing_address }),
    ...(order_details && { order: order_details }), // PayU typically expects 'order' for order details
  };

  try {
    const payuResponse = await axios.post(
      `${PAYU_BASE_URL}/payments/${paymentId}/charges`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          'api-version': PAYU_API_VERSION,
          'x-payments-os-env': PAYU_ENV,
          'app-id': PAYU_APP_ID,
          'private-key': PAYU_PRIVATE_KEY,
          'idempotency-key': idempotencyKey,
        },
      }
    );

    // The response from PayU for a charge will contain the transaction status
    res.json(payuResponse.data);

  } catch (error) {
    console.error('PayU Create Charge Error:', error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).json({
      error: 'Failed to create charge with PayU.',
      details: error.response ? error.response.data : error.message
    });
  }
});

app.get('/', (req, res) => {
  res.send('PayU Backend Server is running!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
