"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type PanInfo } from "framer-motion";
import { ChevronRight, ChevronDown } from "lucide-react";
import { parsePanels, type ExperienceData, type ExperiencePanel } from "@/lib/types";
import {
  expHeroVariants,
  expDetailVariants,
} from "@/lib/animations";

const typeLabels: Record<string, string> = {
  education: "教育背景",
  work: "实习经历",
  entrepreneurship: "创业经历",
  campus: "校园经历",
};

interface Props {
  exp: ExperienceData;
  index: number;
  isActive: boolean;
  reducedMotion: boolean;
}

function getInitialPanels(exp: ExperienceData): ExperiencePanel[] {
  const parsed = parsePanels(exp.panels);
  if (parsed.length > 0) return parsed;
  const fallback: ExperiencePanel[] = [];
  if (exp.workContent?.trim()) fallback.push({ title: "工作内容", content: exp.workContent });
  if (exp.achievements?.trim()) fallback.push({ title: "工作成果", content: exp.achievements });
  if (exp.growth?.trim()) fallback.push({ title: "能力提升", content: exp.growth });
  return fallback;
}

export default function ExperiencePages({
  exp,
  index,
  isActive,
  reducedMotion,
}: Props) {
  const [panels, setPanels] = useState<ExperiencePanel[]>(() => getInitialPanels(exp));
  const [pageIndex, setPageIndex] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setPanels(getInitialPanels(exp));
  }, [exp]);

  const totalPages = panels.length + 1;

  const scrollToPage = (idx: number) => {
    const el = pageRefs.current[idx];
    if (scrollRef.current && el) {
      scrollRef.current.scrollTo({
        left: el.offsetLeft,
        behavior: reducedMotion ? "auto" : "smooth",
      });
    }
  };

  const nextPage = () => {
    if (pageIndex < totalPages - 1) {
      scrollToPage(pageIndex + 1);
    }
  };

  const prevPage = () => {
    if (pageIndex > 0) {
      scrollToPage(pageIndex - 1);
    }
  };

  const scrollToNextScreen = () => {
    const currentPage = pageRefs.current[pageIndex];
    const screen = currentPage?.closest("[data-index]") as HTMLElement;
    if (screen?.nextElementSibling) {
      (screen.nextElementSibling as HTMLElement).scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "start",
      });
    }
  };

  // Active page tracking
  useEffect(() => {
    if (!scrollRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        let bestIndex = -1;
        let bestRatio = -1;
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = Number((entry.target as HTMLElement).dataset.page);
          const ratio = entry.intersectionRatio;
          if (bestIndex === -1 || ratio > bestRatio) {
            bestIndex = idx;
            bestRatio = ratio;
          }
        });
        if (bestIndex !== -1) setPageIndex(bestIndex);
      },
      { root: scrollRef.current, threshold: 0.5 }
    );
    pageRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [panels.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isActive) return;
    const handleKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName) || target.isContentEditable) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevPage();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        nextPage();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isActive, pageIndex, totalPages, reducedMotion]);

  const pageBaseClass =
    "h-full w-full flex-shrink-0 snap-start flex items-center justify-center px-6 md:px-12 py-16 relative overflow-hidden";

  const dragProps = {
    drag: "x" as const,
    dragConstraints: { left: 0, right: 0 },
    dragElastic: 0.15,
    onDragEnd: (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (info.offset.x < -50 || info.velocity.x < -500) nextPage();
      else if (info.offset.x > 50 || info.velocity.x > 500) prevPage();
    },
  };

  function HeroPage() {
    const show = isActive && pageIndex === 0;
    const number = String(index).padStart(2, "0");
    const heroV = expHeroVariants(reducedMotion);

    return (
      <motion.div
        {...dragProps}
        className="relative z-10 max-w-4xl w-full text-center"
      >
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] md:text-[16rem] font-bold text-[#1a1a1a]/5 leading-none pointer-events-none select-none">
          {number}
        </span>

        <div className="relative z-10 flex flex-col items-center">
          <motion.span
            variants={heroV}
            initial="hidden"
            animate={show ? "visible" : "hidden"}
            custom={0}
            className="inline-block px-3 py-1 text-xs font-medium bg-amber-50 text-[#f97316] rounded-full mb-4"
          >
            {typeLabels[exp.type] || exp.type}
          </motion.span>

          <motion.h2
            variants={heroV}
            initial="hidden"
            animate={show ? "visible" : "hidden"}
            custom={0.08}
            className="text-4xl md:text-6xl font-bold text-[#1a1a1a] mb-3"
          >
            {exp.title}
          </motion.h2>

          <motion.div
            variants={heroV}
            initial="hidden"
            animate={show ? "visible" : "hidden"}
            custom={0.16}
            className="text-lg md:text-xl text-[#1a1a1a]/70 mb-2"
          >
            {exp.subtitle}
          </motion.div>

          <motion.div
            variants={heroV}
            initial="hidden"
            animate={show ? "visible" : "hidden"}
            custom={0.24}
            className="text-sm text-[#1a1a1a]/40 mb-6"
          >
            {exp.period}
          </motion.div>

          <motion.div
            variants={heroV}
            initial="hidden"
            animate={show ? "visible" : "hidden"}
            custom={0.32}
            className="max-w-2xl text-base md:text-lg text-[#1a1a1a]/70 leading-relaxed whitespace-pre-line"
          >
            {exp.description}
          </motion.div>

          {panels.length > 0 && (
            <motion.button
              variants={heroV}
              initial="hidden"
              animate={show ? "visible" : "hidden"}
              custom={0.4}
              onClick={nextPage}
              className="mt-10 inline-flex items-center gap-2 px-8 py-4 bg-[#f97316] text-white rounded-full text-lg font-medium hover:bg-[#ea580c] transition-colors cursor-pointer"
            >
              GO <ChevronRight size={20} />
            </motion.button>
          )}
        </div>
      </motion.div>
    );
  }

  function DetailPage({
    panel,
    panelIndex,
  }: {
    panel: ExperiencePanel;
    panelIndex: number;
  }) {
    const show = isActive && pageIndex === panelIndex + 1;
    const number = `${String(index).padStart(2, "0")}-${panelIndex + 1}`;
    const detailV = expDetailVariants(reducedMotion);
    const isLast = panelIndex === panels.length - 1;

    return (
      <motion.div
        {...dragProps}
        className="relative z-10 max-w-4xl w-full h-full flex flex-col items-center justify-center px-6 md:px-12"
      >
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] md:text-[14rem] font-bold text-[#1a1a1a]/5 leading-none pointer-events-none select-none">
          {number}
        </span>

        <div className="relative z-10 w-full flex flex-col gap-5 md:gap-6">
          <motion.div
            variants={detailV}
            initial="hidden"
            animate={show ? "visible" : "hidden"}
            custom={0}
            className="bg-white/80 backdrop-blur rounded-2xl border border-[#1a1a1a]/5 shadow-sm px-6 py-5 md:px-8 md:py-6"
          >
            <div className="text-3xl md:text-5xl font-bold text-[#1a1a1a]">
              {panel.title}
            </div>
          </motion.div>

          <motion.div
            variants={detailV}
            initial="hidden"
            animate={show ? "visible" : "hidden"}
            custom={0.08}
            className="bg-white/60 backdrop-blur rounded-2xl border border-[#1a1a1a]/5 shadow-sm px-6 py-5 md:px-8 md:py-6"
          >
            <div className="text-base md:text-lg text-[#1a1a1a]/70 leading-relaxed whitespace-pre-line">
              {panel.content}
            </div>
          </motion.div>
        </div>

        <motion.button
          variants={detailV}
          initial="hidden"
          animate={show ? "visible" : "hidden"}
          custom={0.16}
          onClick={isLast ? scrollToNextScreen : nextPage}
          className="mt-8 inline-flex items-center gap-2 px-8 py-4 bg-[#f97316] text-white rounded-full text-lg font-medium hover:bg-[#ea580c] transition-colors cursor-pointer"
        >
          GO {isLast ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <div
        ref={scrollRef}
        className="h-full w-full overflow-x-auto snap-x snap-mandatory flex scrollbar-hide touch-pan-x"
        style={{ overscrollBehaviorY: "contain" }}
      >
        <div
          ref={(el) => { pageRefs.current[0] = el; }}
          data-page={0}
          className={pageBaseClass}
        >
          {HeroPage()}
        </div>

        {panels.map((panel, i) => (
          <div
            key={i}
            ref={(el) => { pageRefs.current[i + 1] = el; }}
            data-page={i + 1}
            className={pageBaseClass}
          >
            {DetailPage({ panel, panelIndex: i })}
          </div>
        ))}
      </div>

      {/* Horizontal indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToPage(i)}
              className="w-11 h-11 flex items-center justify-center rounded-full cursor-pointer"
              aria-label={`切换到第 ${i + 1} 页`}
            >
              <span
                className={
                  i === pageIndex
                    ? "w-2 h-8 bg-[#f97316] rounded-full transition-all duration-300"
                    : "w-2 h-2 bg-[#1a1a1a]/20 rounded-full transition-all duration-300 hover:bg-[#1a1a1a]/40"
                }
              />
            </button>
          ))}
        </div>
        <span className="text-xs text-[#1a1a1a]/40">
          {String(index).padStart(2, "0")} · {pageIndex + 1}/{totalPages}
        </span>
      </div>
    </div>
  );
}
