import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoriesSection } from './components/CategoriesSection';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { ArtisanDirectory } from './components/ArtisanDirectory';
import { WholesaleEnquiryForm } from './components/WholesaleEnquiryForm';
import { WholesaleOrderProcess } from './components/WholesaleOrderProcess';
import { AboutKumbharwada } from './components/AboutKumbharwada';
import { ContactSection } from './components/ContactSection';
import { QuoteDrawer } from './components/QuoteDrawer';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';

import { PRODUCTS, ARTISANS, INITIAL_LEADS } from './data/mockData';
import { Product, Artisan, CartItem, WholesaleLead, LeadStatus } from './types';
import {
  Sparkles,
  ShieldCheck,
  Truck,
  HeartHandshake,
  Search,
  Filter,
  Layers,
  HelpCircle,
  MessageCircle,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isAdminView, setIsAdminView] = useState<boolean>(false);

  // Data states
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [artisans] = useState<Artisan[]>(ARTISANS);
  const [leads, setLeads] = useState<WholesaleLead[]>(INITIAL_LEADS);

  // Product filters
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [productSearch, setProductSearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'moq-asc'>('featured');

  // Modal & Drawer states
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quoteCart, setQuoteCart] = useState<CartItem[]>([]);
  const [isQuoteDrawerOpen, setIsQuoteDrawerOpen] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Add to Quote Basket
  const handleAddToQuote = (product: Product, quantity?: number, selectedSize?: string) => {
    const qty = quantity || product.moq;
    setQuoteCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + qty, selectedSize: selectedSize || item.selectedSize }
            : item
        );
      }
      return [...prev, { product, quantity: qty, selectedSize }];
    });
    showNotification(`Added ${qty} pcs of ${product.name} to Quote Basket`);
  };

  const handleUpdateCartQty = (productId: string, newQty: number) => {
    setQuoteCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setQuoteCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setQuoteCart([]);
  };

  const handleDirectWhatsApp = (product: Product, qty?: number) => {
    const quantity = qty || product.moq;
    const text = encodeURIComponent(
      `Hello Kumbharwada Artisans, I am inquiring about wholesale availability for:\n• Product: ${product.name} [${product.code}]\n• Required Quantity: ${quantity} pieces\n• Workshop: ${product.workshopLane}\nPlease send latest quotation and production timeline.`
    );
    window.open(`https://wa.me/919820144520?text=${text}`, '_blank');
  };

  const handleContactArtisanDirect = (artisan: Artisan) => {
    const text = encodeURIComponent(
      `Hello ${artisan.name} (${artisan.familyWorkshop}), I found your workshop profile on the Kumbharwada Artisans portal. I would like to enquire about your ${artisan.specialty}.`
    );
    const cleanPhone = artisan.phone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
  };

  // New Wholesale Lead Submitted
  const handleLeadSubmitted = (newLead: WholesaleLead) => {
    setLeads((prev) => [newLead, ...prev]);
    showNotification(`Wholesale quotation request #${newLead.id} transmitted to Kumbharwada artisans.`);
  };

  // Drawer Quote submitted
  const handleDrawerQuoteSubmit = (buyerInfo: { name: string; phone: string; city: string; notes: string }) => {
    const totalAmount = quoteCart.reduce((sum, item) => {
      const price = item.product.priceTiers[item.product.priceTiers.length - 1]?.pricePerUnit || item.product.retailPrice;
      return sum + price * item.quantity;
    }, 0);

    const newLead: WholesaleLead = {
      id: `lead-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      buyerName: buyerInfo.name,
      buyerType: 'Wholesaler / Distributor',
      phone: buyerInfo.phone,
      deliveryCity: buyerInfo.city,
      category: 'Multi-Item Basket',
      estimatedQuantity: `${quoteCart.reduce((s, i) => s + i.quantity, 0)} pieces`,
      itemsRequested: quoteCart.map((i) => `${i.product.name} (x${i.quantity})`),
      totalEstimatedAmount: totalAmount,
      additionalNotes: buyerInfo.notes,
      status: 'New Lead',
    };

    setLeads((prev) => [newLead, ...prev]);
    showNotification(`Quotation request transmitted! You will receive response within 4 hours.`);
  };

  // Admin Lead status update
  const handleUpdateLeadStatus = (leadId: string, newStatus: LeadStatus) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === leadId ? { ...lead, status: newStatus } : lead))
    );
    showNotification(`Status updated to "${newStatus}" for Lead ${leadId}`);
  };

  // Admin Product Stock Toggle
  const handleToggleProductStock = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, readyStock: !p.readyStock } : p))
    );
  };

  // Filter & Sort Products
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.code.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.material.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.shortDesc.toLowerCase().includes(productSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') {
      const aMin = a.priceTiers[a.priceTiers.length - 1]?.pricePerUnit || a.retailPrice;
      const bMin = b.priceTiers[b.priceTiers.length - 1]?.pricePerUnit || b.retailPrice;
      return aMin - bMin;
    }
    if (sortBy === 'moq-asc') {
      return a.moq - b.moq;
    }
    return 0; // featured default
  });

  // If in Admin Mode, render the Admin Portal
  if (isAdminView) {
    return (
      <AdminDashboard
        leads={leads}
        onUpdateLeadStatus={handleUpdateLeadStatus}
        products={products}
        onToggleProductStock={handleToggleProductStock}
        artisans={artisans}
        onExitAdmin={() => setIsAdminView(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF9F0] text-[#2C221E] flex flex-col justify-between selection:bg-[#E5D3B5] selection:text-[#2C221E]">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2C221E] text-[#FFF9F0] px-4 py-3 rounded-xl shadow-xl text-xs font-medium flex items-center gap-2 border border-[#E5D3B5]/30">
          <Sparkles className="w-4 h-4 text-[#A85D36]" />
          <span>{notification}</span>
        </div>
      )}

      {/* Main Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setIsAdminView(false);
        }}
        quoteCartCount={quoteCart.length}
        onOpenQuoteDrawer={() => setIsQuoteDrawerOpen(true)}
        isAdminView={isAdminView}
        onToggleAdmin={() => setIsAdminView(!isAdminView)}
      />

      <main className="flex-1">
        {/* VIEW: HOME */}
        {activeTab === 'home' && (
          <div>
            {/* 1. Hero Section with Proof Metrics */}
            <Hero
              onExploreProducts={() => {
                setActiveTab('products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onGetBulkPricing={() => {
                setActiveTab('wholesale');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onMeetArtisans={() => {
                setActiveTab('artisans');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* 2. Product Categories */}
            <CategoriesSection
              onSelectCategory={(catId) => {
                setSelectedCategory(catId);
                setActiveTab('products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* 3. Featured Products Showcase */}
            <section className="py-16 bg-[#FFF9F0]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
                  <div>
                    <div className="text-xs font-semibold tracking-wider uppercase text-[#8C4722] mb-1">
                      Ready for Bulk Supply
                    </div>
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C221E]">
                      Featured Handcrafted Pieces
                    </h2>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setActiveTab('products');
                    }}
                    className="text-xs font-semibold text-[#A85D36] hover:text-[#8C4722] flex items-center gap-1 group cursor-pointer"
                  >
                    <span>View Full 40+ Item Catalogue</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {products.slice(0, 4).map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onOpenDetails={(p) => setSelectedProduct(p)}
                      onAddToQuote={(p) => handleAddToQuote(p)}
                      onDirectWhatsApp={(p) => handleDirectWhatsApp(p)}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* 4. Why Buy From Kumbharwada Section */}
            <section className="py-16 bg-[#FAF3E7] border-y border-[#E5D3B5]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <div className="text-xs font-semibold tracking-wider uppercase text-[#8C4722] mb-1">
                    Authentic Artisan Direct Model
                  </div>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C221E]">
                    Why Source from Kumbharwada?
                  </h2>
                  <p className="text-sm text-[#5C4D44] mt-2">
                    Empowering craft communities while providing wholesale reliability to commercial buyers.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                  <div className="bg-[#FFF9F0] p-5 rounded-xl border border-[#E5D3B5]">
                    <div className="w-10 h-10 rounded-lg bg-[#E5D3B5]/50 flex items-center justify-center text-[#A85D36] mb-3">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-base font-bold text-[#2C221E] mb-1">
                      Traditional Craftsmanship
                    </h3>
                    <p className="text-xs text-[#5C4D44] leading-relaxed">
                      Every vessel is wheel-thrown and hand-beaten using centuries-old Gujarat & Saurashtra techniques.
                    </p>
                  </div>

                  <div className="bg-[#FFF9F0] p-5 rounded-xl border border-[#E5D3B5]">
                    <div className="w-10 h-10 rounded-lg bg-[#E5D3B5]/50 flex items-center justify-center text-[#4C563B] mb-3">
                      <HeartHandshake className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-base font-bold text-[#2C221E] mb-1">
                      Direct Artisan Links
                    </h3>
                    <p className="text-xs text-[#5C4D44] leading-relaxed">
                      Zero broker margins. Your wholesale contract directly supports 400+ family workshops in Dharavi.
                    </p>
                  </div>

                  <div className="bg-[#FFF9F0] p-5 rounded-xl border border-[#E5D3B5]">
                    <div className="w-10 h-10 rounded-lg bg-[#E5D3B5]/50 flex items-center justify-center text-[#A85D36] mb-3">
                      <Layers className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-base font-bold text-[#2C221E] mb-1">
                      Bulk Supply Scale
                    </h3>
                    <p className="text-xs text-[#5C4D44] leading-relaxed">
                      Kiln capacities capable of producing over 50,000 diyas and 10,000 planters per month on schedule.
                    </p>
                  </div>

                  <div className="bg-[#FFF9F0] p-5 rounded-xl border border-[#E5D3B5]">
                    <div className="w-10 h-10 rounded-lg bg-[#E5D3B5]/50 flex items-center justify-center text-[#4C563B] mb-3">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-base font-bold text-[#2C221E] mb-1">
                      Custom Designs & Sizes
                    </h3>
                    <p className="text-xs text-[#5C4D44] leading-relaxed">
                      Bespoke terracotta molding, branded corporate stamps, and custom floral engravings upon request.
                    </p>
                  </div>

                  <div className="bg-[#FFF9F0] p-5 rounded-xl border border-[#E5D3B5]">
                    <div className="w-10 h-10 rounded-lg bg-[#E5D3B5]/50 flex items-center justify-center text-[#A85D36] mb-3">
                      <Truck className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-base font-bold text-[#2C221E] mb-1">
                      Break-Safe Transit
                    </h3>
                    <p className="text-xs text-[#5C4D44] leading-relaxed">
                      Padded with rice straw in heavy corrugated cartons or wooden crates for pan-India road transit.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 5. Wholesale Ordering Process */}
            <WholesaleOrderProcess
              onStartQuote={() => {
                setActiveTab('wholesale');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* 6. Lead Generation / Bulk Quotation Form CTA */}
            <section className="py-16 bg-[#FFF9F0]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <WholesaleEnquiryForm onLeadSubmitted={handleLeadSubmitted} />
              </div>
            </section>
          </div>
        )}

        {/* VIEW: PRODUCTS CATALOGUE */}
        {activeTab === 'products' && (
          <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            {/* Header */}
            <div>
              <div className="text-xs font-semibold tracking-wider uppercase text-[#8C4722] mb-1">
                Authentic Dharavi Clay Catalogue
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C221E]">
                All Pottery & Terracotta Collections
              </h1>
              <p className="text-sm text-[#5C4D44] mt-1.5 max-w-2xl">
                Filter by craft category, explore wholesale price tiers, and inspect technical specifications.
                Every piece is handmade by registered Kumbharwada potter families.
              </p>
            </div>

            {/* Filters & Search Toolbar (Zero-Pill Discipline: Segmented Buttons + Search) */}
            <div className="bg-[#FAF3E7] p-4 rounded-xl border border-[#E5D3B5] flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              {/* Category Segmented Tabs */}
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { id: 'all', label: 'All Products' },
                  { id: 'festive-diyas', label: 'Festive Diyas' },
                  { id: 'earthenware', label: 'Earthenware & Vessels' },
                  { id: 'garden-planters', label: 'Garden & Planters' },
                  { id: 'decorative-pottery', label: 'Decorative Pottery' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-[#A85D36] text-white shadow-xs'
                        : 'bg-white text-[#5C4D44] border border-[#E5D3B5] hover:border-[#A85D36]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Search & Sort Controls */}
              <div className="flex items-center gap-3">
                <div className="relative flex-1 sm:w-60">
                  <Search className="w-4 h-4 text-[#6B5A51] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search by code or name..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="pl-9 pr-3 py-1.5 bg-white border border-[#E5D3B5] rounded-md text-xs w-full focus:outline-none focus:border-[#A85D36]"
                  />
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-white border border-[#E5D3B5] text-xs font-medium text-[#2C221E] rounded-md py-1.5 px-2.5 focus:outline-none"
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="price-asc">Sort: Lowest Bulk Price</option>
                  <option value="moq-asc">Sort: Lowest MOQ</option>
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between text-xs text-[#6B5A51]">
              <span>
                Showing <strong>{sortedProducts.length}</strong> handcrafted pottery items
              </span>
              <span>Bulk MOQ starts from 15–100 pieces per design</span>
            </div>

            {/* Products Grid */}
            {sortedProducts.length === 0 ? (
              <div className="text-center py-20 bg-[#FAF3E7] rounded-xl border border-[#E5D3B5] space-y-3">
                <p className="font-serif text-lg font-bold text-[#2C221E]">
                  No products matched your search
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setProductSearch('');
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#A85D36] rounded-lg"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onOpenDetails={(p) => setSelectedProduct(p)}
                    onAddToQuote={(p) => handleAddToQuote(p)}
                    onDirectWhatsApp={(p) => handleDirectWhatsApp(p)}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {/* VIEW: OUR ARTISANS */}
        {activeTab === 'artisans' && (
          <ArtisanDirectory onContactArtisan={handleContactArtisanDirect} />
        )}

        {/* VIEW: WHOLESALE & BULK ORDERS */}
        {activeTab === 'wholesale' && (
          <div className="py-12 space-y-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <WholesaleOrderProcess
                onStartQuote={() => {
                  window.scrollTo({ top: 600, behavior: 'smooth' });
                }}
              />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <WholesaleEnquiryForm onLeadSubmitted={handleLeadSubmitted} />
            </div>

            {/* FAQ on Bulk Wholesale */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C221E]">
                  Frequently Asked Questions (Wholesale & Logistics)
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-[#FAF3E7] p-5 rounded-xl border border-[#E5D3B5] space-y-1.5">
                  <h4 className="font-serif text-base font-bold text-[#2C221E]">
                    What is the Minimum Order Quantity (MOQ)?
                  </h4>
                  <p className="text-[#5C4D44] leading-relaxed">
                    MOQ depends on the vessel size. Festive diyas have an MOQ of 50–100 pieces.
                    Large earthenware matkas and architectural planters have an MOQ of 15–25 pieces.
                  </p>
                </div>

                <div className="bg-[#FAF3E7] p-5 rounded-xl border border-[#E5D3B5] space-y-1.5">
                  <h4 className="font-serif text-base font-bold text-[#2C221E]">
                    How do you prevent transit breakage?
                  </h4>
                  <p className="text-[#5C4D44] leading-relaxed">
                    All bulk shipments are nested with dried organic rice straw and packed inside
                    heavy 5-ply corrugated cartons. For long-distance pan-India shipments, we build
                    reinforced timber crates that guarantee &lt;2% breakage tolerance.
                  </p>
                </div>

                <div className="bg-[#FAF3E7] p-5 rounded-xl border border-[#E5D3B5] space-y-1.5">
                  <h4 className="font-serif text-base font-bold text-[#2C221E]">
                    Can we request custom embossed logos or shapes?
                  </h4>
                  <p className="text-[#5C4D44] leading-relaxed">
                    Yes! For orders above 500 pieces, our master mold-makers can create custom
                    plaster dies with your company emblem, custom sizes, or specific colored slips.
                  </p>
                </div>

                <div className="bg-[#FAF3E7] p-5 rounded-xl border border-[#E5D3B5] space-y-1.5">
                  <h4 className="font-serif text-base font-bold text-[#2C221E]">
                    Can we inspect samples directly in Dharavi?
                  </h4>
                  <p className="text-[#5C4D44] leading-relaxed">
                    Absolutely. Buyers are welcome to visit Kumbharwada 90-Feet Road Monday through
                    Saturday between 8:00 AM and 8:00 PM. We can have sample batches ready for pickup.
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* VIEW: ABOUT KUMBHARWADA */}
        {activeTab === 'about' && <AboutKumbharwada />}

        {/* VIEW: CONTACT US */}
        {activeTab === 'contact' && <ContactSection />}
      </main>

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToQuote={handleAddToQuote}
        onDirectWhatsApp={handleDirectWhatsApp}
      />

      {/* Slide-over Quote Drawer */}
      <QuoteDrawer
        isOpen={isQuoteDrawerOpen}
        onClose={() => setIsQuoteDrawerOpen(false)}
        items={quoteCart}
        onUpdateQuantity={handleUpdateCartQty}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onSubmitQuote={handleDrawerQuoteSubmit}
      />

      {/* Global Footer */}
      <Footer
        onNavClick={(tab) => {
          setActiveTab(tab);
          setIsAdminView(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onToggleAdmin={() => setIsAdminView(!isAdminView)}
        isAdminView={isAdminView}
      />
    </div>
  );
}
