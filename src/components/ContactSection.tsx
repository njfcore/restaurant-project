import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Instagram,
  MessageCircle,
  Loader2,
} from "lucide-react";
import { api } from "../services/api";

export const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.sendContactMessage({
        name: form.name,
        phone: form.phone,
        email: form.email,
        message: form.message,
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-bold text-[#f2ca50] tracking-widest block mb-2 uppercase">
          Contact & Location
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#e5e2e1] mb-4">
          ارتباط با رستوران نورا و نوبل
        </h1>
        <p className="text-sm sm:text-base text-[#a09e9c]">
          مشتاقانه آماده پاسخگویی به سوالات، رزرو سالن اختصاصی و شنیدن نظرات
          ارزشمند شما هستیم.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Column: Info Cards & Map Simulation */}
        <div className="space-y-6 text-right">
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-[#f2ca50] border-b border-[#2a2a2a] pb-3">
              اطلاعات تماس و دسترسی
            </h3>

            <div className="space-y-3.5 text-sm text-[#c8c6c5]">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#f2ca50] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[#e5e2e1]">آدرس رستوران:</div>
                  <div>
                    تهران، خیابان ولیعصر، بالاتر از پارک وی، نبش خیابان اختصاصی،
                    پلاک ۸۴
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#f2ca50] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[#e5e2e1]">
                    تلفن تماس و رزرو VIP:
                  </div>
                  <div className="font-mono text-sm text-[#f2ca50]" dir="ltr">
                    +98 (21) 2200 8899 / +98 912 111 2233
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#f2ca50] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[#e5e2e1]">ساعات کاری:</div>
                  <div>
                    ناهار: ۱۲:۰۰ الی ۱۶:۰۰ | شام: ۱۹:۰۰ الی ۲۴:۰۰ (همه روزه)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map Visual */}
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl overflow-hidden h-60 relative flex items-center justify-center">
            <div
              className="absolute inset-0 bg-cover bg-center filter grayscale contrast-125 opacity-40"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80')`,
              }}
            />
            <div className="relative z-10 text-center p-4 bg-black/80 rounded-xl border border-[#d4af37]/40 shadow-xl">
              <MapPin className="w-8 h-8 text-[#f2ca50] mx-auto mb-1 animate-bounce" />
              <span className="text-xs font-bold text-[#f2ca50] block">
                رستوران لوکس نورا و نوبل
              </span>
              <span className="text-[11px] text-[#aaa]">
                مجهز به پارکینگ اختصاصی و ولت
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Inquiry Form */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 sm:p-8 text-right flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-[#e5e2e1] mb-2">
              ارسال پیام مستقیم به مدیریت
            </h3>
            <p className="text-xs text-[#a09e9c] mb-6">
              جهت هماهنگی تشریفات اختصاصی، پذیرایی شرکتی یا ثبت نظرات، فرم زیر
              را تکمیل نمایید.
            </p>

            {submitted ? (
              <div className="text-center py-12 space-y-3 bg-[#161616] rounded-xl border border-[#333] p-6">
                <CheckCircle2 className="w-12 h-12 text-[#f2ca50] mx-auto" />
                <h4 className="text-lg font-bold text-[#e5e2e1]">
                  پیام شما دریافت شد!
                </h4>
                <p className="text-xs text-[#a09e9c]">
                  تیم تشریفات نورا و نوبل در سریع‌ترین زمان با شما تماس خواهند
                  گرفت.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-[#f2ca50] hover:underline pt-2"
                >
                  ارسال پیام جدید
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#d0c5af] mb-1">
                    نام و نام خانوادگی:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="نام کامل خود را بنویسید"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-[#131313] border border-[#333] rounded-lg p-2.5 text-xs text-[#e5e2e1] focus:border-[#d4af37] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#d0c5af] mb-1">
                      شماره تماس:
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="۰۹۱۲XXXXXXX"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      className="w-full bg-[#131313] border border-[#333] rounded-lg p-2.5 text-xs text-[#e5e2e1] focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#d0c5af] mb-1">
                      ایمیل (اختیاری):
                    </label>
                    <input
                      type="email"
                      placeholder="email@example.com"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className="w-full bg-[#131313] border border-[#333] rounded-lg p-2.5 text-xs text-[#e5e2e1] focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#d0c5af] mb-1">
                    متن پیام یا درخواست تشریفات:
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="جزئیات درخواست یا تاریخ مراسم مدنظرتان را توضیح دهید..."
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    className="w-full bg-[#131313] border border-[#333] rounded-lg p-2.5 text-xs text-[#e5e2e1] focus:border-[#d4af37] focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#d4af37] hover:bg-[#f2ca50] text-[#0D0D0D] font-extrabold rounded-lg text-sm transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>ارسال پیام</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
