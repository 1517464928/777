"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Briefcase, FolderKanban, Settings, LayoutDashboard, LogOut } from "lucide-react";
const links = [
  { href: "/admin", label: "概览", icon: LayoutDashboard },
  { href: "/admin/stats", label: "数据看板", icon: BarChart3 },
  { href: "/admin/experiences", label: "经历管理", icon: Briefcase },
  { href: "/admin/projects", label: "项目管理", icon: FolderKanban },
  { href: "/admin/settings", label: "网站设置", icon: Settings },
];
export default function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-56 bg-white border-r border-[#1a1a1a]/5 min-h-screen p-4 flex flex-col">
      <h2 className="text-sm font-semibold text-[#1a1a1a]/40 uppercase tracking-wider mb-6 px-3">管理后台</h2>
      <nav className="flex-1 space-y-1">
        {links.map((l) => {
          const Icon = l.icon;
          const active = pathname === l.href;
          return <Link key={l.href} href={l.href} className={"flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors " + (active ? "bg-amber-50 text-[#f97316] font-medium" : "text-[#1a1a1a]/60 hover:text-[#1a1a1a] hover:bg-[#1a1a1a]/5")}><Icon size={18} />{l.label}</Link>;
        })}
      </nav>
      <a href="/" target="_blank" className="flex items-center gap-3 px-3 py-2 text-sm text-[#1a1a1a]/40 hover:text-[#1a1a1a] rounded-lg hover:bg-[#1a1a1a]/5 transition-colors"><LogOut size={18} />查看网站</a>
    </aside>
  );
}
