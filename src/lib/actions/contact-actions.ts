'use server';

// lib/actions/contact-actions.ts
// Server Action for the contact inquiry form.
// Currently: logs the submission and returns success.
// TODO: Integrate SendGrid or Postmark for live email sending.

interface ContactFormResult {
  success: boolean;
  error?: string;
}

export async function submitContactForm(formData: FormData): Promise<ContactFormResult> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string | null;
  const message = formData.get('message') as string;

  // Basic validation
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return { success: false, error: 'Please fill in all required fields.' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: 'Please enter a valid email address.' };
  }

  // In production: send via SendGrid / Postmark
  // Example with SendGrid:
  // await fetch('https://api.sendgrid.com/v3/mail/send', {
  //   method: 'POST',
  //   headers: { Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`, 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ ... }),
  // });

  console.log('[ContactForm] New inquiry received:', { name, email, phone, message });

  return { success: true };
}
