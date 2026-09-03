import React, { useState } from "react";
import { Utensils, Send, CheckCircle2, Heart } from "lucide-react";
import { ActiveTab } from "../types";

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  openReservationModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setActiveTab,
  openReservationModal,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-[#0e0e0e] border-t border-[#222] text-[#e5e2e1] pt-10 pb-10 text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#222]">
          {/* Brand Info (Left / Column 1-4) */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-[#1a1a1a] border border-[#d4af37]/30 text-[#d4af37]">
                <Utensils className="w-5 h-5 text-[#f2ca50]" />
              </div>
              <div>
                <span className="text-xl font-black text-[#f2ca50] tracking-tight">
                  رستوران ایتالیایی
                </span>
                <span className="text-[10px] text-[#99907c] block font-cinzel tracking-widest uppercase">
                  NOUR & NOBLE
                </span>
              </div>
            </div>
            <p className="text-xs text-[#a09e9c] leading-relaxed">
              غذای اصیل ایتالیایی • محیط گرم • سرویس با کیفیت.
              <br />
              تجربه‌ای لوکس و فراموش‌نشدنی با ترکیبی از دستورهای سنتی ایتالیا و
              مهمان‌نوازی اصیل.
            </p>
          </div>

          {/* Quick Links (Center / Column 5-7) */}
          <div className="md:col-span-4 grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-bold text-[#f2ca50] mb-3 uppercase tracking-wider">
                دسترسی سریع
              </h4>
              <ul className="space-y-2 text-xs text-[#c8c6c5]">
                <li>
                  <button
                    onClick={() => {
                      setActiveTab("home");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="hover:text-[#f2ca50] transition-colors cursor-pointer"
                  >
                    خانه
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveTab("menu");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="hover:text-[#f2ca50] transition-colors cursor-pointer"
                  >
                    منو
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveTab("about");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="hover:text-[#f2ca50] transition-colors cursor-pointer"
                  >
                    درباره ما
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveTab("gallery");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="hover:text-[#f2ca50] transition-colors cursor-pointer"
                  >
                    گالری تصاویر
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-[#f2ca50] mb-3 uppercase tracking-wider">
                خدمات و پشتیبانی
              </h4>
              <ul className="space-y-2 text-xs text-[#c8c6c5]">
                <li>
                  <button
                    onClick={openReservationModal}
                    className="hover:text-[#f2ca50] transition-colors cursor-pointer"
                  >
                    رزرو آنلاین میز
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveTab("contact");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="hover:text-[#f2ca50] transition-colors cursor-pointer"
                  >
                    تماس با ما
                  </button>
                </li>
                <li>
                  <span className="text-[#777] cursor-pointer hover:text-[#bbb]">
                    قوانین و مقررات
                  </span>
                </li>
                <li>
                  <span className="text-[#777] cursor-pointer hover:text-[#bbb]">
                    سوالات متداول
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
