import cors from 'cors';

const allowedOrigins =
  process.env.CORS_ORIGINS?.split(',').map(o => o.trim()) ?? [];

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    // Permite requests sin origin (Postman, cron jobs, etc)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(
      new Error(`CORS bloqueado para el origen: ${origin}`)
    );
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});