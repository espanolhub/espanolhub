/**
 * Professional Contact Email Template for Resend
 */

interface ContactEmailProps {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export function ContactEmailTemplate({ name, email, subject, message }: ContactEmailProps): string {
  return `
<!DOCTYPE html>
<html lang="es" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nuevo Mensaje de Contacto</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f3f4f6;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <tr>
            <td style="padding: 0;">
              <div style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); padding: 40px 30px; border-radius: 12px 12px 0 0; text-align: center;">
                <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                  📧 Nuevo Mensaje de Contacto
                </h1>
                <p style="margin: 10px 0 0 0; color: #e0e7ff; font-size: 14px;">
                  Espanol Hub
                </p>
              </div>
            </td>
          </tr>

          <!-- Badge -->
          <tr>
            <td style="padding: 30px 30px 0 30px;">
              <div style="background: linear-gradient(135deg, #dbeafe 0%, #e9d5ff 100%); padding: 12px 20px; border-radius: 8px; text-align: center; display: inline-block; width: 100%; box-sizing: border-box;">
                <span style="color: #3b82f6; font-weight: 600; font-size: 14px;">
                  ⚡ Responder en 24-48 horas
                </span>
              </div>
            </td>
          </tr>

          <!-- Contact Info -->
          <tr>
            <td style="padding: 30px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 0 0 20px 0;">
                    <div style="background: linear-gradient(135deg, #f0f9ff 0%, #faf5ff 100%); padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6;">
                      <table role="presentation" style="width: 100%; border-collapse: collapse;">
                        <tr>
                          <td style="padding: 8px 0; font-size: 14px; color: #6b7280; width: 100px;">
                            <strong style="color: #1f2937;">👤 Nombre:</strong>
                          </td>
                          <td style="padding: 8px 0; font-size: 14px; color: #1f2937;">
                            ${escapeHtml(name)}
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; font-size: 14px; color: #6b7280;">
                            <strong style="color: #1f2937;">📧 Email:</strong>
                          </td>
                          <td style="padding: 8px 0; font-size: 14px;">
                            <a href="mailto:${escapeHtml(email)}" style="color: #3b82f6; text-decoration: none;">
                              ${escapeHtml(email)}
                            </a>
                          </td>
                        </tr>
                        ${subject ? `
                        <tr>
                          <td style="padding: 8px 0; font-size: 14px; color: #6b7280;">
                            <strong style="color: #1f2937;">📌 Asunto:</strong>
                          </td>
                          <td style="padding: 8px 0; font-size: 14px; color: #1f2937;">
                            ${escapeHtml(subject)}
                          </td>
                        </tr>
                        ` : ''}
                        <tr>
                          <td style="padding: 8px 0; font-size: 14px; color: #6b7280;">
                            <strong style="color: #1f2937;">🕐 Fecha:</strong>
                          </td>
                          <td style="padding: 8px 0; font-size: 14px; color: #1f2937;">
                            ${new Date().toLocaleString('es-ES', { 
                              dateStyle: 'full', 
                              timeStyle: 'short',
                              timeZone: 'Europe/Madrid'
                            })}
                          </td>
                        </tr>
                      </table>
                    </div>
                  </td>
                </tr>

                <!-- Message -->
                <tr>
                  <td style="padding: 0;">
                    <h2 style="margin: 0 0 15px 0; color: #1f2937; font-size: 18px; font-weight: 600;">
                      💬 Mensaje:
                    </h2>
                    <div style="background: #f9fafb; padding: 20px; border-radius: 8px; border-left: 4px solid #8b5cf6;">
                      <p style="margin: 0; color: #374151; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">
${escapeHtml(message)}
                      </p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Action Button -->
          <tr>
            <td style="padding: 0 30px 30px 30px; text-align: center;">
              <a href="mailto:${escapeHtml(email)}?subject=Re: ${escapeHtml(subject || 'Tu mensaje en Espanol Hub')}" 
                 style="display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: #ffffff; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px rgba(59, 130, 246, 0.3);">
                ✉️ Responder Ahora
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 0;">
              <div style="background: #f9fafb; padding: 25px 30px; border-radius: 0 0 12px 12px; text-align: center; border-top: 1px solid #e5e7eb;">
                <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 13px;">
                  Este mensaje fue enviado desde el formulario de contacto de
                </p>
                <p style="margin: 0; color: #1f2937; font-weight: 600; font-size: 14px;">
                  📚 Espanol Hub
                </p>
                <p style="margin: 15px 0 0 0; color: #9ca3af; font-size: 12px;">
                  Plataforma educativa de español para arabohablantes
                </p>
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
