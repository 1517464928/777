"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Music } from "lucide-react";
import { projectsVariants } from "@/lib/animations";
import type { MusicData } from "@/lib/types";
import { useMusic } from "./MusicContext";
import Card from "./ui/Card";
import Reveal from "./ui/Reveal";

interface MusicScreenProps {
  isActive: boolean;
  reducedMotion: boolean;
  screenIndex: number;
}

export default function MusicScreen({
  isActive,
  reducedMotion,
  screenIndex,
}: MusicScreenProps) {
  const variants = projectsVariants(reducedMotion);
  const { pauseMusic } = useMusic();
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const [tracks, setTracks] = useState<MusicData[]>([
    {
      id: 1,
      title: "阴云密布的大城市",
      subtitle: "3.1",
      src: `${base}/music/3.1阴云密布的大城市.mp3`,
      description: "一首关于城市氛围的原创音乐",
    },
    {
      id: 2,
      title: "水面上起来了风",
      subtitle: "4.30",
      src: `${base}/music/4.30水面上起来了风.mp3`,
      description: "一首关于水面微风的原创音乐",
    },
  ]);
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);

  useEffect(() => {
    fetch(`${base}/data.json`)
      .then((r) => r.json())
      .then((d) => {
        const items = (d.music || []).map((m: MusicData) => ({
          ...m,
          src: m.src ? `${base}${m.src}` : m.src,
        }));
        if (items.length > 0) setTracks(items);
      })
      .catch(() => {});
  }, [base]);

  // Pause background music and all other tracks when one starts playing
  const handlePlay = (index: number) => {
    pauseMusic();
    audioRefs.current.forEach((audio, i) => {
      if (audio && i !== index) {
        audio.pause();
      }
    });
  };

  const handleExplore = () => {
    const el = document.querySelector(
      `[data-index="${screenIndex + 1}"]`
    ) as HTMLElement;
    if (el) el.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
  };

  return (
    <div className="h-full w-full overflow-y-auto scrollbar-hide py-16 px-6">
      <motion.div
        variants={variants}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
        custom={0}
      >
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-6xl font-bold text-[#1a1a1a] mb-4">
            原创音乐
          </h2>
          <p className="text-lg text-[#1a1a1a]/60">
            一些用音符记录下来的片段
          </p>
        </div>

        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {tracks.map((track, i) => (
            <Reveal key={track.id} delay={i * 0.15} y={30}>
              <Card className="bg-white/80 backdrop-blur p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#f97316]/10 text-[#f97316] flex items-center justify-center mb-4">
                  <Music size={32} />
                </div>
                <div className="text-sm text-[#1a1a1a]/40 mb-1">{track.subtitle}</div>
                <h3 className="text-xl font-semibold text-[#1a1a1a] mb-2">
                  {track.title}
                </h3>
                <p className="text-sm text-[#1a1a1a]/60 mb-5">{track.description}</p>
                <audio
                  ref={(el) => { audioRefs.current[i] = el; }}
                  key={track.src}
                  src={track.src}
                  controls
                  preload="metadata"
                  className="w-full"
                  onPlay={() => handlePlay(i)}
                >
                  您的浏览器不支持音频播放。
                </audio>
              </Card>
            </Reveal>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 1 } : { opacity: 0 }}
        transition={reducedMotion ? { duration: 0 } : { duration: 0.5, delay: 0.6 }}
        className="flex justify-center mt-12 pb-4"
      >
        <button
          onClick={handleExplore}
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#f97316] text-white rounded-full text-lg font-medium hover:bg-[#ea580c] transition-colors cursor-pointer"
        >
          GO <ChevronDown size={20} />
        </button>
      </motion.div>
    </div>
  );
}
