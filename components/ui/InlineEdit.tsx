"use client";
import { useEffect, useRef, useState } from "react";
import { useEditMode } from "../EditMode";

export { useEditMode };

function stopPropagation(e: React.PointerEvent | React.MouseEvent | React.TouchEvent) {
  e.stopPropagation();
}

function readEditableText(el: HTMLElement): string {
  return el.innerText ?? el.textContent ?? "";
}

export function EditableText({
  value,
  onSave,
  className = "",
  multiline = false,
}: {
  value: string;
  onSave: (v: string) => void;
  className?: string;
  multiline?: boolean;
}) {
  const { isEditing, setIsBlockInteracting } = useEditMode();
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const savedRef = useRef(false);

  const displayClass = multiline
    ? `whitespace-pre-wrap ${className}`
    : className;

  useEffect(() => {
    if (!isEditing) {
      setEditing(false);
      setIsBlockInteracting(false);
    }
  }, [isEditing, setIsBlockInteracting]);

  useEffect(() => {
    if (!editing || !ref.current) return;
    const el = ref.current;
    el.textContent = value;
    el.focus();

    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  }, [editing, value]);

  if (!isEditing) {
    return <span className={`inline-block ${displayClass}`}>{value}</span>;
  }

  const finish = () => {
    setIsBlockInteracting(false);
    setEditing(false);
  };

  const save = () => {
    if (savedRef.current) return;
    savedRef.current = true;

    const el = ref.current;
    if (!el) {
      finish();
      return;
    }
    const next = readEditableText(el);
    onSave(next);
    finish();
  };

  const cancel = () => {
    savedRef.current = true;
    finish();
  };

  const startEditing = () => {
    savedRef.current = false;
    setIsBlockInteracting(true);
    setEditing(true);
  };

  if (editing) {
    return (
      <span
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onPointerDown={stopPropagation}
        onBlur={save}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            e.preventDefault();
            cancel();
            return;
          }
          if (multiline) {
            if (e.key === "Enter" && e.ctrlKey) {
              e.preventDefault();
              save();
            }
          } else {
            if (e.key === "Enter") {
              e.preventDefault();
              save();
            }
          }
        }}
        className={`inline-block outline-none focus:ring-2 focus:ring-[#f97316]/30 rounded cursor-text ${displayClass}`}
      />
    );
  }

  return (
    <span
      onClick={startEditing}
      onPointerDown={stopPropagation}
      className={`inline-block cursor-pointer hover:ring-2 hover:ring-[#f97316]/30 rounded ${displayClass}`}
    >
      {value}
    </span>
  );
}
