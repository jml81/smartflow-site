interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  message: string;
  recaptchaToken: string;
}

interface Env {
  RESEND_API_KEY: string;
  RECAPTCHA_SECRET_KEY: string;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_PHONE = 30;
const MAX_ORGANIZATION = 100;
const MAX_MESSAGE = 5000;

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { request, env } = context;

    const body: ContactRequest = await request.json();
    const { name, email, phone, organization, message, recaptchaToken } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ success: false, error: 'missing_fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate input lengths
    if (
      name.length > MAX_NAME ||
      email.length > MAX_EMAIL ||
      (phone && phone.length > MAX_PHONE) ||
      (organization && organization.length > MAX_ORGANIZATION) ||
      message.length > MAX_MESSAGE
    ) {
      return new Response(JSON.stringify({ success: false, error: 'input_too_long' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return new Response(JSON.stringify({ success: false, error: 'invalid_email' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate reCAPTCHA (required)
    if (!recaptchaToken) {
      return new Response(JSON.stringify({ success: false, error: 'recaptcha_required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (env.RECAPTCHA_SECRET_KEY) {
      const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
      });

      const recaptchaResult = (await recaptchaResponse.json()) as { success: boolean };

      if (!recaptchaResult.success) {
        return new Response(JSON.stringify({ success: false, error: 'recaptcha_failed' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    const now = new Date();
    const dateStr = now.toLocaleDateString('fi-FI', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const cfInfo = request.cf;
    const userAgent = request.headers.get('user-agent') || '-';
    const clientIP = request.headers.get('cf-connecting-ip') || '-';

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'SmartFlow <noreply@antesto.fi>',
        to: ['myynti@antesto.fi'],
        subject: 'Uusi yhteydenottolomakkeen viesti SmartFlow.fi-sivulta',
        reply_to: email,
        html: `
          <h2>Uusi yhteydenottolomakkeen viesti</h2>
          <p><strong>Päivämäärä:</strong> ${escapeHtml(dateStr)}</p>
          <hr/>
          <p><strong>Nimi:</strong> ${escapeHtml(name)}</p>
          <p><strong>Sähköposti:</strong> ${escapeHtml(email)}</p>
          <p><strong>Puhelin:</strong> ${escapeHtml(phone || '-')}</p>
          <p><strong>Organisaatio:</strong> ${escapeHtml(organization || '-')}</p>
          <hr/>
          <p><strong>Viesti:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>
          <hr/>
          <p style="font-size: 12px; color: #666;">
            <strong>Teknisiä tietoja:</strong><br/>
            IP: ${escapeHtml(clientIP)}<br/>
            User Agent: ${escapeHtml(userAgent)}<br/>
            Maa: ${escapeHtml(String(cfInfo?.country || '-'))}
          </p>
        `,
      }),
    });

    if (!emailResponse.ok) {
      await emailResponse.json();
      return new Response(JSON.stringify({ success: false, error: 'email_failed' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ success: false, error: 'server_error' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
