import { Router } from 'express';
import { createAppointment, getAppointments } from '../controllers/appointment.controller';
import { sendContactMessage } from '../controllers/contact.controller';
import { getStats } from '../controllers/stats.controller';
import { toggleScheduleStatus, getSchedules , createSchedule } from '../controllers/schedule.controller';

const router = Router();

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Appointments
router.get('/appointments', getAppointments);
router.post('/appointments', createAppointment);

// Contact
router.post('/contact', sendContactMessage);

// Stats
router.get('/stats', getStats);

// Schedules
router.patch('/schedules/:id/status', toggleScheduleStatus);
router.post('/schedules', createSchedule);
router.get('/schedules', getSchedules);

export default router;