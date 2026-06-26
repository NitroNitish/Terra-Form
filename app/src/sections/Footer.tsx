import { useState } from 'react';
import { MapPin, Instagram, Mail, ArrowRight } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="pt-20 md:pt-32 pb-8" style={{ background: '#2C1810' }}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2
            className="text-2xl md:text-3xl mb-4"
            style={{ fontFamily: "'Noto Serif SC', serif", color: '#FAF5EB' }}
          >
            {'Join Terraform'}
          </h2>
          <p className="text-sm mb-8 max-w-md mx-auto" style={{ color: 'rgba(250,245,235,0.6)' }}>
            {'Subscribe for new releases, maker stories, and exclusive offers.'}
          </p>

          {subscribed ? (
            <p className="text-sm" style={{ color: '#D4A574' }}>
              {'Thank you for subscribing!'}
            </p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex items-center gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={'Enter your email'}
                className="flex-1 px-4 py-3 text-sm rounded bg-transparent focus:outline-none"
                style={{
                  border: '1px solid #D4A574',
                  color: '#FAF5EB',
                }}
                required
              />
              <button
                type="submit"
                className="w-11 h-11 rounded flex items-center justify-center transition-colors hover:opacity-90"
                style={{ background: '#D4A574', color: '#2C1810' }}
              >
                <ArrowRight size={18} />
              </button>
            </form>
          )}
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12"
          style={{ borderTop: '1px solid rgba(250,245,235,0.1)' }}
        >
          <div>
            <h3
              className="font-display italic text-lg mb-4"
              style={{ color: '#FAF5EB' }}
            >
              Terraform
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(250,245,235,0.5)' }}>
              {'Objects have soul. Life has warmth.'}
            </p>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: 'rgba(250,245,235,0.4)' }}>
              {'Studio'}
            </h4>
            <div className="flex items-start gap-2 text-sm" style={{ color: 'rgba(250,245,235,0.5)' }}>
              <MapPin size={16} className="mt-0.5 flex-shrink-0" />
              <span>
                {'18 Ceramic City, Khurja, Uttar Pradesh'}
              </span>
            </div>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); alert('Booking coming soon'); }}
              className="text-sm mt-3 inline-block hover:opacity-70 transition-opacity"
              style={{ color: '#D4A574' }}
            >
              {'Book a Studio Visit'}
            </a>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: 'rgba(250,245,235,0.4)' }}>
              {'Follow Us'}
            </h4>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:opacity-70 transition-opacity" style={{ color: 'rgba(250,245,235,0.5)' }}>
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:opacity-70 transition-opacity" style={{ color: 'rgba(250,245,235,0.5)' }}>
                <Mail size={20} />
              </a>
              <a href="#" className="hover:opacity-70 transition-opacity" style={{ color: 'rgba(250,245,235,0.5)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4l11.733 16h4.267l-11.733-16z" />
                  <path d="M4 20l6.768-6.768m2.46-2.46l6.772-6.772" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(250,245,235,0.1)' }}
        >
          <p className="text-xs" style={{ color: 'rgba(250,245,235,0.3)' }}>
            &copy; 2025 Terraform {'Terraform'}. {'All rights reserved'}.
          </p>
          <p className="text-xs italic" style={{ color: 'rgba(250,245,235,0.3)' }}>
            {'Objects have soul. Life has warmth.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
