// PayU API Types
export interface PayUProduct {
  name: string;
  unitPrice: string;
  quantity: string;
}

export interface PayUBuyer {
  email: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  language?: string;
}

export interface PayUOrderPayload {
  customerIp: string;
  merchantPosId: string;
  description: string;
  currencyCode: string;
  totalAmount: string;
  products: PayUProduct[];
  extOrderId?: string;
  buyer?: PayUBuyer;
  continueUrl: string;
  notifyUrl: string;
}

export interface PayUOrderResponse {
  status: {
    statusCode: string;
  };
  redirectUri?: string;
  orderId?: string;
  extOrderId?: string;
  message?: string;
}

export interface PayUNotification {
  order: {
    orderId: string;
    status: string;
    totalAmount?: string;
    currencyCode?: string;
    products?: PayUProduct[];
    buyer?: PayUBuyer;
  };
}

export interface CreateOrderRequest {
  customerIp: string;
  description: string;
  currencyCode?: string;
  totalAmount: number;
  products: Array<{
    name: string;
    unitPrice: number;
    quantity: number;
  }>;
  extOrderId?: string;
  buyer?: PayUBuyer;
}

export interface EmailOrderDetails {
  orderId: string;
  totalAmount: number;
  currencyCode: string;
  products: PayUProduct[];
}

export interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export interface LogEntry {
  timestamp: string;
  method: string;
  headers: Record<string, any>;
  body: any;
  ip: string;
}

export interface TestWebhookRequest {
  email?: string;
  orderId?: string;
  status?: string;
}

export interface TestEmailRequest {
  email: string;
  orderId?: string;
}
