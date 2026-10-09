import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, MessageCircle, Copy, Check, Send } from 'lucide-react';

interface QuoteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, newQty: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onSubmitQuote: (buyerInfo: { name: string; phone: string; city: string; notes: string }) => void;
}

export const QuoteDrawer: React.FC<QuoteDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onSubmitQuote,
}) => {
  if (!isOpen) return null;

  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [deliveryCity, setDeliveryCity] = useState('Mumbai');
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Compute tier price for an item
  const getItemTierPrice = (item: CartItem) => {
    const { product, quantity } = item;
    for (const tier of product.priceTiers) {
      if (tier.maxQty === null && quantity >= tier.minQty) {
        return tier.pricePerUnit;
      }
      if (tier.maxQty !== null && quantity >= tier.minQty && quantity <= tier.maxQty) {
        return tier.pricePerUnit;
      }
    }
    return product.retailPrice;
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => {
      const price = getItemTierPrice(item);
      return sum + price * item.quantity;
    }, 0);
  };

  const totalPieces = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = calculateSubtotal();

  const generateWhatsAppMessage = () => {
    let msg = `*Kumbharwada Bulk Quotation Request*\n`;
    msg += `Name: ${buyerName || 'Prospective Buyer'}\n`;
    msg += `City: ${deliveryCity}\n`;
    msg += `Phone: ${buyerPhone || 'Not provided'}\n`;
    msg += `------------------------------------\n`;
    msg += `*Items Requested:*\n`;
    items.forEach((item, idx) => {
      const unitPrice = getItemTierPrice(item);
      msg += `${idx + 1}. ${item.product.name} [${item.product.code}]\n`;
      msg += `   Qty: ${item.quantity} pcs @ ₹${unitPrice}/pc = ₹${(unitPrice * item.quantity).toLocaleString('en-IN')}\n`;
    });
    msg += `------------------------------------\n`;
    msg += `*Total Volume:* ${totalPieces} pieces\n`;
    msg += `*Estimated Total:* ₹${subtotal.toLocaleString('en-IN')}\n`;
    if (notes) {
      msg += `*Notes:* ${notes}\n`;
    }
    return msg;
  };

  const handleCopyQuote = () => {
    navigator.clipboard.writeText(generateWhatsAppMessage());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendWhatsApp = () => {
    const text = encodeURIComponent(generateWhatsAppMessage());
    window.open(`https://wa.me/919820144520?text=${text}`, '_blank');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName || !buyerPhone) {
      alert('Please provide your name and phone number so the Kumbharwada team can respond.');
      return;
    }
    setIsSubmitting(true);
    onSubmitQuote({ name: buyerName, phone: buyerPhone, city: deliveryCity, notes });
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-lg bg-[#FFF9F0] h-full shadow-2xl flex flex-col justify-between border-l border-[#E5D3B5]">
        {/* Header */}
        <div className="p-5 border-b border-[#E5D3B5] flex items-center justify-between bg-[#FAF3E7]">
          <div>
            <h3 className="font-serif text-xl font-bold text-[#2C221E]">
              Bulk Quotation Basket
            </h3>
            <span className="text-xs text-[#5C4D44]">
              {items.length} {items.length === 1 ? 'item' : 'items'} · {totalPieces} total pieces
            </span>
          </div>
          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                onClick={onClearCart}
                className="text-xs text-[#8C4722] hover:text-[#A85D36] p-1 underline"
              >
                Clear all
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-md text-[#5C4D44] hover:text-[#2C221E] hover:bg-[#E5D3B5]/40"
              aria-label="Close quote drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#E5D3B5]/40 flex items-center justify-center mx-auto text-[#A85D36]">
                <Plus className="w-6 h-6" />
              </div>
              <p className="font-serif text-lg font-bold text-[#2C221E]">
                Your quote basket is empty
              </p>
              <p className="text-xs text-[#5C4D44] max-w-xs mx-auto">
                Explore our festive diyas, matkas, and planters to assemble an official wholesale quotation.
              </p>
            </div>
          ) : (
            items.map((item) => {
              const unitPrice = getItemTierPrice(item);
              const itemTotal = unitPrice * item.quantity;
              return (
                <div
                  key={item.product.id}
                  className="bg-[#FAF3E7]/60 p-3.5 rounded-xl border border-[#E5D3B5] flex gap-3 items-center justify-between"
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-semibold text-[#8C4722]">
                      {item.product.code} · {item.product.categoryLabel}
                    </div>
                    <div className="font-serif text-sm font-bold text-[#2C221E] truncate">
                      {item.product.name}
                    </div>
                    <div className="text-xs text-[#5C4D44] tabular-nums mt-0.5">
                      ₹{unitPrice}/pc · <span className="font-semibold text-[#A85D36]">₹{itemTotal.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {/* Stepper */}
                  <div className="flex items-center border border-[#E5D3B5] bg-white rounded-lg overflow-hidden shrink-0">
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, Math.max(item.product.moq, item.quantity - 25))}
                      className="p-1.5 text-[#5C4D44] hover:bg-[#FAF3E7]"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-2 text-xs font-semibold tabular-nums text-[#2C221E]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity + 25)}
                      className="p-1.5 text-[#5C4D44] hover:bg-[#FAF3E7]"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="p-1 text-[#8C4722] hover:text-red-700 ml-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })
          )}

          {/* Buyer Quick Contact Form (if items present) */}
          {items.length > 0 && (
            <form onSubmit={handleSubmit} className="pt-4 border-t border-[#E5D3B5] space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#6B5A51] block">
                Buyer Contact Details
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="text-[11px] text-[#6B5A51] block mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Shah"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    className="w-full bg-white border border-[#E5D3B5] rounded-md p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-[#6B5A51] block mb-1">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98200 00000"
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    className="w-full bg-white border border-[#E5D3B5] rounded-md p-2 text-xs"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="text-[11px] text-[#6B5A51] block mb-1">Delivery City</label>
                  <input
                    type="text"
                    placeholder="e.g. Pune, Mumbai"
                    value={deliveryCity}
                    onChange={(e) => setDeliveryCity(e.target.value)}
                    className="w-full bg-white border border-[#E5D3B5] rounded-md p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-[#6B5A51] block mb-1">Custom Notes</label>
                  <input
                    type="text"
                    placeholder="Special packing / date"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-white border border-[#E5D3B5] rounded-md p-2 text-xs"
                  />
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Footer Summary & CTAs */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#E5D3B5] bg-[#FAF3E7] space-y-3">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs text-[#6B5A51]">Estimated Bulk Subtotal</span>
                <div className="text-[11px] text-[#4C563B]">
                  Excludes state road tax & wooden crating
                </div>
              </div>
              <span className="font-serif text-2xl font-bold text-[#A85D36] tabular-nums">
                ₹{subtotal.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleCopyQuote}
                className="w-full py-2.5 px-2 text-xs font-semibold text-[#2C221E] bg-[#E5D3B5] hover:bg-[#D4BE9B] rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-[#D4BE9B]"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#4C563B]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
              </button>
              <button
                type="button"
                onClick={handleSendWhatsApp}
                className="w-full py-2.5 px-2 text-xs font-semibold text-white bg-[#4C563B] hover:bg-[#373E2B] rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Quote</span>
              </button>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full py-3 px-4 text-xs font-semibold text-white bg-[#A85D36] hover:bg-[#8C4722] rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Transmitting...' : 'Submit to Artisan Coordination Desk'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
