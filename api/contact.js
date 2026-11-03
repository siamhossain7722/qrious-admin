/**
 * Vercel / Netlify Serverless Function — /api/contact
 * Handles contact form submissions and sends emails via Resend API
 */

function sanitizeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

export default async function handler(req, res) {
    // Only accept POST requests
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({
            success: false,
            message: 'Method Not Allowed. Use POST.'
        });
    }

    try {
        const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
        const { name, email, phone, subject, message, _hp_security_check } = body || {};

        // 1. Anti-Spam Honeypot check
        if (_hp_security_check) {
            // Silently drop bots without throwing suspicion
            return res.status(200).json({
                success: true,
                message: 'Your message has been sent successfully!'
            });
        }

        // 2. Server-side validation
        if (!name || typeof name !== 'string' || !name.trim()) {
            return res.status(400).json({
                success: false,
                field: 'name',
                message: 'Please provide your full name.'
            });
        }

        if (!email || !isValidEmail(email)) {
            return res.status(400).json({
                success: false,
                field: 'email',
                message: 'Please provide a valid email address.'
            });
        }

        if (!message || typeof message !== 'string' || message.trim().length < 10) {
            return res.status(400).json({
                success: false,
                field: 'message',
                message: 'Please provide a project message of at least 10 characters.'
            });
        }

        // Sanitize strings
        const safeName = sanitizeHtml(name.trim().slice(0, 100));
        const safeEmail = email.trim().slice(0, 150);
        const safePhone = sanitizeHtml((phone || '').trim().slice(0, 50));
        const safeSubject = sanitizeHtml((subject || 'General Inquiry').trim().slice(0, 100));
        const safeMessage = sanitizeHtml(message.trim().slice(0, 5000));

        // 3. API Key check
        const apiKey = process.env.RESEND_API_KEY;
        const recipientEmail = (process.env.CONTACT_EMAIL || process.env.CONTACT_RECIPIENT_EMAIL || 'mdsiamh77@gmail.com').trim();
        const fromEmail = process.env.RESEND_FROM_EMAIL || 'Siam.dev Portfolio <onboarding@resend.dev>';

        if (!apiKey || apiKey.startsWith('your_') || apiKey === 're_your_api_key_here') {
            console.warn('[Contact API] RESEND_API_KEY is missing or unconfigured in environment.');
            return res.status(500).json({
                success: false,
                message: 'Something went wrong while sending your message. Please try again or contact me directly through email.'
            });
        }

        const dateFormatted = new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Dhaka',
            dateStyle: 'full',
            timeStyle: 'medium'
        });

        // 4. Send email via Resend
        const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0c12; color: #f8f8fc; margin: 0; padding: 24px; }
    .email-card { max-width: 600px; margin: 0 auto; background: #141620; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; overflow: hidden; }
    .email-header { background: linear-gradient(135deg, #ff0066 0%, #ff2d82 100%); padding: 24px 30px; }
    .email-header h1 { margin: 0; color: #ffffff; font-size: 20px; font-weight: 700; }
    .email-header p { margin: 4px 0 0; color: rgba(255, 255, 255, 0.85); font-size: 13px; }
    .email-body { padding: 30px; }
    .field-row { margin-bottom: 18px; padding-bottom: 14px; border-bottom: 1px solid rgba(255, 255, 255, 0.06); }
    .field-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #a5a8b8; font-weight: 700; margin-bottom: 4px; }
    .field-value { font-size: 15px; color: #ffffff; font-weight: 500; }
    .field-value a { color: #ff2d82; text-decoration: none; }
    .message-box { background: #0c0d13; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 10px; padding: 18px; margin-top: 8px; font-size: 14px; line-height: 1.6; color: #e2e4ef; white-space: pre-wrap; }
    .email-footer { padding: 20px 30px; background: #0e1018; border-top: 1px solid rgba(255, 255, 255, 0.06); font-size: 12px; color: #7e8296; text-align: center; }
  </style>
</head>
<body>
  <div class="email-card">
    <div class="email-header">
      <h1>New Portfolio Inquiry — Siam.dev</h1>
      <p>Direct submission from visitor on your personal portfolio website</p>
    </div>
    <div class="email-body">
      <div class="field-row">
        <div class="field-label">From / Full Name</div>
        <div class="field-value">${safeName}</div>
      </div>
      <div class="field-row">
        <div class="field-label">Email Address</div>
        <div class="field-value"><a href="mailto:${safeEmail}">${safeEmail}</a></div>
      </div>
      <div class="field-row">
        <div class="field-label">Phone / WhatsApp</div>
        <div class="field-value">${safePhone || 'Not provided'}</div>
      </div>
      <div class="field-row">
        <div class="field-label">Project Category</div>
        <div class="field-value"><span style="color: #ff0066; font-weight: 700;">${safeSubject}</span></div>
      </div>
      <div class="field-row" style="border-bottom: none; margin-bottom: 0;">
        <div class="field-label">Project Vision & Message</div>
        <div class="message-box">${safeMessage}</div>
      </div>
    </div>
    <div class="email-footer">
      Received on ${dateFormatted} (UTC+6) • Siam.dev Contact System<br>
      You can directly reply to this email to contact ${safeName}.
    </div>
  </div>
</body>
</html>
        `;

        const emailText = `
New Portfolio Inquiry — Siam.dev

From: ${safeName}
Email: ${safeEmail}
Phone/WhatsApp: ${safePhone || 'Not provided'}
Category: ${safeSubject}
Date: ${dateFormatted}

Message:
${message.trim()}

---
You can reply directly to this email to reach ${safeName} (${safeEmail}).
        `;

        console.log(`[Contact API] Dispatching email to authoritative recipient: ${recipientEmail}`);

        const resendRes = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: fromEmail,
                to: [recipientEmail],
                reply_to: `${safeName} <${safeEmail}>`,
                subject: `New Portfolio Inquiry — ${safeName}`,
                html: emailHtml,
                text: emailText
            })
        });

        const resendData = await resendRes.json();

        if (!resendRes.ok) {
            console.error('[Contact API] Resend API error:', resendData);
            return res.status(resendRes.status || 500).json({
                success: false,
                message: 'Something went wrong while sending your message. Please try again or contact me directly through email.'
            });
        }

        console.log(`[Contact API] Email successfully delivered to ${recipientEmail} via Resend. Message ID: ${resendData.id}`);
        return res.status(200).json({
            success: true,
            id: resendData.id,
            recipient: recipientEmail,
            message: "Thank you for reaching out. Your message has been delivered successfully. I'll get back to you as soon as possible."
        });

    } catch (err) {
        console.error('[Contact API] Unexpected error:', err);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while sending your message. Please try again or contact me directly through email.'
        });
    }
}

