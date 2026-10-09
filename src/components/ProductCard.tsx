import React from 'react';
import { Product } from '../types';
import { ImageWithFallback } from './ImageWithFallback';
import { Plus, Eye, MessageCircle } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
  onAddToQuote: (product: Product) => void;
  onDirectWhatsApp: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetails,
  onAddToQuote,
  onDirectWhatsApp,
}) => {
  const lowestBulkPrice = product.priceTiers[product.priceTiers.length - 1]?.pricePerUnit || product.retailPrice;

  return (
    <div className="bg-[#FFF9F0] border border-[#E5D3B5] rounded-xl overflow-hidden hover:border-[#A85D36] transition-all hover:shadow-md flex flex-col justify-between group">
      <div>
        {/* Product Image Slot */}
        <div
          onClick={() => onOpenDetails(product)}
          className="cursor-pointer relative overflow-hidden"
        >
          <ImageWithFallback
            src={product.imageUrl}
            alt={product.name}
            aspectRatioClass="aspect-[4/3]"
            categoryHint={product.categoryLabel}
          />

          {/* Quick View Button overlay on hover */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <span className="bg-[#FFF9F0] text-[#2C221E] text-xs font-semibold px-3 py-1.5 rounded-md shadow-md flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" />
              <span>Inspect Details</span>
            </span>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-5">
          {/* Metadata: Unboxed text with typographic separator (Zero-Pill Rule) */}
          <div className="flex items-center gap-2 text-xs text-[#8C4722] font-medium mb-1.5">
            <span>{product.code}</span>
            <span aria-hidden="true">·</span>
            <span>{product.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span className={product.readyStock ? 'text-[#4C563B]' : 'text-[#8C4722]'}>
              {product.readyStock ? 'Ready Stock' : 'Made to Order'}
            </span>
          </div>

          {/* Product Name */}
          <h3
            onClick={() => onOpenDetails(product)}
            className="font-serif text-lg font-bold text-[#2C221E] group-hover:text-[#A85D36] transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-[#5C4D44] line-clamp-2 mt-1.5 leading-relaxed">
            {product.shortDesc}
          </p>

          {/* Artisan Lane Attribution */}
          <div className="text-[11px] text-[#6B5A51] mt-2 italic flex items-center gap-1">
            <span>By {product.artisanName}</span>
            <span aria-hidden="true">·</span>
            <span>{product.workshopLane}</span>
          </div>
        </div>
      </div>

      {/* Footer Area: Pricing & Actions */}
      <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-3 border-t border-[#E5D3B5] bg-[#FAF3E7]/40">
        <div className="flex items-baseline justify-between mb-3">
          <div>
            <div className="text-[11px] text-[#6B5A51]">Bulk Rate from</div>
            <div className="font-serif text-xl font-bold text-[#A85D36] tabular-nums">
              ₹{lowestBulkPrice}
              <span className="text-xs font-sans font-normal text-[#5C4D44]"> / piece</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[11px] text-[#6B5A51]">Retail ₹{product.retailPrice}</div>
            <div className="text-xs font-semibold text-[#4C563B] tabular-nums">
              MOQ: {product.moq} pcs
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onAddToQuote(product)}
            className="w-full py-2 px-2.5 text-xs font-semibold text-[#2C221E] bg-[#E5D3B5] hover:bg-[#D4BE9B] rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer border border-[#D4BE9B]"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="truncate">Add to Quote</span>
          </button>
          <button
            onClick={() => onDirectWhatsApp(product)}
            className="w-full py-2 px-2.5 text-xs font-medium text-white bg-[#4C563B] hover:bg-[#373E2B] rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span className="truncate">WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
