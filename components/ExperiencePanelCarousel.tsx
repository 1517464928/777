"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { parsePanels, type ExperienceData } from "@/lib/types";

interface Props {
  exp: ExperienceData;
}

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0, scale: 0.96 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0, scale: 0.96 }),
};

export default function ExperiencePanelCarousel({ exp }: Props) {
  const [panelIndex, setPanelIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const panels = parsePanels(exp.panels);

  useEffect(() => {
    if (panelIndex >= panels.length) {
      setPanelIndex(Math.max(0, panels.length - 1));
    }
  }, [panels.length, panelIndex]);

  const goTo = (idx: number) => {
    setDirection(idx > panelIndex ? 1 : -1);
    setPanelIndex(idx);
  };

  const nextPanel = () => {
    if (panelIndex < panels.length - 1) {
      setDirection(1);
      setPanelIndex(panelIndex + 1);
    }
  };

  const prevPanel = () => {
    if (panelIndex > 0) {
      setDirection(-1);
      setPanelIndex(panelIndex - 1);
    }
  };

  const onDragEnd = (
    _: unknown,
    info: { offset: { x: number }; velocity: { x: number } }
  ) => {
    const offsetThreshold = 50;
    const velocityThreshold = 500;
    if (info.offset.x < -offsetThreshold || info.velocity.x < -velocityThreshold) {
      nextPanel();
    } else if (info.offset.x > offsetThreshold || info.velocity.x > velocityThreshold) {
      prevPanel();
    }
  };

  const springTransition = reducedMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 300, damping: 30 };

  const currentPanel = panels[panelIndex];

  return (
    <div className="relative w-full max-w-xl mx-auto lg:mx-0">
      <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-[#1a1a1a]/5 p-6 md:p-8 h-[320px] md:h-[400px] flex flex-col relative overflow-hidden">
        {panels.length > 0 && (
          <div className="flex items-center gap-3 mb-4 overflow-x-auto scrollbar-hide pb-2">
            {panels.map((panel, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                className={`text-sm font-medium whitespace-nowrap transition-colors shrink-0 ${
                  idx === panelIndex
                    ? "text-[#f97316]"
                    : "text-[#1a1a1a]/30 hover:text-[#1a1a1a]/60"
                }`}
                aria-label={`切换到面板：${panel.title || `面板 ${idx + 1}`}`}
              >
                {panel.title || `面板 ${idx + 1}`}
              </button>
            ))}
          </div>
        )}

        <div className="flex-1 overflow-y-auto scrollbar-hide relative">
          {panels.length === 0 && (
            <div className="h-full flex items-center justify-center text-[#1a1a1a]/40 text-sm">
              暂无详细内容
            </div>
          )}
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            {currentPanel && (
              <motion.div
                key={panelIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={springTransition}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={onDragEnd}
                className="w-full min-h-full"
              >
                <h3 className="text-xl md:text-2xl font-semibold text-[#1a1a1a] mb-4">
                  {currentPanel.title}
                </h3>
                <div className="text-base text-[#1a1a1a]/70 leading-relaxed whitespace-pre-wrap">
                  {currentPanel.content}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#1a1a1a]/5">
          <div className="flex items-center gap-2">
            <button
              onClick={prevPanel}
              disabled={panelIndex === 0 || panels.length === 0}
              className="w-11 h-11 flex items-center justify-center rounded-full text-[#1a1a1a]/40 hover:text-[#f97316] hover:bg-[#faf7f4] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              aria-label="上一个面板"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-sm text-[#1a1a1a]/40 min-w-[48px] text-center">
              {panels.length > 0 ? `${panelIndex + 1} / ${panels.length}` : "0 / 0"}
            </span>
            <button
              onClick={nextPanel}
              disabled={panelIndex === panels.length - 1 || panels.length === 0}
              className="w-11 h-11 flex items-center justify-center rounded-full text-[#1a1a1a]/40 hover:text-[#f97316] hover:bg-[#faf7f4] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              aria-label="下一个面板"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
