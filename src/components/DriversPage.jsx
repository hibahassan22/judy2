import { useState } from "react";

// ======= ثابت عدد العناصر في الصفحة =======
const ITEMS_PER_PAGE = 6;

// ======= البيانات التجريبية (Mock Data) =======
const initialDrivers = [
  { 
    id: 1, 
    name: "عبدالله سالم", 
    phone: "0544222333", 
    city: "الرياض", 
    carType: "هيونداي", 
    carModel: "كيميوكمك", 
    email: "abdo@gmail.com", 
    nationality: "سعودي", 
    status: "نشط", 
    statusColor: "bg-green-100 text-green-700 border border-green-200", 
    trips: 45, 
    earnings: "3477", 
    completion: 100, 
    completionColor: "bg-green-500", 
    bankName: "البنك الأهلي", 
    accountOwner: "عبدالله سالم", 
    iban: "397265743504965-43" 
  },
  { 
    id: 2, 
    name: "عبدالرحمن محمد", 
    phone: "0544222444", 
    city: "جدة", 
    carType: "تويوتا", 
    carModel: "كامري", 
    email: "abdo.m@gmail.com", 
    nationality: "سعودي", 
    status: "موقوف", 
    statusColor: "bg-amber-100 text-amber-700 border border-amber-200", 
    trips: 23, 
    earnings: "1250", 
    completion: 70, 
    completionColor: "bg-blue-500", 
    bankName: "بنك الراجحي", 
    accountOwner: "عبدالرحمن محمد", 
    iban: "397265743504965-88" 
  },
  { 
    id: 3, 
    name: "سلمان فهد", 
    phone: "0544222555", 
    city: "الدمام", 
    carType: "كيا", 
    carModel: "أوبتيما", 
    email: "salman@gmail.com", 
    nationality: "سعودي", 
    status: "مجمد", 
    statusColor: "bg-blue-100 text-blue-700 border border-blue-200", 
    trips: 50, 
    earnings: "4120", 
    completion: 100, 
    completionColor: "bg-green-500", 
    bankName: "بنك البلاد", 
    accountOwner: "سلمان فهد", 
    iban: "397265743504965-11" 
  },
  { 
    id: 4, 
    name: "خالد عبد العزيز", 
    phone: "0544222666", 
    city: "الرياض", 
    carType: "مازدا", 
    carModel: "مازدا 6", 
    email: "khaled@gmail.com", 
    nationality: "سعودي", 
    status: "غير مسجل", 
    statusColor: "bg-gray-100 text-gray-500 border border-gray-200", 
    trips: 12, 
    earnings: "0", 
    completion: 0, 
    completionColor: "bg-gray-300", 
    bankName: "مصرف الإنماء", 
    accountOwner: "خالد عبد العزيز", 
    iban: "397265743504965-00" 
  },
  { 
    id: 5, 
    name: "فهد العتيبي", 
    phone: "0544222777", 
    city: "مكة المكرمة", 
    carType: "فورد", 
    carModel: "تورس", 
    email: "fahad@gmail.com", 
    nationality: "سعودي", 
    status: "محظور", 
    statusColor: "bg-red-100 text-red-600 border border-red-200", 
    trips: 5, 
    earnings: "890", 
    completion: 30, 
    completionColor: "bg-red-500", 
    bankName: "البنك السعودي الفرنسي", 
    accountOwner: "فهد العتيبي", 
    iban: "397265743504965-55" 
  }
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
const ActionIcons = ({ onDelete, onView }) => (
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
    <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors" title="تعديل">
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

// ======= مكوّن صفحة تفاصيل السائق الكاملة (مطابقة للاسكرينة) =======
const DriverDetailsPage = ({ driver, onBack }) => {
  return (
    <div className="w-full space-y-4" dir="rtl">
      {/* هيدر التنقل والعودة */}
      <div className="flex justify-between items-center mb-2">
        <button 
          onClick={onBack} 
          className="flex items-center gap-1.5 text-gray-500 hover:text-gray-800 font-medium text-sm transition-colors"
        >
          <svg className="w-4 h-4 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          العودة إلي السائقين
        </button>
      </div>

      {/* الكارت العلوي لبيانات السائق وأزرار التحكم بالحساب */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gray-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
            {driver.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-lg font-bold text-gray-800">{driver.name}</h2>
              <span className={`text-xs px-2.5 py-0.5 rounded-lg font-medium ${driver.statusColor}`}>
                {driver.status}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1" dir="ltr">{driver.phone} | {driver.email}</p>
          </div>
        </div>

        {/* مجموعة أزرار العمليات */}
        <div className="flex flex-wrap gap-1.5 text-xs font-semibold">
          <button className="bg-blue-600 text-white px-3 py-2 rounded-xl hover:bg-blue-700 transition-colors">إرسال تنبيه</button>
          <button className="bg-amber-500 text-white px-3 py-2 rounded-xl hover:bg-amber-600 transition-colors">إيقاف مؤقت</button>
          <button className="bg-blue-400 text-white px-3 py-2 rounded-xl hover:bg-blue-500 transition-colors">تجميد</button>
          <button className="bg-red-600 text-white px-3 py-2 rounded-xl hover:bg-red-700 transition-colors">حظر نهائي</button>
          <button className="border border-gray-200 text-gray-600 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors">تعديل</button>
          <button className="border border-red-200 text-red-500 px-3 py-2 rounded-xl hover:bg-red-50 transition-colors">حذف</button>
          <button className="bg-neutral-800 text-white px-3 py-2 rounded-xl hover:bg-neutral-900 transition-colors">+ إسناد رحلة</button>
        </div>
      </div>

      {/* شريط نسبة اكتمال الملف الشخصي */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm space-y-2">
        <div className="flex justify-between text-xs text-gray-500 font-medium">
          <span>نسبة اكتمال الملف الشخصي</span>
          <span>{driver.completion}%</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-green-500 rounded-full" style={{ width: `${driver.completion}%` }} />
        </div>
      </div>

      {/* التبويبات والـ Tabs الداخلية */}
      <div className="bg-white rounded-2xl p-2 border border-gray-100 shadow-sm flex gap-6 text-sm font-semibold text-gray-400 overflow-x-auto whitespace-nowrap">
        <span className="text-[#c9a84c] border-b-2 border-[#c9a84c] px-3 py-1 cursor-pointer">المعلومات الشخصية</span>
        <span className="hover:text-gray-700 px-3 py-1 cursor-pointer">سجل الرحلات</span>
        <span className="hover:text-gray-700 px-3 py-1 cursor-pointer">المخالفات والتنبيهات</span>
        <span className="hover:text-gray-700 px-3 py-1 cursor-pointer">الملاحظات</span>
        <span className="hover:text-gray-700 px-3 py-1 cursor-pointer">التقييمات</span>
      </div>

      {/* شبكة توزيع البيانات (المعلومات الشخصية، السيارة، والمالية) */}
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
            
            {/* صورة الرخصة كما تظهر بالاسكرينة */}
            <div className="space-y-1.5 pt-2">
              <span className="text-xs text-gray-400 block">صورة الرخصة</span>
              <div className="relative rounded-xl overflow-hidden border border-gray-100 bg-gray-50 h-36 flex items-center justify-center">
                <span className="absolute text-xs bg-red-500 text-white px-4 py-1.5 rounded font-bold shadow z-10 uppercase tracking-widest rotate-12 opacity-80 border border-white">VOID</span>
                <img src="https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=500&auto=format&fit=crop&q=60" alt="License" className="w-full h-full object-cover opacity-50 blur-[0.5px]" />
              </div>
            </div>
          </div>
        </div>

        {/* اليسار: معلومات السيارة + التفاصيل المالية */}
        <div className="space-y-4">
          
          {/* كارت معلومات السيارة */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-[#c9a84c] flex items-center gap-1.5">🚗 معلومات السيارة</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-400">نوع السيارة</span><span className="text-gray-700 font-medium">{driver.carType}</span></div>
              <div className="flex justify-between pb-2"><span className="text-gray-400">موديل السيارة</span><span className="text-gray-700 font-medium">{driver.carModel}</span></div>
              
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="space-y-1">
                  <span className="text-xs text-gray-400 block">صورة السيارة</span>
                  <div className="rounded-xl overflow-hidden border border-gray-100 bg-gray-50 h-28">
                    <img src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500&auto=format&fit=crop&q=60" alt="Car" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-gray-400 block">صورة التسجيل</span>
                  <div className="relative rounded-xl overflow-hidden border border-gray-100 bg-gray-50 h-28 flex items-center justify-center">
                    <span className="absolute text-[10px] bg-red-500 text-white px-3 py-1 rounded font-bold z-10 rotate-12 opacity-80 border border-white">VOID</span>
                    <img src="https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=500&auto=format&fit=crop&q=60" alt="Registration" className="w-full h-full object-cover opacity-40" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* كارت التفاصيل المالية */}
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
    </div>
  );
};

// ======= مكوّن نافذة إضافة سائق جديد (Modal) =======
const AddDriverModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" dir="rtl">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* الهيدر */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-md font-bold text-gray-800">أضافة سائق جديد</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-50 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* محتوى الاستمارة السكرول */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50">
          
          {/* المعلومات الشخصية */}
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-[#c9a84c] font-bold text-sm mb-1">
              <span>📌</span>
              <h4>المعلومات الشخصية</h4>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-gray-500 block">أسم السائق</label>
                <input type="text" placeholder="ادخل اسم السائق" className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#c9a84c] bg-white text-right" />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-500 block">رقم الهاتف</label>
                <input type="text" placeholder="ادخل الرقم" className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#c9a84c] bg-white text-right" />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-500 block">المدينه</label>
                <input type="text" placeholder="ادخل مدينة السائق" className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#c9a84c] bg-white text-right" />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-500 block">الجنسية</label>
                <input type="text" placeholder="ادخل جنسية السائق" className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#c9a84c] bg-white text-right" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-gray-500 block">صورة الهوية</label>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors">
                <span className="text-xs text-gray-400">اختر ملف الصورة او سحبها هنا</span>
              </div>
            </div>
          </div>

          {/* المعلومات المالية */}
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-[#c9a84c] font-bold text-sm mb-1">
              <span>💳</span>
              <h4>المعلومات المالية</h4>
            </div>
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs text-gray-500 block">اسم البنك</label>
                <input type="text" placeholder="ادخل اسم البنك" className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#c9a84c] bg-white text-right" />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-500 block">الآيبان</label>
                <input type="text" placeholder="ادخل رقم الآيبان" className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#c9a84c] bg-white text-right" />
              </div>
            </div>
          </div>

        </div>

        {/* تذييل النافذة */}
        <div className="p-4 bg-white border-t border-gray-100">
          <button type="button" onClick={onClose} className="w-full bg-[#4a4a4a] hover:bg-[#383838] text-white font-bold py-3 px-4 rounded-xl shadow transition-colors text-center text-sm">
            إضافة سائق
          </button>
        </div>
      </div>
    </div>
  );
};

// ======= المكون الأساسي لصفحة السائقين =======
export default function DriversPage() {
  const [drivers, setDrivers] = useState(initialDrivers);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // الحالة المسؤولة عن تبديل الصفحة وعرض تفاصيل السائق الحالي
  const [selectedDriver, setSelectedDriver] = useState(null); 

  const totalPages = Math.ceil(drivers.length / ITEMS_PER_PAGE);
  const paginated = drivers.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleDelete = (id) => setDrivers(prev => prev.filter(d => d.id !== id));

  // شرط التحكم: إذا وجد سائق معين في الـ State، يتم إخفاء الجدول وعرض شاشة التفاصيل مباشرة
  if (selectedDriver) {
    return (
      <DriverDetailsPage 
        driver={selectedDriver} 
        onBack={() => setSelectedDriver(null)} 
      />
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
            onClick={() => setIsModalOpen(true)} 
            className="mt-4 flex items-center gap-2 bg-white text-[#b88121] text-sm font-semibold px-5 py-2 rounded-full shadow hover:bg-amber-50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            أضافة سائق جديد
          </button>
        </div>
        <div className="hidden md:block absolute left-0 bottom-0 h-full w-1/3 pointer-events-none">
          <img src="/path_to_your_image.png" alt="drivers" className="h-full w-full object-contain object-bottom drop-shadow-md" />
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
                  <td className="px-4 py-3.5">
                    <span className={`text-xs px-2.5 py-1 rounded-lg font-medium ${driver.statusColor}`}>
                      {driver.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-gray-700 font-medium">{driver.trips}</td>
                  <td className="px-4 py-3.5 text-gray-700 whitespace-nowrap">{driver.earnings} ر.س</td>
                  <td className="px-4 py-3.5">
                    <ProgressBar value={driver.completion} color={driver.completionColor} />
                  </td>
                  <td className="px-4 py-3.5">
                    {/* تمرير دالة تحديث السائق لعرض بياناته فور النقر على أيقونة العين */}
                    <ActionIcons 
                      onDelete={() => handleDelete(driver.id)} 
                      onView={() => setSelectedDriver(driver)} 
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* الترقيم السفلي (Pagination) */}
        <div className="flex justify-center items-center gap-1 py-4 text-xs text-gray-600" dir="ltr">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} className="p-1.5 bg-white border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-40" disabled={page === 1}>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
            <button key={n} onClick={() => setPage(n)} className={`w-7 h-7 rounded font-bold transition-colors ${page === n ? "bg-amber-500 text-white shadow-sm" : "bg-white border border-gray-200 hover:bg-gray-50"}`}>
              {n}
            </button>
          ))}
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} className="p-1.5 bg-white border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-40" disabled={page === totalPages}>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* استدعاء المودال */}
      <AddDriverModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}