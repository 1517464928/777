"use client";
import { useState, useEffect } from "react";
import { Mail, Github } from "lucide-react";

interface Link { id: number; platform: string; url: string; label: string; order: number; }
const iconMap: Record<string, any> = { "邮箱": <Mail size={18} />, "GitHub": <Github size={18} /> };

export default function FooterSection() {
  const [items, setItems] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/public").then(r => r.json()).then(d => {
      setItems(d.socialLinks || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return null;

  return (
    <footer className="py-12 px-4 border-t border-[#1a1a1a]/5">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-sm text-[#1a1a1a]/40">&copy; 2026 张攀岳</p>
        <div className="flex items-center gap-6">
          {items.map(l => (
            <a key={l.id} href={l.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#1a1a1a]/60 hover:text-[#f97316] transition-colors">
              {iconMap[l.platform]} {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
