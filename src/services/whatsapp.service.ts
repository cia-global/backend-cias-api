
interface WhatsAppAppointmentData {
  full_name: string;
  phone: string;
  appointment_date: string;
  appointment_time: string;
  email: string;
  branch_name: string;
  document_number: string;
  recipient_phone: string;
}

export const sendWhatsAppNotification = async (
  appointment: WhatsAppAppointmentData
): Promise<void> => {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.PHONE_NUMBER_ID;

  if (!token || !phoneNumberId) {
    throw new Error("Faltan WHATSAPP_TOKEN o PHONE_NUMBER_ID");
  }

  const recipient = appointment.recipient_phone.replace(/\D/g, "");
  if (!recipient) {
    throw new Error("La sede no tiene un teléfono de WhatsApp válido");
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
        to: "573207713935",
        type: "template",
        template: {
          name: "agendamiento_web",
          language: { code: "es_CO" },
          components: [
            {
              type: "body",
              parameters: [
                { type: "text", text: appointment.full_name },
                { type: "text", text: appointment.branch_name },
                { type: "text", text: appointment.document_number },
                { type: "text", text: appointment.appointment_date },
                { type: "text", text: appointment.appointment_time },
                { type: "text", text: appointment.phone },
                { type: "text", text: appointment.email },
              ],
            },
          ],
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
