import React, { useState } from 'react';
import { BuyerType, WholesaleLead } from '../types';
import { Copy, Check, MessageCircle, Send, Calculator, ShieldCheck } from 'lucide-react';

interface WholesaleEnquiryFormProps {
  onLeadSubmitted: (lead: WholesaleLead) => void;
}

export const WholesaleEnquiryForm: React.FC<WholesaleEnquiryFormProps> = ({ onLeadSubmitted }) => {
  const [buyerType, setBuyerType] = useState<BuyerType>('Retailer / Reseller');
  const [category, setCategory] = useState<string>('Festive Diyas');
  const [estimatedQuantity, setEstimatedQuantity] = useState<string>('200–999 pieces');
  const [buyerName, setBuyerName] = useState<string>('');
  const [businessName, setBusinessName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [deliveryCity, setDeliveryCity] = useState<string>('Mumbai');
  const [pincode, setPincode] = useState<string>('');
  const [additionalRequirements, setAdditionalRequirements] = useState<string>('');

  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const buyerTypes: BuyerType[] = [
    'Retailer / Reseller',
    'Wholesaler / Distributor',
    'Event Organizer',
    'Individual Customer',
    'Corporate / Hospitality',
  ];

  const categories = [
    'Festive Diyas',
    'Earthenware (Matkas & Surahis)',
    'Garden & Planters',
    'Decorative Pottery & Urulis',
    'Custom Bulk Mixture',
  ];

  const quantityRanges = [
    '50–199 pieces',
    '200–999 pieces',
    '1,000–4,999 pieces',
    '5,000+ pieces',
  ];

  const generateEnquirySummary = () => {
    return `*Kumbharwada Pottery Artisans - Wholesale Enquiry*
---------------------------------------
• Buyer Name: ${buyerName || 'Valued Buyer'}
• Business / Org: ${businessName || 'N/A'}
• Buyer Type: ${buyerType}
• Product Category: ${category}
• Estimated Quantity: ${estimatedQuantity}
• Delivery City: ${deliveryCity || 'Mumbai'} ${pincode ? `(${pincode})` : ''}
• Contact Phone: ${phone || 'Not provided'}
• Email: ${email || 'Not provided'}
• Specific Requirements: ${additionalRequirements || 'Standard safe-crate wholesale packing'}
---------------------------------------
Source: Kumbharwada Artisans Marketplace (Dharavi, Mumbai)`;
  };

  const handleCopy = () => {
    const text = generateEnquirySummary();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(generateEnquirySummary());
    // Direct link to Dharavi Kumbharwada Artisan Coordination desk
    window.open(`https://wa.me/919820144520?text=${text}`, '_blank');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName || !phone) {
      alert('Please enter your name and phone number so the artisans can contact you.');
      return;
    }

    const newLead: WholesaleLead = {
      id: `lead-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      buyerName,
      businessName,
      buyerType,
      phone,
      email,
      deliveryCity,
      pincode,
      category,
      estimatedQuantity,
      additionalNotes: additionalRequirements,
      status: 'New Lead',
    };

    onLeadSubmitted(newLead);
    setSubmitted(true);
  };

  return (
    <div className="bg-[#FFF9F0] border border-[#E5D3B5] rounded-2xl p-6 sm:p-10 shadow-sm max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#8C4722] bg-[#E5D3B5]/50 px-3 py-1 rounded-sm border border-[#E5D3B5] mb-2">
          <Calculator className="w-3.5 h-3.5" />
          <span>Direct Artisan Coordination</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C221E]">
          Request a Bulk Quotation
        </h2>
        <p className="text-sm text-[#5C4D44] mt-2">
          Tell us what you need, how many pieces you require, and where they should be delivered.
          Our team coordinates directly with Dharavi pottery kilns for verified pricing.
        </p>
      </div>

      {submitted ? (
        <div className="bg-[#FAF3E7] p-8 rounded-xl border border-[#4C563B] text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#4C563B] text-white flex items-center justify-center mx-auto">
            <Check className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#2C221E]">
            Quotation Request Received!
          </h3>
          <p className="text-sm text-[#5C4D44] max-w-md mx-auto">
            Thank you, {buyerName}. Your requirement for <strong className="text-[#2C221E]">{estimatedQuantity}</strong> of{' '}
            <strong className="text-[#2C221E]">{category}</strong> has been transmitted to our Kumbharwada artisan guild.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button
              onClick={handleWhatsApp}
              className="py-2.5 px-5 text-xs font-semibold text-white bg-[#4C563B] hover:bg-[#373E2B] rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Connect on WhatsApp Now</span>
            </button>
            <button
              onClick={() => setSubmitted(false)}
              className="py-2.5 px-5 text-xs font-medium text-[#2C221E] bg-[#E5D3B5] hover:bg-[#D4BE9B] rounded-lg transition-colors cursor-pointer"
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Buyer Type Selection */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[#6B5A51] block mb-2">
              Buyer Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {buyerTypes.map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() => setBuyerType(type)}
                  className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-colors cursor-pointer truncate ${
                    buyerType === type
                      ? 'bg-[#A85D36] text-white border-[#A85D36] shadow-xs'
                      : 'bg-white text-[#2C221E] border-[#E5D3B5] hover:border-[#A85D36]'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Product Category & Quantity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#6B5A51] block mb-2">
                Product Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-white border border-[#E5D3B5] rounded-lg py-2.5 px-3 text-sm text-[#2C221E] focus:outline-none focus:border-[#A85D36]"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#6B5A51] block mb-2">
                Estimated Quantity
              </label>
              <div className="grid grid-cols-2 gap-2">
                {quantityRanges.map((range) => (
                  <button
                    type="button"
                    key={range}
                    onClick={() => setEstimatedQuantity(range)}
                    className={`py-2 px-2 text-xs font-medium rounded-lg border text-center transition-colors cursor-pointer truncate ${
                      estimatedQuantity === range
                        ? 'bg-[#4C563B] text-white border-[#4C563B]'
                        : 'bg-white text-[#2C221E] border-[#E5D3B5] hover:border-[#4C563B]'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#6B5A51] block mb-1">
                Your Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Rajesh Singhania"
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                className="w-full bg-white border border-[#E5D3B5] rounded-lg py-2 px-3 text-sm text-[#2C221E] focus:outline-none focus:border-[#A85D36]"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#6B5A51] block mb-1">
                Company / Studio (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Heritage Events & Decor"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full bg-white border border-[#E5D3B5] rounded-lg py-2 px-3 text-sm text-[#2C221E] focus:outline-none focus:border-[#A85D36]"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#6B5A51] block mb-1">
                Phone / WhatsApp Number *
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98200 00000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-white border border-[#E5D3B5] rounded-lg py-2 px-3 text-sm text-[#2C221E] focus:outline-none focus:border-[#A85D36]"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#6B5A51] block mb-1">
                Delivery City & State
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Pune, Maharashtra"
                value={deliveryCity}
                onChange={(e) => setDeliveryCity(e.target.value)}
                className="w-full bg-white border border-[#E5D3B5] rounded-lg py-2 px-3 text-sm text-[#2C221E] focus:outline-none focus:border-[#A85D36]"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#6B5A51] block mb-1">
                Delivery Pincode
              </label>
              <input
                type="text"
                placeholder="e.g. 411004"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full bg-white border border-[#E5D3B5] rounded-lg py-2 px-3 text-sm text-[#2C221E] focus:outline-none focus:border-[#A85D36]"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#6B5A51] block mb-1">
                Email Address (Optional)
              </label>
              <input
                type="email"
                placeholder="buyer@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-[#E5D3B5] rounded-lg py-2 px-3 text-sm text-[#2C221E] focus:outline-none focus:border-[#A85D36]"
              />
            </div>
          </div>

          {/* Additional Requirements */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[#6B5A51] block mb-1">
              Additional Requirements & Customization
            </label>
            <textarea
              rows={3}
              placeholder="Mention required sizes, festival date deadlines, custom stamped logo, natural vs painted finish, or logistics preference (pickup / tempo / transport truck)..."
              value={additionalRequirements}
              onChange={(e) => setAdditionalRequirements(e.target.value)}
              className="w-full bg-white border border-[#E5D3B5] rounded-lg p-3 text-sm text-[#2C221E] focus:outline-none focus:border-[#A85D36]"
            />
          </div>

          {/* Action Button Bar */}
          <div className="pt-4 border-t border-[#E5D3B5] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {/* Copy Enquiry Button with toast */}
              <button
                type="button"
                onClick={handleCopy}
                className="px-4 py-2.5 text-xs font-semibold text-[#2C221E] bg-[#E5D3B5] hover:bg-[#D4BE9B] rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-[#D4BE9B]"
              >
                {copied ? <Check className="w-4 h-4 text-[#4C563B]" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Enquiry Details'}</span>
              </button>

              <button
                type="button"
                onClick={handleWhatsApp}
                className="px-4 py-2.5 text-xs font-semibold text-white bg-[#4C563B] hover:bg-[#373E2B] rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </button>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-semibold text-white bg-[#A85D36] hover:bg-[#8C4722] rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <Send className="w-4 h-4" />
              <span>Submit for Official Quotation</span>
            </button>
          </div>

          {/* Reassurance note */}
          <div className="flex items-center justify-center gap-2 text-xs text-[#6B5A51] pt-2">
            <ShieldCheck className="w-4 h-4 text-[#4C563B]" />
            <span>Direct artisan pricing · No commissions · Production timeline confirmation within 4 hours</span>
          </div>
        </form>
      )}
    </div>
  );
};
