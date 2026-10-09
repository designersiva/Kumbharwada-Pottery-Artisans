import React from 'react';
import { Flame, Droplets, Flower2, Sparkles, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

interface CategoryCard {
  id: 'festive-diyas' | 'earthenware' | 'garden-planters' | 'decorative-pottery';
  title: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
  imageUrl: string;
  sampleItems: string;
  startingPrice: string;
}

interface CategoriesSectionProps {
  onSelectCategory: (category: 'festive-diyas' | 'earthenware' | 'garden-planters' | 'decorative-pottery') => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({ onSelectCategory }) => {
  const categories: CategoryCard[] = [
    {
      id: 'festive-diyas',
      title: 'Festive Diyas',
      tagline: 'Diwali, Weddings & Cultural Ceremonies',
      description: 'Hand-pinched oil lamps, panchmukhi diyas, floating petal bowls, and wax-tealight holders crafted with natural red slip.',
      icon: <Flame className="w-5 h-5 text-[#A85D36]" />,
      imageUrl: 'https://images.openai.com/static-rsc-4/iRPn-GfgJTjGYVHFFeHA5zpdSvZbQDKoGTeDfrBfEVV9k2MdKQiU3KHUOA3sSq8ZQMhs4WRdKj2Rmy5IaOS4qCeZJlnsOHwRkha_NFTLDFaIMA0TEGlLGkVFMR-v8VF2pfEyLNwZQ6XHnAaxEnetqrMcFoirYSSnjapgzH7ofknlfTAsJD51JJdhBNIUIPkf?purpose=inline',
      sampleItems: 'Panchmukhi, Star Tealights, Rangoli Diyas',
      startingPrice: 'From ₹11 / pc',
    },
    {
      id: 'earthenware',
      title: 'Earthenware & Vessels',
      tagline: 'Matkas, Surahis & Natural Cooking Handis',
      description: 'Traditional water pots paddle-beaten for optimal micro-porosity, reducing water temperature naturally by 4-6°C.',
      icon: <Droplets className="w-5 h-5 text-[#A85D36]" />,
      imageUrl: 'https://images.openai.com/static-rsc-4/kfr35-cS44dA8SaMiLGBRolwUTny6t63eg-lVMuvARRvO8F2v7B5950aLTrMv6fF0OuyNHSTj8gejb5Qfo5a5Ouu4wOaVlznENRFpMalxFDDIFIrUWPBg2lphd6095TQR20k8Q3w3X1BRNHHHE6atstKkKKeqAVXQT1hDSl2DyI?purpose=inline',
      sampleItems: 'Royal Matka, Long-Neck Surahi, Biryani Handi',
      startingPrice: 'From ₹98 / pc',
    },
    {
      id: 'garden-planters',
      title: 'Garden & Planters',
      tagline: 'Architectural Pots for Homes, Nurseries & Resorts',
      description: 'Heavy terracotta planters that breathe, regulating soil moisture and protecting roots from tropical sun overheating.',
      icon: <Flower2 className="w-5 h-5 text-[#A85D36]" />,
      imageUrl: 'https://images.openai.com/static-rsc-4/Q-XsMcUz3tSAB3QowsHyg5t_bmV8CJsbt4ea2WZUbOGcKZWZKgJwz7G_4fXoctP_ksjForPZKtY9PTpgg2Evw8MpuEngr5Tw5pjp5xfVhUMp_U5RYYovL7vF8Dg5HFmotxnaTsKFxYRFfdgdHZ4MmBqyPlIFPtuZdoaA2yjMDWM?purpose=inline',
      sampleItems: 'Ribbed Tapered, Bonsai Bowls, Cylindrical Pots',
      startingPrice: 'From ₹145 / pc',
    },
    {
      id: 'decorative-pottery',
      title: 'Decorative Pottery',
      tagline: 'Vases, Urulis, Centerpieces & Custom Decor',
      description: 'Sculptural earthen accents, tactile fluted vases, and burnished water urulis designed for hospitality foyers and curated homes.',
      icon: <Sparkles className="w-5 h-5 text-[#A85D36]" />,
      imageUrl: 'https://images.openai.com/static-rsc-4/nwyresQoDZ4XAOzPc2i5Ayjevq9vkGLopsmHFXsJ7DtAYxpQFR2psZCMbIHHhpKkN6_-EjN0LZbvyjiB4rmWdGsOPKcoJozjjaUVM2Mc92D0D1LAwqxlTqStS7zTLRbuSw3DGvtXnSK192YZNrCObWFpHHqCt4s_Jugu_NlGz8o?purpose=inline',
      sampleItems: 'Heritage Uruli, Fluted Vases, Floating Basins',
      startingPrice: 'From ₹150 / pc',
    },
  ];

  return (
    <section className="py-16 bg-[#FAF3E7] border-b border-[#E5D3B5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-semibold tracking-wider uppercase text-[#8C4722] mb-1">
              Curated Craft Collections
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C221E] tracking-tight">
              Product Categories
            </h2>
          </div>
          <p className="text-sm text-[#5C4D44] max-w-md">
            Wholesale supply ready for retailers, export partners, wedding coordinators, and hospitality developers.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group cursor-pointer bg-[#FFF9F0] rounded-xl border border-[#E5D3B5] overflow-hidden hover:border-[#A85D36] hover:shadow-md transition-all flex flex-col"
            >
              {/* Category Image */}
              <div className="relative">
                <ImageWithFallback
                  src={cat.imageUrl}
                  alt={cat.title}
                  aspectRatioClass="aspect-[4/3]"
                  categoryHint={cat.title}
                />
                <div className="absolute top-3 left-3 bg-[#FFF9F0]/90 backdrop-blur-sm p-1.5 rounded-lg border border-[#E5D3B5] shadow-xs">
                  {cat.icon}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#2C221E] group-hover:text-[#A85D36] transition-colors">
                    {cat.title}
                  </h3>
                  <div className="text-xs font-medium text-[#8C4722] mt-0.5">
                    {cat.tagline}
                  </div>
                  <p className="text-xs text-[#5C4D44] mt-2 line-clamp-3 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#E5D3B5] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#4C563B] tabular-nums">
                    {cat.startingPrice}
                  </span>
                  <span className="text-xs font-medium text-[#A85D36] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>Browse</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
