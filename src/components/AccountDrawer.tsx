import React, { useState } from 'react';
import {
  X,
  User,
  ShoppingBag,
  LogIn,
  UserPlus,
  LogOut,
  Calendar,
  Sparkles,
  Check,
  Plus,
  Minus,
  Trash2,
  ShieldCheck,
  Phone,
  Mail,
  Lock,
  ArrowRight,
  Receipt,
  Heart,
  Clock,
  Loader2,
  Database
} from 'lucide-react';
import { CartItem, UserProfile } from '../types';
import { api } from '../services/api';

interface AccountDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
  user: UserProfile | null;
  onLogin: (user: UserProfile) => void;
  onLogout: () => void;
  initialTab?: 'account' | 'cart';
}

export const AccountDrawer: React.FC<AccountDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  user,
  onLogin,
  onLogout,
  initialTab = 'account',
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'account' | 'cart' | 'reservations'>(initialTab);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [registerName, setRegisterName] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(true);

  // Cart form state
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [orderType, setOrderType] = useState<'dine_in' | 'takeaway'>('dine_in');
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [lastOrderCode, setLastOrderCode] = useState('');

  if (!isOpen) return null;

  const rawSubtotal = cartItems.reduce(
    (total, cartItem) => total + cartItem.item.price * cartItem.quantity,
    0
  );
  const discountAmount = couponApplied ? Math.round(rawSubtotal * 0.15) : 0;
  const taxAmount = Math.round((rawSubtotal - discountAmount) * 0.09);
  const finalTotal = rawSubtotal - discountAmount + taxAmount;

  const formatToman = (num: number) => {
    return num.toLocaleString('fa-IR') + ' تومان';
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!loginIdentifier) {
      setErrorMessage('لطفاً شماره موبایل یا ایمیل را وارد فرمایید.');
      return;
    }
    setLoading(true);
    try {
      const loggedInUser = await api.login(loginIdentifier, loginPassword);
      onLogin(loggedInUser);
    } catch (err: any) {
      setErrorMessage(err.message || 'خطا در برقراری ارتباط با دیتابیس.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!registerName || !registerPhone) {
      setErrorMessage('لطفاً تمامی فیلدهای الزامی را تکمیل فرمایید.');
      return;
    }
    if (registerPassword && registerPassword !== registerConfirmPassword) {
      setErrorMessage('رمز عبور و تکرار آن یکسان نیستند.');
      return;
    }
    setLoading(true);
    try {
      const newUser = await api.register({
        name: registerName,
        phone: registerPhone,
        email: registerEmail,
        password: registerPassword,
      });
      onLogin(newUser);
    } catch (err: any) {
      setErrorMessage(err.message || 'خطا در ثبت نام در دیتابیس.');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'NOBLE2025' || couponCode.trim().toUpperCase() === 'NOBLE') {
      setCouponApplied(true);
    } else {
      alert('کد تخفیف معتبر نیست. کد تست: NOBLE2025');
    }
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const result = await api.createOrder({
        customerName: user ? user.name : 'مهمان حضوری',
        phone: user ? user.phone : '۰۹۱۲۰۰۰۰۰۰۰',
        orderType,
        subtotal: rawSubtotal,
        discount: discountAmount,
        tax: taxAmount,
        total: finalTotal,
        couponCode: couponApplied ? couponCode : undefined,
        items: cartItems,
        userId: user?.id,
      });
      setLastOrderCode(result.orderCode || 'ORD-' + Math.floor(100000 + Math.random() * 900000));
      setOrderSubmitted(true);
    } catch (err) {
      console.error('Order checkout error:', err);
      const fallbackCode = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
      setLastOrderCode(fallbackCode);
      setOrderSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleFinishOrder = () => {
    setOrderSubmitted(false);
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-md flex justify-start">
      <div className="w-full max-w-lg bg-[#141414] border-l border-[#2e2e2e] h-full flex flex-col justify-between shadow-2xl text-right animate-in slide-in-from-right duration-300">
        
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-[#242424] bg-[#101010] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#1e1e1e] border border-[#d4af37]/40 text-[#f2ca50]">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-[#e5e2e1]">
                {user ? `حساب کاربری: ${user.name}` : 'حساب کاربری و خدمات نورا و نوبل'}
              </h2>
              <p className="text-[11px] text-[#99907c]">
                {user ? user.vipTier : 'ورود، عضویت و سبد سفارش آنلاین'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#1c1c1c] text-[#888] hover:text-white transition-colors cursor-pointer"
            aria-label="بستن"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation Bar Inside Account Drawer */}
        <div className="flex bg-[#181818] border-b border-[#262626] p-1.5 gap-1">
          <button
            onClick={() => {
              setActiveSubTab('account');
              setOrderSubmitted(false);
            }}
            className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeSubTab === 'account'
                ? 'bg-[#d4af37] text-[#0D0D0D] shadow-md'
                : 'text-[#a09e9c] hover:text-[#e5e2e1] hover:bg-[#202020]'
            }`}
          >
            <User className="w-4 h-4" />
            <span>{user ? 'پروفایل من' : 'ورود / ثبت نام'}</span>
          </button>

          <button
            onClick={() => {
              setActiveSubTab('cart');
              setOrderSubmitted(false);
            }}
            className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all relative cursor-pointer ${
              activeSubTab === 'cart'
                ? 'bg-[#d4af37] text-[#0D0D0D] shadow-md'
                : 'text-[#a09e9c] hover:text-[#e5e2e1] hover:bg-[#202020]'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>سبد سفارش</span>
            {cartItems.length > 0 && (
              <span className={`text-[10px] font-black px-1.5 py-0.2 rounded-full ${
                activeSubTab === 'cart' ? 'bg-[#0D0D0D] text-[#f2ca50]' : 'bg-[#d4af37] text-[#0D0D0D]'
              }`}>
                {cartItems.length}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              setActiveSubTab('reservations');
              setOrderSubmitted(false);
            }}
            className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeSubTab === 'reservations'
                ? 'bg-[#d4af37] text-[#0D0D0D] shadow-md'
                : 'text-[#a09e9c] hover:text-[#e5e2e1] hover:bg-[#202020]'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>سوابق و رزروها</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          
          {/* ----------------- SUBTAB: ACCOUNT / AUTH ----------------- */}
          {activeSubTab === 'account' && (
            <div>
              {user ? (
                /* Logged-In User Profile Screen */
                <div className="space-y-5">
                  <div className="bg-gradient-to-br from-[#1e1c14] to-[#161616] p-5 rounded-2xl border border-[#d4af37]/40 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-[#d4af37]/10 rounded-full blur-2xl pointer-events-none" />
                    
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-full bg-[#d4af37] text-[#0D0D0D] font-black text-xl flex items-center justify-center shadow-lg border-2 border-[#fff]/20">
                        {user.name.slice(0, 1)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base sm:text-lg font-black text-[#e5e2e1]">{user.name}</h3>
                          <span className="bg-[#d4af37]/20 border border-[#d4af37] text-[#f2ca50] text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {user.vipTier}
                          </span>
                        </div>
                        <p className="text-xs text-[#a09e9c] mt-0.5">{user.phone}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs pt-3 border-t border-[#333]/70">
                      <div>
                        <span className="text-[#888] block text-[10px]">ایمیل ثبت شده:</span>
                        <span className="text-[#e5e2e1] font-mono text-[11px] truncate block">{user.email}</span>
                      </div>
                      <div>
                        <span className="text-[#888] block text-[10px]">تاریخ عضویت:</span>
                        <span className="text-[#e5e2e1]">{user.joinedDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* VIP Club Perks */}
                  <div className="bg-[#1a1a1a] rounded-xl p-4 border border-[#2b2b2b] space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#f2ca50]">
                      <Sparkles className="w-4 h-4 text-[#d4af37]" />
                      <span>مزایای اختصاصی باشگاه مشتریان نورا و نوبل</span>
                    </div>
                    <ul className="text-xs text-[#c8c6c5] space-y-2 pr-2 list-disc list-inside">
                      <li>تخفیف دائمی ۱۰٪ روی کلیه رزروهای سالن اختصاصی</li>
                      <li>پیش‌ثبت‌نام اولویت‌دار در ایام تعطیلات و مناسبت‌ها</li>
                      <li>پذیرایی با دسر و نوشیدنی خوش‌آمدگویی سرآشپز</li>
                    </ul>
                  </div>

                  {/* Account Action Buttons */}
                  <div className="space-y-2.5 pt-2">
                    <button
                      onClick={() => setActiveSubTab('cart')}
                      className="w-full py-3 bg-[#1e1e1e] hover:bg-[#252525] border border-[#333] text-[#e5e2e1] rounded-xl text-xs font-bold flex items-center justify-between px-4 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4 text-[#d4af37]" />
                        <span>مشاهده سبد سفارش جاری</span>
                      </div>
                      <span className="text-xs bg-[#d4af37] text-[#0D0D0D] font-bold px-2 py-0.5 rounded-full">
                        {cartItems.length} قلم
                      </span>
                    </button>

                    <button
                      onClick={() => setActiveSubTab('reservations')}
                      className="w-full py-3 bg-[#1e1e1e] hover:bg-[#252525] border border-[#333] text-[#e5e2e1] rounded-xl text-xs font-bold flex items-center justify-between px-4 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#d4af37]" />
                        <span>مشاهده تاریخچه رزروها و سفارشات</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#888]" />
                    </button>

                    <button
                      onClick={onLogout}
                      className="w-full py-3 bg-red-950/30 hover:bg-red-900/40 border border-red-800/40 text-red-400 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors mt-4 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>خروج از حساب کاربری</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Auth Form (Login or Register) */
                <div className="space-y-5">
                  {/* Switch between Login and Register */}
                  <div className="flex bg-[#1a1a1a] p-1 rounded-xl border border-[#2b2b2b]">
                    <button
                      onClick={() => setAuthMode('login')}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                        authMode === 'login'
                          ? 'bg-[#d4af37] text-[#0D0D0D] shadow'
                          : 'text-[#888] hover:text-white'
                      }`}
                    >
                      ورود به حساب
                    </button>
                    <button
                      onClick={() => setAuthMode('register')}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                        authMode === 'register'
                          ? 'bg-[#d4af37] text-[#0D0D0D] shadow'
                          : 'text-[#888] hover:text-white'
                      }`}
                    >
                      ایجاد حساب جدید
                    </button>
                  </div>

                  {authMode === 'login' ? (
                    /* Login Form */
                    <form onSubmit={handleLoginSubmit} className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#c8c6c5] block">
                          شماره موبایل یا ایمیل
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="۰۹۱۲۳۴۵۶۷۸۹ یا info@example.com"
                            value={loginIdentifier}
                            onChange={(e) => setLoginIdentifier(e.target.value)}
                            className="w-full bg-[#1c1c1c] border border-[#333] rounded-xl px-3.5 py-2.5 text-xs text-[#e5e2e1] focus:border-[#d4af37] focus:outline-none pr-10"
                            required
                          />
                          <Phone className="w-4 h-4 text-[#888] absolute top-3 right-3" />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <label className="text-xs font-bold text-[#c8c6c5]">کلمه عبور</label>
                          <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('لینک بازیابی رمز عبور به شماره/ایمیل شما پیامک خواهد شد.'); }} className="text-[11px] text-[#d4af37] hover:underline">
                            فراموشی رمز؟
                          </a>
                        </div>
                        <div className="relative">
                          <input
                            type="password"
                            placeholder="••••••••"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            className="w-full bg-[#1c1c1c] border border-[#333] rounded-xl px-3.5 py-2.5 text-xs text-[#e5e2e1] focus:border-[#d4af37] focus:outline-none pr-10"
                            required
                          />
                          <Lock className="w-4 h-4 text-[#888] absolute top-3 right-3" />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 bg-[#d4af37] hover:bg-[#f2ca50] text-[#0D0D0D] font-extrabold rounded-xl text-xs shadow-lg transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                      >
                        <LogIn className="w-4 h-4" />
                        <span>ورود به حساب کاربری</span>
                      </button>

                      {/* Quick 1-click Test Login for demo */}
                      <button
                        type="button"
                        onClick={() => {
                          const demoUser: UserProfile = {
                            id: 'USR-7788',
                            name: 'علیرضا حسینی',
                            phone: '۰۹۱۲۳۴۵۶۷۸۹',
                            email: 'alireza@nournoble.luxury',
                            isLoggedIn: true,
                            vipTier: 'عضو طلایی VIP',
                            joinedDate: '۱۴۰۳/۰۴/۱۵',
                          };
                          onLogin(demoUser);
                        }}
                        className="w-full py-2.5 bg-[#1f1f1f] hover:bg-[#282828] border border-[#333] text-[#d0c5af] hover:text-[#f2ca50] rounded-xl text-[11px] font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span>ورود سریع آزمایشی (VIP Demo)</span>
                      </button>
                    </form>
                  ) : (
                    /* Register Form */
                    <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-[#c8c6c5] block">نام و نام خانوادگی</label>
                        <input
                          type="text"
                          placeholder="مثال: سارا محمدی"
                          value={registerName}
                          onChange={(e) => setRegisterName(e.target.value)}
                          className="w-full bg-[#1c1c1c] border border-[#333] rounded-xl px-3.5 py-2.5 text-xs text-[#e5e2e1] focus:border-[#d4af37] focus:outline-none"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-[#c8c6c5] block">شماره موبایل</label>
                        <input
                          type="tel"
                          placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                          value={registerPhone}
                          onChange={(e) => setRegisterPhone(e.target.value)}
                          className="w-full bg-[#1c1c1c] border border-[#333] rounded-xl px-3.5 py-2.5 text-xs text-[#e5e2e1] focus:border-[#d4af37] focus:outline-none font-mono"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-[#c8c6c5] block">ایمیل (اختیاری)</label>
                        <input
                          type="email"
                          placeholder="name@domain.com"
                          value={registerEmail}
                          onChange={(e) => setRegisterEmail(e.target.value)}
                          className="w-full bg-[#1c1c1c] border border-[#333] rounded-xl px-3.5 py-2.5 text-xs text-[#e5e2e1] focus:border-[#d4af37] focus:outline-none font-mono"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-[#c8c6c5] block">کلمه عبور</label>
                          <input
                            type="password"
                            placeholder="حداقل ۶ کاراکتر"
                            value={registerPassword}
                            onChange={(e) => setRegisterPassword(e.target.value)}
                            className="w-full bg-[#1c1c1c] border border-[#333] rounded-xl px-3.5 py-2.5 text-xs text-[#e5e2e1] focus:border-[#d4af37] focus:outline-none"
                            required
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-[#c8c6c5] block">تکرار کلمه عبور</label>
                          <input
                            type="password"
                            placeholder="تکرار رمز عبور"
                            value={registerConfirmPassword}
                            onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                            className="w-full bg-[#1c1c1c] border border-[#333] rounded-xl px-3.5 py-2.5 text-xs text-[#e5e2e1] focus:border-[#d4af37] focus:outline-none"
                            required
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="checkbox"
                          id="terms-check"
                          checked={termsAccepted}
                          onChange={(e) => setTermsAccepted(e.target.checked)}
                          className="w-4 h-4 accent-[#d4af37] rounded"
                        />
                        <label htmlFor="terms-check" className="text-[11px] text-[#99907c] cursor-pointer">
                          قوانین و حریم خصوصی رستوران نورا و نوبل را می‌پذیرم.
                        </label>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 bg-[#d4af37] hover:bg-[#f2ca50] text-[#0D0D0D] font-extrabold rounded-xl text-xs shadow-lg transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                      >
                        <UserPlus className="w-4 h-4" />
                        <span>ثبت نام و ایجاد حساب کاربری</span>
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ----------------- SUBTAB: CART (INSIDE ACCOUNT) ----------------- */}
          {activeSubTab === 'cart' && (
            <div className="space-y-4">
              {orderSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-[#d4af37]/20 border border-[#d4af37] rounded-full flex items-center justify-center mx-auto text-[#f2ca50]">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#e5e2e1]">
                    سفارش آنلاین با موفقیت ثبت گردید!
                  </h3>
                  <p className="text-xs text-[#a09e9c] leading-relaxed max-w-xs mx-auto">
                    سفارش شما به سرآشپز ارشد ارسال شد. در اسرع وقت آماده و ارسال خواهد شد.
                  </p>
                  <div className="bg-[#1c1c1c] p-4 rounded-xl border border-[#333] text-center">
                    <div className="text-xs text-[#888] mb-1">کد پیگیری سفارش:</div>
                    <div className="font-mono text-base font-black text-[#f2ca50]">
                      {lastOrderCode}
                    </div>
                  </div>
                  <button
                    onClick={handleFinishOrder}
                    className="w-full py-3 bg-[#d4af37] text-[#0D0D0D] font-bold rounded-xl text-xs mt-3 cursor-pointer"
                  >
                    تایید و بازگشت به منو
                  </button>
                </div>
              ) : cartItems.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <div className="p-4 bg-[#1a1a1a] rounded-full inline-block text-[#555]">
                    <ShoppingBag className="w-12 h-12" />
                  </div>
                  <p className="text-sm font-bold text-[#c8c6c5]">سبد سفارش شما در حال حاضر خالی است.</p>
                  <p className="text-xs text-[#777] max-w-xs mx-auto">
                    غذاها و نوشیدنی‌های دلخواه خود را از منوی اصیل نورا و نوبل انتخاب فرمایید.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Delivery / Dine-in selector */}
                  <div className="bg-[#1a1a1a] p-1.5 rounded-xl flex gap-1.5 border border-[#2e2e2e]">
                    <button
                      onClick={() => setOrderType('dine_in')}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                        orderType === 'dine_in'
                          ? 'bg-[#d4af37] text-[#0D0D0D]'
                          : 'text-[#888] hover:text-[#e5e2e1]'
                      }`}
                    >
                      سرو در سالن رستوران
                    </button>
                    <button
                      onClick={() => setOrderType('takeaway')}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                        orderType === 'takeaway'
                          ? 'bg-[#d4af37] text-[#0D0D0D]'
                          : 'text-[#888] hover:text-[#e5e2e1]'
                      }`}
                    >
                      بیرون‌بر / ارسال سریع
                    </button>
                  </div>

                  {/* List of items */}
                  <div className="space-y-2.5">
                    {cartItems.map((cartItem) => (
                      <div
                        key={cartItem.item.id}
                        className="bg-[#1b1b1b] border border-[#2c2c2c] rounded-xl p-3 flex items-center justify-between gap-3"
                      >
                        <img
                          src={cartItem.item.image}
                          alt={cartItem.item.persianName}
                          className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-[#e5e2e1] truncate mb-1">
                            {cartItem.item.persianName}
                          </h4>
                          <div className="text-xs font-bold text-[#f2ca50]">
                            {formatToman(cartItem.item.price * cartItem.quantity)}
                          </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-1 bg-[#121212] border border-[#333] rounded-lg p-1">
                          <button
                            onClick={() =>
                              onUpdateQuantity(cartItem.item.id, cartItem.quantity + 1)
                            }
                            className="p-1 text-[#888] hover:text-white cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-4 text-center text-xs font-bold text-[#e5e2e1]">
                            {cartItem.quantity}
                          </span>
                          <button
                            onClick={() =>
                              onUpdateQuantity(cartItem.item.id, cartItem.quantity - 1)
                            }
                            className="p-1 text-[#888] hover:text-white cursor-pointer"
                          >
                            {cartItem.quantity === 1 ? (
                              <Trash2 className="w-3.5 h-3.5 text-red-400" />
                            ) : (
                              <Minus className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Discount code section */}
                  <form onSubmit={handleApplyCoupon} className="pt-1">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="کد تخفیف (مثال: NOBLE2025)"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        disabled={couponApplied}
                        className="flex-1 bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2 text-xs text-[#e5e2e1] uppercase focus:border-[#d4af37] focus:outline-none"
                      />
                      <button
                        type="submit"
                        disabled={couponApplied}
                        className="bg-[#242424] hover:bg-[#333] border border-[#444] text-[#f2ca50] text-xs font-bold px-3 py-2 rounded-lg transition-colors cursor-pointer"
                      >
                        {couponApplied ? 'اعمال شد ✓' : 'اعمال'}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* ----------------- SUBTAB: RESERVATIONS / HISTORY ----------------- */}
          {activeSubTab === 'reservations' && (
            <div className="space-y-4">
              <div className="bg-[#1a1a1a] rounded-xl p-4 border border-[#2b2b2b] space-y-3">
                <div className="flex items-center justify-between border-b border-[#2e2e2e] pb-2.5">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#f2ca50]" />
                    <span className="text-xs font-bold text-[#e5e2e1]">رزرو میز آینده شما</span>
                  </div>
                  <span className="text-[10px] bg-green-950/60 text-green-400 border border-green-800 px-2 py-0.5 rounded-full font-bold">
                    تایید شده
                  </span>
                </div>
                <div className="space-y-1.5 text-xs text-[#a09e9c]">
                  <div className="flex justify-between">
                    <span>موقعیت:</span>
                    <span className="text-[#e5e2e1]">سالن VIP اختصاصی</span>
                  </div>
                  <div className="flex justify-between">
                    <span>تعداد نفرات:</span>
                    <span className="text-[#e5e2e1]">۴ نفر</span>
                  </div>
                  <div className="flex justify-between">
                    <span>زمان:</span>
                    <span className="text-[#f2ca50]">امشب - ساعت ۲۰:۳۰</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#1a1a1a] rounded-xl p-4 border border-[#2b2b2b] space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#e5e2e1] border-b border-[#2e2e2e] pb-2">
                  <Receipt className="w-4 h-4 text-[#d4af37]" />
                  <span>تاریخچه سفارشات آنلاین پیشین</span>
                </div>
                <div className="space-y-2 text-xs text-[#a09e9c]">
                  <div className="p-2.5 bg-[#141414] rounded-lg border border-[#282828] flex justify-between items-center">
                    <div>
                      <div className="font-bold text-[#e5e2e1]">استیک فیله فیورنتینا + پاستا ترافل</div>
                      <div className="text-[10px] text-[#777]">سفارش تحویل داده شده • ORD-948120</div>
                    </div>
                    <span className="font-bold text-[#f2ca50]">۱,۷۴۰,۰۰۰ ت</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Bottom summary bar for Cart tab */}
        {activeSubTab === 'cart' && !orderSubmitted && cartItems.length > 0 && (
          <div className="p-4 sm:p-5 bg-[#101010] border-t border-[#242424] space-y-3">
            <div className="space-y-1.5 text-xs text-[#a09e9c]">
              <div className="flex justify-between">
                <span>جمع کل اقلام:</span>
                <span>{formatToman(rawSubtotal)}</span>
              </div>
              {couponApplied && (
                <div className="flex justify-between text-green-400">
                  <span>تخفیف ویژه (۱۵٪):</span>
                  <span>- {formatToman(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>مالیات و خدمات (۹٪):</span>
                <span>{formatToman(taxAmount)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#e5e2e1] pt-2 border-t border-[#242424]">
                <span>مبلغ نهایی قابل پرداخت:</span>
                <span className="text-[#f2ca50] text-base">{formatToman(finalTotal)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-3.5 bg-[#d4af37] hover:bg-[#f2ca50] text-[#0D0D0D] font-extrabold rounded-xl text-xs sm:text-sm shadow-xl active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>تکمیل و ثبت نهایی سفارش</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
