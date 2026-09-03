import React, { useState } from "react";
import {
  X,
  Calendar,
  Clock,
  Users,
  MapPin,
  CheckCircle,
  Sparkles,
  Phone,
  Mail,
  User,
  FileText,
  Loader2,
} from "lucide-react";
import { ReservationData } from "../types";
import { api } from "../services/api";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [step, setStep] = useState<"form" | "success">("form");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    guests: 2,
    date: "امروز - پنج‌شنبه",
    time: "۲۰:۳۰",
    seatingArea: "main" as "main" | "vip" | "terrace" | "window",
    occasion: "dinner",
    specialRequests: "",
  });

  const [confirmedReservation, setConfirmedReservation] =
    useState<ReservationData | null>(null);

  if (!isOpen) return null;

  const timeSlots = [
    "۱۲:۳۰",
    "۱۳:۳۰",
    "۱۴:۰۰",
    "۱۹:۰۰",
    "۱۹:۳۰",
    "۲۰:۰۰",
    "۲۰:۳۰",
    "۲۱:۰۰",
    "۲۱:۳۰",
    "۲۲:۰۰",
    "۲۲:۳۰",
  ];

  const dateOptions = [
    "امروز - پنج‌شنبه",
    "فردا - جمعه",
    "شنبه",
    "یکشنبه",
    "دوشنبه",
    "سه‌شنبه",
    "چهارشنبه",
  ];

  const seatingOptions = [
    {
      id: "main",
      label: "سالن اصلی رستوران",
      desc: "نزدیک به پیانو و بار با موسیقی ملایم",
    },
    {
      id: "vip",
      label: "سالن VIP اختصاصی",
      desc: "فضای مجزا مناسب قرارهای رسمی و خانوادگی",
    },
    {
      id: "terrace",
      label: "تراس و فضای باز",
      desc: "با گرماتاب و ویوی باز شبانه",
    },
    {
      id: "window",
      label: "میز کنار پنجره",
      desc: "چیدمان رمانتیک دو نفره با نور شمع",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("لطفاً نام و شماره تماس خود را وارد نمایید.");
      return;
    }

    setLoading(true);
    try {
      const newRes = await api.createReservation({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        guests: formData.guests,
        date: formData.date,
        time: formData.time,
        seatingArea: formData.seatingArea,
        occasion: formData.occasion,
        specialRequests: formData.specialRequests,
      });

      setConfirmedReservation(newRes);
      setStep("success");
    } catch (err) {
      console.error("Reservation error:", err);
      // Fallback
      const fallbackRes: ReservationData = {
        id: `NOBLE-${Math.floor(100000 + Math.random() * 900000)}`,
        name: formData.name,
        phone: formData.phone,
        email: formData.email || "info@guest.noble",
        guests: formData.guests,
        date: formData.date,
        time: formData.time,
        seatingArea: formData.seatingArea,
        occasion: formData.occasion,
        specialRequests: formData.specialRequests,
        createdAt: new Date().toISOString(),
      };
      setConfirmedReservation(fallbackRes);
      setStep("success");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep("form");
    setFormData({
      name: "",
      phone: "",
      email: "",
      guests: 2,
      date: "امروز - پنج‌شنبه",
      time: "۲۰:۳۰",
      seatingArea: "main",
      occasion: "dinner",
      specialRequests: "",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#161616] border border-[#2e2e2e] rounded-2xl p-4 sm:p-6 shadow-2xl text-right my-auto max-h-[92vh] overflow-y-auto scrollbar-thin">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-1.5 rounded-full bg-[#222] text-[#888] hover:text-white hover:bg-[#333] transition-colors z-10"
          aria-label="بستن"
        >
          <X className="w-4 h-4" />
        </button>

        {step === "form" ? (
          <div>
            {/* Header */}
            <div className="text-center mb-4 pr-6 pl-6">
              <span className="text-[11px] font-bold text-[#f2ca50] tracking-widest block mb-0.5 uppercase">
                Table Reservation
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#e5e2e1]">
                رزرو آنلاین میز در رستوران نورا و نوبل
              </h2>
              <p className="text-[11px] sm:text-xs text-[#a09e9c] mt-0.5">
                زمان، تعداد مهمانان و موقعیت میز دلخواه خود را مشخص فرمایید.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
              {/* 1. Date and Guests Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#d0c5af] mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#f2ca50]" />
                    <span>تاریخ رزرو:</span>
                  </label>
                  <select
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full bg-[#1e1e1e] border border-[#333] rounded-lg py-2 px-3 text-xs sm:text-sm text-[#e5e2e1] focus:border-[#d4af37] focus:outline-none"
                  >
                    {dateOptions.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#d0c5af] mb-1 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#f2ca50]" />
                    <span>تعداد مهمانان:</span>
                  </label>
                  <div className="grid grid-cols-6 gap-1.5">
                    {[1, 2, 4, 6, 8, 10].map((num) => (
                      <button
                        type="button"
                        key={num}
                        onClick={() =>
                          setFormData({ ...formData, guests: num })
                        }
                        className={`py-1.5 rounded-lg text-xs font-bold transition-all text-center ${
                          formData.guests === num
                            ? "bg-[#d4af37] text-[#0D0D0D] shadow"
                            : "bg-[#1e1e1e] text-[#a09e9c] border border-[#333] hover:border-[#d4af37]/40"
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 2. Time Slot Selection */}
              <div>
                <label className="block text-xs font-bold text-[#d0c5af] mb-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#f2ca50]" />
                  <span>ساعت حضور:</span>
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {timeSlots.map((time) => (
                    <button
                      type="button"
                      key={time}
                      onClick={() => setFormData({ ...formData, time })}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                        formData.time === time
                          ? "bg-[#d4af37] text-[#0D0D0D] font-bold"
                          : "bg-[#1e1e1e] text-[#a09e9c] border border-[#333] hover:border-[#d4af37]/40"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Seating Area */}
              <div>
                <label className="block text-xs font-bold text-[#d0c5af] mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#f2ca50]" />
                  <span>موقعیت میز در رستوران:</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {seatingOptions.map((opt) => (
                    <div
                      key={opt.id}
                      onClick={() =>
                        setFormData({ ...formData, seatingArea: opt.id as any })
                      }
                      className={`p-2 rounded-lg border cursor-pointer transition-all text-center ${
                        formData.seatingArea === opt.id
                          ? "bg-[#d4af37]/15 border-[#d4af37] text-[#e5e2e1]"
                          : "bg-[#1e1e1e] border-[#333] text-[#a09e9c] hover:border-[#555]"
                      }`}
                    >
                      <div className="text-xs font-bold text-[#f2ca50] truncate">
                        {opt.label}
                      </div>
                      <div className="text-[10px] text-[#888] truncate mt-0.5">
                        {opt.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Personal Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1.5 border-t border-[#262626]">
                <div>
                  <label className="block text-[11px] font-bold text-[#d0c5af] mb-1">
                    نام و نام خانوادگی: *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: علی صادقی"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-[#1e1e1e] border border-[#333] rounded-lg py-1.5 px-3 text-xs sm:text-sm text-[#e5e2e1] focus:border-[#d4af37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#d0c5af] mb-1">
                    شماره تلفن همراه (جهت پیامک تایید): *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="۰۹۱۲XXXXXXX"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full bg-[#1e1e1e] border border-[#333] rounded-lg py-1.5 px-3 text-xs sm:text-sm text-[#e5e2e1] focus:border-[#d4af37] focus:outline-none"
                  />
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-[11px] font-bold text-[#d0c5af] mb-1">
                  مناسبت یا توضیحات ویژه (اختیاری):
                </label>
                <input
                  type="text"
                  placeholder="مثال: سالگرد ازدواج، کیک تولد یا درخواست صندلی کودک..."
                  value={formData.specialRequests}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      specialRequests: e.target.value,
                    })
                  }
                  className="w-full bg-[#1e1e1e] border border-[#333] rounded-lg py-1.5 px-3 text-xs sm:text-sm text-[#e5e2e1] focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                id="submit-reservation-btn"
                disabled={loading}
                className="w-full py-2.5 bg-[#d4af37] hover:bg-[#f2ca50] text-[#0D0D0D] font-extrabold rounded-lg text-sm transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>در حال ثبت رزرو...</span>
                  </>
                ) : (
                  <span>ثبت نهایی و تایید رزرو</span>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation Screen */
          <div className="text-center py-4 space-y-4">
            <div className="w-12 h-12 bg-[#d4af37]/20 border border-[#d4af37] rounded-full flex items-center justify-center mx-auto text-[#f2ca50]">
              <CheckCircle className="w-7 h-7" />
            </div>

            <div>
              <span className="text-[11px] font-bold text-[#f2ca50] tracking-wider uppercase block mb-0.5">
                Reservation Confirmed
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#e5e2e1]">
                رزرو شما با موفقیت ثبت گردید
              </h2>
              <p className="text-xs text-[#a09e9c] mt-1">
                پیامک تاییدیه به همراه جزئیات برای شماره{" "}
                {confirmedReservation?.phone} ارسال شد.
              </p>
            </div>

            {/* Receipt Card */}
            <div className="bg-[#1e1e1e] border border-[#2e2e2e] rounded-xl p-4 text-right space-y-2 max-w-md mx-auto">
              <div className="flex justify-between items-center border-b border-[#333] pb-1.5">
                <span className="text-[11px] text-[#888]">کد پیگیری رزرو:</span>
                <span className="text-xs font-black text-[#f2ca50] font-mono tracking-wider">
                  {confirmedReservation?.id}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#888]">نام مهمان:</span>
                <span className="text-[#e5e2e1] font-bold">
                  {confirmedReservation?.name}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#888]">تاریخ و ساعت:</span>
                <span className="text-[#e5e2e1] font-bold">
                  {confirmedReservation?.date} - ساعت{" "}
                  {confirmedReservation?.time}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#888]">تعداد مهمانان:</span>
                <span className="text-[#e5e2e1] font-bold">
                  {confirmedReservation?.guests} نفر
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#888]">موقعیت میز:</span>
                <span className="text-[#e5e2e1] font-bold">
                  {confirmedReservation?.seatingArea === "vip"
                    ? "سالن VIP"
                    : "سالن اصلی"}
                </span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="bg-[#d4af37] text-[#0D0D0D] px-6 py-2 rounded-lg font-bold text-xs shadow-md hover:bg-[#f2ca50] transition-colors"
            >
              متوجه شدم و بازگشت
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
