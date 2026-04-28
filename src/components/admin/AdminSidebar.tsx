"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Building2, Users, HardHat, LogOut } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Buildings", path: "/admin/buildings", icon: Building2 },
    { name: "Residents", path: "/admin/residents", icon: Users },
    { name: "Operations", path: "/admin/cases", icon: HardHat },
  ];

  return (
    <aside className="w-[260px] bg-brand-dark flex flex-col text-slate-300">
      <div className="p-6">
        <h1 className="text-xl font-bold text-white tracking-tight">Barobaro<br />Management</h1>
        <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">Admin Portal</p>
      </div>

      <nav className="flex-1 mt-6">
        <ul className="flex flex-col gap-2 px-4">
          {navItems.map((item) => {
            const isActive = pathname === item.path || (item.path !== '/admin' && pathname?.startsWith(item.path));
            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${
                    isActive
                      ? "bg-brand-primary text-white"
                      : "hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <item.icon size={20} className={isActive ? "text-white" : "text-slate-400"} />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-800 mt-auto">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-lg hover:bg-slate-800 hover:text-white transition-colors text-sm font-medium"
        >
          <LogOut size={20} className="text-slate-400" />
          Logout
        </button>
      </div>
    </aside>
  );
}
