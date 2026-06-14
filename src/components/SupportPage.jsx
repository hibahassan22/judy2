import { useState } from "react";

// ======= بيانات التذاكر تحاكي الصورة بدقة =======
const initialTickets = [
  {
    id: 1,
    status: "مفتوحة",
    statusColor: "bg-red-600 text-white",
    priority: "عالية",
    priorityColor: "bg-red-600 text-white",
    category: "مالي",
    categoryColor: "bg-gray-100 text-gray-500 border border-gray-200",
    assignee: "محمد العتيبي",
    creator: "بواسطة: السائق",
    department: "الأحساء • الدمام",
    subject: "لم يتم استلام دفعة العمولة",
    createdAt: "07/11/2025 10:30",
    updatedAt: "07/11/2025 10:30",
    notes: [
      { id: 1, author: "احمد الاداري", text: "تم التواصل مع قسم المحاسبة", date: "07/11/2025 10:30" }
    ],
    hasAttachments: true,
  },
  {
    id: 2,
    status: "قيد المعالجة",
    statusColor: "bg-blue-600 text-white",
    priority: "متوسطة",
    priorityColor: "bg-amber-100 text-amber-600 border border-amber-200",
    category: "موظف",
    categoryColor: "bg-gray-100 text-gray-500 border border-gray-200",
    assignee: "سارة احمد",
    creator: null,
    department: "الأحساء • الدمام",
    subject: "لم يتم استلام دفعة العمولة",
    createdAt: "07/11/2025 10:30",
    updatedAt: "07/11/2025 10:30",
    notes: [],
    hasAttachments: true,
  },
];

// ======= قائمة السائقين (الجانب الأيمن للشات) طبقاً للصورة =======
const driversChats = [
  { id: 1, name: "محمد العتيبي", message: "شكراً سأكون جاهز للرحلة", time: "2:30 AM", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" },
  { id: 2, name: "فهد الشهري", message: "شكراً سأكون جاهز للرحلة", time: "2:30 AM", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" },
  { id: 3, name: "سعود الغامدي", message: "شكراً سأكون جاهز للرحلة", time: "2:30 AM", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80" },
  { id: 4, name: "ماجد الحربي", message: "شكراً سأكون جاهز للرحلة", time: "2:30 AM", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&q=80" },
  { id: 5, name: "وليد المالكي", message: "شكراً سأكون جاهز للرحلة", time: "2:30 AM", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80" },
  { id: 6, name: "أحمد الشمري", message: "شكراً سأكون جاهز للرحلة", time: "2:30 AM", avatar: "https://images.unsplash.com/photo-1500048993953-d23a436266cf?auto=format&fit=crop&w=100&q=80" },
  { id: 7, name: "منصور الحربي", message: "شكراً سأكون جاهز للرحلة", time: "2:30 AM", avatar: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=100&q=80" },
];

// ======= رسائل الشات النشط (الجانب الأيسر للشات) طبقاً للصورة =======
const currentMessages = [
  { id: 1, sender: "user", text: "السلام عليكم، أنا مهتم بالرحلة المعروضة في التطبيق رقم 35", time: "2:30 AM" },
  { id: 2, sender: "me", text: "وعليكم السلام ورحمة الله وبركاته هل ترغب في الاستفسار أو تأكيد الاستلام؟", time: "2:30 AM" },
  { id: 3, sender: "user", text: "نعم، أحتاج تفاصيل أكثر عن نقطة الانطلاق ووقت الرحلة", time: "2:30 AM" },
];

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState("live"); // التبويب الافتراضي المحادثات المباشرة مثل الصورة
  const [tickets] = useState(initialTickets);
  const [selectedChat, setSelectedChat] = useState(1);
  const [messageText, setMessageText] = useState("");
  
  // حالات التحكم في النوافذ المنبثقة (Modals)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); 
  const [selectedTicketDetails, setSelectedTicketDetails] = useState(null); 
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false); 
  const [noteText, setNoteText] = useState("");

  return (
    <div className="w-full min-h-screen bg-[#f8f9fa] p-6 font-sans antialiased flex flex-col" dir="rtl">
      
      {/* العنوان العلوي */}
      <header className="mb-4 text-right">
        <h2 className="text-xl font-bold text-gray-800">الدعم الفني والتذاكر</h2>
      </header>

      {/* شريط التحكم السفلي (إنشاء تذكرة، تصفية، التبويبات) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-5 bg-white p-3 rounded-xl border border-gray-200/60 shadow-sm">
        
        {/* أزرار الإجراءات */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-[#4a4644] text-white text-xs px-4 py-2 rounded-lg hover:bg-black transition-colors flex items-center gap-1.5 font-medium shadow-sm"
          >
            <span>+</span> إنشاء تذكرة
          </button>
          <button className="border border-gray-200 bg-white text-gray-600 text-xs px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1.5 shadow-sm">
            <span>🎛️</span> تصفية
          </button>
        </div>

        {/* أزرار تحويل التبويب */}
        <div className="bg-gray-100/80 p-1 rounded-xl flex gap-1 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab("tickets")}
            className={`flex-1 sm:flex-none px-10 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === "tickets" ? "bg-white text-gray-800 shadow-sm" : "text-gray-400 hover:text-gray-700"
            }`}
          >
            التذاكر
          </button>
          <button
            onClick={() => setActiveTab("live")}
            className={`flex-1 sm:flex-none px-10 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === "live" ? "bg-white text-gray-800 shadow-sm" : "text-gray-400 hover:text-gray-700"
            }`}
          >
            المحادثات المباشرة
          </button>
        </div>
      </div>

      {/* ========================================================
          منطقة المحتوى المتغيرة بناءً على التبويب النشط
          ======================================================== */}
      <div className="flex-1 flex flex-col">
        
        {/* 1. تبويب التذاكر */}
        {activeTab === "tickets" && (
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-white border border-gray-200/70 rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden text-right flex flex-col justify-between"
              >
                <div 
                  onClick={() => setSelectedTicketDetails(ticket)}
                  className="p-5 space-y-3 cursor-pointer"
                >
                  <div className="flex items-center justify-start gap-1.5 flex-wrap">
                    <span className={`text-[11px] px-3 py-0.5 rounded-full font-bold ${ticket.statusColor}`}>{ticket.status}</span>
                    <span className={`text-[11px] px-3 py-0.5 rounded-full font-medium ${ticket.priorityColor}`}>{ticket.priority}</span>
                    <span className={`text-[11px] px-3 py-0.5 rounded-full font-medium ${ticket.categoryColor}`}>{ticket.category}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                    {ticket.assignee && <span className="flex items-center gap-1"><span>👤</span> السائق: {ticket.assignee}</span>}
                    <span className="text-gray-300">|</span>
                    <span className="text-gray-600 font-semibold">{ticket.department}</span>
                  </div>
                  <h3 className="text-sm font-bold text-gray-800 tracking-wide">{ticket.subject}</h3>
                </div>
                <div className="bg-gray-50/50 border-t border-gray-100 px-5 py-2.5 flex items-center justify-start gap-4 text-xs text-gray-500">
                  <button onClick={() => setIsNoteModalOpen(true)} className="hover:text-[#b58f37] transition-colors">📝 إضافة ملاحظة</button>
                  <button className="hover:text-red-600 transition-colors">🗑️ حذف</button>
                  <button onClick={() => setSelectedTicketDetails(ticket)} className="hover:text-amber-600 transition-colors">👁️ عرض التفاصيل</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 2. تبويب المحادثات المباشرة (مطابق تماماً لتصميم الصورة الثانية) */}
        {activeTab === "live" && (
          <div className="flex-1 flex bg-white border border-gray-200/70 rounded-2xl shadow-sm overflow-hidden min-h-[580px]">
            
            {/* [الجانب الأيسر] نافذة صندوق الشات والرسائل المتبادلة */}
            <section className="flex-1 flex flex-col bg-white border-l border-gray-100">
              
              {/* هيدر الشات المفتوح */}
              <header className="p-4 border-b border-gray-100 flex items-center justify-between bg-white">
                <div className="flex items-center gap-3">
                  <img
                    src={driversChats[selectedChat - 1]?.avatar}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover border border-gray-200 shadow-sm"
                  />
                  <div className="text-right">
                    <h4 className="text-sm font-bold text-gray-800">{driversChats[selectedChat - 1]?.name}</h4>
                  </div>
                </div>
              </header>

              {/* منطقة الرسائل الفقاعية المتطابقة مع ألوان الصورة */}
              <div className="flex-1 p-6 overflow-y-auto bg-gray-50/30 space-y-4 flex flex-col justify-start">
                {currentMessages.map((msg) => {
                  const isMe = msg.sender === "me";
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col max-w-[70%] ${
                        isMe ? "self-end items-end" : "self-start items-start"
                      }`}
                    >
                      <div
                        className={`p-4 rounded-[22px] text-xs leading-relaxed shadow-sm relative ${
                          isMe
                            ? "bg-[#575351] text-white rounded-bl-none text-right" 
                            : "bg-[#f4f3f1] text-gray-700 rounded-br-none text-right" 
                        }`}
                      >
                        <p className="font-medium">{msg.text}</p>
                        <div className={`text-[9px] mt-2 flex items-center gap-0.5 ${isMe ? "text-gray-300 justify-end" : "text-gray-400 justify-start"}`}>
                          <span>{msg.time}</span>
                          {isMe && <span className="text-emerald-400">✓✓</span>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* حقل الإدخال السفلي مع أدوات الإرفاق والمايك */}
              <footer className="p-4 bg-white border-t border-gray-100">
                <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-2">
                  
                  {/* زر الإرسال */}
                  <button className="bg-[#b58f37] text-white p-2.5 rounded-lg hover:bg-[#9a762b] transition-all shrink-0 shadow-sm flex items-center justify-center">
                    <svg className="w-4 h-4 transform rotate-180" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </button>

                  {/*Input النص */}
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="اكتب رسالتك......"
                    className="flex-1 bg-transparent border-none text-xs text-gray-700 focus:outline-none text-right"
                  />

                  {/* الأيقونات الملحقة */}
                  <div className="flex items-center gap-3 text-gray-400 shrink-0 border-r border-gray-200 pr-3">
                    <button className="hover:text-gray-600 text-sm" title="إضافة صورة">🖼️</button>
                    <button className="hover:text-gray-600 text-sm" title="إرفاق ملف">📎</button>
                    <button className="hover:text-gray-600 text-sm" title="تسجيل صوتي">🎙️</button>
                  </div>
                </div>
              </footer>
            </section>

            {/* [الجانب الأيمن] قائمة السائقين مع حقل البحث العلوي */}
            <section className="w-80 flex flex-col bg-white">
              
              {/* شريط البحث المطور */}
              <div className="p-4 border-b border-gray-100">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="ابحث هنا......"
                    className="w-full bg-white border border-gray-200 rounded-xl py-2 pr-9 pl-4 text-xs text-right text-gray-700 focus:outline-none focus:border-gray-300"
                  />
                  <span className="absolute right-3 top-2.5 text-gray-400 text-xs">🔍</span>
                </div>
              </div>

              {/* عناصر السائقين في القائمة */}
              <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
                {driversChats.map((chat) => {
                  const isSelected = selectedChat === chat.id;
                  return (
                    <div
                      key={chat.id}
                      onClick={() => setSelectedChat(chat.id)}
                      className={`flex items-center justify-between p-4 cursor-pointer transition-all ${
                        isSelected ? "bg-[#fcfaf7] border-r-4 border-[#b58f37]" : "hover:bg-gray-50"
                      }`}
                    >
                      {/* وقت الرسالة أقصى اليسار */}
                      <span className="text-[10px] text-gray-400 self-start shrink-0 pt-0.5">{chat.time}</span>
                      
                      {/* النص والاسم في المنتصف */}
                      <div className="flex-1 text-right px-3 overflow-hidden">
                        <h5 className="text-xs font-bold text-gray-800 mb-1">{chat.name}</h5>
                        <p className={`text-[11px] truncate w-full ${isSelected ? "text-gray-500" : "text-gray-400"}`}>
                          {chat.id === 1 ? "✓ شكراً سأكون جاهز للرحلة" : chat.message}
                        </p>
                      </div>

                      {/* الصورة الشخصية أقصى اليمين */}
                      <img
                        src={chat.avatar}
                        alt={chat.name}
                        className="w-9 h-9 rounded-full object-cover shrink-0 border border-gray-100 shadow-sm"
                      />
                    </div>
                  );
                })}
              </div>
            </section>

          </div>
        )}
      </div>

      {/* ========================================================
          1. نافذة (Popup) إنشاء تذكرة جديدة (محاكاة دقيقة للصورة الأولى)
          ======================================================== */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden text-right animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 flex items-center justify-between border-b border-gray-100">
              <button onClick={() => setIsCreateModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-2xl">✕</button>
              <h3 className="text-sm font-bold text-gray-700">إنشاء تذكرة جديدة</h3>
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-500">السائق</label>
                <div className="relative">
                  <select className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-400 appearance-none focus:outline-none">
                    <option>اختر السائق</option>
                  </select>
                  <span className="absolute left-3 top-3.5 text-[10px] text-gray-400 pointer-events-none">▼</span>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-500">الرحلة المرتبطة (اختياري)</label>
                <div className="relative">
                  <select className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-400 appearance-none focus:outline-none">
                    <option>اختر الرحلة</option>
                  </select>
                  <span className="absolute left-3 top-3.5 text-[10px] text-gray-400 pointer-events-none">▼</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-gray-500">الأولوية</label>
                  <div className="relative">
                    <select className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-400 appearance-none focus:outline-none">
                      <option>اختر الأولوية</option>
                    </select>
                    <span className="absolute left-3 top-3.5 text-[10px] text-gray-400 pointer-events-none">▼</span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-gray-500">نوع المشكلة</label>
                  <div className="relative">
                    <select className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-400 appearance-none focus:outline-none">
                      <option>اختر النوع</option>
                    </select>
                    <span className="absolute left-3 top-3.5 text-[10px] text-gray-400 pointer-events-none">▼</span>
                  </div>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-500">وصف المشكلة</label>
                <textarea rows="4" placeholder="اشرح المشكلة بالتفصيل..." className="w-full bg-white border border-gray-200 rounded-xl p-3 text-xs text-gray-700 placeholder-gray-300 focus:outline-none resize-none"></textarea>
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-500">المرفقات</label>
                <button type="button" className="w-full border border-gray-200 bg-white text-gray-500 text-xs py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50">
                  <span>⬆</span> اختر الملف
                </button>
              </div>
              <div className="pt-2">
                <button type="submit" className="w-full bg-[#4a4644] text-white py-3 rounded-xl text-xs font-bold hover:bg-black transition-colors">
                  إنشاء تذكرة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          2. نافذة (Popup) تفاصيل التذكرة
          ======================================================== */}
      {selectedTicketDetails && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-xl overflow-hidden text-right">
            <div className="p-5 flex items-center justify-between border-b border-gray-100">
              <button onClick={() => setSelectedTicketDetails(null)} className="text-gray-400 hover:text-gray-600 text-lg">✕</button>
              <h3 className="text-sm font-bold text-gray-700">تفاصيل التذكرة</h3>
            </div>
            <div className="p-6 space-y-5 overflow-y-auto max-h-[75vh]">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="font-semibold text-xs text-gray-700">{selectedTicketDetails.department}</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-600 font-bold">✓ محلولة</span>
                  <span className="text-[11px] px-3 py-0.5 rounded-full bg-gray-200 text-gray-600">منخفضة</span>
                </div>
              </div>
              {/* باقي عناصر التفاصيل تظل كما هي ومترابطة */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <button type="button" onClick={() => setIsNoteModalOpen(true)} className="text-xs border border-gray-200 px-3 py-1 rounded-lg text-gray-500 hover:bg-gray-50">+ اضافة ملاحظة</button>
                  <label className="block text-xs font-bold text-gray-500">الملاحظات الداخلية</label>
                </div>
                {selectedTicketDetails.notes.map((note) => (
                  <div key={note.id} className="border border-amber-200 bg-amber-50/20 rounded-2xl p-4 space-y-2">
                    <p className="text-xs text-gray-600 font-medium">{note.text}</p>
                  </div>
                ))}
              </div>
              <button className="w-full bg-[#4a4644] text-white py-3 rounded-xl text-xs font-bold hover:bg-black">📝 تعديل التذكرة</button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          3. نافذة (Popup) إضافة ملاحظة
          ======================================================== */}
      {isNoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden text-right">
            <div className="p-4 flex items-center justify-between border-b border-gray-100">
              <button onClick={() => setIsNoteModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg">✕</button>
              <h3 className="text-sm font-bold text-gray-700">إضافة ملاحظة</h3>
            </div>
            <div className="p-5 space-y-4">
              <textarea rows="4" value={noteText} onChange={(e) => setNoteText(e.target.value)} placeholder="أضف ملاحظتك هنا ..." className="w-full bg-white border border-gray-200 rounded-2xl p-3 text-xs text-gray-700 placeholder-gray-300 focus:outline-none resize-none"></textarea>
              <button onClick={() => { setIsNoteModalOpen(false); setNoteText(""); }} className="w-full bg-[#4a4644] text-white py-3 rounded-xl text-xs font-bold hover:bg-black">حفظ</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}