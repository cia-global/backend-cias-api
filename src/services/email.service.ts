import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(data: any) {
  await resend.emails.send({
    from: 'Contacto <onboarding@resend.dev>',
    to: ['sistemasciaglobal@gmail.com'],
    subject: `Contacto web: ${data.subject}`,
    html: `
      <p><b>Nombre:</b> ${data.name}</p>
      <p><b>Email:</b> ${data.email}</p>
      <p><b>Teléfono:</b> ${data.phone}</p>
      <p>${data.message}</p>
    `,
  });
}