"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Reveal from "./ui/Reveal";
import { EditableText } from "./ui/InlineEdit";
import { useEditMode } from "./EditMode";

interface Stat { id: number; label: string; value: string; order: number; }

const SAVE_ID = "stats";

export default function StatsSection() {
  const { isEditing, registerSave, unregisterSave, setHasUnsavedChanges } = useEditMode();
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const statsRef = useRef<Stat[]>(stats);
  useEffect(() => { statsRef.current = stats; }, [stats]);

  useEffect(() => {
    fetch("/api/public", { credentials: "include" }).then(r => r.json()).then(d => {
      setStats(d.stats || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  // Register save fn: PUT all changed stats to the server.
  const saveFn = useCallback(async () => {
    const changed = statsRef.current;
    if (!changed.length) return true;
    const res = await fetch("/api/admin/stats", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ stats: changed }),
    });
    return res.ok;
  }, []);

  useEffect(() => {
    registerSave(SAVE_ID, saveFn);
    return () => unregisterSave(SAVE_ID);
  }, [registerSave, unregisterSave, saveFn]);

  const saveStat = (next: Stat) => {
    setStats((prev) => prev.map((s) => (s.id === next.id ? next : s)));
    setHasUnsavedChanges(true);
  };

  if (loading) return null;

  return (
    <section id="content" className="py-24 px-4 max-w-5xl mx-auto">
      <Reveal>
        <h2 className="text-2xl font-medium text-center mb-16 text-[#1a1a1a]/60">关键数据</h2>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="bg-white rounded-xl shadow-sm border border-[#1a1a1a]/8 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#1a1a1a]/8 bg-[#fafafa]">
            <span className="text-xs font-medium text-[#1a1a1a]/30 uppercase tracking-widest">数据指标</span>
            <span className="text-xs text-[#1a1a1a]/25">{stats.length} 项</span>
          </div>

          {stats.length === 0 ? (
            <div className="px-6 py-16 text-center text-sm text-[#1a1a1a]/25">暂无数据条目</div>
          ) : (
            <div className="divide-y divide-[#1a1a1a]/5">
              {stats.map((s, i) => (
                <div key={s.id} className="flex items-center group relative hover:bg-[#fafafa] transition-colors">
                  <span className="w-12 flex-shrink-0 text-right pr-4 text-xs text-[#1a1a1a]/20 tabular-nums select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 py-5 pr-4 min-w-0">
                    <p className="text-sm font-medium text-[#1a1a1a]/70">
                      <EditableText value={s.label} onSave={(v) => saveStat({ ...s, label: v })} />
                    </p>
                  </div>
                  <div className="py-5 pr-4 text-right tabular-nums">
                    <span className="text-lg font-semibold text-[#1a1a1a]">
                      <EditableText value={s.value} onSave={(v) => saveStat({ ...s, value: v })} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="px-6 py-3 border-t border-[#1a1a1a]/5 bg-[#fafafa]" />
        </div>
      </Reveal>
    </section>
  );
}
