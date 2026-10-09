import React, { useState } from 'react';
import { MapPin, Phone, Clock, MessageCircle, Send, Check } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Bulk Order Inquiry');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setName('');
      setPhone('');
      setMessage('');
    }, 3000);
  };

  return (
    <section className="py-16 bg-[#FFF9F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold tracking-wider uppercase text-[#8C4722] mb-1">
            We Welcome Visits & Inquiries
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C221E]">
            Contact & Workshop Visits
          </h2>
          <p className="text-sm text-[#5C4D44] mt-2">
            Visit the historic pottery lanes in Dharavi to select samples in person, or coordinate
            with our artisan logistics desk online.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Info Details & Map guide */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FAF3E7] p-6 rounded-2xl border border-[#E5D3B5] space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#A85D36] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#6B5A51]">
                    Workshop Location
                  </div>
                  <div className="text-sm font-semibold text-[#2C221E] mt-0.5">
                    Kumbharwada Pottery Colony
                  </div>
                  <p className="text-xs text-[#5C4D44] mt-1 leading-relaxed">
                    90-Feet Road, near Sion-Bandra Link Road, Dharavi, Mumbai, Maharashtra 400017
                  </p>
                  <p className="text-[11px] text-[#8C4722] mt-1 font-medium">
                    (10 mins walk from Sion Railway Station / Central Railway)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-[#E5D3B5]">
                <Clock className="w-5 h-5 text-[#4C563B] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#6B5A51]">
                    Operational Kiln & Visit Hours
                  </div>
                  <div className="text-xs text-[#2C221E] mt-0.5">
                    <strong>Monday – Saturday:</strong> 7:30 AM – 8:30 PM
                  </div>
                  <div className="text-xs text-[#2C221E]">
                    <strong>Sunday:</strong> 8:00 AM – 2:00 PM
                  </div>
                  <div className="text-[11px] text-[#5C4D44] mt-1 italic">
                    Best time to witness wet-clay wheel throwing is between 8:00 AM and 12:30 PM.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-[#E5D3B5]">
                <Phone className="w-5 h-5 text-[#A85D36] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#6B5A51]">
                    Direct Phone Lines
                  </div>
                  <div className="text-xs text-[#2C221E] mt-0.5">
                    <strong>Artisan Coordination:</strong> +91 98201 44520
                  </div>
                  <div className="text-xs text-[#2C221E]">
                    <strong>Bulk Transport & Billing:</strong> +91 98194 77215
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp Quick CTA box */}
            <div className="bg-[#4C563B] text-[#FFF9F0] p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-lg font-bold">Fast WhatsApp Response</h3>
                <p className="text-xs text-[#FFF9F0]/80 mt-1">
                  Send photos of your decor designs or required pot dimensions for instant price estimates.
                </p>
              </div>
              <a
                href="https://wa.me/919820144520?text=Hello%20Kumbharwada%20Artisans,%20I%20am%20interested%20in%20bulk%20pottery%20quotation"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-white text-[#4C563B] hover:bg-[#FAF3E7] text-xs font-bold rounded-lg shrink-0 flex items-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Open WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Quick Message Form */}
          <div className="lg:col-span-7 bg-[#FAF3E7] p-6 sm:p-8 rounded-2xl border border-[#E5D3B5]">
            <h3 className="font-serif text-2xl font-bold text-[#2C221E] mb-1">
              Send an Instant Inquiry
            </h3>
            <p className="text-xs text-[#5C4D44] mb-6">
              Our community liaison officer will route your message directly to the designated family workshop.
            </p>

            {sent ? (
              <div className="p-6 bg-white rounded-xl border border-[#4C563B] text-center space-y-2">
                <Check className="w-8 h-8 text-[#4C563B] mx-auto" />
                <div className="font-bold text-sm text-[#2C221E]">Message Transmitted Successfully!</div>
                <p className="text-xs text-[#5C4D44]">
                  We will call or WhatsApp you back shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#6B5A51] block mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white border border-[#E5D3B5] rounded-lg p-2.5 text-xs text-[#2C221E]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#6B5A51] block mb-1">Mobile / WhatsApp</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98000 00000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white border border-[#E5D3B5] rounded-lg p-2.5 text-xs text-[#2C221E]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#6B5A51] block mb-1">Inquiry Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-white border border-[#E5D3B5] rounded-lg p-2.5 text-xs text-[#2C221E]"
                  >
                    <option value="Bulk Order Inquiry">Bulk Wholesale Order Inquiry</option>
                    <option value="Custom Clay Design">Custom Clay Molding / Special Shape</option>
                    <option value="Pottery Workshop Visit">Pottery Workshop Tour Booking</option>
                    <option value="Export & Packaging">Export Shipping & Safe Crate Packing</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#6B5A51] block mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your event, festival dates, or product requirements..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-white border border-[#E5D3B5] rounded-lg p-2.5 text-xs text-[#2C221E]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 text-xs font-semibold text-white bg-[#A85D36] hover:bg-[#8C4722] rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to Kumbharwada Desk</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
