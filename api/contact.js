// Vercel Serverless Function to send contact form emails via SendGrid
// Requires environment variable: SENDGRID_API_KEY

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, company, message, timestamp } = req.body || {};

    if (!email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    if (!SENDGRID_API_KEY) {
      return res.status(500).json({ error: 'SendGrid API key not configured' });
    }

    const payload = {
      personalizations: [
        {
          to: [{ email: 'shikhars22@gmail.com' }],
        },
      ],
      from: { email: 'no-reply@saket-sunshine-cove.vercel.app' },
      subject: `Website contact from ${name || email}`,
      content: [
        {
          type: 'text/plain',
          value: `Name: ${name || '—'}\nEmail: ${email}\nCompany: ${company || '—'}\nTime: ${timestamp || new Date().toISOString()}\n\nMessage:\n${message}`,
        },
      ],
    };

    const r = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!r.ok) {
      const text = await r.text();
      console.error('SendGrid error', r.status, text);
      return res.status(502).json({ error: 'Failed to send email', details: text });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Contact handler error', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
