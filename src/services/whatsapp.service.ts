
interface WhatsAppAppointmentData {
  full_name: string;
  phone: string;
  appointment_date: string;
  appointment_time: string;
  city_name?: string;
  course_name?: string;
}

export const sendWhatsAppNotification = async (
  appointment: WhatsAppAppointmentData
): Promise<void> => {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.PHONE_NUMBER_ID;
  const adminPhone = process.env.ADMIN_PHONE;

  if (!token || !phoneNumberId || !adminPhone) {
    throw new Error("Faltan variables de entorno de WhatsApp");
  }

  const response = await fetch(
    `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: adminPhone,
        type: "text",
        text: {
          body: `📢 Nuevo agendamiento\n\n👤 Nombre: ${appointment.full_name}\n📍 Ciudad: ${appointment.city_name ?? "N/A"}\n📚 Curso: ${appointment.course_name ?? "N/A"}\n📅 Fecha: ${appointment.appointment_date}\n⏰ Hora: ${appointment.appointment_time}\n📞 Teléfono: ${appointment.phone}`,
        },
      }),
    }
  );

  const data = await response.json();
  if (!response.ok) {
    console.error("Error WhatsApp API:", data);
    throw new Error(`WhatsApp API error: ${response.status}`);
  }
};