import { Router } from 'express';
import { createAppointment } from '../controllers/appointment.controller';
import { sendContactMessage } from '../controllers/contact.controller';

const router = Router();

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Appointments
router.post('/appointments', createAppointment);

// Contact
router.post('/contact', sendContactMessage);

export default router;