"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
interface Props { heroTitle: string; heroButtonText: string; }
export default function SettingsEditor({ heroTitle: t, heroButtonText: b }: Props) {
  const [title, setTitle] = useState(t);
  const [btnText, setBtnText] = useState(b);
  const router = useRouter();
  const save = async () => {
    await fetch("/api/admin/settings", { method: "PUT", body: JSON.stringify({ heroTitle: title, heroButtonText: btnText }) });
    router.refresh();
  };
  return <div>
    <h2 className="text-xl font-semibold text-[#1a1a1a] mb-6">网站设置</h2>
    <div className="bg-white rounded-xl shadow-sm border border-[#1a1a1a]/5 p-6 max-w-lg">
      <label className="block text-sm text-[#1a1a1a]/60 mb-2">Hero 标题</label>
      <input value={title} onChange={e => setTitle(e.target.value)} className="w-full px-4 py-3 border border-[#1a1a1a]/10 rounded-lg focus:border-[#f97316] focus:outline-none mb-4" />
      <label className="block text-sm text-[#1a1a1a]/60 mb-2">按钮文字</label>
      <input value={btnText} onChange={e => setBtnText(e.target.value)} className="w-full px-4 py-3 border border-[#1a1a1a]/10 rounded-lg focus:border-[#f97316] focus:outline-none mb-6" />
      <button onClick={save} className="px-6 py-3 bg-[#f97316] text-white rounded-lg text-sm font-medium hover:bg-[#ea580c] transition-colors cursor-pointer">保存设置</button>
    </div>
  </div>;
}
