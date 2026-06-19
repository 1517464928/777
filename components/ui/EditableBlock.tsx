"use client";

import { RotateCcw } from "lucide-react";
import { useEditMode } from "../EditMode";
import type { BlockStyle, BlockRole, BlockFont } from "@/lib/types";

const ROLES: { key: BlockRole; label: string }[] = [
  { key: "title", label: "标题" },
  { key: "content", label: "内容" },
  { key: "key", label: "关键" },
];

const COLORS = [
  { key: "dark", value: "#1a1a1a" },
  { key: "primary", value: "#f97316" },
  { key: "muted", value: "#78716c" },
  { key: "accent", value: "#0ea5e9" },
];

const FONTS: { key: BlockFont; label: string }[] = [
  { key: "sans", label: "无衬线" },
  { key: "serif", label: "衬线" },
  { key: "mono", label: "等宽" },
];

const ROLE_DEFAULTS: Record<BlockRole, Partial<BlockStyle>> = {
  title: { color: "#1a1a1a", font: "sans" },
  content: { color: "#78716c", font: "sans" },
  key: { color: "#f97316", font: "mono" },
};

interface EditableBlockProps {
  blockKey: string;
  style?: BlockStyle;
  onStyleChange: (style: BlockStyle) => void;
  children: React.ReactNode;
  className?: string;
}

function blockClasses(style?: BlockStyle, className = "") {
  const fontClass = style?.font ? `font-${style.font}` : "";
  return `${fontClass} ${className}`.trim();
}

function blockInlineStyle(style?: BlockStyle): React.CSSProperties {
  const s: React.CSSProperties = {};
  if (style?.color) s.color = style.color;
  if (style?.role === "title") s.fontWeight = 700;
  return s;
}

export function EditableBlock({
  blockKey,
  style = {},
  onStyleChange,
  children,
  className = "",
}: EditableBlockProps) {
  const { isEditing, activeBlockKey, setActiveBlockKey } = useEditMode();
  const isActive = activeBlockKey === blockKey;

  const update = (patch: Partial<BlockStyle>) => {
    onStyleChange({ ...style, ...patch });
  };

  const setRole = (role: BlockRole) => {
    const defaults = ROLE_DEFAULTS[role];
    onStyleChange({
      ...style,
      role,
      color: style.color || defaults.color,
      font: style.font || defaults.font,
    });
  };

  const setColor = (color: string) => update({ color });
  const setFont = (font: BlockFont) => update({ font });
  const reset = () => onStyleChange({});
  const activate = () => setActiveBlockKey(blockKey);

  const Toolbar = () => (
    <div className="absolute -top-8 right-0 flex items-center gap-1 bg-white/95 backdrop-blur rounded-full shadow-lg border border-[#1a1a1a]/5 px-2.5 py-1 text-[10px] z-50 whitespace-nowrap">
      {ROLES.map((r) => (
        <button
          key={r.key}
          type="button"
          onClick={() => setRole(r.key)}
          className={`px-1.5 py-0.5 rounded-full transition-colors cursor-pointer ${
            style.role === r.key
              ? "bg-[#f97316] text-white"
              : "text-[#1a1a1a]/70 hover:bg-[#1a1a1a]/5"
          }`}
        >
          {r.label}
        </button>
      ))}
      <span className="w-px h-3 bg-[#1a1a1a]/10 mx-0.5" />
      {COLORS.map((c) => (
        <button
          key={c.key}
          type="button"
          onClick={() => setColor(c.value)}
          className={`w-3.5 h-3.5 rounded-full border border-[#1a1a1a]/10 cursor-pointer ${
            style.color === c.value ? "ring-2 ring-offset-1 ring-[#f97316]" : ""
          }`}
          style={{ backgroundColor: c.value }}
          aria-label={c.key}
        />
      ))}
      <span className="w-px h-3 bg-[#1a1a1a]/10 mx-0.5" />
      {FONTS.map((f) => (
        <button
          key={f.key}
          type="button"
          onClick={() => setFont(f.key)}
          className={`px-1.5 py-0.5 rounded-full transition-colors cursor-pointer ${
            style.font === f.key
              ? "bg-[#f97316] text-white"
              : "text-[#1a1a1a]/70 hover:bg-[#1a1a1a]/5"
          }`}
        >
          {f.label}
        </button>
      ))}
      <button
        type="button"
        onClick={reset}
        className="ml-0.5 text-[#1a1a1a]/40 hover:text-red-500 transition-colors cursor-pointer"
        title="重置样式"
      >
        <RotateCcw size={10} />
      </button>
    </div>
  );

  if (!isEditing) {
    return (
      <span
        className={blockClasses(style, className)}
        style={blockInlineStyle(style)}
      >
        {children}
      </span>
    );
  }

  return (
    <span
      data-editable-block={blockKey}
      data-active={isActive}
      onMouseDown={activate}
      className={[
        "relative inline-block editable-block",
        isActive
          ? "outline outline-1 outline-dashed outline-[#f97316] rounded-sm"
          : "hover:outline hover:outline-1 hover:outline-dashed hover:outline-[#f97316]/60 rounded-sm",
        blockClasses(style, className),
      ].join(" ")}
      style={blockInlineStyle(style)}
    >
      {children}
      {isActive && <Toolbar />}
    </span>
  );
}
