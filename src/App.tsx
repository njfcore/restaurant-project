import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { HomeHeroSection } from "./components/HomeHeroSection";
import { MenuSection } from "./components/MenuSection";
import { AboutSection } from "./components/AboutSection";
import { GallerySection } from "./components/GallerySection";
import { ContactSection } from "./components/ContactSection";
import { ReservationModal } from "./components/ReservationModal";
import { AccountDrawer } from "./components/AccountDrawer";
import { DishDetailModal } from "./components/DishDetailModal";
import { Footer } from "./components/Footer";
import { ActiveTab, MenuItem, CartItem, UserProfile } from "./types";
import { Check, ShoppingBag, User } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("home");
  const [reservationModalOpen, setReservationModalOpen] = useState(false);
  const [accountDrawerOpen, setAccountDrawerOpen] = useState(false);
  const [accountInitialTab, setAccountInitialTab] = useState<
    "account" | "cart"
  >("account");
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 3000);
  };

  const handleAddToCart = (
    item: MenuItem,
    quantity: number = 1,
    notes?: string,
  ) => {
    setCart((prevCart) => {
      const existing = prevCart.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prevCart.map((ci) =>
          ci.item.id === item.id
            ? {
                ...ci,
                quantity: ci.quantity + quantity,
                notes: notes || ci.notes,
              }
            : ci,
        );
      } else {
        return [...prevCart, { item, quantity, notes }];
      }
    });
    showToast(
      `«${item.persianName}» به سبد سفارش در بخش حساب کاربری افزوده شد.`,
    );
  };

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((ci) => (ci.item.id === itemId ? { ...ci, quantity } : ci)),
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((ci) => ci.item.id !== itemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleLogin = (newUser: UserProfile) => {
    setUser(newUser);
    showToast(`خوش آمدید، ${newUser.name}!`);
  };

  const handleLogout = () => {
    setUser(null);
    showToast("با موفقیت از حساب کاربری خارج شدید.");
  };

  const handleOpenAccount = (initialTab: "account" | "cart" = "account") => {
    setAccountInitialTab(initialTab);
    setAccountDrawerOpen(true);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#e5e2e1] antialiased flex flex-col justify-between selection:bg-[#d4af37] selection:text-[#0D0D0D]">
      {/* Header Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openReservationModal={() => setReservationModalOpen(true)}
        cartCount={totalCartCount}
        openAccountDrawer={handleOpenAccount}
        user={user}
      />

      {/* Main Content View */}
      <main className="flex-1 pt-16">
        {activeTab === "home" && (
          <div>
            <HomeHeroSection
              setActiveTab={setActiveTab}
              openReservationModal={() => setReservationModalOpen(true)}
              onViewItemDetails={(dish) => setSelectedDish(dish)}
              onAddToCart={handleAddToCart}
            />
            {/* Show Menu preview and About preview in Home page */}
            <MenuSection
              onAddToCart={handleAddToCart}
              onViewItemDetails={(item) => setSelectedDish(item)}
              openReservationModal={() => setReservationModalOpen(true)}
            />
            <AboutSection
              openReservationModal={() => setReservationModalOpen(true)}
              onNavigateToMenu={() => {
                setActiveTab("menu");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </div>
        )}

        {activeTab === "menu" && (
          <MenuSection
            onAddToCart={handleAddToCart}
            onViewItemDetails={(item) => setSelectedDish(item)}
            openReservationModal={() => setReservationModalOpen(true)}
          />
        )}

        {activeTab === "about" && (
          <AboutSection
            openReservationModal={() => setReservationModalOpen(true)}
            onNavigateToMenu={() => {
              setActiveTab("menu");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )}

        {activeTab === "gallery" && <GallerySection />}

        {activeTab === "contact" && <ContactSection />}
      </main>

      {/* Floating Quick Action for Mobile/Desktop to Access Account / Cart */}
      {totalCartCount > 0 && !accountDrawerOpen && (
        <div className="fixed bottom-6 left-6 z-40 animate-bounce">
          <button
            onClick={() => handleOpenAccount("cart")}
            className="flex items-center gap-2.5 bg-[#d4af37] text-[#0D0D0D] px-5 py-3 rounded-full font-black text-xs sm:text-sm shadow-2xl cursor-pointer hover:bg-[#f2ca50] transition-transform active:scale-95"
          >
            <ShoppingBag className="w-4 h-4 text-[#0D0D0D]" />
            <span>مشاهده سبد سفارش در حساب ({totalCartCount})</span>
          </button>
        </div>
      )}

      {/* Reservation Modal */}
      <ReservationModal
        isOpen={reservationModalOpen}
        onClose={() => setReservationModalOpen(false)}
      />

      {/* Dish Detail Modal */}
      <DishDetailModal
        item={selectedDish}
        onClose={() => setSelectedDish(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Account & Shopping Cart & Authentication Drawer */}
      <AccountDrawer
        isOpen={accountDrawerOpen}
        onClose={() => setAccountDrawerOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
        initialTab={accountInitialTab}
      />

      {/* Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-50 bg-[#1a1a1a] border border-[#d4af37] text-[#e5e2e1] px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300">
          <div className="p-1 rounded-full bg-[#d4af37]/20 text-[#f2ca50]">
            <Check className="w-4 h-4" />
          </div>
          <span className="text-xs sm:text-sm font-semibold">
            {toastMessage}
          </span>
        </div>
      )}

      {/* Global Footer */}
      <Footer
        setActiveTab={setActiveTab}
        openReservationModal={() => setReservationModalOpen(true)}
      />
    </div>
  );
}
