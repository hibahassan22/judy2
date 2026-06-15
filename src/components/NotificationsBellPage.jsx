import { useState } from "react";

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
    title: "#35 إضافة تذكره على الرحلة",
    desc: "تم تسجيل تذكرة جديدة على هذه الرحلة.",
    time: "منذ 30 دقيقة",
    isNew: true,
    icon: "ticket",
  },
  {
    id: 3,
    title: "#35 تحديث حالة الرحلة",
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
    title: "#35 رسالة جديدة على إعلان الرحلة",
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

const iconConfigs = {
  reward: { bg: "bg-amber-500", d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  ticket: { bg: "bg-orange-500", d: "M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" },
  trip:   { bg: "bg-gray-400",   d: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" },
  payment:{ bg: "bg-gray-400",   d: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" },
  message:{ bg: "bg-gray-400",   d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" },
  refund: { bg: "bg-gray-400",   d: "M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 2 2 2-2 2 2 2-2 4 2z" },
};

export default function NotificationsPage() {
  const [filter, setFilter] = useState("all");

  const displayed = filter === "archived"
    ? allNotifications.filter(n => !n.isNew)
    : allNotifications;

  return (
    <div className="max-w-3xl mx-auto p-4" dir="rtl">

      {/* Top Tabs & Title */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <button className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 text-sm font-medium">
            الإشعارات المؤرشفة
          </button>
          <button className="px-5 py-2 rounded-lg bg-[#c9a84c] text-white text-sm font-medium">
            كتم الإشعارات
          </button>
        </div>

        <h1 className="text-2xl font-bold text-[#c9a84c]">الإشعارات</h1>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {displayed.map((n) => {
          const cfg = iconConfigs[n.icon] || iconConfigs.trip;
          return (
            <div
              key={n.id}
              className="bg-white rounded-2xl border border-gray-100 p-5 flex items-start gap-4 hover:shadow-md transition-shadow"
            >
              {/* Drag Handle (Three dots vertical) */}
              <div className="flex flex-col justify-center gap-[3px] pt-1 shrink-0">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex gap-[2px]">
                    <div className="w-[3px] h-[3px] bg-gray-300 rounded-full" />
                    <div className="w-[3px] h-[3px] bg-gray-300 rounded-full" />
                  </div>
                ))}
              </div>

              {/* Content */}
              <div className="flex-1 text-right">
                <p className="text-[15px] font-semibold text-gray-900 leading-tight">{n.title}</p>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">{n.desc}</p>
                <p className="text-xs text-gray-500 mt-3">{n.time}</p>
              </div>

              {/* Icon Circle */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${cfg.bg}`}>
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={cfg.d} />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}