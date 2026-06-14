import { useState } from "react";

// ======= Toggle Component =======
const Toggle = ({ checked, onChange }) => (
  <button
    onClick={() => onChange(!checked)}
    className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${checked ? "bg-[#c9a84c]" : "bg-gray-200"}`}
  >
    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${checked ? "right-1" : "left-1"}`} />
  </button>
);

// ======= Section Card =======
const SectionCard = ({ icon, iconBg, title, subtitle, children }) => (
  <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
    <div className="flex items-center gap-3 justify-end">
      <div className="text-right">
        <h3 className="text-sm font-bold text-gray-800">{title}</h3>
        <p className="text-xs text-gray-400">{subtitle}</p>
      </div>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
        {icon}
      </div>
    </div>
    {children}
  </div>
);

// ======= Promo Codes Table =======
const initialCodes = [
  { id: 1, code: "welcome50", type: "نقدي", value: "50 ر.س", start: "1-7-2026", end: "5-7-2026", limit: 1000, used: "1025أأ", status: "مفعل" },
  { id: 2, code: "Points200", type: "نقاط", value: "100 نقطة", start: "1-7-2026", end: "5-7-2026", limit: 500, used: "1025أأ", status: "مفعل" },
  { id: 3, code: "Discount300", type: "خصم", value: "150 ر.س", start: "1-7-2026", end: "5-7-2026", limit: 500, used: "1025أأ", status: "مفعل" },
];

const typeColor = { "نقدي": "bg-amber-50 text-amber-600", "نقاط": "bg-blue-50 text-blue-600", "خصم": "bg-green-50 text-green-600" };

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
  const [pointsEarn, setPointsEarn] = useState("10");   // ر.س
  const [pointsEarnVal, setPointsEarnVal] = useState("10"); // نقطة
  const [pointsRedeem, setPointsRedeem] = useState("100");  // نقطة
  const [pointsRedeemVal, setPointsRedeemVal] = useState("10"); // ر.س
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
    setCodes(prev => [...prev, { id: prev.length + 1, ...newCode, used: "0", status: "مفعل" }]);
    setNewCode({ code: "", type: "نقدي", value: "", start: "", end: "", limit: "" });
    setShowAddCode(false);
  };

  const handleDeleteCode = (id) => setCodes(prev => prev.filter(c => c.id !== id));

  return (
    <div className="w-full space-y-4" dir="rtl">

      {/* Page Title */}
      <div>
        <h1 className="text-xl font-bold text-[#c9a84c]">إدارة المكافآت</h1>
        <p className="text-xs text-gray-400 mt-0.5">إدارات نظام المكافآت والأكواد الترويجية</p>
      </div>

      {/* 1. مكافأة التطبيق */}
      <SectionCard
        iconBg="bg-amber-50"
        title="مكافأة تحميل التطبيق"
        subtitle="مكافأة تجربة أولية للسائقين الجدد"
        icon={<svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>}
      >
        <div className="flex items-center justify-between">
          <Toggle checked={appRewardOn} onChange={setAppRewardOn} />
          <div className="text-right">
            <p className="text-sm font-medium text-gray-700">تفعيل المكافأة</p>
            <p className="text-xs text-gray-400">يتم منح المكافأة تلقائياً عند تسجيل أي موظف جديد</p>
          </div>
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-1.5">قيمة المكافأة (ريال سعودي)</label>
          <input value={appValue} onChange={e => setAppValue(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
        </div>
      </SectionCard>

      {/* 2. مكافأة الدعوات */}
      <SectionCard
        iconBg="bg-blue-50"
        title="مكافأة الدعوات"
        subtitle="مكافأة للسائقين عند دعوة السائقين آخرين"
        icon={<svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
      >
        <div className="flex items-center justify-between">
          <Toggle checked={inviteOn} onChange={setInviteOn} />
          <div className="text-right">
            <p className="text-sm font-medium text-gray-700">تفعيل نظام الدعوات</p>
            <p className="text-xs text-gray-400">يتم منح مكافأة بشكل هرمي عند الوصول الحد الأدنى</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-500 block mb-1.5">عدد الدعوات المطلوبة</label>
            <input value={inviteCount} onChange={e => setInviteCount(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1.5">قيمة المكافأة (ريال سعودي)</label>
            <input value={inviteValue} onChange={e => setInviteValue(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-center">
            <p className="text-xs text-gray-400 mb-1">إجمالي الدعوات</p>
            <p className="text-xl font-bold text-blue-600">323</p>
          </div>
          <div className="bg-green-50 border border-green-100 rounded-xl p-3 text-center">
            <p className="text-xs text-gray-400 mb-1">إجمالي التحويلات</p>
            <p className="text-xl font-bold text-green-600">10200 <span className="text-sm font-normal">ر.س</span></p>
          </div>
        </div>
      </SectionCard>

      {/* 3. نظام النقاط */}
      <SectionCard
        iconBg="bg-purple-50"
        title="نظام النقاط"
        subtitle="إعدادات كسب وتحويل النقاط"
        icon={<svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>}
      >
        <div className="flex items-center justify-between">
          <Toggle checked={pointsOn} onChange={setPointsOn} />
          <div className="text-right">
            <p className="text-sm font-medium text-gray-700">تفعيل نظام النقاط</p>
            <p className="text-xs text-gray-400">يتم تحويل النقاط في حقيبة المستخدم عند الاستخدام</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-500 block mb-1.5">الإنفاق: ر.س</label>
            <input value={pointsEarn} onChange={e => setPointsEarn(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1.5">الإنفاق: نقطة</label>
            <input value={pointsEarnVal} onChange={e => setPointsEarnVal(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1.5">الإنقاذ: نقطة</label>
            <input value={pointsRedeem} onChange={e => setPointsRedeem(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1.5">الإنقاذ: ر.س</label>
            <input value={pointsRedeemVal} onChange={e => setPointsRedeemVal(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1.5">مدة صلاحية النقاط (أيام)</label>
            <input value={pointsExpiry} onChange={e => setPointsExpiry(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1.5">الحد الأدنى للتحويل (نقطة)</label>
            <input value={minPoints} onChange={e => setMinPoints(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
          </div>
        </div>
      </SectionCard>

      {/* 4. حدود الاستخدام */}
      <SectionCard
        iconBg="bg-red-50"
        title="حدود استخدام المكافآت"
        subtitle="التحكم في طريقة استخدام السائقين للمكافآت"
        icon={<svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>}
      >
        <div>
          <label className="text-xs text-gray-500 block mb-1.5">الحد الأقصى للمكافآت في كل رحلة</label>
          <input value={maxPerTrip} onChange={e => setMaxPerTrip(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
          <p className="text-xs text-gray-400 mt-1">* يتم تطبيق المبلغ الأقل بينهما في حال وجود مكافآت متعددة.</p>
        </div>
        <div className="flex items-center justify-between">
          <Toggle checked={allowStacking} onChange={setAllowStacking} />
          <div className="text-right">
            <p className="text-sm font-medium text-gray-700">السماح بالاستخدام الزمني</p>
            <p className="text-xs text-gray-400">السماح بتطبيق أكثر من مكافأة في نفس الوقت</p>
          </div>
        </div>
      </SectionCard>

      {/* 5. الأكواد الترويجية */}
      <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowAddCode(true)}
            className="flex items-center gap-1.5 bg-[#c9a84c] hover:bg-[#b8943f] text-white text-xs px-3 py-2 rounded-lg transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            إضافة كود جديد
          </button>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-gray-800">الأكواد الترويجية</h3>
            <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <p className="text-xs text-gray-400">إدارة الأكواد الترويجية للسائقين</p>
          </div>
        </div>

        {/* Add Code Form */}
        {showAddCode && (
          <div className="border border-amber-100 rounded-xl p-4 bg-amber-50/30 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 block mb-1">الكود</label>
                <input value={newCode.code} onChange={e => setNewCode(p => ({ ...p, code: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" placeholder="PROMO123" dir="ltr" />
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1">النوع</label>
                <select value={newCode.type} onChange={e => setNewCode(p => ({ ...p, type: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400">
                  <option>نقدي</option><option>نقاط</option><option>خصم</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1">القيمة</label>
                <input value={newCode.value} onChange={e => setNewCode(p => ({ ...p, value: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" placeholder="50 ر.س" />
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1">حد الاستخدام</label>
                <input value={newCode.limit} onChange={e => setNewCode(p => ({ ...p, limit: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" placeholder="1000" />
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1">تاريخ البداية</label>
                <input value={newCode.start} onChange={e => setNewCode(p => ({ ...p, start: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" placeholder="1-7-2026" />
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1">تاريخ الانتهاء</label>
                <input value={newCode.end} onChange={e => setNewCode(p => ({ ...p, end: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" placeholder="5-7-2026" />
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <button onClick={() => setShowAddCode(false)}
                className="border border-gray-200 text-gray-600 text-xs px-4 py-2 rounded-lg hover:bg-gray-50">إلغاء</button>
              <button onClick={handleAddCode}
                className="bg-[#c9a84c] text-white text-xs px-4 py-2 rounded-lg hover:bg-[#b8943f]">حفظ</button>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-100">
          <table className="w-full text-sm text-right">
            <thead>
              <tr className="bg-[#f9f6f0] border-b border-gray-100">
                {["الكود", "النوع", "القيمة", "تاريخ البداية", "تاريخ الانتهاء", "حد الاستخدام", "مستخدم", "الحالة", "إجراءات"].map(h => (
                  <th key={h} className="px-3 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {codes.map(c => (
                <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors">
                  <td className="px-3 py-3 font-mono text-xs text-gray-700">{c.code}</td>
                  <td className="px-3 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColor[c.type] || "bg-gray-100 text-gray-600"}`}>{c.type}</span>
                  </td>
                  <td className="px-3 py-3 text-gray-700">{c.value}</td>
                  <td className="px-3 py-3 text-gray-400 whitespace-nowrap">{c.start}</td>
                  <td className="px-3 py-3 text-gray-400 whitespace-nowrap">{c.end}</td>
                  <td className="px-3 py-3 text-gray-600">{c.limit}</td>
                  <td className="px-3 py-3 text-gray-500">{c.used}</td>
                  <td className="px-3 py-3">
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">{c.status}</span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex gap-1.5">
                      <button className="border border-gray-200 text-gray-500 text-xs px-2 py-1 rounded hover:bg-gray-50">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button onClick={() => handleDeleteCode(c.id)} className="border border-red-200 text-red-400 text-xs px-2 py-1 rounded hover:bg-red-50">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button className="w-full border border-gray-200 text-gray-500 text-xs py-2 rounded-lg hover:bg-gray-50 transition-colors">
          عرض جميع الأكواد
        </button>
      </div>

    </div>
  );
}
