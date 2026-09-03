import React from "react";
import {
  Utensils,
  Calendar,
  Sparkles,
  ChevronLeft,
  Star,
  Clock,
  ShieldCheck,
  Flame,
} from "lucide-react";
import { ActiveTab, MenuItem } from "../types";
import { MENU_ITEMS } from "../data/menuData";
interface HomeHeroSectionProps {
  setActiveTab: (tab: ActiveTab) => void;
  openReservationModal: () => void;
  onViewItemDetails: (item: MenuItem) => void;
  onAddToCart: (item: MenuItem) => void;
}

export const HomeHeroSection: React.FC<HomeHeroSectionProps> = ({
  setActiveTab,
  openReservationModal,
  onViewItemDetails,
  onAddToCart,
}) => {
  const featuredDishes = MENU_ITEMS.filter((item) => item.isSpecial).slice(
    0,
    4,
  );

  return (
    <div className="w-full">
      {/* 1. Main Hero Stage */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image with Dark Vignette */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/85 to-[#0D0D0D]/70" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16">
          {/* <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1a1a1a]/90 border border-[#d4af37]/40 text-[#f2ca50] text-xs sm:text-sm font-semibold mb-6 shadow-lg animate-pulse">
            <Sparkles className="w-4 h-4 text-[#f2ca50]" />
            <span>تجربه غذاخوری اصیل ناپلی و مدیترانه‌ای</span>
          </div> */}

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#e5e2e1] mb-6 tracking-tight leading-tight">
            طعمی فراتر از انتظار در <br />
            <span className="text-[#f2ca50]">رستوران نورا و نوبل</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#c8c6c5] mb-10 leading-relaxed font-normal">
            تلفیق شکوه هنر مهمان‌نوازی و اصالت ناب طعم‌های ایتالیایی، با مواد
            اولیه ارگانیک و نظارت سرآشپزان برنده جایزه.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="hero-reserve-btn"
              onClick={openReservationModal}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#d4af37] hover:bg-[#f2ca50] text-[#0D0D0D] px-8 py-3.5 rounded-lg font-extrabold text-base transition-all shadow-lg hover:shadow-xl active:scale-95 cursor-pointer"
            >
              <Calendar className="w-5 h-5 text-[#0D0D0D]" />
              <span>رزرو آنلاین میز</span>
            </button>

            <button
              id="hero-menu-btn"
              onClick={() => {
                setActiveTab("menu");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#1a1a1a] hover:bg-[#252525] border border-[#d4af37]/40 text-[#f2ca50] hover:text-white px-8 py-3.5 rounded-lg font-bold text-base transition-all active:scale-95 cursor-pointer"
            >
              <Utensils className="w-5 h-5" />
              <span>مشاهده کامل منو</span>
            </button>
          </div>

          {/* Key Badges */}
          <div className="mt-14 pt-8 border-t border-[#262626]/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3">
              <div className="text-xl font-bold text-[#f2ca50]">۱۰۰٪</div>
              <div className="text-xs text-[#a09e9c]">
                مواد اولیه تازه و وارداتی
              </div>
            </div>
            <div className="p-3">
              <div className="text-xl font-bold text-[#f2ca50]">۴۸ ساعت</div>
              <div className="text-xs text-[#a09e9c]">
                تخمیر خمیر پیتزا ناپلی
              </div>
            </div>
            <div className="p-3">
              <div className="text-xl font-bold text-[#f2ca50]">تنور هیزمی</div>
              <div className="text-xs text-[#a09e9c]">
                پخت روی سنگ آتش‌فشانی
              </div>
            </div>
            <div className="p-3">
              <div className="text-xl font-bold text-[#f2ca50]">سالن VIP</div>
              <div className="text-xs text-[#a09e9c]">
                ضیافت‌های اختصاصی و خصوصی
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Dishes Preview (Spotlight) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-bold text-[#f2ca50] tracking-wider block mb-1">
              پیشنهادات ویژه سرآشپز
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#e5e2e1]">
              محبوب‌ترین دست‌پخت‌های ما
            </h2>
          </div>
          <button
            onClick={() => {
              setActiveTab("menu");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-1.5 text-sm font-bold text-[#f2ca50] hover:text-[#ffe088] transition-colors"
          >
            <span>مشاهده همه </span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDishes.map((dish) => (
            <div
              key={dish.id}
              onClick={() => onViewItemDetails(dish)}
              className="bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#d4af37]/50 rounded-xl overflow-hidden group cursor-pointer transition-all duration-300 flex flex-col justify-between"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={dish.image}
                  alt={dish.persianName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 right-2 bg-[#d4af37] text-[#0D0D0D] text-xs font-extrabold px-2 py-0.5 rounded">
                  {dish.priceFormatted}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#e5e2e1] group-hover:text-[#f2ca50] mb-2 transition-colors">
                    {dish.persianName}
                  </h3>
                  <p className="text-xs text-[#a09e9c] line-clamp-2 mb-4">
                    {dish.description}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(dish);
                  }}
                  className="w-full py-2 rounded-lg bg-[#252525] hover:bg-[#d4af37] text-[#f2ca50] hover:text-[#0D0D0D] font-bold text-xs transition-all text-center"
                >
                  افزودن به سفارش
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Atmosphere & Ambiance Banner */}
      <section className="py-16 bg-[#131313] border-y border-[#262626]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold text-[#f2ca50] tracking-wider uppercase">
              فضایی رویایی برای لحظات ماندگار
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#e5e2e1] leading-tight">
              ترکیب معماری مدرن با نورپردازی گرم و دلپذیر
            </h2>
            <p className="text-sm sm:text-base text-[#a09e9c] leading-relaxed">
              از قرارهای عاشقانه دو نفره تا دورهمی‌های خانوادگی و جلسات کاری
              رسمی، رستوران ایتالیایی نورا و نوبل میزبان شایسته‌ای برای ثبت
              زیباترین خاطرات شماست.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-[#1a1a1a] px-4 py-2 rounded-lg border border-[#2a2a2a] text-xs font-medium text-[#e5e2e1]">
                <Clock className="w-4 h-4 text-[#f2ca50]" />
                <span>ساعت کاری: ۱۲ ظهر الی ۲۴ بامداد</span>
              </div>
              <div className="flex items-center gap-2 bg-[#1a1a1a] px-4 py-2 rounded-lg border border-[#2a2a2a] text-xs font-medium text-[#e5e2e1]">
                <ShieldCheck className="w-4 h-4 text-[#f2ca50]" />
                <span>پارکینگ اختصاصی رایگان با ولت</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=600&q=80"
              alt="Dining Room"
              className="rounded-xl object-cover h-48 sm:h-60 w-full border border-[#2a2a2a]"
            />
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80"
              alt="Wood Oven"
              className="rounded-xl object-cover h-48 sm:h-60 w-full border border-[#2a2a2a] mt-6"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
