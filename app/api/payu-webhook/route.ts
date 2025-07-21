import { NextRequest, NextResponse } from 'next/server';
import { addWebhookLog } from '../shared/webhook-logs';
import { sendPaymentConfirmation } from '../shared/email-service';
import { getAccessToken } from '../shared/payu-auth';
import { PAYU_BASE_URL } from '../shared/config';
import type { PayUNotification } from '../shared/types';

export async function POST(request: NextRequest) {
  const timestamp = new Date().toISOString();
  
  try {
    const body = await request.json() as PayUNotification;
    
    // Log webhook call
    const logEntry = {
      timestamp,
      method: request.method,
      headers: Object.fromEntries(request.headers.entries()),
      body,
      ip: request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    };
    
    addWebhookLog(logEntry);
    
    console.log('=== PayU Webhook Received ===');
    console.log('Timestamp:', timestamp);
    console.log('Headers:', JSON.stringify(logEntry.headers, null, 2));
    console.log('Body:', JSON.stringify(body, null, 2));
    
    // PayU sends notifications with order information
    if (body && body.order) {
      const order = body.order;
      const orderId = order.orderId;
      const status = order.status;
      
      console.log(`=== Order Status Update ===`);
      console.log(`Order ID: ${orderId}`);
      console.log(`Status: ${status}`);
      console.log(`Buyer Email: ${order.buyer?.email || 'Not provided'}`);
      
      // Handle successful payment
      if (status === 'COMPLETED') {
        console.log('✅ Payment completed successfully for order:', orderId);
        
        // Extract customer email from buyer info
        let customerEmail: string | null = null;
        if (order.buyer && order.buyer.email) {
          customerEmail = order.buyer.email;
          console.log('📧 Customer email found in notification:', customerEmail);
        } else {
          console.log('⚠️ No buyer email in notification, trying to fetch from API...');
        }
        
        // If we don't have email from webhook, try to get it from order details via API
        if (!customerEmail && orderId) {
          try {
            const token = await getAccessToken();
            const orderResponse = await fetch(`${PAYU_BASE_URL}/api/v2_1/orders/${orderId}`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            
            if (orderResponse.ok) {
              const orderData = await orderResponse.json();
              console.log('📋 Fetched order details from PayU API');
              if (orderData && orderData.orders && orderData.orders[0]) {
                const fetchedOrder = orderData.orders[0];
                console.log('🔍 Order data buyer info:', fetchedOrder.buyer);
                if (fetchedOrder.buyer && fetchedOrder.buyer.email) {
                  customerEmail = fetchedOrder.buyer.email;
                  console.log('📧 Customer email found in API response:', customerEmail);
                }
              }
            }
          } catch (error) {
            console.error('❌ Failed to fetch order details for email:', error);
          }
        }
        
        // Send confirmation email if we have customer email
        if (customerEmail) {
          console.log('📧 Sending payment confirmation email to:', customerEmail);
          
          const orderDetails = {
            orderId: orderId,
            totalAmount: Number(order.totalAmount) || 0,
            currencyCode: order.currencyCode || 'PLN',
            products: order.products || []
          };
          
          console.log('📦 Order details for email:', orderDetails);
          
          const emailResult = await sendPaymentConfirmation(customerEmail, orderDetails);
          
          if (emailResult.success) {
            console.log('✅ Payment confirmation email sent successfully');
          } else {
            console.error('❌ Failed to send payment confirmation email:', emailResult.error);
          }
        } else {
          console.warn('⚠️ No customer email found in order data, skipping email notification');
          console.warn('💡 Make sure buyer information is included in PayU order creation');
        }
      } else {
        console.log(`ℹ️ Order ${orderId} status is ${status}, no email action needed`);
      }
    } else {
      console.log('⚠️ No order information in notification');
      console.log('Raw notification structure:', Object.keys(body || {}));
    }
    
    // Always respond with 200 OK to acknowledge receipt
    return new NextResponse('OK', { status: 200 });
    
  } catch (error) {
    console.error('❌ Error processing PayU webhook:', error);
    // Still respond with 200 to prevent PayU from retrying
    return new NextResponse('ERROR', { status: 200 });
  }
}
