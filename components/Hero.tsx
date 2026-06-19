"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";
import { useEditMode } from "./EditMode";
import { useMusic } from "./MusicContext";
import SplitText from "./animations/SplitText";
import { EditableBlock } from "./ui/EditableBlock";
import { EditableText } from "./ui/InlineEdit";
import { parseStyle, stringifyStyle, type BlockStyle } from "@/lib/types";

const SAVE_ID = "hero";

export default function Hero() {
  const { isEditing, registerSave, unregisterSave, setHasUnsavedChanges } = useEditMode();
  const { enableMusic } = useMusic();
  const [title, setTitle] = useState("张攀岳");
  const [btnText, setBtnText] = useState("了解更多");
  const [style, setStyle] = useState<Record<string, BlockStyle>>({});
  const [loading, setLoading] = useState(true);

  // Refs hold the latest values so the registered save fn can read them without re-registering.
  const titleRef = useRef(title);
  const btnRef = useRef(btnText);
  const styleRef = useRef(style);
  useEffect(() => { titleRef.current = title; }, [title]);
  useEffect(() => { btnRef.current = btnText; }, [btnText]);
  useEffect(() => { styleRef.current = style; }, [style]);

  useEffect(() => {
    fetch("/api/public")
      .then((r) => r.json())
      .then((d) => {
        if (d.siteConfig) {
          setTitle(d.siteConfig.heroTitle || "张攀岳");
          setBtnText(d.siteConfig.heroButtonText || "了解更多");
          setStyle(parseStyle(d.siteConfig.style));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Register a save function with EditMode. Called when the user clicks 保存.
  const saveFn = useCallback(async () => {
    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        heroTitle: titleRef.current,
        heroButtonText: btnRef.current,
        style: stringifyStyle(styleRef.current),
      }),
    });
    return res.ok;
  }, []);

  useEffect(() => {
    registerSave(SAVE_ID, saveFn);
    return () => unregisterSave(SAVE_ID);
  }, [registerSave, unregisterSave, saveFn]);

  const updateTitle = (v: string) => {
    setTitle(v);
    setHasUnsavedChanges(true);
  };

  const updateBtnText = (v: string) => {
    setBtnText(v);
    setHasUnsavedChanges(true);
  };

  const updateBlockStyle = (key: string, s: BlockStyle) => {
    setStyle((prev) => {
      const next = { ...prev, [key]: s };
      return next;
    });
    setHasUnsavedChanges(true);
  };

  if (loading) return null;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent">
      <div className="relative z-10 text-center px-4 w-full max-w-4xl">
        <EditableBlock
          blockKey="hero-title"
          style={style.title}
          onStyleChange={(s) => updateBlockStyle("title", s)}
          className="inline-block"
        >
          {isEditing ? (
            <EditableText
              value={title}
              onSave={updateTitle}
              className="text-6xl md:text-8xl font-bold tracking-tight text-[#1a1a1a] mb-8"
            />
          ) : (
            <SplitText
              text={title}
              className="text-6xl md:text-8xl font-bold tracking-tight text-[#1a1a1a] mb-8"
              delay={80}
              duration={0.5}
              from={{ opacity: 0, y: 40, rotateX: -60 }}
              to={{ opacity: 1, y: 0, rotateX: 0 }}
              splitType="chars"
              textAlign="center"
              tag="h1"
            />
          )}
        </EditableBlock>

        <EditableBlock
          blockKey="hero-button"
          style={style.buttonText}
          onStyleChange={(s) => updateBlockStyle("buttonText", s)}
          className="inline-block"
        >
          {isEditing ? (
            <EditableText
              value={btnText}
              onSave={updateBtnText}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#f97316] text-white rounded-full text-base font-medium"
            />
          ) : (
            <Link href="/about">
              <motion.button
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                whileHover={{ scale: 1.05, boxShadow: "0 12px 24px rgba(249,115,22,0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={enableMusic}
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#f97316] text-white rounded-full text-base font-medium hover:bg-[#ea580c] transition-colors duration-300 cursor-pointer shadow-lg"
              >
                {btnText} <ArrowRight size={18} />
              </motion.button>
            </Link>
          )}
        </EditableBlock>
      </div>
    </section>
  );
}
