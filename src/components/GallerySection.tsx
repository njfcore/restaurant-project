import React, { useState } from 'react';
import { GALLERY_IMAGES } from '../data/menuData';
import { Sparkles, ZoomIn, X } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'food' | 'atmosphere' | 'kitchen'>('all');
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'همه تصاویر' },
    { id: 'food', label: 'هنر آشپزی و غذاها' },
    { id: 'atmosphere', label: 'فضای سالن و دکوراسیون' },
    { id: 'kitchen', label: 'تنور هیزمی و سرآشپز' },
  ];

  const filtered = GALLERY_IMAGES.filter(
    (img) => selectedCategory === 'all' || img.category === selectedCategory
  );

  return (
    <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs font-bold text-[#f2ca50] tracking-widest block mb-2 uppercase">
          Atmosphere & Culinary Art
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#e5e2e1] mb-4">
          گالری تصاویر رستوران
        </h1>
        <p className="text-sm sm:text-base text-[#a09e9c]">
          نگاهی به شکوه فضا، مهارت آشپزان و ظرافت دست‌پخت‌های ما در نورا و نوبل
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center gap-2 sm:gap-4 mb-10 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id as any)}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-[#d4af37] text-[#0D0D0D] font-bold shadow'
                : 'bg-[#1a1a1a] text-[#a09e9c] border border-[#2a2a2a] hover:border-[#d4af37]/40 hover:text-[#e5e2e1]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((img) => (
          <div
            key={img.id}
            onClick={() => setActiveImage(img.url)}
            className="group relative h-72 rounded-xl overflow-hidden border border-[#2a2a2a] bg-[#161616] cursor-pointer shadow-lg hover:border-[#d4af37]/60 transition-all duration-300"
          >
            <img
              src={img.url}
              alt={img.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5 text-right">
              <span className="text-sm font-bold text-[#f2ca50]">{img.title}</span>
              <span className="text-xs text-[#ccc] mt-0.5 flex items-center gap-1">
                <ZoomIn className="w-3.5 h-3.5" />
                <span>مشاهده بزرگ‌نمایی</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveImage(null)}
        >
          <button
            onClick={() => setActiveImage(null)}
            className="absolute top-6 left-6 p-3 rounded-full bg-[#222] text-white hover:bg-[#333]"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={activeImage}
            alt="Gallery Preview"
            className="max-w-full max-h-[85vh] object-contain rounded-xl border border-[#333] shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};
