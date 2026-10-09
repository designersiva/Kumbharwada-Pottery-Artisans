import React from 'react';
import { ImageWithFallback } from './ImageWithFallback';
import { Leaf, Sun, Flame, Sparkles, MapPin, Compass } from 'lucide-react';

export const AboutKumbharwada: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Clay Sourcing & Kneading',
      desc: 'Raw clay from Gujarat silt beds and Maharashtra riverbanks is soaked in open pits, filtered through mesh sieves, and foot-kneaded with cotton husk and fine sand to achieve high plasticity.',
      icon: <Sun className="w-5 h-5 text-[#A85D36]" />,
    },
    {
      number: '02',
      title: 'Wheel Throwing & Pithna Shaping',
      desc: 'Formed on heavy flywheels, semi-dry pots are subsequently beaten with a wooden paddle (pithna) against an inner stone anvil to compress clay grains, producing resonant micro-porous walls.',
      icon: <Sparkles className="w-5 h-5 text-[#A85D36]" />,
    },
    {
      number: '03',
      title: 'Courtyard Sun-Drying',
      desc: 'Vessels dry naturally in the open alleys of Kumbharwada under Mumbai’s warm tropical breeze, slowly shedding water without warping or thermal shock before entering kilns.',
      icon: <Sun className="w-5 h-5 text-[#A85D36]" />,
    },
    {
      number: '04',
      title: 'Traditional Wood-Kiln Firing',
      desc: 'Stacked meticulously in community brick kilns (bhattis), fired with hardwood scrap and recycled sawdust at 800°C–900°C for 6 to 8 hours until glowing orange terracotta.',
      icon: <Flame className="w-5 h-5 text-[#A85D36]" />,
    },
  ];

  return (
    <section className="py-16 bg-[#FAF3E7] border-b border-[#E5D3B5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Story Intro: 2-column split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="text-xs font-semibold tracking-wider uppercase text-[#8C4722]">
              Living Heritage Since 1932
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C221E] tracking-tight leading-tight">
              The Clay Heart of Mumbai: <br />
              <span className="text-[#A85D36] italic font-normal">Kumbharwada, Dharavi</span>
            </h2>
            <p className="text-base text-[#5C4D44] leading-relaxed">
              Spread across 12 vibrant acres inside Dharavi, Kumbharwada is Mumbai’s largest and
              oldest pottery settlement. In the early 1930s, potter families migrated from Saurashtra,
              Gujarat, bringing centuries-old wheel throwing techniques and kiln architecture.
            </p>
            <p className="text-sm text-[#5C4D44] leading-relaxed">
              Today, more than 400 families continue this ancient lineage. Every summer, millions of
              porous water matkas keep Mumbai’s homes cool naturally. Come autumn, the entire colony
              transforms into a glittering sea of festive red diyas and painted earthen lamps ready
              for Diwali, Navratri, and wedding celebrations nationwide.
            </p>

            {/* Cultural highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-[#FFF9F0] rounded-xl border border-[#E5D3B5]">
                <div className="font-serif text-lg font-bold text-[#2C221E] mb-1">
                  100% Eco-Friendly Soil
                </div>
                <p className="text-xs text-[#5C4D44] leading-relaxed">
                  Pure terracotta returns harmlessly back to mother earth. Unlike synthetic Plaster of Paris
                  (PoP) or plastic decor, our products are completely non-toxic and biodegradable.
                </p>
              </div>
              <div className="p-4 bg-[#FFF9F0] rounded-xl border border-[#E5D3B5]">
                <div className="font-serif text-lg font-bold text-[#2C221E] mb-1">
                  Fair Artisan Livelihood
                </div>
                <p className="text-xs text-[#5C4D44] leading-relaxed">
                  By cutting out multiple layers of intermediary traders, our marketplace ensures that
                  the maximum value reaches the hands of the families turning the wheels.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-[#E5D3B5] bg-white shadow-md">
              <ImageWithFallback
                src="https://images.openai.com/static-rsc-4/3CSiz1vVY9Vf-fUST6YsTNiQHgh213oU5AD3EnEGPaX0vlmuM5EQhmZNQWTC2Z7DT5MBWVdLyeP_h15jMMxWTHDn2pcS_svWxZ_hatqe0oRCg8iFK0ZBhlI0yYDPEDSyHnOtQAxaIZdbbrPAQ0NUbkOrkipPi00qzYnDE2NSAEQ?purpose=inline"
                alt="Stacked terracotta pottery vessels drying in Kumbharwada Dharavi"
                aspectRatioClass="aspect-[4/3]"
                categoryHint="Kumbharwada Alleys"
              />
              <div className="p-4 bg-[#FFF9F0] border-t border-[#E5D3B5] text-xs text-[#6B5A51]">
                <div className="font-semibold text-[#8C4722]">Community Wood-Kilns (Bhattis)</div>
                <p className="mt-1">
                  Over 100 communal kilns line the perimeter of Kumbharwada, fired late evening when city temperatures drop.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* The 4-step Craft Process */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <div className="text-xs font-semibold tracking-wider uppercase text-[#8C4722]">
              Ancestral Technique
            </div>
            <h3 className="font-serif text-3xl font-bold text-[#2C221E] mt-1">
              From Raw Riverbed to Fired Terracotta
            </h3>
            <p className="text-xs text-[#5C4D44] mt-1.5">
              Every handcrafted piece passes through hands with decades of tactile mastery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st) => (
              <div
                key={st.number}
                className="bg-[#FFF9F0] p-6 rounded-xl border border-[#E5D3B5] hover:border-[#A85D36] transition-colors relative"
              >
                <div className="font-serif text-3xl font-bold text-[#A85D36]/30 mb-3 tabular-nums">
                  {st.number}
                </div>
                <h4 className="font-serif text-lg font-bold text-[#2C221E] mb-2">
                  {st.title}
                </h4>
                <p className="text-xs text-[#5C4D44] leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Sustainable & Festive Traditions */}
        <div className="bg-[#FFF9F0] rounded-2xl p-8 border border-[#E5D3B5] grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-xs font-semibold uppercase text-[#8C4722] mb-1">Diwali & Navratri</div>
            <h4 className="font-serif text-xl font-bold text-[#2C221E] mb-2">The City of Lamps</h4>
            <p className="text-xs text-[#5C4D44] leading-relaxed">
              Between August and November, Kumbharwada produces over 10 million clay lamps, lighting up homes across Maharashtra, Gujarat, and overseas diaspora communities.
            </p>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase text-[#8C4722] mb-1">Summer Matka Rush</div>
            <h4 className="font-serif text-xl font-bold text-[#2C221E] mb-2">Natural Refrigeration</h4>
            <p className="text-xs text-[#5C4D44] leading-relaxed">
              March to June is the peak season for red and black cooling pots. Micro-porous earthen matkas provide naturally sweet, alkaline water without drawing electrical power.
            </p>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase text-[#8C4722] mb-1">Ganesh Chaturthi</div>
            <h4 className="font-serif text-xl font-bold text-[#2C221E] mb-2">Shadu Clay Idols</h4>
            <p className="text-xs text-[#5C4D44] leading-relaxed">
              Pioneering 100% natural Shadu Mati sculptures that dissolve safely during home immersion, nurturing potted plants rather than silting waterways.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
