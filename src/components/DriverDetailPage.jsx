import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ======= Mock driver data =======
const driver = {
  name: "عبدالله سالم",
  phone: "0544222333",
  email: "abdo@gmail",
  status: "نشط",
  regStatus: "غير مسجل",
  completion: 100,
  initials: "ع",
};

// ======= Trips tab data =======
const trips = [
  {
    id: "#35", price: "570 ر.س", client: "سارة احمد", type: "اشتراك",
    status: "مكتملة", statusColor: "bg-green-600",
    subStatus: "غير مسجل", subColor: "bg-amber-100 text-amber-700",
    queueStatus: null,
    from: "حي الملقا", to: "جامعة الملك سعود", city: "جدة",
    dateFrom: "19-6-2025", dateTo: "1-7-2025",
    customerName: "فاطمة احمد", phone: "0568710388",
    commission: "200 ر.س", remaining: "300 ر.س",
  },
  {
    id: "#35", price: "570 ر.س", client: "سارة احمد", type: "اشتراك",
    status: "قيد التنفيذ", statusColor: "bg-blue-600",
    subStatus: null, subColor: null, queueStatus: null,
    from: "حي الملقا", to: "جامعة الملك سعود", city: "جدة",
    dateFrom: "19-6-2025", dateTo: "1-7-2025",
    customerName: "فاطمة احمد", phone: "0568710388",
    commission: "200 ر.س", remaining: "300 ر.س",
  },
];

// ======= Violations tab data =======
const violations = [
  { id: 1, type: "تنبيه", typeColor: "bg-blue-100 text-blue-600", title: "التأخر عن موعد الرحلة", by: "ام ياسمين", date: "16-12-2025" },
  { id: 2, type: "إنذار", typeColor: "bg-red-100 text-red-600",   title: "شكوى من العميل",          by: "ام ياسمين", date: "16-12-2025" },
];

// ======= Notes tab data =======
const initialNotes = [
  { id: 1, text: "السائق ملتزم بالمواعيد",   author: "سارة احمد", date: "1-2-2026" },
  { id: 2, text: "افتعال مشكلة مع العميل",   author: "سارة احمد", date: "1-2-2026" },
];

// ======= Rating tab =======
const StarRating = ({ value, onChange }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((s) => (
      <button key={s} onClick={() => onChange(s)}>
        <svg className={`w-6 h-6 ${s <= value ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}`}
          viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </button>
    ))}
  </div>
);

// ======= Trip Card =======
const TripCard = ({ trip }) => (
  <div className="bg-white rounded-xl border border-gray-100 flex overflow-hidden mb-3">
    {/* Actions column */}
    <div className="bg-gray-50 p-3 flex flex-col gap-2 justify-center w-36 text-center shrink-0 border-l border-gray-100">
      <span className="text-xs font-semibold text-gray-400 mb-1">الإجراءات</span>
      <button className="flex items-center justify-center gap-1 bg-[#474747] text-white text-xs py-1.5 px-2 rounded hover:bg-black transition-colors">
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
        اضافة دفعه
      </button>
      <button className="flex items-center justify-center gap-1 bg-white border border-gray-300 text-gray-700 text-xs py-1.5 px-2 rounded hover:bg-gray-50 transition-colors">
        <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
        تغيير الحالة
      </button>
      <button className="flex items-center justify-center gap-1 bg-white border border-gray-300 text-gray-700 text-xs py-1.5 px-2 rounded hover:bg-gray-50 transition-colors">
        <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
        عرض التفاصيل
      </button>
      <button className="flex items-center justify-center gap-1 bg-white border border-gray-300 text-gray-700 text-xs py-1.5 px-2 rounded hover:bg-gray-50 transition-colors">
        <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
        تعديل
      </button>
    </div>

    {/* Trip details */}
    <div className="p-4 flex-1 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-amber-700 font-bold text-lg">{trip.price}</div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-base font-bold text-gray-800">{trip.id}</span>
          <span className={`${trip.statusColor} text-white text-xs px-2.5 py-0.5 rounded-full`}>{trip.status}</span>
          {trip.subStatus && <span className={`text-xs px-2.5 py-0.5 rounded-full ${trip.subColor}`}>{trip.subStatus}</span>}
          <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">{trip.type}</span>
          <span className="text-xs text-gray-500">{trip.client}</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 text-xs text-gray-600">
        <div className="space-y-1">
          <div className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
            <span className="font-semibold text-gray-800">{trip.from}</span>
            <span className="text-gray-400">←</span>
            <span>{trip.to}</span>
          </div>
          <div className="flex gap-1 pr-4">
            <span className="bg-amber-50 text-amber-700 text-[10px] px-1.5 py-0.5 rounded">مدينة</span>
            <span>{trip.city}</span>
          </div>
        </div>
        <div className="space-y-1 border-r border-l border-gray-100 px-3">
          <div className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <span>{trip.dateFrom}</span><span className="text-gray-400">←</span><span>{trip.dateTo}</span>
          </div>
          <div>العميل: <span className="font-medium text-gray-800">{trip.customerName}</span></div>
          <div className="flex items-center gap-1 text-gray-400">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            {trip.phone}
          </div>
        </div>
        <div className="space-y-1 text-left">
          <div>العمولة: <span className="font-semibold text-amber-600">{trip.commission}</span></div>
          <div>المتبقي: <span className="font-semibold text-amber-600">{trip.remaining}</span></div>
        </div>
      </div>
    </div>
  </div>
);

// ======= Main Component =======
export default function DriverDetailPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("trips");
  const [rating, setRating] = useState(3);
  const [notes, setNotes] = useState(initialNotes);
  const [newNote, setNewNote] = useState("");
  const [showNoteInput, setShowNoteInput] = useState(false);

  const tabs = [
    { id: "info",       label: "المعلومات الشخصية" },
    { id: "trips",      label: "سجل الرحلات" },
    { id: "violations", label: "المخالفات والتنبيهات" },
    { id: "notes",      label: "الملاحظات" },
    { id: "ratings",    label: "التقييمات" },
  ];

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    setNotes(prev => [...prev, { id: prev.length + 1, text: newNote, author: "سارة احمد", date: "الآن" }]);
    setNewNote("");
    setShowNoteInput(false);
  };

  return (
    <div dir="rtl" className="w-full space-y-4">

      {/* Back */}
      <button onClick={() => navigate("/drivers")}
        className="flex items-center gap-1.5 text-[#c9a84c] text-sm font-semibold hover:opacity-80">
        <span>العودة إلى السائقين</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">

        {/* Top: avatar + name + actions */}
        <div className="flex items-start justify-between flex-wrap gap-3">
          {/* Action buttons */}
          <div className="flex flex-wrap gap-2">
            <button className="flex items-center gap-1 bg-[#1a1a1a] text-white text-xs px-3 py-1.5 rounded-lg">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              إسناد رحلة
            </button>
            <button className="flex items-center gap-1 bg-green-500 text-white text-xs px-3 py-1.5 rounded-lg">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              إرسال تنبية
            </button>
            <button className="flex items-center gap-1 bg-amber-500 text-white text-xs px-3 py-1.5 rounded-lg">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              إيقاف مؤقت
            </button>
            <button className="flex items-center gap-1 bg-blue-500 text-white text-xs px-3 py-1.5 rounded-lg">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636" /></svg>
              تجميد
            </button>
            <button className="flex items-center gap-1 bg-red-600 text-white text-xs px-3 py-1.5 rounded-lg">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /></svg>
              حظر نهائي
            </button>
            <button className="flex items-center gap-1 bg-white border border-gray-300 text-gray-700 text-xs px-3 py-1.5 rounded-lg">
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              تعديل
            </button>
            <button className="flex items-center gap-1 bg-red-50 border border-red-200 text-red-500 text-xs px-3 py-1.5 rounded-lg">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              حذف
            </button>
          </div>

          {/* Name + contact + avatar */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <h2 className="text-xl font-bold text-gray-800">{driver.name}</h2>
              <div className="flex items-center gap-3 text-xs text-gray-500 mt-1 justify-end">
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  {driver.email}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  {driver.phone}
                </span>
              </div>
              <div className="flex gap-2 mt-2 justify-end">
                <span className="border border-gray-300 text-gray-500 text-xs px-2.5 py-0.5 rounded-full">{driver.regStatus}</span>
                <span className="bg-green-100 text-green-700 text-xs px-2.5 py-0.5 rounded-full">{driver.status}</span>
              </div>
            </div>
            <div className="w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center text-white text-2xl font-bold shrink-0">
              {driver.initials}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div>
          <div className="flex justify-between text-xs text-gray-500 mb-1.5">
            <span>{driver.completion}%</span>
            <span>نسبة اكتمال الملف الشخصي</span>
          </div>
          <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 rounded-full" style={{ width: `${driver.completion}%` }} />
          </div>
        </div>
      </div>

      {/* Tabs Card */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-100 overflow-x-auto">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-max py-3.5 px-4 text-sm font-medium whitespace-nowrap transition-colors
                ${activeTab === tab.id
                  ? "bg-white text-gray-800 border-b-2 border-[#c9a84c]"
                  : "bg-gray-50 text-gray-500 hover:bg-gray-100"}`}>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-5">

          {/* ===== سجل الرحلات ===== */}
          {activeTab === "trips" && (
            <div>
              <div className="grid grid-cols-2 gap-4 mb-5">
                <div className="bg-white border border-gray-100 rounded-xl p-4 flex items-center justify-between shadow-sm">
                  <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-gray-800">579 ر.س</p>
                    <p className="text-xs text-gray-400">إجمالي المستحقات</p>
                  </div>
                </div>
                <div className="bg-white border border-gray-100 rounded-xl p-4 flex items-center justify-between shadow-sm">
                  <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-gray-800">55</p>
                    <p className="text-xs text-gray-400">إجمالي عدد الرحلات</p>
                  </div>
                </div>
              </div>
              {trips.map((t, i) => <TripCard key={i} trip={t} />)}
              {/* Pagination */}
              <div className="flex justify-center items-center gap-1 mt-4 text-xs" dir="ltr">
                <button className="p-1.5 bg-white border border-gray-200 rounded hover:bg-gray-50">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button className="w-7 h-7 bg-amber-500 text-white font-bold rounded shadow-sm">1</button>
                <button className="w-7 h-7 bg-white border border-gray-200 rounded hover:bg-gray-50">2</button>
                <button className="w-7 h-7 bg-white border border-gray-200 rounded hover:bg-gray-50">3</button>
                <span className="px-1 text-gray-400">...</span>
                <button className="w-7 h-7 bg-white border border-gray-200 rounded hover:bg-gray-50">30</button>
                <button className="p-1.5 bg-white border border-gray-200 rounded hover:bg-gray-50">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>
          )}

          {/* ===== المخالفات والتنبيهات ===== */}
          {activeTab === "violations" && (
            <div className="space-y-3">
              {violations.map(v => (
                <div key={v.id} className="border border-gray-100 rounded-xl p-4 text-right">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-400">{v.date}</span>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${v.typeColor}`}>{v.type}</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-800">{v.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">بواسطة: {v.by}</p>
                </div>
              ))}
            </div>
          )}

          {/* ===== الملاحظات ===== */}
          {activeTab === "notes" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <button onClick={() => setShowNoteInput(true)}
                  className="flex items-center gap-1.5 border border-gray-200 text-gray-600 text-sm px-3 py-1.5 rounded-lg hover:bg-gray-50">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  اضافة ملاحظة
                </button>
                <h3 className="font-semibold text-gray-700">الملاحظات الإدارية</h3>
              </div>
              {showNoteInput && (
                <div className="mb-3 space-y-2">
                  <textarea value={newNote} onChange={e => setNewNote(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
                    rows={3} placeholder="اكتب الملاحظة هنا..." />
                  <div className="flex gap-2 justify-end">
                    <button onClick={() => setShowNoteInput(false)} className="border border-gray-200 text-gray-600 text-xs px-3 py-1.5 rounded-lg">إلغاء</button>
                    <button onClick={handleAddNote} className="bg-amber-500 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-amber-600">حفظ</button>
                  </div>
                </div>
              )}
              <div className="space-y-3">
                {notes.map(n => (
                  <div key={n.id} className="border border-gray-100 rounded-xl p-4 text-right">
                    <p className="text-sm text-gray-800">{n.text}</p>
                    <p className="text-xs text-gray-400 mt-1">{n.date} . {n.author}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===== التقييمات ===== */}
          {activeTab === "ratings" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <button className="flex items-center gap-1.5 border border-gray-200 text-gray-600 text-sm px-3 py-1.5 rounded-lg hover:bg-gray-50">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  اضافة تقيم
                </button>
                <h3 className="font-semibold text-gray-700">التقييمات</h3>
              </div>
              <div className="border border-gray-100 rounded-xl p-5 max-w-sm mx-auto text-right space-y-3">
                <h4 className="text-sm font-semibold text-gray-700">تقييم السائق</h4>
                <div className="flex items-center gap-2">
                  <StarRating value={rating} onChange={setRating} />
                  <span className="text-sm text-gray-500">{rating}/5</span>
                </div>
                <button className="w-full border border-gray-200 text-gray-600 text-sm py-2 rounded-lg hover:bg-gray-50">
                  حفظ التقييم
                </button>
              </div>
            </div>
          )}

          {/* ===== المعلومات الشخصية ===== */}
          {activeTab === "info" && (
            <div className="space-y-3 text-right text-sm text-gray-600">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "الاسم الكامل", value: driver.name },
                  { label: "رقم الهاتف", value: driver.phone },
                  { label: "البريد الإلكتروني", value: driver.email },
                  { label: "الحالة", value: driver.status },
                ].map(f => (
                  <div key={f.label} className="border border-gray-100 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-1">{f.label}</p>
                    <p className="font-medium text-gray-800">{f.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
