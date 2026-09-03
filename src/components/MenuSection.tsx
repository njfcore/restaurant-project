import React, { useState, useMemo, useEffect } from "react";
import {
  ShoppingCart,
  Search,
  Flame,
  Sparkles,
  Check,
  Info,
  Filter,
  ArrowLeft,
  RefreshCw,
} from "lucide-react";
import { MenuItem, CategoryType } from "../types";
import { MENU_ITEMS, CATEGORIES } from "../data/menuData";
import { api } from "../services/api";

interface MenuSectionProps {
  onAddToCart: (item: MenuItem) => void;
  onViewItemDetails: (item: MenuItem) => void;
  openReservationModal?: () => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onAddToCart,
  onViewItemDetails,
  openReservationModal,
}) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(MENU_ITEMS);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryType>("starters");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilterTag, setActiveFilterTag] = useState<string | null>(null);
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let mounted = true;
    api.getMenuItems().then((items) => {
      if (mounted && items && items.length > 0) {
        setMenuItems(items);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  // Filter categories matching the screenshot tab bar
  const displayCategories = [
    { id: "starters", label: "پیش‌غذا" },
    { id: "mains", label: "غذاهای اصلی" },
    { id: "pasta_pizza", label: "پاستا و پیتزا" },
    { id: "desserts", label: "دسرها" },
    { id: "drinks", label: "نوشیدنی‌ها" },
  ];

  const handleQuickAdd = (e: React.MouseEvent, item: MenuItem) => {
    e.stopPropagation();
    onAddToCart(item);
    setAddedItemIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchCategory =
        selectedCategory === "all" ? true : item.category === selectedCategory;

      const matchSearch =
        searchQuery.trim() === "" ||
        item.persianName.includes(searchQuery) ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.includes(searchQuery);

      const matchTag =
        !activeFilterTag || (item.tags && item.tags.includes(activeFilterTag));

      return matchCategory && matchSearch && matchTag;
    });
  }, [menuItems, selectedCategory, searchQuery, activeFilterTag]);

  return (
    <section
      id="menu-section"
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1
          id="menu-heading"
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#f2ca50] tracking-tight mb-6"
        >
          منوی رستوران
        </h1>
        <p className="text-base sm:text-lg text-[#c8c6c5] leading-relaxed font-normal">
          تجربه‌ای بی‌نظیر از طعم‌های اصیل و مدرن، خلق شده با دقت و هنر آشپزان
          ما در فضایی لوکس و صمیمی.
        </p>
      </div>

      {/* Category Navigation Bar (Matching Screenshot) */}
      <div className="border-b border-[#262626] mb-10 overflow-x-auto no-scrollbar">
        <div className="flex items-center justify-center min-w-max gap-8 sm:gap-12 pb-3">
          {displayCategories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`category-tab-${cat.id}`}
                onClick={() => {
                  setSelectedCategory(cat.id as CategoryType);
                  setActiveFilterTag(null);
                }}
                className={`relative pb-3 text-base sm:text-lg font-bold transition-all cursor-pointer ${
                  isActive
                    ? "text-[#f2ca50]"
                    : "text-[#8e8c8a] hover:text-[#e5e2e1]"
                }`}
              >
                <span>{cat.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d4af37] rounded-full shadow-[0_0_10px_#d4af37]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        {/* Search input */}
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جستجوی غذا یا نوشیدنی..."
            className="w-full bg-[#161616] border border-[#2a2a2a] rounded-lg py-2.5 pr-10 pl-4 text-sm text-[#e5e2e1] placeholder-[#777] focus:outline-none focus:border-[#d4af37] transition-all"
          />
          <Search className="w-4 h-4 text-[#888] absolute right-3.5 top-1/2 -translate-y-1/2" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-xs text-[#999] hover:text-white absolute left-3 top-1/2 -translate-y-1/2"
            >
              پاک کردن
            </button>
          )}
        </div>

        {/* Quick Tag Filters
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1">
          {['گیاهی', 'دست‌ساز', 'پرفروش', 'لوکس', 'تند'].map((tag) => {
            const isTagActive = activeFilterTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setActiveFilterTag(isTagActive ? null : tag)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isTagActive
                    ? 'bg-[#d4af37] text-[#0D0D0D] font-bold shadow-sm'
                    : 'bg-[#1a1a1a] text-[#a09e9c] border border-[#2a2a2a] hover:border-[#d4af37]/40 hover:text-[#e5e2e1]'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div> */}
      </div>

      {/* Food Cards Grid (2-column layout matching screenshots) */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-[#161616] rounded-xl border border-[#262626]">
          <p className="text-lg text-[#a09e9c] mb-2">
            موردی با این مشخصات یافت نشد.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveFilterTag(null);
              setSelectedCategory("starters");
            }}
            className="text-sm text-[#f2ca50] hover:underline"
          >
            مشاهده تمام گزینه‌های منو
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {filteredItems.map((item) => {
            const isJustAdded = addedItemIds[item.id];

            return (
              <div
                key={item.id}
                id={`menu-card-${item.id}`}
                onClick={() => onViewItemDetails(item)}
                className="group bg-[#1a1a1a] hover:bg-[#201f1f] border border-[#2a2a2a] hover:border-[#d4af37]/40 rounded-xl p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:shadow-xl hover:shadow-black/60 relative overflow-hidden"
              >
                {/* Top Details & Image Row */}
                <div className="flex items-start gap-4 sm:gap-6">
                  {/* Left Column: Text & Content */}
                  <div className="flex-1 flex flex-col justify-between h-full min-h-[140px]">
                    <div>
                      {/* Name and Price Header */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-lg sm:text-xl font-bold text-[#e5e2e1] group-hover:text-[#f2ca50] transition-colors leading-snug">
                          {item.persianName}
                        </h3>
                        <span className="text-base sm:text-lg font-bold text-[#f2ca50] whitespace-nowrap dir-rtl">
                          {item.priceFormatted}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-[#a09e9c] leading-relaxed line-clamp-3 mb-4 font-normal">
                        {item.description}
                      </p>
                    </div>

                    {/* Order Button Row */}
                    <div className="pt-2">
                      <button
                        id={`order-btn-${item.id}`}
                        onClick={(e) => handleQuickAdd(e, item)}
                        className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-bold transition-all duration-200 cursor-pointer ${
                          isJustAdded
                            ? "bg-[#4ade80] text-[#0D0D0D]"
                            : "bg-transparent hover:bg-[#d4af37]/10 text-[#f2ca50] hover:text-[#ffe088]"
                        }`}
                      >
                        {isJustAdded ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>افزوده شد!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4 text-[#f2ca50]" />
                            <span>سفارش</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Right Column: High Quality Image */}
                  <div className="w-28 h-28 sm:w-36 sm:h-36 flex-shrink-0 rounded-lg overflow-hidden border border-[#2f2f2f] relative bg-[#131313]">
                    <img
                      src={item.image}
                      alt={item.persianName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    {item.isSpecial && (
                      <span className="absolute top-1.5 right-1.5 bg-[#d4af37] text-[#0D0D0D] text-[10px] font-black px-1.5 py-0.5 rounded shadow">
                        ویژه
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Reservation Prompt Bar */}
      {openReservationModal && (
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-[#1a1a1a] via-[#222] to-[#1a1a1a] border border-[#d4af37]/20 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-right">
          <div>
            <h4 className="text-xl font-bold text-[#f2ca50] mb-1">
              مایل به صرف غذا در فضای دلنشین رستوران هستید؟
            </h4>
            <p className="text-sm text-[#a09e9c]">
              هم‌اکنون میز اختصاصی خود را آنلاین رزرو کنید و از پذیرایی VIP لذت
              ببرید.
            </p>
          </div>
          <button
            onClick={openReservationModal}
            className="bg-[#d4af37] hover:bg-[#f2ca50] text-[#0D0D0D] font-bold px-6 py-2.5 rounded-lg text-sm transition-all shadow-lg active:scale-95 whitespace-nowrap cursor-pointer"
          >
            رزرو آنلاین میز
          </button>
        </div>
      )}
    </section>
  );
};
