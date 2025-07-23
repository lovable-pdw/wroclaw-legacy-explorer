// API Configuration
// API Configuration
const getApiBaseUrl = () => {
  const isDev = import.meta.env.DEV;
  
  console.log('🔧 Environment Detection:', {
    isDev,
    mode: import.meta.env.MODE,
    prod: import.meta.env.PROD,
    viteApiUrl: import.meta.env.VITE_API_BASE_URL
  });

  // If explicit API URL is set AND it's not localhost in production, use it
  if (import.meta.env.VITE_API_BASE_URL && 
      (isDev || !import.meta.env.VITE_API_BASE_URL.includes('localhost'))) {
    return import.meta.env.VITE_API_BASE_URL;
  }  // Development: use relative URLs (Vite proxy will handle routing)
  if (isDev) {
    return ''; // Empty string for relative URLs like /api/create-order
  }

  // Production: use current domain (Vercel API routes)
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }

  // SSR fallback
  return 'https://projektdawnywroclaw.pl';
};

const API_BASE_URL = getApiBaseUrl();

console.log('🔧 Final API Configuration:', {
  apiBaseUrl: API_BASE_URL,
  createOrderUrl: `${API_BASE_URL}/api/create-order`
});

export const API_ENDPOINTS = {
  CREATE_ORDER: `${API_BASE_URL}/api/create-order`,
  ORDER_STATUS: (orderId: string) => `${API_BASE_URL}/api/order-status/${orderId}`,
  PAYU_WEBHOOK: `${API_BASE_URL}/api/payu-webhook`
};

export default API_BASE_URL;