/**
 * Siam.dev — Standalone Development & Production Server
 * Serves static portfolio files and handles POST /api/contact via Resend API
 * Zero third-party npm dependencies required (uses native Node.js 18+ capabilities)
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env if present
try {
    if (typeof process.loadEnvFile === 'function') {
        const envPath = path.join(__dirname, '.env');
        if (fs.existsSync(envPath)) {
            process.loadEnvFile(envPath);
        }
    } else {
        // Fallback simple .env parser
        const envPath = path.join(__dirname, '.env');
        if (fs.existsSync(envPath)) {
            const lines = fs.readFileSync(envPath, 'utf8').split('\n');
            lines.forEach(line => {
                const trimmed = line.trim();
                if (trimmed && !trimmed.startsWith('#')) {
                    const eqIdx = trimmed.indexOf('=');
                    if (eqIdx !== -1) {
                        const key = trimmed.slice(0, eqIdx).trim();
                        const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
                        if (!process.env[key]) process.env[key] = val;
                    }
                }
            });
        }
    }
} catch (e) {
    console.warn('[Env] Could not load .env file:', e.message);
}

const PORT = parseInt(process.env.PORT || '8080', 10);
const HOST = process.env.HOST || '0.0.0.0';

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.webp': 'image/webp',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.ogv': 'video/ogg',
    '.woff2': 'font/woff2',
    '.woff': 'font/woff',
    '.ttf': 'font/ttf',
    '.pdf': 'application/pdf',
    '.txt': 'text/plain; charset=utf-8'
};

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

// In-memory rate limiting map: ip -> [timestamp, timestamp, ...]
const rateLimitMap = new Map();

function isRateLimited(ip) {
    const now = Date.now();
    const windowMs = 10 * 60 * 1000; // 10 minutes
    const isLocal = ip === '127.0.0.1' || ip === '::1' || ip === '::ffff:127.0.0.1' || ip === 'localhost';
    const maxRequests = isLocal ? 50 : 10;

    let timestamps = rateLimitMap.get(ip) || [];
    timestamps = timestamps.filter(t => now - t < windowMs);

    if (timestamps.length >= maxRequests) {
        return true;
    }

    timestamps.push(now);
    rateLimitMap.set(ip, timestamps);
    return false;
}

// Contact Form Handler
async function handleContactRequest(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        return res.end();
    }

    if (req.method !== 'POST') {
        res.writeHead(405, { 'Content-Type': 'application/json', 'Allow': 'POST' });
        return res.end(JSON.stringify({ success: false, message: 'Method Not Allowed. Use POST.' }));
    }

    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    if (isRateLimited(ip)) {
        res.writeHead(429, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({
            success: false,
            message: 'Too many requests. Please wait a few minutes before submitting another message.'
        }));
    }

    let bodyRaw = '';
    req.on('data', chunk => {
        bodyRaw += chunk;
        if (bodyRaw.length > 50000) {
            req.destroy(); // Prevent memory flooding
        }
    });

    req.on('end', async () => {
        try {
            const body = JSON.parse(bodyRaw || '{}');
            const { name, email, phone, subject, message, _hp_security_check } = body;

            // Honeypot check (anti-spam)
            if (_hp_security_check) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({
                    success: true,
                    message: "Thank you for reaching out. Your message has been delivered successfully. I'll get back to you as soon as possible."
                }));
            }

            // Input Validation
            if (!name || typeof name !== 'string' || !name.trim()) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({
                    success: false,
                    field: 'name',
                    message: 'Please provide your full name.'
                }));
            }

            if (!email || !isValidEmail(email)) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({
                    success: false,
                    field: 'email',
                    message: 'Please provide a valid email address.'
                }));
            }

            if (!message || typeof message !== 'string' || message.trim().length < 10) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({
                    success: false,
                    field: 'message',
                    message: 'Please provide a project message of at least 10 characters.'
                }));
            }

            const safeName = sanitizeHtml(name.trim().slice(0, 100));
            const safeEmail = email.trim().slice(0, 150);
            const safePhone = sanitizeHtml((phone || '').trim().slice(0, 50));
            const safeSubject = sanitizeHtml((subject || 'General Inquiry').trim().slice(0, 100));
            const safeMessage = sanitizeHtml(message.trim().slice(0, 5000));

            const apiKey = process.env.RESEND_API_KEY;
            const recipientEmail = (process.env.CONTACT_EMAIL || process.env.CONTACT_RECIPIENT_EMAIL || 'mdsiamh77@gmail.com').trim();
            const fromEmail = process.env.RESEND_FROM_EMAIL || 'Siam.dev Portfolio <onboarding@resend.dev>';

            if (!apiKey || apiKey.startsWith('your_') || apiKey === 're_your_api_key_here') {
                console.warn('[Contact API] RESEND_API_KEY is missing or unconfigured in environment.');
                res.writeHead(500, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({
                    success: false,
                    message: 'Something went wrong while sending your message. Please try again or contact me directly through email.'
                }));
            }

            const dateFormatted = new Date().toLocaleString('en-US', {
                timeZone: 'Asia/Dhaka',
                dateStyle: 'full',
                timeStyle: 'medium'
            });

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
                res.writeHead(resendRes.status || 500, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({
                    success: false,
                    message: 'Something went wrong while sending your message. Please try again or contact me directly through email.'
                }));
            }

            console.log(`[Contact API] Email successfully delivered to ${recipientEmail} via Resend. Message ID: ${resendData.id}`);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({
                success: true,
                id: resendData.id,
                recipient: recipientEmail,
                message: "Thank you for reaching out. Your message has been delivered successfully. I'll get back to you as soon as possible."
            }));

        } catch (err) {
            console.error('[Contact API] Internal Error:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({
                success: false,
                message: 'Something went wrong while sending your message. Please try again or contact me directly through email.'
            }));
        }
    });
}

// HTTP Server
const server = http.createServer((req, res) => {
    // Enable CORS for development
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        return res.end();
    }

    const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const pathname = parsedUrl.pathname;

    // Contact API Route
    if (pathname === '/api/contact') {
        return handleContactRequest(req, res);
    }

    // Static File Serving
    let safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
    if (safePath === '/' || safePath === '\\') {
        safePath = '/index.html';
    }

    const filePath = path.join(__dirname, safePath);

    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            return res.end('404 Not Found');
        }

        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';
        const fileSize = stats.size;

        // Support HTTP Range requests for video seeking & progressive streaming
        const range = req.headers.range;
        if (range && (contentType.startsWith('video/') || contentType.startsWith('audio/'))) {
            const parts = range.replace(/bytes=/, '').split('-');
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

            if (start >= fileSize || end >= fileSize) {
                res.writeHead(416, {
                    'Content-Range': `bytes */${fileSize}`,
                    'Content-Type': contentType
                });
                return res.end();
            }

            const chunksize = (end - start) + 1;
            res.writeHead(206, {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': contentType
            });

            const stream = fs.createReadStream(filePath, { start, end });
            stream.pipe(res);
        } else {
            res.writeHead(200, {
                'Content-Length': fileSize,
                'Content-Type': contentType,
                'Accept-Ranges': 'bytes'
            });
            const stream = fs.createReadStream(filePath);
            stream.pipe(res);
        }
    });
});

server.listen(PORT, HOST, () => {
    console.log(`[Siam.dev Server] Running at http://127.0.0.1:${PORT}`);
    console.log(`[Siam.dev Server] Contact endpoint ready at POST http://127.0.0.1:${PORT}/api/contact`);
});

