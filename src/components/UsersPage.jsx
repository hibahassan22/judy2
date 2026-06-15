"use client";
import { useState } from "react";

// ======= Toggle Component =======
const Toggle = ({ checked, onChange }) => (
  <button
    onClick={() => onChange(!checked)}
    className={`relative w-12 h-6 rounded-full transition-colors shrink-0 ${checked ? "bg-[#9d7821]" : "bg-gray-300"}`}
  >
    {/* الزرار في حالة الـ RTL: المُفعّل بيكون لليسار والغير مُفعّل لليمين */}
    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${checked ? "left-1" : "right-1"}`} />
  </button>
);

// ======= Section Card =======
const SectionCard = ({ icon, iconBg, title, subtitle, children }) => (
  <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 space-y-5">
    {/* النصوص على اليمين والأيقونة على اليسار */}
    <div className="flex items-start justify-between">
      <div className="text-right">
        <h3 className="text-[15px] font-bold text-gray-800">{title}</h3>
        <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
      </div>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
        {icon}
      </div>
    </div>
    <div className="space-y-4 pt-1">
        {children}
    </div>
  </div>
);

// ======= Promo Codes Table =======
const initialCodes = [
  { id: 1, code: "welcome50", type: "نقدي", value: "50 ر.س", start: "1-7-2026", end: "5-7-2026", limit: 1000, currentUsed: 478, totalLimit: 1000, status: "مفعل" },
  { id: 2, code: "Points200", type: "نقاط", value: "100 نقطة", start: "1-7-2026", end: "5-7-2026", limit: 500, currentUsed: 478, totalLimit: 1000, status: "مفعل" },
  { id: 3, code: "Discount300", type: "خصم", value: "150 ر.س", start: "1-7-2026", end: "5-7-2026", limit: 500, currentUsed: 478, totalLimit: 1000, status: "مفعل" },
];

const typeColor = { "نقدي": "bg-green-50 border border-green-200 text-green-600", "نقاط": "bg-amber-50 border border-amber-200 text-amber-600", "خصم": "bg-purple-50 border border-purple-200 text-purple-600" };

export default function RewardsPage() {
  // مكافأة التطبيق
  const [appRewardOn, setAppRewardOn] = useState(true);
  const [appValue, setAppValue] = useState("100");

  // مكافأة الدعوات
  const [inviteOn, setInviteOn] = useState(true);
  const [inviteValue, setInviteValue] = useState("100");
  const [inviteCount, setInviteCount] = useState("5");

  // نظام النقاط
  const [pointsOn, setPointsOn] = useState(true);
  const [pointsEarn, setPointsEarn] = useState("10");
  const [pointsEarnVal, setPointsEarnVal] = useState("10");
  const [pointsRedeem, setPointsRedeem] = useState("100");
  const [pointsRedeemVal, setPointsRedeemVal] = useState("10");
  const [pointsExpiry, setPointsExpiry] = useState("30");
  const [minPoints, setMinPoints] = useState("50");

  // حدود استخدام
  const [maxPerTrip, setMaxPerTrip] = useState("100");
  const [allowStacking, setAllowStacking] = useState(true);

  // أكواد
  const [codes, setCodes] = useState(initialCodes);
  const [showAddCode, setShowAddCode] = useState(false);
  const [newCode, setNewCode] = useState({ code: "", type: "نقدي", value: "", start: "", end: "", limit: "" });

  const handleAddCode = () => {
    if (!newCode.code || !newCode.value) return;
    setCodes(prev => [...prev, { id: prev.length + 1, ...newCode, currentUsed: 0, totalLimit: parseInt(newCode.limit) || 1000, status: "مفعل" }]);
    setNewCode({ code: "", type: "نقدي", value: "", start: "", end: "", limit: "" });
    setShowAddCode(false);
  };

  const handleDeleteCode = (id) => setCodes(prev => prev.filter(c => c.id !== id));

  return (
    <div className="w-full bg-[#f4f4f4] font-sans" dir="rtl">
      <div className=" mx-auto ">

        {/* Page Title Header */}
        <div className=" bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-right">
          <h1 className="text-xl font-bold text-[#b8943f]">إدارة المكافآت</h1>
          <p className="text-xs text-gray-500 mt-1.5">إعدادات نظام المكافآت والأكواد الترويجية</p>
        </div>

        {/* 1. مكافأة التطبيق */}
        <SectionCard
          iconBg="bg-[#c9a84c]"
          title="مكافأة تحميل التطبيق"
          subtitle="مكافأة ترحيبية للسائقين الجدد"
          icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>}
        >
          {/* قسم التفعيل بخلفية مميزة */}
          <div className="flex items-center justify-between bg-[#f8f7f2] px-5 py-4 rounded-xl">
            <div className="text-right">
              <p className="text-sm font-bold text-gray-700">تفعيل المكافأة</p>
              <p className="text-[11px] text-gray-500 mt-1">يتم منحها مرة واحدة لكل رقم هاتف عند التسجيل</p>
            </div>
            <Toggle checked={appRewardOn} onChange={setAppRewardOn} />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-600 block mb-2 text-right">قيمة المكافأة (ريال سعودي)</label>
            <input value={appValue} onChange={e => setAppValue(e.target.value)}
              className="w-full text-right border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#c9a84c] transition-colors" />
          </div>
        </SectionCard>

        {/* 2. مكافأة الدعوات */}
        <SectionCard
          iconBg="bg-[#e4ecff]"
          title="مكافأة الدعوات"
          subtitle="مكافأة للسائقين عند دعوة الآخرين"
          icon={<svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
        >
          {/* قسم التفعيل بخلفية مميزة */}
          <div className="flex items-center justify-between bg-[#f8f7f2] px-5 py-4 rounded-xl">
            <div className="text-right">
              <p className="text-sm font-bold text-gray-700">تفعيل نظام الدعوات</p>
              <p className="text-[11px] text-gray-500 mt-1">يتم منح المكافأة بشكل متكرر عند الوصول للهدف</p>
            </div>
            <Toggle checked={inviteOn} onChange={setInviteOn} />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-bold text-gray-600 block mb-2 text-right">عدد الدعوات المطلوبة</label>
              <input value={inviteCount} onChange={e => setInviteCount(e.target.value)}
                className="w-full text-right border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#c9a84c] transition-colors" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-600 block mb-2 text-right">قيمة المكافأة (ريال سعودي)</label>
              <input value={inviteValue} onChange={e => setInviteValue(e.target.value)}
                className="w-full text-right border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#c9a84c] transition-colors" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 mt-4">
            {/* أزرق على اليمين */}
            <div className="bg-[#e6efff] rounded-xl p-5 text-right">
              <p className="text-[12px] text-blue-500 font-bold mb-2">إجمالي الدعوات</p>
              <p className="text-2xl font-bold text-[#427ced]">323</p>
            </div>
            {/* أخضر على اليسار */}
            <div className="bg-[#e2faea] rounded-xl p-5 text-right">
              <p className="text-[12px] text-[#24b05d] font-bold mb-2">إجمالي التحويلات</p>
              <p className="text-2xl font-bold text-[#1a9f50]">10200 <span className="text-[13px] font-bold">ر.س</span></p>
            </div>
          </div>
        </SectionCard>

        {/* 3. نظام النقاط */}
        <SectionCard
          iconBg="bg-purple-50"
          title="نظام النقاط"
          subtitle="إعدادات كسب وتحويل النقاط"
          icon={<svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>}
        >
          {/* قسم التفعيل بخلفية مميزة */}
          <div className="flex items-center justify-between bg-[#f8f7f2] px-5 py-4 rounded-xl">
            <div className="text-right">
              <p className="text-sm font-bold text-gray-700">تفعيل نظام النقاط</p>
              <p className="text-[11px] text-gray-500 mt-1">يجب تحويل النقاط الى نقود قبل الاستخدام</p>
            </div>
            <Toggle checked={pointsOn} onChange={setPointsOn} />
          </div>
          <div className="grid grid-cols-2 gap-5">
            
            <div className="border border-gray-100 rounded-xl p-4">
               <p className="text-[11px] text-gray-400 mb-3 font-bold text-right">الإنفاق</p>
               <div className="flex items-center gap-3">
                  <div className="flex-1 flex items-center bg-gray-50 rounded-lg px-3 border border-gray-200">
                      <input value={pointsEarn} onChange={e => setPointsEarn(e.target.value)} className="w-full bg-transparent text-center py-2.5 text-sm font-medium outline-none" />
                      <span className="text-xs text-gray-500 whitespace-nowrap font-bold">ر.س</span>
                  </div>
                  <span className="text-gray-400 text-lg">=</span>
                  <div className="flex-1 flex items-center bg-gray-50 rounded-lg px-3 border border-gray-200">
                      <input value={pointsEarnVal} onChange={e => setPointsEarnVal(e.target.value)} className="w-full bg-transparent text-center py-2.5 text-sm font-medium outline-none" />
                      <span className="text-xs text-gray-500 whitespace-nowrap font-bold">نقطة</span>
                  </div>
               </div>
            </div>

            <div className="border border-gray-100 rounded-xl p-4">
               <p className="text-[11px] text-gray-400 mb-3 font-bold text-right">التحويل</p>
               <div className="flex items-center gap-3">
                  <div className="flex-1 flex items-center bg-gray-50 rounded-lg px-3 border border-gray-200">
                      <input value={pointsRedeem} onChange={e => setPointsRedeem(e.target.value)} className="w-full bg-transparent text-center py-2.5 text-sm font-medium outline-none" />
                      <span className="text-xs text-gray-500 whitespace-nowrap font-bold">نقطة</span>
                  </div>
                  <span className="text-gray-400 text-lg">=</span>
                  <div className="flex-1 flex items-center bg-gray-50 rounded-lg px-3 border border-gray-200">
                      <input value={pointsRedeemVal} onChange={e => setPointsRedeemVal(e.target.value)} className="w-full bg-transparent text-center py-2.5 text-sm font-medium outline-none" />
                      <span className="text-xs text-gray-500 whitespace-nowrap font-bold">ر.س</span>
                  </div>
               </div>
            </div>

          </div>
          <div className="grid grid-cols-2 gap-5 mt-2">
            <div>
              <label className="text-xs font-bold text-gray-600 block mb-2 text-right">مدة صلاحية النقاط (أيام)</label>
              <input value={pointsExpiry} onChange={e => setPointsExpiry(e.target.value)}
                className="w-full text-right border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#c9a84c] transition-colors" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-600 block mb-2 text-right">الحد الأدنى للتحويل (نقطة)</label>
              <input value={minPoints} onChange={e => setMinPoints(e.target.value)}
                className="w-full text-right border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#c9a84c] transition-colors" />
            </div>
          </div>
        </SectionCard>

        {/* 4. حدود الاستخدام */}
        <SectionCard
          iconBg="bg-red-50"
          title="حدود استخدام المكافآت"
          subtitle="تحكم في كيفية استخدام السائقين للمكافآت"
          icon={<svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>}
        >
          <div>
            <label className="text-xs font-bold text-gray-600 block mb-2 text-right">الحد الأقصى للمكافآت في كل رحلة</label>
            <input value={maxPerTrip} onChange={e => setMaxPerTrip(e.target.value)}
              className="w-full text-right border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#c9a84c] transition-colors" />
            <p className="text-[11px] text-gray-400 mt-2 text-right">لا يمكن للسائق إنفاق كامل رصيده في رحلة واحدة</p>
          </div>
          
          {/* قسم التفعيل بخلفية مميزة */}
          <div className="flex items-center justify-between bg-[#f8f7f2] px-5 py-4 rounded-xl mt-4">
            <div className="text-right">
              <p className="text-sm font-bold text-gray-700">السماح بـ الاستخدام الجزئي</p>
              <p className="text-[11px] text-gray-500 mt-1">السائق يمكنه استخدام جزء من الحد الأقصى</p>
            </div>
            <Toggle checked={allowStacking} onChange={setAllowStacking} />
          </div>
        </SectionCard>

        {/* 5. الأكواد الترويجية */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
          
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <div className="text-right">
                <h3 className="text-[15px] font-bold text-gray-800">الأكواد الترويجية</h3>
                <p className="text-xs text-gray-400 mt-1">إدارة الأكواد الترويجية للسائقين</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddCode(true)}
              className="flex items-center gap-1.5 bg-[#c9a84c] hover:bg-[#b8943f] text-white text-xs px-5 py-2.5 rounded-xl transition-colors shadow-sm font-bold"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              إضافة كود جديد
            </button>
          </div>

          {/* Add Code Form */}
          {showAddCode && (
            <div className="border border-amber-100 rounded-xl p-5 bg-amber-50/40 space-y-4">
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-600 block mb-2 text-right">الكود</label>
                  <input value={newCode.code} onChange={e => setNewCode(p => ({ ...p, code: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#c9a84c]" placeholder="PROMO123" dir="ltr" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-600 block mb-2 text-right">النوع</label>
                  <select value={newCode.type} onChange={e => setNewCode(p => ({ ...p, type: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#c9a84c] text-right">
                    <option>نقدي</option><option>نقاط</option><option>خصم</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-600 block mb-2 text-right">القيمة</label>
                  <input value={newCode.value} onChange={e => setNewCode(p => ({ ...p, value: e.target.value }))}
                    className="w-full text-right border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#c9a84c]" placeholder="50 ر.س" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-600 block mb-2 text-right">حد الاستخدام</label>
                  <input value={newCode.limit} onChange={e => setNewCode(p => ({ ...p, limit: e.target.value }))}
                    className="w-full text-right border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#c9a84c]" placeholder="1000" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-600 block mb-2 text-right">تاريخ البداية</label>
                  <input value={newCode.start} onChange={e => setNewCode(p => ({ ...p, start: e.target.value }))}
                    className="w-full text-right border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#c9a84c]" placeholder="1-7-2026" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-600 block mb-2 text-right">تاريخ الانتهاء</label>
                  <input value={newCode.end} onChange={e => setNewCode(p => ({ ...p, end: e.target.value }))}
                    className="w-full text-right border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#c9a84c]" placeholder="5-7-2026" />
                </div>
              </div>
              <div className="flex gap-3 justify-end pt-2">
                <button onClick={() => setShowAddCode(false)}
                  className="border border-gray-200 text-gray-600 text-xs px-6 py-2.5 rounded-lg hover:bg-gray-50 font-bold">إلغاء</button>
                <button onClick={handleAddCode}
                  className="bg-[#c9a84c] text-white text-xs px-8 py-2.5 rounded-lg hover:bg-[#b8943f] font-bold shadow-sm">حفظ</button>
              </div>
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-gray-100">
            <table className="w-full text-sm text-right">
              <thead>
                <tr className="bg-[#faf9f6] border-b border-gray-100">
                  {["الكود", "النوع", "القيمة", "تاريخ البداية", "تاريخ الانتهاء", "حد الاستخدام", "مستخدم", "الحالة", "إجراءات"].map(h => (
                    <th key={h} className="px-5 py-4 text-[11px] font-bold text-gray-500 whitespace-nowrap text-right">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {codes.map(c => (
                  <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors">
                    <td className="px-5 py-4 font-mono text-xs text-amber-600 font-bold">{c.code}</td>
                    <td className="px-5 py-4">
                      <span className={`text-[10px] px-3 py-1.5 rounded-md font-bold ${typeColor[c.type] || "bg-gray-100 text-gray-600"}`}>
                        {c.type}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-xs text-gray-800 font-bold">{c.value}</td>
                    <td className="px-5 py-4 text-[11px] text-gray-500 whitespace-nowrap font-medium">{c.start}</td>
                    <td className="px-5 py-4 text-[11px] text-gray-500 whitespace-nowrap font-medium">{c.end}</td>
                    <td className="px-5 py-4 text-xs text-gray-600 font-bold">{c.limit}</td>
                    <td className="px-5 py-4">
                      <div className="flex flex-col gap-1.5 w-24">
                        <div className="flex justify-center text-[10px] text-gray-600 font-bold">
                          {c.totalLimit}/{c.currentUsed}
                        </div>
                        <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden" dir="ltr">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: `${(c.currentUsed / c.totalLimit) * 100}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="bg-[#e4faed] text-[#21a654] text-[10px] px-3 py-1.5 rounded-md font-bold">{c.status}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2 justify-end">
                        <button className="text-gray-400 hover:text-amber-500 transition-colors bg-white border border-gray-200 p-1.5 rounded-md shadow-sm">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button onClick={() => handleDeleteCode(c.id)} className="text-red-400 hover:text-red-600 transition-colors bg-white border border-gray-200 p-1.5 rounded-md shadow-sm">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button className="w-full bg-white border border-gray-200 text-gray-700 text-xs py-3.5 rounded-xl hover:bg-gray-50 transition-colors font-bold shadow-sm">
            عرض جميع الأكواد
          </button>
        </div>

      </div>
    </div>
  );
}