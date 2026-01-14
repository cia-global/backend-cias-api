import { Router } from 'express';
import { createAppointment, getAppointments } from '../controllers/appointment.controller';
import { sendContactMessage } from '../controllers/contact.controller';
import { getStats } from '../controllers/stats.controller';

const router = Router();

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Appointments
router.post('/appointments', createAppointment);

// Contact
router.post('/contact', sendContactMessage);

// Stats
router.get('/stats', getStats);

router.get('/appointments', getAppointments);

export default router;