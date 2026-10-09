import React from 'react';
import { MapPin, Phone, MessageCircle, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavClick: (tab: string) => void;
  onToggleAdmin: () => void;
  isAdminView: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick, onToggleAdmin, isAdminView }) => {
  return (
    <footer className="bg-[#2C221E] text-[#E5D3B5] pt-16 pb-12 border-t border-[#4C3B32]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#4C3B32]">
          {/* Brand & Mission (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#A85D36] flex items-center justify-center text-[#FFF9F0] font-serif font-bold text-lg">
                K
              </span>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#FFF9F0]">
                Kumbharwada Artisans
              </span>
            </div>
            <p className="text-xs text-[#D4BE9B] leading-relaxed">
              Preserving and empowering Mumbai’s 90-year-old terracotta heritage in Dharavi.
              Direct wholesale and bespoke supply connecting 400+ family kilns with retailers,
              decorators, hotels, and conscious buyers across India.
            </p>
            <div className="pt-2 text-xs text-[#E5D3B5] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#A85D36]" />
              <span>100% Authentic Handcrafted Indian Clay</span>
            </div>
          </div>

          {/* Quick Links (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FFF9F0]">
              Marketplace
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavClick('home')}
                  className="hover:text-[#FFF9F0] transition-colors cursor-pointer text-left"
                >
                  Home Showcase
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('products')}
                  className="hover:text-[#FFF9F0] transition-colors cursor-pointer text-left"
                >
                  Product Catalogue
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('artisans')}
                  className="hover:text-[#FFF9F0] transition-colors cursor-pointer text-left"
                >
                  Our Master Artisans
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('wholesale')}
                  className="hover:text-[#FFF9F0] transition-colors cursor-pointer text-left"
                >
                  Bulk Pricing & Quotations
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('about')}
                  className="hover:text-[#FFF9F0] transition-colors cursor-pointer text-left"
                >
                  Kumbharwada Heritage
                </button>
              </li>
            </ul>
          </div>

          {/* Product Categories (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FFF9F0]">
              Categories & Specialties
            </h4>
            <ul className="space-y-2 text-xs text-[#D4BE9B]">
              <li>Festive Diwali Diyas & Panchmukhi Lamps</li>
              <li>Natural Evaporative Cooling Matkas & Surahis</li>
              <li>Architectural Terracotta Planters & Urns</li>
              <li>Heritage Urulis & Dining Centerpieces</li>
              <li>Bespoke Corporate & Wedding Favors</li>
            </ul>
          </div>

          {/* Workshop & Contact (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FFF9F0]">
              Kiln Workshop & Liaison
            </h4>
            <div className="text-xs space-y-2 text-[#D4BE9B]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#A85D36] shrink-0 mt-0.5" />
                <span>Kumbharwada, 90-Feet Road, Dharavi, Mumbai 400017</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#A85D36] shrink-0" />
                <span>+91 98201 44520 / +91 98194 77215</span>
              </div>
              <div className="pt-2">
                <a
                  href="https://wa.me/919820144520"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#4C563B] text-[#FFF9F0] rounded-md text-xs font-medium hover:bg-[#373E2B] transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Direct WhatsApp Line</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C7A70] gap-4">
          <div>
            © {new Date().getFullYear()} Kumbharwada Pottery Artisans Collective, Mumbai. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavClick('about')}
              className="hover:text-[#FFF9F0] transition-colors cursor-pointer"
            >
              Pottery Tours & Ethics
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => onNavClick('contact')}
              className="hover:text-[#FFF9F0] transition-colors cursor-pointer"
            >
              Pickup & Transport
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={onToggleAdmin}
              className="hover:text-[#FFF9F0] transition-colors cursor-pointer underline text-[#D4BE9B]"
            >
              {isAdminView ? 'Switch to Storefront' : 'Artisan Admin Desk'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
