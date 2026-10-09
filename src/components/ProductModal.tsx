import React, { useState } from 'react';
import { Product } from '../types';
import { ImageWithFallback } from './ImageWithFallback';
import { X, Check, Truck, Shield, MessageCircle, ShoppingBag, Plus, Minus } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToQuote: (product: Product, quantity: number, selectedSize?: string) => void;
  onDirectWhatsApp: (product: Product, quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToQuote,
  onDirectWhatsApp,
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState<number>(product.moq);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizesAvailable[0] || 'Standard');
  const [addedToast, setAddedToast] = useState(false);

  // Calculate current applicable tier price
  const calculateTierPrice = (qty: number) => {
    for (const tier of product.priceTiers) {
      if (tier.maxQty === null && qty >= tier.minQty) {
        return tier.pricePerUnit;
      }
      if (tier.maxQty !== null && qty >= tier.minQty && qty <= tier.maxQty) {
        return tier.pricePerUnit;
      }
    }
    return product.retailPrice;
  };

  const currentUnitPrice = calculateTierPrice(quantity);
  const estimatedTotal = currentUnitPrice * quantity;

  const handleAdd = () => {
    onAddToQuote(product, quantity, selectedSize);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div
        className="relative bg-[#FFF9F0] w-full max-w-4xl rounded-2xl border border-[#E5D3B5] shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[#FFF9F0]/80 hover:bg-[#FFF9F0] text-[#2C221E] border border-[#E5D3B5] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Image & Artisan Badge */}
          <div className="md:col-span-5 bg-[#FAF3E7] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E5D3B5]">
            <div>
              <div className="rounded-xl overflow-hidden border border-[#E5D3B5] shadow-sm mb-4">
                <ImageWithFallback
                  src={product.imageUrl}
                  alt={product.name}
                  aspectRatioClass="aspect-[4/3] sm:aspect-square"
                  categoryHint={product.categoryLabel}
                />
              </div>

              {/* Artisan provenance box */}
              <div className="p-3.5 bg-[#FFF9F0] rounded-xl border border-[#E5D3B5] text-xs">
                <div className="font-semibold text-[#8C4722] mb-0.5">Crafted at Kumbharwada</div>
                <div className="text-[#2C221E] font-medium">{product.artisanName}</div>
                <div className="text-[#5C4D44] mt-0.5">{product.workshopLane}</div>
                <div className="text-[11px] text-[#4C563B] mt-2 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Direct Kiln Verification Verified</span>
                </div>
              </div>
            </div>

            {/* Packaging Guarantee */}
            <div className="mt-6 pt-4 border-t border-[#E5D3B5] space-y-2 text-xs text-[#5C4D44]">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#A85D36] shrink-0" />
                <span>Rice straw & double-wall corrugated crate packing</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#4C563B] shrink-0" />
                <span>Pan-India transport or local Mumbai Dharavi pickup</span>
              </div>
            </div>
          </div>

          {/* Right Column: Specification & Purchase Engine */}
          <div className="md:col-span-7 p-6 sm:p-8 space-y-6">
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#8C4722] mb-1">
                <span>{product.code}</span>
                <span>·</span>
                <span>{product.categoryLabel}</span>
                <span>·</span>
                <span className={product.readyStock ? 'text-[#4C563B]' : 'text-[#8C4722]'}>
                  {product.readyStock ? 'Ready Stock Available' : `Made to Order (${product.leadTimeDays} days lead time)`}
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C221E] leading-snug">
                {product.name}
              </h2>
              <p className="text-sm text-[#5C4D44] mt-2 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Specifications Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-[#FAF3E7]/60 p-4 rounded-xl border border-[#E5D3B5]">
              <div>
                <span className="text-[#6B5A51] block">Material</span>
                <span className="font-semibold text-[#2C221E]">{product.material}</span>
              </div>
              <div>
                <span className="text-[#6B5A51] block">Dimensions</span>
                <span className="font-semibold text-[#2C221E]">{product.dimensions}</span>
              </div>
              <div>
                <span className="text-[#6B5A51] block">Surface Finish</span>
                <span className="font-semibold text-[#2C221E]">{product.finish}</span>
              </div>
              <div>
                <span className="text-[#6B5A51] block">Approx Weight</span>
                <span className="font-semibold text-[#2C221E]">{product.weightApprox}</span>
              </div>
            </div>

            {/* Size Options */}
            {product.sizesAvailable.length > 1 && (
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#6B5A51] block mb-2">
                  Select Size Variant
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizesAvailable.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                        selectedSize === size
                          ? 'bg-[#A85D36] text-white border-[#A85D36]'
                          : 'bg-[#FFF9F0] text-[#2C221E] border-[#E5D3B5] hover:border-[#A85D36]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tiered Bulk Pricing Table */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#6B5A51]">
                  Wholesale Price Tiers (MOQ: {product.moq} pcs)
                </span>
                <span className="text-xs text-[#8C4722]">Retail: ₹{product.retailPrice}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                {product.priceTiers.map((tier, idx) => {
                  const isCurrent =
                    quantity >= tier.minQty && (tier.maxQty === null || quantity <= tier.maxQty);
                  return (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-lg border transition-all ${
                        isCurrent
                          ? 'bg-[#E5D3B5] border-[#A85D36] font-semibold text-[#2C221E]'
                          : 'bg-[#FAF3E7]/40 border-[#E5D3B5] text-[#5C4D44]'
                      }`}
                    >
                      <div className="text-[11px]">
                        {tier.minQty} {tier.maxQty ? `– ${tier.maxQty}` : '+'} pcs
                      </div>
                      <div className="font-serif text-base font-bold text-[#A85D36] mt-0.5 tabular-nums">
                        ₹{tier.pricePerUnit}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quantity Stepper & Cost Calculator */}
            <div className="pt-2 border-t border-[#E5D3B5] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-[#6B5A51] block mb-1">Bulk Order Quantity</span>
                <div className="flex items-center border border-[#E5D3B5] bg-white rounded-lg overflow-hidden w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(product.moq, quantity - 25))}
                    className="p-2 text-[#5C4D44] hover:bg-[#FAF3E7] hover:text-[#2C221E] cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    min={product.moq}
                    step={10}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || product.moq))}
                    className="w-20 text-center text-sm font-semibold text-[#2C221E] py-1 border-x border-[#E5D3B5] focus:outline-none tabular-nums"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 25)}
                    className="p-2 text-[#5C4D44] hover:bg-[#FAF3E7] hover:text-[#2C221E] cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-[#6B5A51] block">Estimated Bulk Cost</span>
                <span className="font-serif text-2xl font-bold text-[#A85D36] tabular-nums">
                  ₹{estimatedTotal.toLocaleString('en-IN')}
                </span>
                <span className="text-[11px] text-[#5C4D44] block">
                  (@ ₹{currentUnitPrice}/pc for {quantity} pcs)
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAdd}
                className="flex-1 py-3 px-4 text-xs font-semibold text-white bg-[#A85D36] hover:bg-[#8C4722] rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{addedToast ? 'Added to Quote Basket!' : 'Add to Bulk Quotation Basket'}</span>
              </button>

              <button
                onClick={() => onDirectWhatsApp(product, quantity)}
                className="py-3 px-5 text-xs font-semibold text-white bg-[#4C563B] hover:bg-[#373E2B] rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enquire on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
