import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// ======= Icons =======
const BellIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

const ChatIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const PlusIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

// ======= Notes data =======
const notes = [
  { id: 1, text: "السائق ملتزم بالمواعيد", author: "سارة احمد", date: "1-2-2026" },
  { id: 2, text: "العميل غير راضٍ عن الخدمة", author: "سارة احمد", date: "1-2-2026" },
];

// ======= 1. بوب أب: إضافة ملاحظة =======
function AddNoteModal({ isOpen, onClose, onSave }) {
  const [text, setText] = useState("");

  if (!isOpen) return null;

  const handleSave = () => {
    if (!text.trim()) return;
    onSave(text.trim());
    setText("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-gray-800">إضافة ملاحظة</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">&times;</button>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="اكتب الملاحظة هنا..."
          rows={4}
          className="w-full border border-gray-200 rounded-xl p-3 text-xs text-gray-700 resize-none outline-none focus:border-[#c9a84c] transition-colors"
          dir="rtl"
        />

        <div className="flex items-center gap-2 mt-4 justify-start">
          <button onClick={handleSave} className="bg-[#c9a84c] text-white text-xs px-5 py-2 rounded-lg hover:bg-[#b8943f] transition-colors">حفظ</button>
          <button onClick={onClose} className="border border-gray-200 text-gray-500 text-xs px-5 py-2 rounded-lg hover:bg-gray-50 transition-colors">إلغاء</button>
        </div>
      </div>
    </div>
  );
}

// ======= 2. بوب أب: معالجة طلب استرداد =======
function RefundModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({ amount: "", method: "", name: "", iban: "", bankTo: "", bankName: "", reason: "" });

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 font-sans" 
      dir="rtl"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-[440px] rounded-2xl bg-white shadow-2xl p-6 flex flex-col max-h-[95vh] overflow-y-auto text-right space-y-4 relative animate-in fade-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute top-5 left-5 text-gray-400 hover:text-gray-600 text-xl transition-colors">&times;</button>
        <div className="pb-2">
          <h3 className="text-md font-bold text-gray-800">معالجة طلب استرداد</h3>
          <p className="text-[11px] text-gray-400 mt-1">أدخل تفاصيل المبلغ المراد استرداده</p>
        </div>
        <div className="bg-[#fffdf4] border border-[#f5ecd0] rounded-xl p-3.5 flex items-start gap-3">
          <div className="w-5 h-5 rounded-full border border-amber-500 text-amber-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">!</div>
          <div className="space-y-0.5">
            <span className="text-[#a48433] font-bold text-xs block">ملاحظة مهمة</span>
            <span className="text-gray-600 text-[11px]">المبلغ الإجمالي المدفوع : <strong className="text-[#a48433] font-bold">800 ريال</strong></span>
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-500">المبلغ المسترد (ريال)</label>
          <input type="number" placeholder="ادخل المبلغ" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} className="w-full rounded-xl border border-gray-200 px-3 py-3 text-xs text-gray-700 focus:border-[#c9a84c] focus:outline-none transition-colors" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-500">طريقة الاسترداد</label>
          <div className="relative">
            <select value={formData.method} onChange={(e) => setFormData({...formData, method: e.target.value})} className="w-full rounded-xl border border-gray-200 px-3 py-3 text-xs text-gray-400 bg-white focus:outline-none focus:border-[#c9a84c] appearance-none cursor-pointer">
              <option value="">اختر طريقة الاسترداد</option>
              <option value="bank">تحويل بنكي</option>
              <option value="wallet">محفظة إلكترونية</option>
            </select>
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400 text-xs">▼</div>
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-500">بيانات التحويل البنكي</label>
          <input type="text" placeholder="اسم صاحب الحساب" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full rounded-xl border border-gray-200 px-3 py-3 text-xs text-gray-700 focus:border-[#c9a84c] focus:outline-none transition-colors" />
        </div>
        <div className="space-y-2.5 pt-1">
          <label className="text-xs font-bold text-[#bfa043] block">إضافة حساب بنكي</label>
          <input type="text" placeholder="رقم الآيبان" value={formData.iban} onChange={(e) => setFormData({...formData, iban: e.target.value})} className="w-full rounded-xl border border-gray-200 px-3 py-3 text-xs text-gray-700 focus:border-[#c9a84c] focus:outline-none" />
          <input type="text" placeholder="البنك المحول له" value={formData.bankTo} onChange={(e) => setFormData({...formData, bankTo: e.target.value})} className="w-full rounded-xl border border-gray-200 px-3 py-3 text-xs text-gray-700 focus:border-[#c9a84c] focus:outline-none" />
          <input type="text" placeholder="اسم البنك" value={formData.bankName} onChange={(e) => setFormData({...formData, bankName: e.target.value})} className="w-full rounded-xl border border-gray-200 px-3 py-3 text-xs text-gray-700 focus:border-[#c9a84c] focus:outline-none" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-500">سبب الاسترداد</label>
          <textarea rows="3" placeholder="ادخل اي ملاحظات اضافية" value={formData.reason} onChange={(e) => setFormData({...formData, reason: e.target.value})} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-700 focus:border-[#c9a84c] focus:outline-none resize-none" />
        </div>
        <button onClick={onClose} className="w-full rounded-xl bg-[#4a4746] py-3.5 text-xs font-semibold text-white hover:bg-[#383534] transition-colors shadow-md mt-2">معالجة الاسترداد</button>
      </div>
    </div>
  );
}

// ======= 3. بوب أب: تغيير حالة الرحلة =======
function ChangeStatusModal({ isOpen, onClose }) {
  const [selectedStatus, setSelectedStatus] = useState("progress");
  const [reason, setReason] = useState("");

  if (!isOpen) return null;

  const statuses = [
    {
      id: "progress",
      label: "قيد التنفيذ",
      bgClass: "bg-[#f2f2f2] border-gray-200",
      icon: (
        <span className="flex items-center gap-1.5 text-blue-600 font-medium">
          قيد التنفيذ
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block"></span>
        </span>
      )
    },
    {
      id: "completed",
      label: "مكتملة",
      bgClass: "bg-white border-gray-100",
      icon: (
        <span className="flex items-center gap-1.5 text-emerald-500 font-medium">
          مكتملة
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </span>
      )
    },
    {
      id: "cancelled",
      label: "ملغية",
      bgClass: "bg-white border-gray-100",
      icon: (
        <span className="flex items-center gap-1.5 text-red-500 font-medium">
          ملغية
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </span>
      )
    },
    {
      id: "suspended",
      label: "معلقة",
      bgClass: "bg-white border-gray-100",
      icon: (
        <span className="flex items-center gap-1.5 text-[#b09033] font-medium">
          معلقة
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </span>
      )
    }
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 font-sans" 
      dir="rtl"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-[420px] rounded-2xl bg-white shadow-2xl p-6 flex flex-col text-right relative animate-in fade-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute top-5 left-5 text-gray-400 hover:text-gray-600 text-xl transition-colors">&times;</button>
        <div className="mb-4">
          <h3 className="text-md font-bold text-gray-800">تغيير حالة الرحلة</h3>
          <p className="text-[11px] text-gray-400 mt-1">اختر الحالة الجديدة وأدخل سبب التغيير</p>
        </div>
        <label className="text-xs font-medium text-gray-500 mb-2 block">الحالة الجديدة</label>
        <div className="space-y-2 mb-4">
          {statuses.map((status) => {
            const isSelected = selectedStatus === status.id;
            return (
              <div
                key={status.id}
                onClick={() => setSelectedStatus(status.id)}
                className={`flex items-center justify-between border rounded-xl p-3.5 cursor-pointer transition-all ${
                  isSelected ? "border-gray-300 bg-[#f7f7f7]" : "border-gray-100 hover:bg-gray-50"
                }`}
              >
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? "border-gray-400 bg-white" : "border-gray-300"}`}>
                  {isSelected && <div className="w-2 h-2 bg-gray-600 rounded-full"></div>}
                </div>
                <div className="flex items-center gap-2">
                  {status.icon}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col gap-1.5 mb-5">
          <label className="text-xs font-medium text-gray-500">سبب التغيير</label>
          <textarea rows="4" placeholder="ادخل اي ملاحظات اضافية" value={reason} onChange={(e) => setReason(e.target.value)} className="w-full rounded-xl border border-gray-200 px-3 py-3 text-xs text-gray-700 placeholder-gray-300 focus:border-gray-400 focus:outline-none resize-none transition-colors" />
        </div>
        <button onClick={onClose} className="w-full rounded-xl bg-[#4a4746] py-3.5 text-xs font-semibold text-white hover:bg-[#383534] transition-colors shadow-md">تأكيد التغيير</button>
      </div>
    </div>
  );
}

// ======= 4. بوب أب: إضافة دفعة جديدة =======
function AddPaymentModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({ amount: "", date: "", accountFrom: "", accountTo: "", method: "bank", notes: "" });

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 font-sans" 
      dir="rtl"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-[440px] rounded-2xl bg-white shadow-2xl p-6 flex flex-col max-h-[95vh] overflow-y-auto text-right space-y-4 relative animate-in fade-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute top-5 left-5 text-gray-400 hover:text-gray-600 text-xl transition-colors">&times;</button>
        <div className="pb-1">
          <h3 className="text-md font-bold text-gray-800">إضافة دفعة جديدة</h3>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-500">المبلغ</label>
          <input type="number" placeholder="ادخل المبلغ" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} className="w-full rounded-xl border border-gray-200 px-3 py-3 text-xs text-gray-700 placeholder-gray-300 focus:border-[#c9a84c] focus:outline-none transition-colors" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-500">التاريخ</label>
          <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-400 bg-white focus:border-[#c9a84c] focus:outline-none transition-colors" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-500">الحساب المحول منه</label>
          <input type="text" placeholder="ادخل اسم الحساب" value={formData.accountFrom} onChange={(e) => setFormData({...formData, accountFrom: e.target.value})} className="w-full rounded-xl border border-gray-200 px-3 py-3 text-xs text-gray-700 placeholder-gray-300 focus:border-[#c9a84c] focus:outline-none transition-colors" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-500">الحساب المحول إليه</label>
          <input type="text" placeholder="ادخل اسم الحساب" value={formData.accountTo} onChange={(e) => setFormData({...formData, accountTo: e.target.value})} className="w-full rounded-xl border border-gray-200 px-3 py-3 text-xs text-gray-700 placeholder-gray-300 focus:border-[#c9a84c] focus:outline-none transition-colors" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-500">طريقة التحويل</label>
          <div className="relative">
            <select value={formData.method} onChange={(e) => setFormData({...formData, method: e.target.value})} className="w-full rounded-xl border border-gray-200 px-3 py-3 text-xs text-gray-600 bg-white focus:outline-none focus:border-[#c9a84c] appearance-none cursor-pointer">
              <option value="bank">البنك</option>
              <option value="wallet">محفظة إلكترونية</option>
              <option value="cash">نقدي</option>
            </select>
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 text-xs">▼</div>
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-500">إثبات التحويل</label>
          <label className="w-full rounded-xl border border-gray-200 px-3 py-3 text-xs text-gray-500 bg-white flex items-center justify-center gap-2 cursor-pointer border-dashed hover:bg-gray-50 transition-colors">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            <span>اختر الملف</span>
            <input type="file" className="hidden" />
          </label>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-500">ملاحظة</label>
          <textarea rows="3" placeholder="أضف ملاحظة (اختياري)" value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-700 placeholder-gray-300 focus:border-[#c9a84c] focus:outline-none resize-none transition-colors" />
        </div>
        <button onClick={onClose} className="w-full rounded-xl bg-[#4a4746] py-3.5 text-xs font-semibold text-white hover:bg-[#383534] transition-colors shadow-md mt-2">حفظ</button>
      </div>
    </div>
  );
}

// ======= 5. بوب أب: تعديل تفاصيل الرحلة كاملة =======
function EditTripDataModal({ isOpen, onClose }) {
  const [fields, setFields] = useState({
    from: "حي الملقا",
    to: "جامعة الملك سعود",
    city: "الرياض",
    departure: "10 AM",
    returnTime: "10 PM",
    manager: "ساره احمد",
    assistant: "علي احمد"
  });

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 font-sans" 
      dir="rtl"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-[460px] rounded-2xl bg-white shadow-2xl p-6 flex flex-col max-h-[92vh] overflow-y-auto text-right space-y-4 relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* زر الإغلاق */}
        <button onClick={onClose} className="absolute top-5 left-5 text-gray-400 hover:text-gray-600 text-xl transition-colors">&times;</button>
        
        {/* الهيدر */}
        <div className="pb-1">
          <h3 className="text-md font-bold text-gray-800">تعديل تفاصيل الرحلة</h3>
        </div>

        {/* نقطة الانطلاق ونقطة الوصول */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500">نقطة الانطلاق</label>
            <input type="text" value={fields.from} onChange={(e) => setFields({...fields, from: e.target.value})} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-700 focus:border-[#c9a84c] focus:outline-none transition-colors" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500">نقطة الوصول</label>
            <input type="text" value={fields.to} onChange={(e) => setFields({...fields, to: e.target.value})} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-700 focus:border-[#c9a84c] focus:outline-none transition-colors" />
          </div>
        </div>

        {/* المدينة */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-500">المدينة</label>
          <input type="text" value={fields.city} onChange={(e) => setFields({...fields, city: e.target.value})} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-700 focus:border-[#c9a84c] focus:outline-none transition-colors" />
        </div>

        {/* وقت الانطلاق ووقت العودة */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500">وقت الانطلاق</label>
            <input type="text" value={fields.departure} onChange={(e) => setFields({...fields, departure: e.target.value})} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-700 focus:border-[#c9a84c] focus:outline-none transition-colors" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500">وقت العودة</label>
            <input type="text" value={fields.returnTime} onChange={(e) => setFields({...fields, returnTime: e.target.value})} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-700 focus:border-[#c9a84c] focus:outline-none transition-colors" />
          </div>
        </div>

        {/* الموظف المسؤول وتمت بمساعدة */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500">الموظف المسؤول</label>
            <input type="text" value={fields.manager} onChange={(e) => setFields({...fields, manager: e.target.value})} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-700 focus:border-[#c9a84c] focus:outline-none transition-colors" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500">تمت بمساعدة</label>
            <input type="text" value={fields.assistant} onChange={(e) => setFields({...fields, assistant: e.target.value})} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-700 focus:border-[#c9a84c] focus:outline-none transition-colors" />
          </div>
        </div>

        {/* زر حفظ التعديلات */}
        <button onClick={onClose} className="w-full rounded-xl bg-[#c9a84c] py-3.5 text-xs font-semibold text-white hover:bg-[#b8943f] transition-colors shadow-md mt-2">حفظ التعديلات الجديدة</button>
      </div>
    </div>
  );
}

// ======= Main Component =======
export default function TripDetailsPage() {
  const navigate = useNavigate();
  const { tripId } = useParams();
  const [activeTab, setActiveTab] = useState("financial");
  const [noteList, setNoteList] = useState(notes);
  
  // الـ States الخاصة بالتحكم بظهور النوافذ
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showEditTripModal, setShowEditTripModal] = useState(false);

  const tabs = [
    { id: "notes", label: "الملاحظات" },
    { id: "financial", label: "التفاصيل الماليه" },
    { id: "trip", label: "بيانات الرحلة" },
  ];

  const handleAddNote = (text) => {
    const newNote = {
      id: Date.now(),
      text,
      author: "سارة احمد",
      date: new Date().toLocaleDateString("ar-EG"),
    };
    setNoteList((prev) => [newNote, ...prev]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f0e8] font-sans" dir="rtl">

      {/* ===== Page Body ===== */}
      <div className="flex-1 overflow-y-auto p-6">

        {/* Back link */}
        <div className="flex items-center gap-2 text-[#c9a84c] font-semibold text-base mb-4 justify-end">
          <span>تفاصيل الرحلة #{tripId || "35"}</span>
          <ArrowRightIcon />
        </div>

        {/* Action Buttons + Tags */}
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowStatusModal(true)}
              className="flex items-center gap-2 bg-[#1a1a1a] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#333] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              تغيير الحالة
            </button>
            {/* ربط زر تعديل الرحلة بـ State لفتح الـ Pop-up تفاعلياً */}
            <button 
              onClick={() => setShowEditTripModal(true)}
              className="flex items-center gap-2 bg-[#c9a84c] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#b8943f] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              تعديل الرحلة
            </button>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-[#1a1a1a] text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              فردي
            </span>
            <span className="border border-gray-300 text-gray-600 text-xs px-3 py-1.5 rounded-full">مسار واحد</span>
            <span className="border border-gray-300 text-gray-600 text-xs px-3 py-1.5 rounded-full">اشتراك</span>
            <span className="border border-[#c9a84c] bg-[#c9a84c]/10 text-[#c9a84c] text-xs px-3 py-1.5 rounded-full">معلقة</span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-4 text-sm font-semibold transition-colors
                  ${activeTab === tab.id
                    ? "bg-white text-gray-800 border-b-2 border-[#c9a84c]"
                    : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6 text-right">

            {/* Trip Data Tab */}
            {activeTab === "trip" && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-gray-800 font-bold mb-3 text-sm">
                    <span className="text-[#c9a84c]">📍</span>
                    <span>مسار الرحلة</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-xs text-gray-600">
                    <div>
                      <span className="text-gray-400 block mb-1">نقطة الانطلاق:</span>
                      <span className="font-medium">حي الملقا</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block mb-1">نقطة الوصول:</span>
                      <span className="font-medium">جامعة الملك سعود</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block mb-1">المدينة:</span>
                      <span className="font-medium">الرياض</span>
                    </div>
                  </div>
                </div>

                <hr className="border-gray-100" />

                <div>
                  <div className="flex items-center gap-2 text-gray-800 font-bold mb-3 text-sm">
                    <span className="text-[#c9a84c]">📅</span>
                    <span>مواعيد الرحلة</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-xs text-gray-600 mb-3">
                    <div>
                      <span className="text-gray-400 block mb-1">تاريخ البداية:</span>
                      <span className="font-medium">10-3-2020</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block mb-1">تاريخ النهاية:</span>
                      <span className="font-medium">10-3-2020</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block mb-1">ايام التشغيل:</span>
                      <div className="flex gap-1 mt-1">
                        {["السبت", "الاحد", "الاثنين", "الثلاثاء", "الاربعاء"].map((day, idx) => (
                          <span key={idx} className="border border-gray-200 text-gray-400 text-[10px] px-1.5 py-0.5 rounded">
                            {day}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="border-gray-100" />

                <div>
                  <div className="flex items-center gap-2 text-gray-800 font-bold mb-3 text-sm">
                    <span className="text-[#c9a84c]">🕒</span>
                    <span>اوقات الرحلة</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-xs text-gray-600">
                    <div>
                      <span className="text-gray-400 block mb-1">وقت الانطلاق:</span>
                      <span className="font-medium">10 AM</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block mb-1">وقت العودة:</span>
                      <span className="font-medium">10 PM</span>
                    </div>
                  </div>
                </div>

                <hr className="border-gray-100" />

                <div>
                  <div className="flex items-center gap-2 text-gray-800 font-bold mb-3 text-sm">
                    <span className="text-[#c9a84c]">👥</span>
                    <span>الموظفين</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
                    <div>
                      <span className="text-gray-400 block mb-1">الموظف المسؤول:</span>
                      <span className="font-medium">ساره احمد</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block mb-1">تمت بمساعدة:</span>
                      <span className="font-medium">علي احمد</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="bg-blue-50 text-blue-600 rounded-xl p-3 flex justify-between items-center text-sm font-semibold">
                    <span className="text-gray-500 font-normal">نوع الرحلة :</span>
                    <span>ذهاب وعودة</span>
                  </div>
                  <div className="bg-green-50 text-green-600 rounded-xl p-3 flex justify-between items-center text-sm font-semibold">
                    <span className="text-gray-500 font-normal">نوع الاشتراك :</span>
                    <span>شهري</span>
                  </div>
                </div>
              </div>
            )}

            {/* Financial Tab */}
            {activeTab === "financial" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setShowRefundModal(true)} 
                      className="flex items-center gap-1 bg-white border border-gray-300 text-gray-700 text-xs px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      🔄 معالجة إسترداد
                    </button>
                    <button 
                      onClick={() => setShowPaymentModal(true)}
                      className="flex items-center gap-1 bg-[#1a1a1a] text-white text-xs px-3 py-1.5 rounded-lg hover:bg-[#333] transition-colors"
                    >
                      <span className="text-sm leading-none">+</span> اضافة دفعه
                    </button>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-800 font-bold text-sm">
                    <span className="text-[#c9a84c]">💰</span>
                    <span>التفاصيل المالية</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                    <span className="text-blue-500 text-xs font-semibold mb-1">إجمالي سعر الرحلة</span>
                    <span className="text-blue-700 text-lg font-bold">1200 ريال</span>
                  </div>
                  <div className="bg-green-50/60 border border-green-100 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                    <span className="text-green-500 text-xs font-semibold mb-1">المبلغ المدفوع</span>
                    <span className="text-green-700 text-lg font-bold">800 ريال</span>
                  </div>
                  <div className="bg-red-50/60 border border-red-100 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                    <span className="text-red-500 text-xs font-semibold mb-1">الرصيد المستحق</span>
                    <span className="text-red-700 text-lg font-bold">400 ريال</span>
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="border border-gray-200 rounded-2xl p-5 bg-white space-y-4">
                    <div className="flex justify-between items-center">
                      <button className="flex items-center gap-1 border border-gray-200 text-gray-500 text-xs px-2.5 py-1 rounded-lg hover:bg-gray-50 transition-colors">
                        📄 عرض الإثبات
                      </button>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 text-[10px]">2025-2-1</span>
                        <div className="flex items-center gap-1 text-emerald-600 font-bold text-base">
                          <span>1500 رس</span>
                          <span className="text-xs bg-emerald-50 text-emerald-600 p-0.5 rounded-full leading-none">✓</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2.5 text-xs text-gray-600">
                      <div className="bg-gray-50 rounded-xl p-2.5 flex justify-between items-center">
                        <span className="font-medium text-gray-800">السائق</span>
                        <span className="text-gray-400">الدافع:</span>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-2.5 flex justify-between items-center">
                        <span className="font-medium text-gray-800">حساب السائق - البنك الاهلي ➔ حساب الشركة الراجحي</span>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-2.5 flex justify-between items-center">
                        <span className="font-medium text-gray-800">تحويل بنكي</span>
                        <span className="text-gray-400">طريقة التحويل:</span>
                      </div>
                    </div>

                    <div className="bg-amber-50/40 border border-amber-200 rounded-xl p-3 text-right">
                      <span className="text-amber-600 text-[10px] block mb-0.5">ملاحظة:</span>
                      <p className="text-amber-800 font-medium text-xs">دفعة مقدمة للرحلة</p>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-2xl p-5 bg-white space-y-4">
                    <div className="flex justify-between items-center">
                      <button className="flex items-center gap-1 border border-gray-200 text-gray-500 text-xs px-2.5 py-1 rounded-lg hover:bg-gray-50 transition-colors">
                        📄 عرض الإثبات
                      </button>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 text-[10px]">2025-2-23</span>
                        <div className="flex items-center gap-1 text-emerald-600 font-bold text-base">
                          <span>500 رس</span>
                          <span className="text-xs bg-emerald-50 text-emerald-600 p-0.5 rounded-full leading-none">✓</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2.5 text-xs text-gray-600">
                      <div className="bg-gray-50 rounded-xl p-2.5 flex justify-between items-center">
                        <span className="font-medium text-gray-800">السائق</span>
                        <span className="text-gray-400">الدافع:</span>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-2.5 flex justify-between items-center">
                        <span className="font-medium text-gray-800">حساب السائق - البنك الاهلي ➔ حساب الشركة الراجحي</span>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-2.5 flex justify-between items-center">
                        <span className="font-medium text-gray-800">تحويل بنكي</span>
                        <span className="text-gray-400">طريقة التحويل:</span>
                      </div>
                    </div>

                    <div className="bg-amber-50/40 border border-amber-200 rounded-xl p-3 text-right">
                      <p className="text-amber-800 font-medium text-xs">
                        استخدمت العمولة لرحلة اخري <br />
                        رحلة #54 رحلة جماعية _حي الملقي الي مطار الملك خالد
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notes Tab */}
            {activeTab === "notes" && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-1.5 border border-gray-300 text-gray-600 text-sm px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <PlusIcon />
                    اضافة ملاحظة
                  </button>
                  <h3 className="font-semibold text-gray-700 text-base">الملاحظات الإدارية</h3>
                </div>

                <div className="space-y-3">
                  {noteList.map((note) => (
                    <div key={note.id} className="border border-gray-200 rounded-xl p-4 text-right">
                      <p className="text-gray-800 text-sm mb-2">{note.text}</p>
                      <p className="text-gray-400 text-xs">
                        {note.date} . {note.author}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* ===== كروت معلومات السائق والعميل ===== */}
        {activeTab === "trip" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-5 shadow-sm text-right">
              <h4 className="font-bold text-gray-800 text-sm mb-4 border-b border-gray-100 pb-2">معلومات السائق</h4>
              <div className="space-y-2 text-xs text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <span className="text-gray-400">👤 الاسم:</span>
                  <span className="font-medium">احمد علي</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-gray-400">📞 الهاتف:</span>
                  <span className="font-medium" dir="ltr">0544222333</span>
                </div>
              </div>
              <button className="w-full border border-gray-200 text-gray-500 rounded-xl py-2 text-xs hover:bg-gray-50 transition-colors">
                عرض الملف الشخصي
              </button>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm text-right">
              <h4 className="font-bold text-gray-800 text-sm mb-4 border-b border-gray-100 pb-2">معلومات العميل</h4>
              <div className="space-y-2 text-xs text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <span className="text-gray-400">👤 الاسم:</span>
                  <span className="font-medium">احمد علي</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-gray-400">📞 الهاتف:</span>
                  <span className="font-medium" dir="ltr">0544222333</span>
                </div>
              </div>
              <button className="w-full border border-gray-200 text-gray-500 rounded-xl py-2 text-xs hover:bg-gray-50 transition-colors">
                عرض الملف الشخصي
              </button>
            </div>
          </div>
        )}

      </div>

      {/* ===== استدعاء البوب أبز (Modals) ===== */}
      <AddNoteModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddNote}
      />

      <RefundModal
        isOpen={showRefundModal}
        onClose={() => setShowRefundModal(false)}
      />

      <ChangeStatusModal
        isOpen={showStatusModal}
        onClose={() => setShowStatusModal(false)}
      />

      <AddPaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
      />

      <EditTripDataModal
        isOpen={showEditTripModal}
        onClose={() => setShowEditTripModal(false)}
      />
    </div>
  );
}