"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Building2, Users, HardHat, LogOut, X } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function AdminSidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Buildings", path: "/admin/buildings", icon: Building2 },
    { name: "Residents", path: "/admin/residents", icon: Users },
    { name: "Operations", path: "/admin/cases", icon: HardHat },
  ];

  return (
    <aside className="w-[280px] h-full bg-brand-dark flex flex-col text-slate-300 shadow-2xl">
      <div className="p-6 flex justify-between items-center border-b border-slate-800/50">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Barobaro<br />Management</h1>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">Admin Portal</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        )}
      </div>

      <nav className="flex-1 mt-6">
        <ul className="flex flex-col gap-2 px-4">
          {navItems.map((item) => {
            const isActive = pathname === item.path || (item.path !== '/admin' && pathname?.startsWith(item.path));
            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  onClick={onClose}
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
