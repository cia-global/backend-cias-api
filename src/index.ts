import express from 'express';
import cors from 'cors';
import { config } from './config';
import routes from './routes';
import { errorHandler, notFound } from './middleware/errorHandler';
import { corsMiddleware } from './middleware/cors';

const app = express();

// Middleware
app.use(corsMiddleware);
app.options('/*', corsMiddleware);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server
if (config.nodeEnv !== 'production') {
  app.listen(config.port, () => {
    console.log(`🚀 Server running on http://localhost:${config.port}`);
    console.log(`📝 Environment: ${config.nodeEnv}`);
  });
}

export default app;
