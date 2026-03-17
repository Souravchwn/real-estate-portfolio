'use client';

import { useState, useTransition } from 'react';
import { submitContactForm } from '@/lib/actions/contact-actions';

interface ContactFormProps {
  contactEmail: string;
}

export function ContactForm({ contactEmail }: ContactFormProps): React.JSX.Element {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      const result = await submitContactForm(formData);
      if (result.success) {
        setStatus('success');
        setMessage('Your inquiry has been received. We will be in touch shortly.');
        form.reset();
      } else {
        setStatus('error');
        setMessage(result.error ?? 'Something went wrong. Please try again.');
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="contact-name" className="text-caption text-neutral-500 block mb-2">
            Full Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            placeholder="John Smith"
            className="w-full border border-neutral-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors placeholder:text-neutral-300"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="text-caption text-neutral-500 block mb-2">
            Email Address
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            placeholder="john@example.com"
            className="w-full border border-neutral-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors placeholder:text-neutral-300"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-phone" className="text-caption text-neutral-500 block mb-2">
          Phone <span className="text-neutral-300 normal-case font-normal">(Optional)</span>
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          placeholder="+1 (310) 000-0000"
          className="w-full border border-neutral-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors placeholder:text-neutral-300"
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="text-caption text-neutral-500 block mb-2">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder={`I am interested in discussing acquisition opportunities with ${contactEmail}`}
          className="w-full border border-neutral-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors placeholder:text-neutral-300 resize-none"
        />
      </div>

      <div className="flex items-center justify-between gap-6">
        <button
          type="submit"
          disabled={isPending}
          className="text-caption border border-black bg-black text-white px-8 py-3.5 hover:bg-neutral-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? 'Sending...' : 'Send Inquiry'}
        </button>

        {status !== 'idle' && (
          <p className={`text-sm ${status === 'success' ? 'text-green-700' : 'text-red-600'}`}>
            {message}
          </p>
        )}
      </div>
    </form>
  );
}
