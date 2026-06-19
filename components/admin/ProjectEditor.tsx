"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
interface Proj { id: number; title: string; description: string; imageUrl: string; link: string; order: number; }
interface Props { projects: Proj[]; }
export default function ProjectEditor({ projects: initial }: Props) {
  const [items, setItems] = useState<Proj[]>(initial);
  const router = useRouter();
  const add = () => setItems([...items, { id: -Date.now(), title: "", description: "", imageUrl: "", link: "", order: items.length }]);
  const remove = (id: number) => setItems(items.filter(s => s.id !== id));
  const upd = (id: number, field: string, val: string) => setItems(items.map(s => s.id === id ? { ...s, [field]: val } : s));
  const save = async () => {
    await fetch("/api/admin/projects", { method: "PUT", body: JSON.stringify({ projects: items }) });
    router.refresh();
  };
  return <div>
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-semibold text-[#1a1a1a]">项目管理</h2>
      <div className="flex gap-3">
        <button onClick={add} className="flex items-center gap-2 px-4 py-2 text-sm border border-[#1a1a1a]/10 rounded-lg hover:bg-[#1a1a1a]/5 cursor-pointer"><Plus size={16} /> 添加</button>
        <button onClick={save} className="flex items-center gap-2 px-4 py-2 text-sm bg-[#f97316] text-white rounded-lg hover:bg-[#ea580c] cursor-pointer">保存</button>
      </div>
    </div>
    <div className="bg-white rounded-xl shadow-sm border border-[#1a1a1a]/5 overflow-hidden">
      <table className="w-full text-sm">
        <thead><tr className="border-b border-[#1a1a1a]/5 text-[#1a1a1a]/40"><th className="text-left p-3 font-medium">标题</th><th className="text-left p-3 font-medium">描述</th><th className="text-left p-3 font-medium">图片</th><th className="text-left p-3 font-medium">链接</th><th className="w-16 p-3"></th></tr></thead>
        <tbody>{items.map(s => <tr key={s.id} className="border-b border-[#1a1a1a]/5 last:border-0">
          <td className="p-3"><input value={s.title} onChange={e => upd(s.id, "title", e.target.value)} className="w-full px-3 py-2 border border-[#1a1a1a]/10 rounded-lg focus:border-[#f97316] focus:outline-none" /></td>
          <td className="p-3"><input value={s.description} onChange={e => upd(s.id, "description", e.target.value)} className="w-full px-3 py-2 border border-[#1a1a1a]/10 rounded-lg focus:border-[#f97316] focus:outline-none" /></td>
          <td className="p-3"><input value={s.imageUrl} onChange={e => upd(s.id, "imageUrl", e.target.value)} className="w-full px-3 py-2 border border-[#1a1a1a]/10 rounded-lg" /></td>
          <td className="p-3"><input value={s.link} onChange={e => upd(s.id, "link", e.target.value)} className="w-full px-3 py-2 border border-[#1a1a1a]/10 rounded-lg" /></td>
          <td className="p-3"><button onClick={() => remove(s.id)} className="text-red-400 hover:text-red-600 cursor-pointer"><Trash2 size={16} /></button></td>
        </tr>)}</tbody>
      </table>
    </div>
  </div>;
}
