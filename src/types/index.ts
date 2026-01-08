export type City = {
  id: string;
  name: string;
  address: string;
  phone: string;
  coordinates: { lat: number; lng: number };
  page: number;
  is_active: boolean;
  created_at: string;
  nameSede: string;
};

export type CourseType = {
  id: string;
  name: string;
  description: string;
  duration_hours: number;
  price: number;
  is_active: boolean;
  created_at: string;
};

export type Appointment = {
  id: string;
  city_id: string;
  course_type_id: string;
  full_name: string;
  id_number: string;
  citation_number: string;
  phone: string;
  email: string;
  appointment_date: string;
  appointment_time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
};

export type AppointmentInput = Omit<Appointment, 'id' | 'created_at' | 'updated_at'>;

export type ContactForm = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};