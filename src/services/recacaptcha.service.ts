import axios from 'axios';
import { config } from '../config';

export async function verifyRecaptcha(token: string): Promise<boolean> {
  try {
    console.log('🤖 Verificando reCAPTCHA...');
    
    const response = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      null,
      {
        params: {
          secret: config.recaptcha.secretKey,
          response: token,
        },
      }
    );

    const { success, 'error-codes': errorCodes } = response.data;

    if (success) {
      console.log('✅ reCAPTCHA verificado correctamente');
      return true;
    }

    console.warn('⚠️ reCAPTCHA fallido:', errorCodes);
    return false;
  } catch (error) {
    console.error('❌ Error verificando reCAPTCHA:', error);
    return false;
  }
}