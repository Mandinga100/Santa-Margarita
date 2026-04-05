import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = "service_tbbyi48";
const EMAILJS_TEMPLATE_ID = "template_2cqjz8l";
const EMAILJS_PUBLIC_KEY = "2PAxEOY6OcPV-156z";

export interface EmailTemplateParams {
  subject: string;
  user_name: string;
  user_phone: string;
  mensaje: string;
  page_url: string;
  user_email?: string;
}

/**
 * Enviar un correo electrónico a través de EmailJS con la plantilla predefinida.
 * Las variables manejadas por la plantilla son: user_name, user_email, user_phone, subject, mensaje, page_url.
 */
export async function sendEmailWithTemplate(params: EmailTemplateParams): Promise<boolean> {
  try {
    const templateParams = {
      subject: params.subject,
      user_name: params.user_name,
      user_phone: params.user_phone,
      mensaje: params.mensaje,
      page_url: params.page_url,
      // Fallback seguro si el campo user_email no es obligatorio en el componente visual
      user_email: params.user_email || "no-reply@funerariasantamargarita.cl",
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    if (response.status === 200) {
      console.log('Solicitud enviada correctamente a EmailJS.', response.text);
      return true;
    }
    
    console.warn('Advertencia en respuesta de EmailJS:', response);
    return false;
  } catch (error) {
    console.error('Error al enviar correo por EmailJS:', error);
    return false;
  }
}
