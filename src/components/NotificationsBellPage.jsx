import { useState } from "react";

// ======= Mock Data =======
const allNotifications = [
  {
    id: 1,
    title: "انتهاء صلاحية كود مكافأة نقدي",
    desc: "الكود (325234) انتهت صلاحيته ولم يعد متاحاً للاستخدام.",
    time: "منذ 15 دقيقة",
    isNew: true,
    icon: "reward",
  },
  {
    id: 2,
    title: "إضافة تذكره على الرحلة #35",
    desc: "تم تسجيل تذكرة جديدة على هذه الرحلة.",
    time: "منذ 30 دقيقة",
    isNew: true,
    icon: "ticket",
  },
  {
    id: 3,
    title: "تحديث حالة الرحلة #35",
    desc: "تم تغيير حالة الرحلة إلى (قيد التنفيذ).",
    time: "منذ 22 ساعة",
    isNew: false,
    icon: "trip",
  },
  {
    id: 4,
    title: "تسجيل دفعة جديدة",
    desc: "تم إضافة دفعة مالية على هذه الرحلة #35.",
    time: "منذ يومان",
    isNew: false,
    icon: "payment",
  },
  {
    id: 5,
    title: "رسالة جديدة على إعلان الرحلة #35",
    desc: "لديك رسالة جديدة بخصوص إحدى الرحلات المنشورة.",
    time: "منذ 2 يوم",
    isNew: false,
    icon: "message",
  },
  {
    id: 6,
    title: "طلب استرداد جديد",
    desc: "تم تقديم طلب استرداد على إحدى الرحلات.",
    time: "15-2-2025",
    isNew: false,
    icon: "refund",
  },
];

// أيقونة لكل نوع
const IconBox = ({ type, isNew }) => {
  const configs = {
    reward:  { bg: "bg-amber-50",  border: "border-amber-200", d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", color: "text-amber-500" },
    ticket:  { bg: "bg-orange-50", border: "border-orange-200", d: "M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z", color: "text-orange-500" },
    trip:    { bg: "bg-gray-50",   border: "border-gray-200",  d: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9", color: "text-gray-400" },
    payment: { bg: "bg-gray-50",   border: "border-gray-200",  d: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z", color: "text-gray-400" },
    message: { bg: "bg-gray-50",   border: "border-gray-200",  d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z", color: "text-gray-400" },
    refund:  { bg: "bg-gray-50",   border: "border-gray-200",  d: "M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 2 2 2-2 2 2 2-2 4 2z", color: "text-gray-400" },
  };
  const c = configs[type] || configs.trip;
  return (
    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${c.bg} ${c.border}`}>
      <svg className={`w-5 h-5 ${c.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={c.d} />
      </svg>
    </div>
  );
};

export default function NotificationsBellPage() {
  const [filter, setFilter] = useState("all");
  const [notifications, setNotifications] = useState(allNotifications);

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, isNew: false })));

  const filtered = filter === "new"
    ? notifications.filter((n) => n.isNew)
    : notifications;

  return (
    <div className="w-full space-y-4" dir="rtl">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={markAllRead}
            className="flex items-center gap-1.5 bg-[#1a1a1a] text-white text-xs px-3 py-2 rounded-lg hover:bg-[#333] transition-colors"
          >
            كتم الإشعارات
          </button>
          <button
            onClick={() => setFilter(filter === "new" ? "all" : "new")}
            className={`flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg border transition-colors
              ${filter === "new"
                ? "bg-amber-500 text-white border-amber-500"
                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"}`}
          >
            الإشعارات المؤرشفة
          </button>

          {/* Filter dropdown */}
          <div className="relative">
            <select
              className="border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white appearance-none pr-7"
              defaultValue="all"
            >
              <option value="all">جميع الإشعارات</option>
              <option value="trips">الرحلات</option>
              <option value="payments">الدفعات</option>
            </select>
            <svg className="w-3.5 h-3.5 text-gray-400 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <h1 className="text-xl font-bold text-[#c9a84c]">الإشعارات</h1>
      </div>

      {/* Notification Cards */}
      <div className="space-y-3">
        {filtered.map((n) => (
          <div
            key={n.id}
            className={`bg-white rounded-xl p-4 flex items-start gap-4 border transition-colors
              ${n.isNew ? "border-amber-100 shadow-sm" : "border-gray-100"}`}
          >
            {/* drag handle dots */}
            <div className="flex flex-col gap-1 pt-1 shrink-0 cursor-grab">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex gap-0.5">
                  <span className="w-1 h-1 bg-gray-300 rounded-full" />
                  <span className="w-1 h-1 bg-gray-300 rounded-full" />
                </div>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3">
                <IconBox type={n.icon} isNew={n.isNew} />
                <div className="flex-1 text-right">
                  <p className="text-sm font-semibold text-gray-800 mb-0.5">{n.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{n.desc}</p>
                  <p className={`text-xs mt-2 font-medium ${n.isNew ? "text-amber-500" : "text-gray-400"}`}>
                    {n.time}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="bg-white rounded-xl p-10 text-center text-gray-400 text-sm">
            لا توجد إشعارات
          </div>
        )}
      </div>
    </div>
  );
}
