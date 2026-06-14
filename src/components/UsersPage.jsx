import { useState } from "react";

// ======= Mock Data =======
const initialUsers = [
  { id: 1, name: "عبدالله سالم", role: "مدير النظام", status: "نشط", date: "1-2-2026" },
  { id: 2, name: "ام سلمى", role: "خدمة عملاء", status: "نشط", date: "1-2-2026" },
  { id: 3, name: "محمد خالد", role: "خدمة عملاء", status: "معطل", date: "1-2-2026" },
  { id: 4, name: "محمود عبدو", role: "خدمة عملاء", status: "نشط", date: "1-2-2026" },
  { id: 5, name: "ساره علي", role: "المشرف", status: "معطل", date: "1-2-2026" },
];

const roles = ["جميع الأدوار", "مدير النظام", "خدمة عملاء", "المشرف"];

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [form, setForm] = useState({ name: "", password: "", role: "" });
  const [roleFilter, setRoleFilter] = useState("جميع الأدوار");
  const [nameFilter, setNameFilter] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    if (!form.name || !form.role) return;
    setUsers((prev) => [
      ...prev,
      { id: prev.length + 1, name: form.name, role: form.role, status: "نشط", date: new Date().toLocaleDateString("ar-EG") },
    ]);
    setForm({ name: "", password: "", role: "" });
  };

  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const filtered = users.filter((u) => {
    const matchRole = roleFilter === "جميع الأدوار" || u.role === roleFilter;
    const matchName = u.name.includes(nameFilter);
    return matchRole && matchName;
  });

  return (
    <div className="w-full space-y-5" dir="rtl">

      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-semibold text-[#c9a84c]">المستخدمين</h1>
        <p className="text-xs text-gray-400 mt-0.5">إدارة مستخدمي لوحة التحكم</p>
      </div>

      {/* Create User Card */}
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <h2 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <svg className="w-4 h-4 text-[#c9a84c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
          إنشاء مستخدم جديد
        </h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">اسم المستخدم</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="ادخل اسم المستخدم"
              className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder-gray-300"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">كلمة المرور</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="أدخل كلمة المرور"
              className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder-gray-300"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 mb-4">
          <label className="text-xs text-gray-500">الدور</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 text-gray-500"
          >
            <option value="">أختر الدور</option>
            {roles.slice(1).map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-[#c9a84c] hover:bg-[#b8943f] text-white text-sm px-5 py-2 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            حفظ
          </button>
        </div>
      </div>

      {/* Users Table Card */}
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <h2 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <svg className="w-4 h-4 text-[#c9a84c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M17 20h5v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2h5M12 12a4 4 0 100-8 4 4 0 000 8z" />
          </svg>
          سجل المستخدمين
        </h2>

        {/* Filters */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">فلتر حسب الدور</label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 text-gray-500"
            >
              {roles.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">فلتر حسب الاسم</label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2">
              <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                placeholder="ابحث هنا ..."
                className="bg-transparent text-sm outline-none w-full placeholder-gray-300"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-gray-100">
          <table className="w-full text-sm text-right">
            <thead>
              <tr className="bg-[#f9f6f0] border-b border-gray-100">
                {["الاسم", "الدور", "الحالة", "تاريخ الإنشاء", "إجراءات"].map((h) => (
                  <th key={h} className="px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors">
                  <td className="px-4 py-3.5 font-medium text-gray-800">{user.name}</td>
                  <td className="px-4 py-3.5">
                    <span className="border border-gray-200 text-gray-600 text-xs px-2.5 py-1 rounded-full">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium
                      ${user.status === "نشط" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-gray-400 whitespace-nowrap">{user.date}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <button className="flex items-center gap-1 border border-gray-200 text-gray-600 text-xs px-2.5 py-1 rounded-lg hover:bg-gray-50 transition-colors">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        تعديل
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="flex items-center gap-1 border border-red-200 text-red-500 text-xs px-2.5 py-1 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        حذف
                      </button>
                      <button className="flex items-center gap-1 border border-gray-200 text-gray-600 text-xs px-2.5 py-1 rounded-lg hover:bg-gray-50 transition-colors">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        استثناء صلاحيات
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-gray-400 text-sm py-8">لا يوجد مستخدمين</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
