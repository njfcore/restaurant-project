import React from "react";
import {
  CheckCircle2,
  Leaf,
  UtensilsCrossed,
  Award,
  Coffee,
  Calendar,
  Sparkles,
  ChevronLeft,
} from "lucide-react";
import { WHY_CHOOSE_US, RESTAURANT_STATS, CHEF_INFO } from "../data/menuData";

interface AboutSectionProps {
  openReservationModal: () => void;
  onNavigateToMenu: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  openReservationModal,
  onNavigateToMenu,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "leaf":
        return <Leaf className="w-8 h-8 text-[#f2ca50]" />;
      case "utensils":
        return <UtensilsCrossed className="w-8 h-8 text-[#f2ca50]" />;
      case "award":
        return <Award className="w-8 h-8 text-[#f2ca50]" />;
      case "coffee":
        return <Coffee className="w-8 h-8 text-[#f2ca50]" />;
      default:
        return <Sparkles className="w-8 h-8 text-[#f2ca50]" />;
    }
  };

  return (
    <div id="about-page" className="w-full pb-20">
      {/* 1. Hero Ambiance Header (Matching Screenshot 3 top banner) */}
      <div className="relative w-full h-[420px] sm:h-[480px] overflow-hidden flex items-center justify-center text-center">
        {/* Background Image with Dark Gradient Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D]/90 via-[#0D0D0D]/80 to-[#0D0D0D]" />

        {/* Content */}
        <div className="relative z-10 max-w-3xl px-4 sm:px-6">
          <span className="inline-block text-xs sm:text-sm font-bold text-[#f2ca50] tracking-widest mb-3">
            از سال ۱۳۹۰
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#e5e2e1] mb-5 tracking-tight">
            درباره ما
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-[#c8c6c5] leading-relaxed font-normal">
            کشف داستان پشت اشتیاق ما به غذاهای اصیل ایتالیایی، دستور العمل های
            دست ساز، و تجربیات فراموش نشدنی غذاخوری.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* 2. Story Section: "خلق شده با اشتیاق، الهام گرفته از ایتالیا" */}
        <div className="pt-10 flex flex-col items-center text-center">
          <span className="text-xs font-bold text-[#f2ca50] tracking-wider mb-2">
            داستان ما
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#e5e2e1] mb-8">
            خلق شده با اشتیاق، الهام گرفته از ایتالیا
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 text-sm sm:text-base text-[#e5e2e1]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#f2ca50] flex-shrink-0" />
              <span>دستور العمل های اصیل ایتالیایی</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#f2ca50] flex-shrink-0" />
              <span>مواد اولیه تازه و درجه یک</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#f2ca50] flex-shrink-0" />
              <span>تیم آشپزی برنده جایزه</span>
            </div>
          </div>
        </div>

        {/* 3. Why Choose Us: "هنر مهمان نوازی ایتالیایی" (4 Cards Grid) */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#f2ca50] tracking-wider mb-2 block">
              چرا ما را انتخاب کنید
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#e5e2e1] mb-3">
              هنر مهمان نوازی ایتالیایی
            </h2>
            <p className="text-xs sm:text-sm text-[#99907c] leading-relaxed">
              هر جزئیات برای ارائه یک تجربه فراموش نشدنی با الهام از سنت اصیل
              ایتالیایی ساخته شده است.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CHOOSE_US.map((item) => (
              <div
                key={item.id}
                id={`feature-card-${item.id}`}
                className="bg-[#1a1a1a] hover:bg-[#201f1f] border border-[#2a2a2a] hover:border-[#d4af37]/50 rounded-xl p-6 sm:p-7 flex flex-col items-center text-center transition-all duration-300 group"
              >
                <div className="mb-4 p-3 rounded-full bg-[#131313] border border-[#333] group-hover:border-[#d4af37]/40 transition-colors">
                  {getIcon(item.icon)}
                </div>
                <h3 className="text-lg font-bold text-[#e5e2e1] group-hover:text-[#f2ca50] mb-2.5 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#a09e9c] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Meet The Chef Section: "با سرآشپز ما آشنا شوید" */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left Column: Chef Accolades */}
          <div className="space-y-6 text-right order-2 lg:order-1">
            <div>
              <span className="text-xs font-bold text-[#f2ca50] tracking-wider mb-2 block">
                با سرآشپز ما آشنا شوید
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#e5e2e1] mb-3">
                {CHEF_INFO.name}
              </h2>
              <p className="text-xs sm:text-sm text-[#d0c5af] mb-4">
                {CHEF_INFO.title}
              </p>
              <p className="text-sm text-[#a09e9c] leading-relaxed mb-6 italic">
                "{CHEF_INFO.quote}"
              </p>
            </div>

            <div className="space-y-3.5">
              {CHEF_INFO.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#f2ca50] flex-shrink-0" />
                  <span className="text-sm sm:text-base text-[#e5e2e1]">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex gap-4">
              <button
                onClick={onNavigateToMenu}
                className="inline-flex items-center gap-2 bg-[#1a1a1a] hover:bg-[#252525] border border-[#d4af37]/40 text-[#f2ca50] px-5 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer"
              >
                <span>مشاهده دست‌پخت سرآشپز</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Chef Image Card Frame */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="w-full max-w-md h-96 sm:h-[450px] bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] overflow-hidden relative group">
              <img
                src={CHEF_INFO.image}
                alt="Executive Chef"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 right-4 left-4 text-center">
                <span className="font-cinzel text-lg tracking-widest text-[#f2ca50] uppercase">
                  Executive Master Chef
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Achievements Section: "دستاوردهای ما - اعدادی که داستان ما را می گویند" */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-[#f2ca50] tracking-wider mb-2 block">
              دستاوردهای ما
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#e5e2e1] mb-3">
              اعدادی که داستان ما را می گویند
            </h2>
            <p className="text-xs sm:text-sm text-[#99907c] leading-relaxed">
              هر نقطه عطف نشان دهنده اشتیاق ما به غذاهای اصیل ایتالیایی و
              تجربیات فراموش نشدنی غذاخوری است.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {RESTAURANT_STATS.map((stat) => (
              <div
                key={stat.id}
                id={`stat-card-${stat.id}`}
                className="bg-[#1a1a1a] hover:bg-[#201f1f] border border-[#2a2a2a] hover:border-[#d4af37]/40 rounded-xl p-6 sm:p-8 text-center transition-all duration-300 group"
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#f2ca50] mb-2 group-hover:scale-105 transition-transform">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-[#e5e2e1]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
