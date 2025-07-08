// API Configuration
const API_BASE_URL = import.meta.env.PROD 
  ? window.location.origin 
  : 'http://localhost:3001';

export const API_ENDPOINTS = {
  CREATE_ORDER: `${API_BASE_URL}/api/create-order`,
  ORDER_STATUS: (orderId: string) => `${API_BASE_URL}/api/order-status/${orderId}`,
  PAYU_WEBHOOK: `${API_BASE_URL}/api/payu-webhook`
};

export default API_BASE_URL;
