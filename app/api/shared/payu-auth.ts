import axios from 'axios';
import { PAYU_BASE_URL, PAYU_CLIENT_ID, PAYU_CLIENT_SECRET } from './config';

// Store OAuth token in memory (in production, use Redis or database)
let accessToken: string | null = null;
let tokenExpiry: number | null = null;

export async function getAccessToken(): Promise<string> {
  // Check if we have a valid token
  if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
    return accessToken;
  }

  try {
    const response = await axios.post(
      `${PAYU_BASE_URL}/pl/standard/user/oauth/authorize`,
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: PAYU_CLIENT_ID!,
        client_secret: PAYU_CLIENT_SECRET!
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
  } catch (error: any) {
    console.error('OAuth Token Error:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        clientId: PAYU_CLIENT_ID,
      }
    });
    throw new Error(`Failed to obtain OAuth token: ${error.response?.data?.error_description || error.message}`);
  }
}
