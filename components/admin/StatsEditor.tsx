"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
interface Stat { id: number; label: string; value: string; order: number; }
interface Props { stats: Stat[]; }
export default function StatsEditor({ stats: initial }: Props) {
  const [items, setItems] = useState<Stat[]>(initial);
  const router = useRouter();
  const add = () => setItems([...items, { id: -Date.now(), label: "", value: "", order: items.length }]);
  const remove = (id: number) => setItems(items.filter(s => s.id !== id));
  const upd = (id: number, field: "label"|"value", val: string) => setItems(items.map(s => s.id === id ? { ...s, [field]: val } : s));
  const save = async () => {
    await fetch("/api/admin/stats", { method: "PUT", body: JSON.stringify({ stats: items }) });
    router.refresh();
  };
  return <div>
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-semibold text-[#1a1a1a]">数据看板编辑</h2>
      <div className="flex gap-3">
        <button onClick={add} className="flex items-center gap-2 px-4 py-2 text-sm border border-[#1a1a1a]/10 rounded-lg hover:bg-[#1a1a1a]/5 cursor-pointer"><Plus size={16} /> 添加</button>
        <button onClick={save} className="flex items-center gap-2 px-4 py-2 text-sm bg-[#f97316] text-white rounded-lg hover:bg-[#ea580c] cursor-pointer">保存</button>
      </div>
    </div>
    <div className="bg-white rounded-xl shadow-sm border border-[#1a1a1a]/5 overflow-hidden">
      <table className="w-full text-sm">
        <thead><tr className="border-b border-[#1a1a1a]/5 text-[#1a1a1a]/40"><th className="text-left p-3 font-medium">数字</th><th className="text-left p-3 font-medium">标签</th><th className="w-16 p-3"></th></tr></thead>
        <tbody>{items.map(s => <tr key={s.id} className="border-b border-[#1a1a1a]/5 last:border-0">
          <td className="p-3"><input value={s.value} onChange={e => upd(s.id, "value", e.target.value)} className="w-full px-3 py-2 border border-[#1a1a1a]/10 rounded-lg focus:border-[#f97316] focus:outline-none" /></td>
          <td className="p-3"><input value={s.label} onChange={e => upd(s.id, "label", e.target.value)} className="w-full px-3 py-2 border border-[#1a1a1a]/10 rounded-lg focus:border-[#f97316] focus:outline-none" /></td>
          <td className="p-3"><button onClick={() => remove(s.id)} className="text-red-400 hover:text-red-600 cursor-pointer"><Trash2 size={16} /></button></td>
        </tr>)}</tbody>
      </table>
    </div>
  </div>;
}
