import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

export const config = {
  supabase: {
    url: process.env.SUPABASE_URL || '',
    anonKey: process.env.SUPABASE_ANON_KEY || '',
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  },
  resend: {
    apiKey: process.env.RESEND_API_KEY || '',
  },
  email: {
    sender: process.env.SENDER_EMAIL || 'onboarding@resend.dev',
    admin: process.env.ADMIN_EMAIL || 'sistemasciaglobal@gmail.com',
  },
  frontend: {
    url: process.env.FRONTEND_URL || 'http://localhost:5173',
  },
   recaptcha: {
    secretKey: process.env.RECAPTCHA_SECRET_KEY || '', 
  },
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
};

// Validación de variables de entorno requeridas
const requiredEnvVars = [
  'SUPABASE_URL',
  'SUPABASE_ANON_KEY',
  'RESEND_API_KEY',
  'RECAPTCHA_SECRET_KEY'
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}