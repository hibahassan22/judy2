import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ======= ثابت عدد العناصر في الصفحة =======
const ITEMS_PER_PAGE = 6;

// ======= البيانات التجريبية (Mock Data) =======
const initialDrivers = [
  { id: 1, name: "عبدالله سالم", phone: "0544222333", city: "الرياض", carType: "هيونداي", carModel: "كيميوكمك", email: "abdo@gmail.com", nationality: "سعودي", status: "نشط", statusColor: "bg-green-100 text-green-700 border border-green-200", trips: 45, earnings: "3477", completion: 100, completionColor: "bg-green-500", bankName: "البنك الأهلي", accountOwner: "عبدالله سالم", iban: "397265743504965-43" },
  { id: 2, name: "عبدالرحمن محمد", phone: "0544222444", city: "جدة", carType: "تويوتا", carModel: "كامري", email: "abdo.m@gmail.com", nationality: "سعودي", status: "موقوف", statusColor: "bg-amber-100 text-amber-700 border border-amber-200", trips: 23, earnings: "1250", completion: 70, completionColor: "bg-blue-500", bankName: "بنك الراجحي", accountOwner: "عبدالرحمن محمد", iban: "397265743504965-88" },
  { id: 3, name: "سلمان فهد", phone: "0544222555", city: "الدمام", carType: "كيا", carModel: "أوبتيما", email: "salman@gmail.com", nationality: "سعودي", status: "مجمد", statusColor: "bg-blue-100 text-blue-700 border border-blue-200", trips: 50, earnings: "4120", completion: 100, completionColor: "bg-green-500", bankName: "بنك البلاد", accountOwner: "سلمان فهد", iban: "397265743504965-11" },
  { id: 4, name: "خالد عبد العزيز", phone: "0544222666", city: "الرياض", carType: "مازدا", carModel: "مازدا 6", email: "khaled@gmail.com", nationality: "سعودي", status: "غير مسجل", statusColor: "bg-gray-100 text-gray-500 border border-gray-200", trips: 12, earnings: "0", completion: 0, completionColor: "bg-gray-300", bankName: "مصرف الإنماء", accountOwner: "خالد عبد العزيز", iban: "397265743504965-00" },
  { id: 5, name: "فهد العتيبي", phone: "0544222777", city: "مكة المكرمة", carType: "فورد", carModel: "تورس", email: "fahad@gmail.com", nationality: "سعودي", status: "محظور", statusColor: "bg-red-100 text-red-600 border border-red-200", trips: 5, earnings: "890", completion: 30, completionColor: "bg-red-500", bankName: "البنك السعودي الفرنسي", accountOwner: "فهد العتيبي", iban: "397265743504965-55" }
];

// ======= شريط اكتمال الملف (Progress Bar) =======
const ProgressBar = ({ value, color }) => (
  <div className="flex items-center gap-1.5">
    <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
    </div>
    <span className="text-[10px] text-gray-500">{value}%</span>
  </div>
);

// ======= أزرار التحكم والعمليات في الجدول =======
const ActionIcons = ({ onDelete, onEdit, onView }) => (
  <div className="flex items-center gap-1.5">
    <button onClick={onDelete} className="p-1 text-red-400 hover:text-red-600 transition-colors" title="حذف">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </button>
    <button className="p-1 text-amber-500 hover:text-amber-700 transition-colors" title="إشعار">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    </button>
    <button onClick={onEdit} className="p-1 text-gray-400 hover:text-blue-600 transition-colors" title="تعديل">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    </button>
    <button onClick={onView} className="p-1 text-gray-400 hover:text-gray-600 transition-colors" title="عرض">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    </button>
  </div>
);

// ==========================================
// النوافذ المنبثقة (Modals) الأساسية للعمليات
// ==========================================

// نافذة إرسال إشعار / تنبيه
const AlertModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" dir="rtl">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-md font-bold text-gray-800">إرسال إشعار / تنبيه</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
        </div>
        <div className="p-6 space-y-4">
          <div className="space-y-1">
            <label className="text-xs text-gray-500 font-medium">نوع الإشعار</label>
            <select className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-gray-400 bg-white">
              <option>تنبيه</option><option>إنذار</option><option>رسالة عادية</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs text-gray-500 font-medium">الرسالة</label>
            <textarea placeholder="اكتب رسالة التنبيه..." rows="4" className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-gray-400 bg-white resize-none"></textarea>
          </div>
          <button onClick={onClose} className="w-full bg-[#4a4a4a] hover:bg-[#383838] text-white font-bold py-2.5 px-4 rounded-xl transition-colors text-sm mt-2">إرسال الإشعار</button>
        </div>
      </div>
    </div>
  );
};

// نافذة إيقاف مؤقت
const PauseModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" dir="rtl">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-md font-bold text-gray-800">إيقاف مؤقت للسائق</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
        </div>
        <div className="p-6 space-y-4">
          <div className="space-y-1">
            <label className="text-xs text-gray-500 font-medium">مدة الإيقاف</label>
            <select className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-amber-400 bg-white">
              <option>24 ساعة</option><option>48 ساعة</option><option>أسبوع</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs text-gray-500 font-medium">السبب</label>
            <textarea placeholder="أدخل سبب الإيقاف..." rows="3" className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-amber-400 bg-white resize-none"></textarea>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2 text-amber-800 text-xs">
            <svg className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            <p>خلال فترة الإيقاف، لن يتمكن السائق من استقبال رحلات جديدة</p>
          </div>
          <button onClick={onClose} className="w-full bg-[#d97706] hover:bg-amber-700 text-white font-bold py-2.5 px-4 rounded-xl transition-colors text-sm mt-2">تأكيد الإيقاف</button>
        </div>
      </div>
    </div>
  );
};

// نافذة تجميد الحساب
const FreezeModal = ({ isOpen, onClose, driverName }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" dir="rtl">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-md font-bold text-gray-800">تجميد حساب السائق</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
        </div>
        <div className="p-6 space-y-5">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800 space-y-2">
            <h4 className="font-bold">ماذا يعني التجميد؟</h4>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>منع استقبال رحلات جديدة</li><li>السماح بتصفية الحسابات المالية فقط</li><li>يمكن إلغاء التجميد في أي وقت</li>
            </ul>
          </div>
          <p className="text-sm text-gray-700 text-center font-medium">هل أنت متأكد من تجميد حساب {driverName}؟</p>
          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2.5 px-4 rounded-xl transition-colors text-sm">إلغاء</button>
            <button onClick={onClose} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-xl transition-colors text-sm">تأكيد التجميد</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// نافذة حظر نهائي
const BlockModal = ({ isOpen, onClose, driverName }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" dir="rtl">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-md font-bold text-gray-800">حظر نهائي للسائق</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
        </div>
        <div className="p-6 space-y-5">
          <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-sm text-red-800 space-y-2">
            <h4 className="font-bold flex items-center gap-1.5"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>تحذير: إجراء نهائي</h4>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>منع تسجيل الدخول نهائياً</li><li>لن يتمكن من استخدام التطبيق</li><li>سيظهر في النظام كـ "محظور"</li>
            </ul>
          </div>
          <p className="text-sm text-gray-700 text-center font-medium leading-relaxed">هل أنت متأكد من حظر {driverName} نهائياً؟ هذا الإجراء لا يمكن التراجع عنه بسهولة.</p>
          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2.5 px-4 rounded-xl transition-colors text-sm">إلغاء</button>
            <button onClick={onClose} className="w-full bg-[#dc2626] hover:bg-red-700 text-white font-bold py-2.5 px-4 rounded-xl transition-colors text-sm">تأكيد الحظر النهائي</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// نافذة تأكيد الحذف
const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, driverName }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" dir="rtl">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl overflow-hidden p-6 text-center space-y-5">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">تأكيد الحذف</h3>
          <p className="text-sm text-gray-500">هل أنت متأكد أنك تريد حذف بيانات السائق <span className="font-bold text-gray-800">{driverName}</span>؟ لا يمكن التراجع عن هذا الإجراء.</p>
        </div>
        <div className="flex gap-3 pt-2">
          <button onClick={onClose} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2.5 px-4 rounded-xl transition-colors text-sm">إلغاء</button>
          <button onClick={onConfirm} className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2.5 px-4 rounded-xl transition-colors text-sm">حذف السائق</button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// نافذة إضافة/تعديل السائق (مدمجة معاً)
// ==========================================
const DriverFormModal = ({ isOpen, onClose, driverData }) => {
  if (!isOpen) return null;
  const isEditing = Boolean(driverData);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" dir="rtl">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* الهيدر */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-md font-bold text-gray-800">{isEditing ? "تعديل بيانات السائق" : "أضافة سائق جديد"}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-50 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* محتوى الاستمارة */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50">
          {/* المعلومات الشخصية */}
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-[#c9a84c] font-bold text-sm mb-2">
              <span className="text-lg">$</span><h4>المعلومات الشخصية</h4>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-gray-500 block">أسم السائق</label>
                <input type="text" defaultValue={driverData?.name || ""} placeholder="ادخل اسم السائق" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#c9a84c] bg-white text-right" />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-500 block">رقم الهاتف</label>
                <input type="text" defaultValue={driverData?.phone || ""} placeholder="ادخل الرقم" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#c9a84c] bg-white text-right" />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-500 block">المدينه</label>
                <input type="text" defaultValue={driverData?.city || ""} placeholder="ادخل مدينة السائق" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#c9a84c] bg-white text-right" />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-500 block">الجنسية</label>
                <input type="text" defaultValue={driverData?.nationality || ""} placeholder="ادخل جنسية السائق" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#c9a84c] bg-white text-right" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-gray-500 block">البريد الإلكتروني</label>
                <input type="email" defaultValue={driverData?.email || ""} placeholder="ادخل بريد السائق" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#c9a84c] bg-white text-right" />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-500 block">جنس السائق</label>
                <input type="text" defaultValue="ذكر" placeholder="ادخل جنس السائق" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#c9a84c] bg-white text-right" />
              </div>
            </div>
            <div className="space-y-1 mt-2">
              <label className="text-xs text-gray-500 block">صورة الهوية</label>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-5 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-50">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                <span className="text-xs text-gray-400">اختر ملف الصورة او سحبها هنا</span>
              </div>
            </div>
          </div>

          {/* المعلومات المالية */}
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-[#c9a84c] font-bold text-sm mb-2">
              <span className="text-lg">$</span><h4>المعلومات المالية</h4>
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs text-gray-500 block">اسم البنك</label>
                <input type="text" defaultValue={driverData?.bankName || ""} placeholder="ادخل اسم البنك" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#c9a84c] bg-white text-right" />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-500 block">اسم صاحب الحساب</label>
                <input type="text" defaultValue={driverData?.accountOwner || ""} placeholder="ادخل اسم صاحب الحساب" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#c9a84c] bg-white text-right" />
                <p className="text-[10px] text-gray-400 mt-1">لابد ان يتطابق مع اسم السائق</p>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-500 block">الآيبان</label>
                <input type="text" defaultValue={driverData?.iban || ""} placeholder="ادخل رقم الآيبان" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#c9a84c] bg-white text-right dir-ltr placeholder-right text-left" />
              </div>
            </div>
          </div>

          {/* معلومات السيارة */}
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-[#c9a84c] font-bold text-sm mb-2">
              <span className="text-lg">$</span><h4>معلومات السيارة</h4>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-gray-500 block">نوع السيارة</label>
                <input type="text" defaultValue={driverData?.carType || ""} placeholder="ادخل نوع السيارة" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#c9a84c] bg-white text-right" />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-500 block">موديل السيارة</label>
                <input type="text" defaultValue={driverData?.carModel || ""} placeholder="ادخل موديل السيارة" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#c9a84c] bg-white text-right" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-500 block">حجم السيارة</label>
              <input type="text" defaultValue="" placeholder="اختر حجم السيارة" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#c9a84c] bg-white text-right" />
            </div>
            <div className="space-y-1 mt-2">
              <label className="text-xs text-gray-500 block">صورة السيارة</label>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-5 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-50">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                <span className="text-xs text-gray-400">اختر ملف الصورة او سحبها هنا</span>
              </div>
            </div>
          </div>
        </div>

        {/* التذييل */}
        <div className="p-4 bg-white border-t border-gray-100 flex justify-between items-center bg-[#4a4a4a] rounded-b-2xl">
          <button type="button" onClick={onClose} className="w-full text-white font-bold py-2 px-4 hover:bg-[#383838] rounded-xl transition-colors text-center text-sm">
            {isEditing ? "حفظ التعديلات" : "إضافة سائق"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// نافذة إسناد رحلة جديدة
// ==========================================
const AssignTripModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" dir="rtl">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-md font-bold text-gray-800">إسناد رحلة جديدة</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-50 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">

          {/* معلومات اساسية */}
          <div className="bg-[#fcfbf9] p-5 rounded-xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-[#c9a84c] font-bold text-sm mb-1">
              <span className="text-lg">$</span><h4>معلومات اساسية</h4>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-500 block">رقم الرحله</label>
              <input type="text" placeholder="اكتب رقم الرحلة" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#c9a84c] bg-white text-right" />
            </div>
          </div>

          {/* التفاصيل المالية */}
          <div className="bg-[#fcfbf9] p-5 rounded-xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-[#c9a84c] font-bold text-sm mb-1">
              <span className="text-lg">$</span><h4>التفاصيل المالية</h4>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-gray-500 block">المدفوع</label>
                <input type="text" placeholder="ادخل المبلغ المدفوع" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#c9a84c] bg-white text-right" />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-500 block">عمولتنا</label>
                <input type="text" placeholder="ادخل العمولة...." className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#c9a84c] bg-white text-right" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-500 block">سعر الرحلة الكاملة</label>
              <input type="text" placeholder="ادخل سعر الرحلة" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#c9a84c] bg-white text-right" />
            </div>
          </div>

          {/* حساب التحويل */}
          <div className="bg-[#fcfbf9] p-5 rounded-xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-[#c9a84c] font-bold text-sm mb-1">
              <span className="text-lg">$</span><h4>حساب التحويل</h4>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-gray-500 block">إلي</label>
                <input type="text" placeholder="ادخل اسم الحساب" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#c9a84c] bg-white text-right" />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-500 block">من</label>
                <input type="text" placeholder="ادخل اسم الحساب" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#c9a84c] bg-white text-right" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-gray-500 block">طريقة التحويل</label>
                <div className="relative">
                  <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#c9a84c] bg-white text-gray-400 appearance-none text-right">
                    <option>البنك</option>
                    <option>كاش</option>
                  </select>
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-500 block">رفع صورة التحويل</label>
                <button className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                  اختر الملف
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-gray-100 flex justify-between items-center bg-[#4a4a4a] rounded-b-2xl">
          <button type="button" onClick={onClose} className="w-full text-white font-bold py-2.5 px-4 hover:bg-[#383838] rounded-xl transition-colors text-center text-sm">
            إسناد رحلة
          </button>
        </div>
      </div>
    </div>
  );
};


// ==========================================
// مكوّن صفحة تفاصيل السائق الكاملة
// ==========================================
const DriverDetailsPage = ({ driver, onBack, onEditRequest, onDeleteRequest }) => {
  const [activeModal, setActiveModal] = useState(null);
  const [activeTab, setActiveTab] = useState('personal');
  const closeModal = () => setActiveModal(null);

  return (
    <div className="w-full space-y-4" dir="rtl">
      {/* هيدر التنقل والعودة */}
      <div className="flex justify-between items-center mb-2">
        <button onClick={onBack} className="flex items-center gap-1.5 text-gray-500 hover:text-gray-800 font-medium text-sm transition-colors">
          <svg className="w-4 h-4 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          العودة إلي السائقين
        </button>
      </div>

      {/* الكارت العلوي لبيانات السائق وأزرار التحكم */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gray-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
            {driver.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-lg font-bold text-gray-800">{driver.name}</h2>
              <span className={`text-xs px-2.5 py-0.5 rounded-lg font-medium ${driver.statusColor}`}>{driver.status}</span>
            </div>
            <p className="text-xs text-gray-400 mt-1" dir="ltr">{driver.phone} | {driver.email}</p>
          </div>
        </div>

        {/* مجموعة أزرار العمليات */}
        <div className="flex flex-wrap gap-1.5 text-xs font-semibold">
          <button onClick={() => setActiveModal('alert')} className="bg-blue-600 text-white px-3 py-2 rounded-xl hover:bg-blue-700 transition-colors">إرسال تنبيه</button>
          <button onClick={() => setActiveModal('pause')} className="bg-amber-500 text-white px-3 py-2 rounded-xl hover:bg-amber-600 transition-colors">إيقاف مؤقت</button>
          <button onClick={() => setActiveModal('freeze')} className="bg-blue-400 text-white px-3 py-2 rounded-xl hover:bg-blue-500 transition-colors">تجميد</button>
          <button onClick={() => setActiveModal('block')} className="bg-red-600 text-white px-3 py-2 rounded-xl hover:bg-red-700 transition-colors">حظر نهائي</button>
          <button onClick={() => onEditRequest(driver)} className="border border-gray-200 text-gray-600 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors">تعديل</button>
          <button onClick={() => onDeleteRequest(driver)} className="border border-red-200 text-red-500 px-3 py-2 rounded-xl hover:bg-red-50 transition-colors">حذف</button>
          <button onClick={() => setActiveModal('assignTrip')} className="bg-neutral-800 text-white px-3 py-2 rounded-xl hover:bg-neutral-900 transition-colors">+ إسناد رحلة</button>
        </div>
      </div>

      {/* شريط نسبة اكتمال الملف الشخصي */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm space-y-2">
        <div className="flex justify-between text-xs text-gray-500 font-medium"><span>نسبة اكتمال الملف الشخصي</span><span>{driver.completion}%</span></div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-green-500 rounded-full" style={{ width: `${driver.completion}%` }} /></div>
      </div>

      {/* التبويبات والـ Tabs الداخلية */}
      <div className="bg-white rounded-2xl p-2 border border-gray-100 shadow-sm flex gap-6 text-sm font-semibold text-gray-400 overflow-x-auto whitespace-nowrap">
        <span onClick={() => setActiveTab('personal')} className={`px-3 py-1 cursor-pointer transition-colors ${activeTab === 'personal' ? 'text-[#c9a84c] border-b-2 border-[#c9a84c]' : 'hover:text-gray-700'}`}>المعلومات الشخصية</span>
        <span onClick={() => setActiveTab('trips')} className={`px-3 py-1 cursor-pointer transition-colors ${activeTab === 'trips' ? 'text-[#c9a84c] border-b-2 border-[#c9a84c]' : 'hover:text-gray-700'}`}>سجل الرحلات</span>
        <span onClick={() => setActiveTab('violations')} className={`px-3 py-1 cursor-pointer transition-colors ${activeTab === 'violations' ? 'text-[#c9a84c] border-b-2 border-[#c9a84c]' : 'hover:text-gray-700'}`}>المخالفات والتنبيهات</span>
        <span onClick={() => setActiveTab('notes')} className={`px-3 py-1 cursor-pointer transition-colors ${activeTab === 'notes' ? 'text-[#c9a84c] border-b-2 border-[#c9a84c]' : 'hover:text-gray-700'}`}>الملاحظات</span>
        <span onClick={() => setActiveTab('ratings')} className={`px-3 py-1 cursor-pointer transition-colors ${activeTab === 'ratings' ? 'text-[#c9a84c] border-b-2 border-[#c9a84c]' : 'hover:text-gray-700'}`}>التقييمات</span>
      </div>

      {/* محتوى التبويبات المتغير */}
      <div className="mt-4">

        {/* ============ محتوى المعلومات الشخصية ============ */}
        {activeTab === 'personal' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* اليمين: كارت المعلومات الشخصية */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-[#c9a84c] flex items-center gap-1.5">📝 المعلومات الشخصية</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-400">الاسم كامل</span><span className="text-gray-700 font-medium">{driver.name}</span></div>
                <div className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-400">رقم الهاتف</span><span className="text-gray-700 font-medium" dir="ltr">{driver.phone}</span></div>
                <div className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-400">العنوان</span><span className="text-gray-700 font-medium">{driver.city}</span></div>
                <div className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-400">البريد</span><span className="text-gray-700 font-medium">{driver.email}</span></div>
                <div className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-400">الجنسية</span><span className="text-gray-700 font-medium">{driver.nationality}</span></div>
                <div className="flex justify-between pb-1"><span className="text-gray-400">المدينة</span><span className="text-gray-700 font-medium">{driver.city}</span></div>
              </div>
            </div>

            {/* اليسار: معلومات السيارة + التفاصيل المالية */}
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-[#c9a84c] flex items-center gap-1.5">🚗 معلومات السيارة</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-400">نوع السيارة</span><span className="text-gray-700 font-medium">{driver.carType}</span></div>
                  <div className="flex justify-between pb-2"><span className="text-gray-400">موديل السيارة</span><span className="text-gray-700 font-medium">{driver.carModel}</span></div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-[#c9a84c] flex items-center gap-1.5">💳 التفاصيل المالية</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-400">اسم البنك</span><span className="text-gray-700 font-medium">{driver.bankName}</span></div>
                  <div className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-400">اسم صاحب الحساب</span><span className="text-gray-700 font-medium">{driver.accountOwner}</span></div>
                  <div className="flex justify-between pb-1"><span className="text-gray-400">رقم الآيبان</span><span className="text-gray-700 font-medium font-mono text-xs">{driver.iban}</span></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============ محتوى التقييمات ============ */}
        {/* ============ محتوى التقييمات ============ */}
{/* ============ محتوى التقييمات ============ */}
        {activeTab === 'ratings' && (
          <div className="space-y-4">
            <h3 className="text-gray-800 font-bold text-base text-right px-2">التقييمات</h3>

            {/* استخدام justify-end لضمان محاذاة الكارت لليمين */}
            <div className="flex justify-end">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm w-full lg:w-[48%]">
                <h4 className="text-sm font-bold text-gray-800 mb-8 text-right">تقييم السائق</h4>

                {/* تعديل ترتيب النجوم والرقم، flex-col عشان يكونوا فوق بعض */}
                <div className="flex flex-col items-center justify-center gap-2 mb-10">
                  <div className="flex gap-1.5 flex-row-reverse">
                    {/* 3 نجوم ممتلئة */}
                    <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    {/* 2 نجوم مفرغة */}
                    <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                    <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                  </div>
                  <span className="text-sm font-bold text-gray-700 tracking-widest mt-1">3/5</span>
                </div>

                <button className="w-full py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 text-sm font-bold hover:bg-gray-100 transition-colors">
                  حفظ التقييم
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============ محتوى الملاحظات ============ */}
        {activeTab === 'notes' && (
          <div className="space-y-4">
            {/* عنوان القسم وزر الإضافة */}
            <div className="flex justify-between items-center px-2 mb-2">
              <h3 className="text-gray-800 font-bold text-base">الملاحظات الإدارية</h3>
              <button className="flex items-center gap-1.5 text-xs border border-gray-200 px-3 py-1.5 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors bg-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                اضافة ملاحظة
              </button>
            </div>

            {/* قائمة الملاحظات */}
            <div className="space-y-3">
              {/* الملاحظة الأولى */}
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-1.5">
                <h4 className="text-sm font-bold text-gray-800">السائق ملتزم بالمواعيد</h4>
                <span className="text-xs text-gray-400">1-2-2026 . سارة احمد</span>
              </div>

              {/* الملاحظة الثانية */}
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-1.5">
                <h4 className="text-sm font-bold text-gray-800">افتعال مشكلة مع العميل</h4>
                <span className="text-xs text-gray-400">1-2-2026 . سارة احمد</span>
              </div>
            </div>
          </div>
        )}

        {/* ============ محتوى المخالفات والتنبيهات ============ */}
        {activeTab === 'violations' && (
          <div className="space-y-3">
            
            {/* الكارت الأول: تنبيه */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
              <div className="flex justify-start  items-center mb-2.5">
                <span className="bg-blue-50 text-blue-500 text-xs font-bold px-3 py-1 rounded-lg">
                  تنبيه
                </span>
                <span className="text-xs m-3 text-gray-400 font-medium">16-12-2025</span>
              </div>
              <h4 className="text-sm font-bold text-gray-800 mb-1">التأخر عن موعد الرحلة</h4>
              <span className="text-xs text-gray-400">بواسطة :ام ياسمين</span>
            </div>

            {/* الكارت الثاني: إنذار */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
              <div className="flex justify-start  items-center mb-2.5">
                <span className="bg-red-50 text-red-500 text-xs font-bold px-3 py-1 rounded-lg">
                  إنذار
                </span>
                <span className="text-xs m-3 text-gray-400 font-medium">16-12-2025</span>
              </div>
              <h4 className="text-sm font-bold text-gray-800 mb-1">شكوي من العميل</h4>
              <span className="text-xs text-gray-400">بواسطة :ام ياسمين</span>
            </div>

          </div>
        )}

      </div> {/* <--- دي القفلة اللي كانت ناقصة (بتاعة ديف الـ mt-4 اللي جواه كل التبويبات) */}

      {/* استدعاء النوافذ المنبثقة هنا */}
      <AlertModal isOpen={activeModal === 'alert'} onClose={closeModal} />
      <PauseModal isOpen={activeModal === 'pause'} onClose={closeModal} />
      <FreezeModal isOpen={activeModal === 'freeze'} onClose={closeModal} driverName={driver.name} />
      <BlockModal isOpen={activeModal === 'block'} onClose={closeModal} driverName={driver.name} />
      <AssignTripModal isOpen={activeModal === 'assignTrip'} onClose={closeModal} />

    </div> 
  );
};
      // ==========================================
      // المكون الأساسي لصفحة السائقين (الجدول الرئيسي)
      // ==========================================
      export default function DriversPage() {
  const [drivers, setDrivers] = useState(initialDrivers);
      const [page, setPage] = useState(1);

      // التحكم في عرض صفحة التفاصيل
      const [selectedDriver, setSelectedDriver] = useState(null);

      // التحكم في نوافذ الإضافة، التعديل، والحذف (Global Modals)
      const [modalState, setModalState] = useState({type: null, driver: null });
  const closeGlobalModal = () => setModalState({type: null, driver: null });

      const totalPages = Math.ceil(drivers.length / ITEMS_PER_PAGE);
      const paginated = drivers.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  // دالة تأكيد الحذف
  const executeDelete = () => {
    if (modalState.driver) {
        setDrivers(prev => prev.filter(d => d.id !== modalState.driver.id));
      if (selectedDriver?.id === modalState.driver.id) setSelectedDriver(null); // العودة للجدول لو كنت بصفحة التفاصيل
    }
      closeGlobalModal();
  };

      // لو السائق محدد، نعرض صفحة التفاصيل الخاصة به بدلاً من الجدول
      if (selectedDriver) {
    return (
      <>
        <DriverDetailsPage
          driver={selectedDriver}
          onBack={() => setSelectedDriver(null)}
          onEditRequest={(d) => setModalState({ type: 'edit', driver: d })}
          onDeleteRequest={(d) => setModalState({ type: 'delete', driver: d })}
        />
        {/* استدعاء النوافذ المنبثقة العامة (تعديل - حذف) */}
        <DriverFormModal isOpen={modalState.type === 'edit'} onClose={closeGlobalModal} driverData={modalState.driver} />
        <DeleteConfirmModal isOpen={modalState.type === 'delete'} onClose={closeGlobalModal} onConfirm={executeDelete} driverName={modalState.driver?.name} />
      </>
      );
  }

      return (
      <div className="w-full space-y-4" dir="rtl">
        {/* الهيدر والعنوان الرئيسي */}
        <div className="text-right">
          <h1 className="text-xl font-bold text-[#c9a84c]">قائمة السائقين</h1>
          <p className="text-xs text-gray-400 mt-0.5">إدارة ومتابعة السائقين والمهام بلحظة</p>
        </div>

        {/* البانر الإعلاني */}
        <div className="relative bg-gradient-to-l from-[#b88121] to-[#dca43b] rounded-2xl overflow-hidden min-h-[150px] flex items-center justify-between px-8 shadow-sm">
          <div className="z-10 text-white text-right">
            <h2 className="text-5xl font-extrabold">{drivers.length} <span className="text-2xl font-normal">سائق</span></h2>
            <p className="text-sm opacity-80 mt-1">عدد السائقين المسجلين</p>
            <button
              onClick={() => setModalState({ type: 'add', driver: null })}
              className="mt-4 flex items-center gap-2 bg-white text-[#b88121] text-sm font-semibold px-5 py-2 rounded-full shadow hover:bg-amber-50 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              أضافة سائق جديد
            </button>
          </div>
        </div>

        {/* جدول عرض السائقين */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-right">
              <thead>
                <tr className="bg-[#f9f6f0] border-b border-gray-100">
                  {["الأسم", "رقم السائق", "المدينة", "نوع السياره", "حالة الحساب", "عدد الرحلات", "المستحقات", "اكتمال الملف", "إجراءات"].map(h => (
                    <th key={h} className="px-4 py-3.5 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.map((driver) => (
                  <tr key={driver.id} className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors">
                    <td className="px-4 py-3.5 font-medium text-gray-800 whitespace-nowrap">{driver.name}</td>
                    <td className="px-4 py-3.5 text-gray-600" dir="ltr">{driver.phone}</td>
                    <td className="px-4 py-3.5 text-gray-600">{driver.city}</td>
                    <td className="px-4 py-3.5 text-gray-600">{driver.carType}</td>
                    <td className="px-4 py-3.5"><span className={`text-xs px-2.5 py-1 rounded-lg font-medium ${driver.statusColor}`}>{driver.status}</span></td>
                    <td className="px-4 py-3.5 text-gray-700 font-medium">{driver.trips}</td>
                    <td className="px-4 py-3.5 text-gray-700 whitespace-nowrap">{driver.earnings} ر.س</td>
                    <td className="px-4 py-3.5"><ProgressBar value={driver.completion} color={driver.completionColor} /></td>
                    <td className="px-4 py-3.5">
                      {/* تمرير دوال الـ Edit والـ Delete مع تمرير بيانات السائق لكل أداة */}
                      <ActionIcons
                        onDelete={() => setModalState({ type: 'delete', driver })}
                        onEdit={() => setModalState({ type: 'edit', driver })}
                        onView={() => setSelectedDriver(driver)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* الترقيم السفلي */}
          <div className="flex justify-center items-center gap-1 py-4 text-xs text-gray-600" dir="ltr">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} className="p-1.5 bg-white border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-40" disabled={page === 1}><svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg></button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
              <button key={n} onClick={() => setPage(n)} className={`w-7 h-7 rounded font-bold transition-colors ${page === n ? "bg-amber-500 text-white shadow-sm" : "bg-white border border-gray-200 hover:bg-gray-50"}`}>{n}</button>
            ))}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} className="p-1.5 bg-white border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-40" disabled={page === totalPages}><svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button>
          </div>
        </div>

        {/* استدعاء النوافذ المنبثقة العامة (تعديل - إضافة - حذف) */}
        <DriverFormModal isOpen={modalState.type === 'add' || modalState.type === 'edit'} onClose={closeGlobalModal} driverData={modalState.driver} />
        <DeleteConfirmModal isOpen={modalState.type === 'delete'} onClose={closeGlobalModal} onConfirm={executeDelete} driverName={modalState.driver?.name} />

      </div>
      );
}