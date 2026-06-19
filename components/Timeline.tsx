"use client";
import { useState, useEffect } from "react";
import Reveal from "./ui/Reveal";

interface Exp { id: number; type: string; title: string; subtitle: string; period: string; description: string; order: number; }
const typeLabels: Record<string,string> = { education: "教育背景", work: "实习经历", entrepreneurship: "创业经历", campus: "校园经历" };

export default function TimelineSection() {
  const [items, setItems] = useState<Exp[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/public").then(r => r.json()).then(d => {
      setItems(d.experiences || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return null;

  return (
    <section className="py-24 px-4 max-w-4xl mx-auto bg-[#faf7f4]">
      <Reveal>
        <h2 className="text-2xl font-medium text-center mb-16 text-[#1a1a1a]">成长轨迹</h2>
      </Reveal>
      <div className="relative">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[#1a1a1a]/10" />
        {items.map((exp, i) => (
          <Reveal key={exp.id} delay={i * 0.12} y={30}>
            <div className={"relative flex flex-col md:flex-row gap-4 md:gap-8 mb-12 last:mb-0 " + (i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse")}>
              <div className="hidden md:flex md:w-1/2 justify-end">{i % 2 === 0 && <ExpCard exp={exp} />}</div>
              <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-[#f97316] rounded-full -translate-x-1.5 mt-2 ring-4 ring-white z-10" />
              <div className="md:w-1/2 pl-10 md:pl-0">
                {(i % 2 !== 0) && <ExpCard exp={exp} />}
                {(i % 2 === 0) && <div className="md:hidden"><ExpCard exp={exp} /></div>}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ExpCard({ exp }: { exp: Exp }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-[#1a1a1a]/5 relative">
      <span className="inline-block px-3 py-1 text-xs font-medium bg-amber-50 text-[#f97316] rounded-full mb-3">
        {typeLabels[exp.type] || exp.type}
      </span>
      <h3 className="text-lg font-semibold text-[#1a1a1a]">{exp.title}</h3>
      <p className="text-sm text-[#1a1a1a]/70 mt-1">{exp.subtitle}</p>
      <p className="text-xs text-[#1a1a1a]/40 mt-1">{exp.period}</p>
      <p className="text-sm text-[#1a1a1a]/60 mt-3 leading-relaxed">{exp.description}</p>
    </div>
  );
}
