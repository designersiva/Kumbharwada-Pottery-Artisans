import React from 'react';
import { Search, FileText, CheckCircle2, Truck } from 'lucide-react';

export const WholesaleOrderProcess: React.FC<{ onStartQuote: () => void }> = ({ onStartQuote }) => {
  const steps = [
    {
      num: '01',
      title: 'Browse Catalogue & Add Items',
      desc: 'Explore authentic terracotta collections, festive diyas, matkas, and planters with transparent wholesale tier pricing.',
      icon: <Search className="w-5 h-5 text-[#A85D36]" />,
    },
    {
      num: '02',
      title: 'Submit Quantities & Delivery City',
      desc: 'Specify your volume requirement, desired packaging (wooden crates vs straw cartons), and destination pincode.',
      icon: <FileText className="w-5 h-5 text-[#A85D36]" />,
    },
    {
      num: '03',
      title: 'Receive Direct Artisan Quotation',
      desc: 'Within 4 hours, receive an itemized quote directly from the Dharavi artisan workshop with current kiln capacity.',
      icon: <CheckCircle2 className="w-5 h-5 text-[#A85D36]" />,
    },
    {
      num: '04',
      title: 'Production, Packaging & Dispatch',
      desc: 'Confirm order with secure milestones. Goods packed with rice straw cushioning and shipped via direct tempo or truckload.',
      icon: <Truck className="w-5 h-5 text-[#A85D36]" />,
    },
  ];

  return (
    <section className="py-16 bg-[#FFF9F0] border-b border-[#E5D3B5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold tracking-wider uppercase text-[#8C4722] mb-1">
            Seamless B2B & Bulk Fulfilment
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C221E]">
            How Wholesale Ordering Works
          </h2>
          <p className="text-sm text-[#5C4D44] mt-2">
            Designed for retailers, wedding decorators, landscape studios, and event coordinators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div
              key={s.num}
              className="bg-[#FAF3E7] p-6 rounded-xl border border-[#E5D3B5] relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif text-2xl font-bold text-[#A85D36] tabular-nums">
                    {s.num}
                  </span>
                  <div className="p-2 bg-[#FFF9F0] rounded-lg border border-[#E5D3B5]">
                    {s.icon}
                  </div>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#2C221E] mb-2">
                  {s.title}
                </h3>
                <p className="text-xs text-[#5C4D44] leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={onStartQuote}
            className="px-6 py-3 text-xs font-semibold text-white bg-[#A85D36] hover:bg-[#8C4722] rounded-lg transition-colors cursor-pointer shadow-sm"
          >
            Start Your Bulk Quotation Request Now
          </button>
        </div>
      </div>
    </section>
  );
};
