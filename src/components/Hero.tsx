import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

interface HeroProps {
  onExploreProducts: () => void;
  onGetBulkPricing: () => void;
  onMeetArtisans: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreProducts,
  onGetBulkPricing,
  onMeetArtisans,
}) => {
  return (
    <section className="relative overflow-hidden bg-[#FFF9F0] border-b border-[#E5D3B5]">
      {/* Background subtle warmth gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFF9F0] via-[#FAF3E7] to-[#FFF9F0] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Origin trust marker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#8C4722] bg-[#E5D3B5]/40 px-3 py-1 rounded-sm border border-[#E5D3B5]">
              <Sparkles className="w-3.5 h-3.5 text-[#A85D36]" />
              <span>Dharavi Craft Cluster · Mumbai, India</span>
            </div>

            {/* Display Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#2C221E] leading-[1.12] text-balance">
              Tradition Shaped by Hand. <br className="hidden sm:inline" />
              <span className="text-[#A85D36] italic font-normal">Crafted from Earth.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-[#5C4D44] max-w-2xl leading-relaxed">
              Discover authentic handcrafted pottery directly from Mumbai’s historic
              Kumbharwada potter colony. From everyday earthen cooling vessels and architectural
              planters to festive Diwali diyas, handmade by multi-generational artisan families.
            </p>

            {/* CTA Group */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreProducts}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-[#A85D36] hover:bg-[#8C4722] rounded-lg shadow-sm transition-all flex items-center gap-2 group cursor-pointer"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onGetBulkPricing}
                className="px-6 py-3.5 text-sm font-semibold text-[#2C221E] bg-[#E5D3B5] hover:bg-[#D4BE9B] rounded-lg transition-colors cursor-pointer border border-[#D4BE9B]"
              >
                Get Bulk Pricing
              </button>

              <button
                onClick={onMeetArtisans}
                className="px-4 py-3.5 text-sm font-medium text-[#5C4D44] hover:text-[#A85D36] transition-colors underline-offset-4 hover:underline cursor-pointer"
              >
                Meet the Artisans
              </button>
            </div>

            {/* Value Points */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-[#5C4D44]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4C563B] shrink-0" />
                <span>Zero middlemen markup</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4C563B] shrink-0" />
                <span>Custom sizes & branding</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4C563B] shrink-0" />
                <span>Break-safe wooden crate shipping</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Feature */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-[#E5D3B5] bg-white shadow-md">
              <ImageWithFallback
                src="https://images.openai.com/static-rsc-4/wDJkGnXQGCNSjYmfHMrIBGR6LTmXhGLq9n1hs-QKg9kK7pA0dhbvCTpoEDU-TZt4AoDUziImpcDTRasKCTV0K_V-qgCEO9SPkYyPNr7RJ9ri3dl0ylb9YrtzjEtKM3jNP5OXxFfh8z1U-8Y0pRKK4_lIrUBX11dgtGN4-gOx6z4?purpose=inline"
                alt="Traditional Dharavi Kumbharwada pottery artisan throwing clay on wheel"
                aspectRatioClass="aspect-[4/3] sm:aspect-[16/11]"
                categoryHint="Living Heritage"
              />

              {/* Scrim overlay with authentic caption */}
              <div className="p-4 bg-gradient-to-b from-white to-[#F4EBD9]/60 border-t border-[#E5D3B5]">
                <div className="flex items-center justify-between text-xs text-[#5C4D44]">
                  <span className="font-semibold text-[#8C4722]">Kumbharwada 90-Ft Road</span>
                  <span>Active wood-kiln community</span>
                </div>
                <p className="text-xs text-[#6B5A51] mt-1 italic">
                  Over 400 Gujarati potter families crafting natural red clay tableware, festive lamps, and planters since 1932.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width Quantitative Proof Strip (Adjacency Rule) */}
        <div className="mt-14 pt-8 border-t border-[#E5D3B5] grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-3">
            <div className="font-serif text-3xl sm:text-4xl font-bold text-[#A85D36] tabular-nums">400+</div>
            <div className="text-xs font-medium text-[#5C4D44] mt-1">Artisan Family Workshops</div>
            <div className="text-[11px] text-[#8C4722]/80 mt-0.5">Sustaining ancestral craft</div>
          </div>
          <div className="p-3">
            <div className="font-serif text-3xl sm:text-4xl font-bold text-[#A85D36] tabular-nums">90+</div>
            <div className="text-xs font-medium text-[#5C4D44] mt-1">Years Living Heritage</div>
            <div className="text-[11px] text-[#8C4722]/80 mt-0.5">Continuous wood-kiln firing</div>
          </div>
          <div className="p-3">
            <div className="font-serif text-3xl sm:text-4xl font-bold text-[#A85D36] tabular-nums">100%</div>
            <div className="text-xs font-medium text-[#5C4D44] mt-1">Natural Riverbed Clay</div>
            <div className="text-[11px] text-[#8C4722]/80 mt-0.5">Lead-free & biodegradable</div>
          </div>
          <div className="p-3">
            <div className="font-serif text-3xl sm:text-4xl font-bold text-[#A85D36] tabular-nums">₹11 / pc</div>
            <div className="text-xs font-medium text-[#5C4D44] mt-1">Wholesale Diya Starting Rate</div>
            <div className="text-[11px] text-[#8C4722]/80 mt-0.5">Direct volume pricing</div>
          </div>
        </div>
      </div>
    </section>
  );
};
