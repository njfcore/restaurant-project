import React, { useState, useEffect } from "react";
import {
  Utensils,
  Calendar,
  Menu as MenuIcon,
  X,
  User,
  Sparkles,
  Sun,
  Moon,
} from "lucide-react";
import { ActiveTab, UserProfile } from "../types";
import { useTheme } from "../context/ThemeContext";

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  openReservationModal: () => void;
  cartCount: number;
  openAccountDrawer: (initialTab?: "account" | "cart") => void;
  user: UserProfile | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  openReservationModal,
  cartCount,
  openAccountDrawer,
  user,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isNourNobleMode, setIsNourNobleMode] = useState(false);
  const { theme, isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Items for the menu bar (Right side)
  const navItems: { id: ActiveTab; label: string; englishLabel: string }[] = [
    { id: "home", label: "خانه", englishLabel: "Home" },
    { id: "menu", label: "منو رستوران", englishLabel: "Menu" },
    { id: "about", label: "درباره ما", englishLabel: "About Us" },
    { id: "gallery", label: "گالری تصاویر", englishLabel: "Gallery" },
    { id: "contact", label: "تماس با ما", englishLabel: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-nav border-b border-[#2a2a2a]/80 py-3 shadow-2xl shadow-black/60 bg-[#0D0D0D]/95"
          : "bg-[#0D0D0D]/90 backdrop-blur-md border-b border-[#1f1f1f] py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center">
          {/* ========================================================================= */}
          {/* 1. RIGHT SECTION: MENU NAVIGATION BAR (سمت راست در حالت RTL)               */}
          {/* ========================================================================= */}
          <div className="flex items-center justify-start">
            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-link-${item.id}`}
                    onClick={() => {
                      setActiveTab(item.id);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`relative py-1.5 text-xs xl:text-sm font-semibold transition-all cursor-pointer ${
                      isActive
                        ? "text-[#f2ca50] font-black"
                        : "text-[#c8c6c5] hover:text-[#f2ca50]"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d4af37] rounded-full shadow-[0_0_10px_#d4af37]" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Mobile Hamburger Button on the Right */}
            <div className="flex lg:hidden items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] text-[#e5e2e1] hover:text-[#f2ca50] transition-colors cursor-pointer"
                aria-label="منوی موبایل"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <MenuIcon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 2. CENTER SECTION: RESTAURANT NAME & ICON (وسط)                          */}
          {/* ========================================================================= */}
          <div className="flex items-center justify-center">
            <div
              onClick={() => {
                setActiveTab("home");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group text-center"
            >
              <div className="p-1.5 sm:p-2 rounded-xl bg-[#1a1a1a] border border-[#d4af37]/30 text-[#d4af37] group-hover:border-[#d4af37] transition-all flex-shrink-0">
                <Utensils className="w-4 h-4 sm:w-5 sm:h-5 text-[#f2ca50]" />
              </div>
              <div className="text-right">
                <div className="font-black text-sm sm:text-base lg:text-lg text-[#f2ca50] tracking-tight group-hover:text-white transition-colors">
                  {isNourNobleMode ? "NOUR & NOBLE" : "نورا و نوبل"}
                </div>
                <div className="text-[9px] sm:text-[10px] text-[#99907c] font-medium hidden sm:block">
                  {isNourNobleMode
                    ? "Italian Luxury Dining"
                    : "رستوران اصیل ایتالیایی"}
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 3. LEFT SECTION: ACTIONS (THEME TOGGLE, RESERVATION, ACCOUNT)              */}
          {/* ========================================================================= */}
          <div className="flex items-center justify-end gap-2 sm:gap-2.5">
            {/* Theme Toggle Button (Dark / Light) */}
            <button
              id="theme-toggle-btn"
              onClick={toggleTheme}
              className={`p-2 sm:p-2.5 rounded-xl border transition-all duration-300 cursor-pointer flex-shrink-0 relative group flex items-center justify-center ${
                isDark
                  ? "bg-[#1a1a1a] hover:bg-[#252525] border-[#333] hover:border-[#d4af37]/70 text-[#f2ca50]"
                  : "bg-[#F3EFE6] hover:bg-[#EAE3D5] border-[#D8CDBB] hover:border-[#B8860B]/70 text-[#996515]"
              }`}
              title={
                isDark ? "تغییر به تم روشن (روز)" : "تغییر به تم تاریک (شب)"
              }
              aria-label={isDark ? "تغییر به تم روشن" : "تغییر به تم تاریک"}
            >
              {isDark ? (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-[#f2ca50] transition-transform duration-300 group-hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-[#996515] transition-transform duration-300 group-hover:-rotate-12" />
              )}
              <span className="sr-only">
                {isDark ? "حالت روشن" : "حالت تاریک"}
              </span>
            </button>

            {/* 1) Reserve Table Button - Hidden on mobile/small screens, visible on large screens */}
            <button
              id="nav-book-table-btn"
              onClick={openReservationModal}
              className="hidden md:flex items-center gap-1.5 sm:gap-2 bg-[#d4af37] hover:bg-[#f2ca50] text-[#131313] px-3 sm:px-4 py-2 rounded-xl font-black text-xs sm:text-sm transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 cursor-pointer flex-shrink-0"
            >
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#131313]" />
              <span>رزرو میز</span>
            </button>

            {/* 2) Account & Profile Button */}
            <button
              id="nav-account-btn"
              onClick={() => openAccountDrawer("account")}
              className="relative p-2 sm:p-2.5 rounded-xl bg-[#1a1a1a] hover:bg-[#252525] border border-[#333] hover:border-[#d4af37]/60 text-[#e5e2e1] transition-all cursor-pointer group flex-shrink-0"
              title={
                user
                  ? `حساب کاربری: ${user.name}`
                  : "ورود / ایجاد حساب کاربری و سبد خرید"
              }
              aria-label="حساب کاربری و سبد خرید"
            >
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-[#f2ca50] group-hover:scale-110 transition-transform" />
                {user ? (
                  <span className="hidden md:inline-block text-xs font-bold text-[#e5e2e1] max-w-[80px] truncate">
                    {user.name.split(" ")[0]}
                  </span>
                ) : (
                  <span className="hidden md:inline-block text-xs font-semibold text-[#a09e9c] group-hover:text-[#f2ca50]">
                    حساب کاربری
                  </span>
                )}
              </div>

              {/* Cart Badge Counter inside Account Icon */}
              {cartCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 bg-[#d4af37] text-[#0D0D0D] font-black text-[10px] w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border-2 border-[#0D0D0D] shadow-md animate-pulse"
                  title={`${cartCount} مورد در سبد خرید موجود است`}
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#121212] border-b border-[#2a2a2a] px-5 py-5 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2.5">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`p-3 rounded-xl text-right text-xs font-bold transition-all ${
                    isActive
                      ? "bg-[#d4af37]/15 text-[#f2ca50] border border-[#d4af37]/40"
                      : "bg-[#1a1a1a] text-[#c8c6c5] hover:text-[#f2ca50]"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#262626] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openReservationModal();
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#d4af37] text-[#0D0D0D] py-3 rounded-xl font-black text-xs shadow-md cursor-pointer hover:bg-[#f2ca50] transition-colors"
            >
              <Calendar className="w-4 h-4 text-[#0D0D0D]" />
              <span>رزرو آنلاین میز</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
