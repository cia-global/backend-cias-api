import { City, CourseType } from '../types';

export const appointmentConfirmationTemplate = (
  appointment: {
    full_name: string;
    citation_number: string;
    appointment_date: string;
    appointment_time: string;
  },
  city: City,
  course: CourseType
) => {
  const formattedDate = new Date(appointment.appointment_date).toLocaleDateString('es-CO', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmación de Agendamiento</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #2563eb 0%, #16a34a 50%, #facc15 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px;">
                ¡Agendamiento Confirmado!
              </h1>
          </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.6;">
                Hola <strong>${appointment.full_name}</strong>,
              </p>
              
              <p style="margin: 0 0 30px; color: #666666; font-size: 16px; line-height: 1.6;">
                Tu agendamiento ha sido registrado exitosamente. A continuación encontrarás los detalles:
              </p>
              
              <!-- Appointment Details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; border-radius: 6px; padding: 20px; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 10px 0; border-top: 1px solid #e0e0e0;">
                    <strong style="color: #667eea; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Curso</strong>
                    <p style="margin: 5px 0 0; color: #333333; font-size: 16px;">${course.name}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-top: 1px solid #e0e0e0;">
                    <strong style="color: #667eea; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Fecha</strong>
                    <p style="margin: 5px 0 0; color: #333333; font-size: 16px;">${formattedDate}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-top: 1px solid #e0e0e0;">
                    <strong style="color: #667eea; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Hora</strong>
                    <p style="margin: 5px 0 0; color: #333333; font-size: 16px;">${appointment.appointment_time}</p>
                  </td>
                </tr>
              </table>
              
              <!-- Location Details -->
              <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin-bottom: 30px; border-radius: 4px;">
                <strong style="color: #856404; font-size: 14px; display: block; margin-bottom: 10px;">📍 UBICACIÓN</strong>
                <p style="margin: 0 0 5px; color: #856404; font-size: 15px; font-weight: bold;">${city.name}</p>
                <p style="margin: 0; color: #856404; font-size: 14px;">${city.address}</p>
              </div>
              
              <p style="margin: 0 0 10px; color: #666666; font-size: 14px; line-height: 1.6;">
                <strong>Recomendaciones:</strong>
              </p>
              <ul style="margin: 0 0 30px; padding-left: 20px; color: #666666; font-size: 14px; line-height: 1.8;">
                <li>Llega 15 minutos antes de tu cita</li>
                <li>Trae tu documento de identidad</li>
              </ul>
              
              <p style="margin: 0; color: #666666; font-size: 14px; line-height: 1.6;">
                Si tienes alguna pregunta, no dudes en contactarnos.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="margin: 0 0 10px; color: #999999; font-size: 12px;">
                © ${new Date().getFullYear()} Cursos Comparendos. Todos los derechos reservados.
              </p>
              <p style="margin: 0; color: #999999; font-size: 12px;">
                Este es un correo automático, por favor no respondas a este mensaje.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

export const contactNotificationTemplate = (contact: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) => {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nuevo Mensaje de Contacto</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); padding: 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px;">📬 Nuevo Mensaje de Contacto</h1>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 25px; color: #333333; font-size: 16px;">
                Has recibido un nuevo mensaje desde el formulario de contacto de tu sitio web.
              </p>
              
              <!-- Contact Details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                <tr>
                  <td style="padding: 12px; background-color: #f8f9fa; border-left: 4px solid #11998e;">
                    <strong style="color: #11998e; font-size: 12px; text-transform: uppercase; display: block; margin-bottom: 5px;">Nombre</strong>
                    <span style="color: #333333; font-size: 16px;">${contact.name}</span>
                  </td>
                </tr>
                <tr><td style="height: 10px;"></td></tr>
                <tr>
                  <td style="padding: 12px; background-color: #f8f9fa; border-left: 4px solid #11998e;">
                    <strong style="color: #11998e; font-size: 12px; text-transform: uppercase; display: block; margin-bottom: 5px;">Email</strong>
                    <a href="mailto:${contact.email}" style="color: #667eea; font-size: 16px; text-decoration: none;">${contact.email}</a>
                  </td>
                </tr>
                <tr><td style="height: 10px;"></td></tr>
                <tr>
                  <td style="padding: 12px; background-color: #f8f9fa; border-left: 4px solid #11998e;">
                    <strong style="color: #11998e; font-size: 12px; text-transform: uppercase; display: block; margin-bottom: 5px;">Teléfono</strong>
                    <span style="color: #333333; font-size: 16px;">${contact.phone}</span>
                  </td>
                </tr>
                <tr><td style="height: 10px;"></td></tr>
                <tr>
                  <td style="padding: 12px; background-color: #f8f9fa; border-left: 4px solid #11998e;">
                    <strong style="color: #11998e; font-size: 12px; text-transform: uppercase; display: block; margin-bottom: 5px;">Asunto</strong>
                    <span style="color: #333333; font-size: 16px;">${contact.subject}</span>
                  </td>
                </tr>
              </table>
              
              <!-- Message -->
              <div style="background-color: #f8f9fa; border-radius: 6px; padding: 20px; border-left: 4px solid #11998e;">
                <strong style="color: #11998e; font-size: 12px; text-transform: uppercase; display: block; margin-bottom: 10px;">Mensaje</strong>
                <p style="margin: 0; color: #333333; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${contact.message}</p>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="margin: 0; color: #999999; font-size: 12px;">
                Mensaje recibido el ${new Date().toLocaleString('es-CO', { 
                  dateStyle: 'full', 
                  timeStyle: 'short' 
                })}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};