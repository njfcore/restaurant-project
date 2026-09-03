import React, { useState } from "react";
import {
  X,
  Plus,
  Minus,
  ShoppingBag,
  Star,
  Flame,
  Clock,
  Check,
  Sparkles,
} from "lucide-react";
import { MenuItem } from "../types";

interface DishDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number, notes: string) => void;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [specialNotes, setSpecialNotes] = useState("");
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!item) return null;

  const handleAdd = () => {
    onAddToCart(item, quantity, specialNotes);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#181818] border border-[#2e2e2e] rounded-2xl overflow-hidden shadow-2xl text-right my-auto max-h-[92vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 left-3 z-20 p-1.5 rounded-full bg-black/70 text-white/90 hover:text-white hover:bg-black transition-colors"
          aria-label="بستن"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Food Image (Compact height) */}
        <div className="h-44 sm:h-52 w-full relative overflow-hidden bg-[#111] shrink-0">
          <img
            src={item.image}
            alt={item.persianName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent" />

          <div className="absolute bottom-2.5 right-3 flex flex-wrap gap-1.5">
            {item.tags?.map((tag) => (
              <span
                key={tag}
                className="bg-[#d4af37] text-[#0D0D0D] text-[11px] font-black px-2 py-0.5 rounded shadow"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Content Body (Scrollable if screen is very short) */}
        <div className="p-4 sm:p-5 space-y-3.5 overflow-y-auto scrollbar-thin">
          {/* Title and Price */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-[#e5e2e1] mb-0.5">
                {item.persianName}
              </h2>
              <span className="text-[11px] text-[#999] font-cinzel font-medium">
                {item.name}
              </span>
            </div>
            <div className="text-base sm:text-lg font-black text-[#f2ca50] whitespace-nowrap">
              {item.priceFormatted}
            </div>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-[#c8c6c5] leading-relaxed">
            {item.description}
          </p>

          {/* Meta specs */}
          <div className="grid grid-cols-3 gap-1.5 text-center p-2 sm:p-2.5 bg-[#131313] rounded-xl border border-[#2a2a2a]">
            <div>
              <div className="text-[10px] text-[#888] mb-0.5">
                امتیاز مهمانان
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#f2ca50] flex items-center justify-center gap-1">
                <Star className="w-3 h-3 fill-[#f2ca50]" />
                <span>{item.rating || 4.9}</span>
              </div>
            </div>
            <div>
              <div className="text-[10px] text-[#888] mb-0.5">کالری تقریبی</div>
              <div className="text-xs sm:text-sm font-bold text-[#e5e2e1] flex items-center justify-center gap-1">
                <Flame className="w-3 h-3 text-orange-400" />
                <span>{item.calories} kcal</span>
              </div>
            </div>
            <div>
              <div className="text-[10px] text-[#888] mb-0.5">
                زمان آماده‌سازی
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#e5e2e1] flex items-center justify-center gap-1">
                <Clock className="w-3 h-3 text-blue-400" />
                <span>{item.prepTime || "۱۵ دقیقه"}</span>
              </div>
            </div>
          </div>

          {/* Ingredients Breakdown */}
          {item.ingredients && item.ingredients.length > 0 && (
            <div>
              <h4 className="text-[11px] font-bold text-[#d0c5af] mb-1.5">
                ترکیبات و مواد اولیه:
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {item.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="text-[11px] bg-[#202020] text-[#a09e9c] px-2 py-0.5 rounded-md border border-[#333]"
                  >
                    • {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Row */}
          <div className="pt-1 flex items-center gap-3">
            {/* Quantity Selector */}
            <div className="flex items-center gap-1.5 bg-[#131313] border border-[#333] rounded-lg p-1">
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-1 text-[#888] hover:text-white"
                aria-label="افزایش"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
              <span className="w-5 text-center text-xs font-bold text-[#e5e2e1]">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-1 text-[#888] hover:text-white"
                aria-label="کاهش"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Add Button */}
            <button
              onClick={handleAdd}
              className={`flex-1 py-2.5 rounded-lg font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
                addedSuccess
                  ? "bg-green-500 text-[#0D0D0D]"
                  : "bg-[#d4af37] hover:bg-[#f2ca50] text-[#0D0D0D] shadow-md active:scale-98"
              }`}
            >
              {addedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>به سبد سفارش افزوده شد</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>افزودن به سبد سفارش </span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
