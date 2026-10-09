import React, { useState } from 'react';
import { ShoppingBag, Menu, X, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  quoteCartCount: number;
  onOpenQuoteDrawer: () => void;
  isAdminView: boolean;
  onToggleAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  quoteCartCount,
  onOpenQuoteDrawer,
  isAdminView,
  onToggleAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Products' },
    { id: 'artisans', label: 'Our Artisans' },
    { id: 'wholesale', label: 'Wholesale' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFF9F0]/95 backdrop-blur-md border-b border-[#E5D3B5]">
      {/* Top micro-banner for wholesale assurance */}
      <div className="bg-[#4C563B] text-[#FFF9F0] text-xs py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-4">
        <span>Direct from 400+ Dharavi Pottery Workshops · Zero Middlemen · Pan-India Bulk Transport</span>
        <button
          onClick={onToggleAdmin}
          className="hidden sm:inline-flex items-center gap-1 text-[11px] bg-white/15 hover:bg-white/25 px-2 py-0.5 rounded transition-colors ml-2"
          title="Open Artisan & Wholesale Admin Portal"
        >
          <ShieldCheck className="w-3 h-3" />
          <span>{isAdminView ? 'Switch to Storefront' : 'Artisan Admin Portal'}</span>
        </button>
      </div>

      {/* Main Top Bar Contract: 3 Zones */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark in display face */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left cursor-pointer group whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="w-8 h-8 rounded-full bg-[#A85D36] flex items-center justify-center text-[#FFF9F0] font-serif font-bold text-lg shadow-sm">
            K
          </span>
          <div>
            <span className="font-serif text-2xl font-bold tracking-tight text-[#2C221E] group-hover:text-[#A85D36] transition-colors">
              Kumbharwada Artisans
            </span>
          </div>
        </button>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#5C4D44]">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
                activeTab === link.id && !isAdminView
                  ? 'text-[#A85D36] font-semibold'
                  : 'hover:text-[#2C221E]'
              }`}
            >
              {link.label}
              {activeTab === link.id && !isAdminView && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A85D36] rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Zone 3: 1 primary action + Quote Basket */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quote Basket button */}
          <button
            onClick={onOpenQuoteDrawer}
            className="relative p-2.5 rounded-lg border border-[#E5D3B5] hover:border-[#A85D36] bg-[#FFF9F0] text-[#2C221E] hover:text-[#A85D36] transition-colors"
            title="View Bulk Quote Request Basket"
            aria-label="View Bulk Quote Basket"
          >
            <ShoppingBag className="w-5 h-5" />
            {quoteCartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#A85D36] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                {quoteCartCount}
              </span>
            )}
          </button>

          {/* Primary Action Button */}
          <button
            onClick={() => handleNavClick('wholesale')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 text-xs font-semibold text-white bg-[#A85D36] hover:bg-[#8C4722] rounded-lg transition-colors shadow-sm whitespace-nowrap shrink-0"
          >
            Request Bulk Quote
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#2C221E] hover:text-[#A85D36] focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFF9F0] border-b border-[#E5D3B5] px-4 pt-2 pb-6 space-y-2 shadow-lg">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`block w-full text-left px-3 py-2.5 rounded-md text-base font-medium ${
                activeTab === link.id
                  ? 'bg-[#E5D3B5]/50 text-[#A85D36] font-semibold'
                  : 'text-[#5C4D44] hover:bg-[#E5D3B5]/20 hover:text-[#2C221E]'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 border-t border-[#E5D3B5] flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('wholesale')}
              className="w-full text-center py-2.5 px-4 text-sm font-semibold text-white bg-[#A85D36] rounded-lg"
            >
              Request Bulk Quotation
            </button>
            <button
              onClick={() => {
                onToggleAdmin();
                setMobileMenuOpen(false);
              }}
              className="w-full text-center py-2 px-4 text-xs font-medium text-[#4C563B] border border-[#4C563B]/30 rounded-lg hover:bg-[#4C563B]/5"
            >
              {isAdminView ? 'Return to Marketplace' : 'Admin & Lead Manager Portal'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
