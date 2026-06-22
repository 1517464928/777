"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";
import SplitText from "./animations/SplitText";
import Reveal from "./ui/Reveal";

export default function WhyTransition() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* Question screen */}
      <section
        id="why-transition-question"
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent px-4"
      >
        <div className="relative z-10 text-center w-full max-w-5xl mx-auto">
          <div className="mb-10">
            <Reveal delay={0} y={20}>
              <div className="text-xl md:text-2xl lg:text-3xl font-medium text-[#1a1a1a]/60 mb-2">
                首先我想回答一个最关键的问题：
              </div>
            </Reveal>

            <SplitText
              text="为什么我想要加入飞书"
              tag="div"
              className="block text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#1a1a1a]"
              delay={60}
              duration={0.6}
              from={{ opacity: 0, y: 40, rotateX: -60 }}
              to={{ opacity: 1, y: 0, rotateX: 0 }}
              splitType="chars"
              textAlign="center"
            />
          </div>

          <Reveal delay={0.5} y={30}>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 12px 24px rgba(249,115,22,0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo("why-transition-reason")}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#f97316] text-white rounded-full text-base font-medium hover:bg-[#ea580c] transition-colors duration-300 cursor-pointer shadow-lg"
            >
              GO <ChevronDown size={18} />
            </motion.button>
          </Reveal>
        </div>
      </section>

      {/* Reason screen */}
      <section
        id="why-transition-reason"
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent px-4 py-24"
      >
        <div className="relative z-10 max-w-4xl w-full mx-auto text-center">
          <Reveal delay={0} y={20}>
            <div className="text-sm md:text-base tracking-[0.2em] uppercase text-[#1a1a1a]/40 mb-8">
              产品认同
            </div>
          </Reveal>

          <Reveal delay={0.15} y={30}>
            <p className="text-2xl md:text-3xl lg:text-4xl font-light leading-[1.7] text-[#1a1a1a]">
              我想加入飞书，最重要的一个原因就是我打心底里认可飞书这款产品。最初我是看卡兹克的文章认识到的飞书，被文章中飞书的妙用惊到了，于是自己也开始进行实操。通过我对多维表格、aily、飞书 CLI 等功能的使用，我又一次被飞书的实用和开放惊到了，不禁产生了想要加入飞书的向往。
            </p>
          </Reveal>

          <Reveal delay={0.3} y={30}>
            <p className="text-xl md:text-2xl lg:text-3xl font-light leading-[1.7] text-[#1a1a1a] mt-8">
              在这个大模型能力已经发展到足够强的时代，好多企业却接不住，而飞书我认为就是
              <span className="text-[#f97316] font-medium">连接企业与模型的桥梁</span>
              ——通过拆解企业的业务，将飞书和模型塞进企业客户的真实业务环境，最终为企业业务实现提效，为飞书沉淀 SOP。
            </p>
          </Reveal>

          <Reveal delay={0.45} y={30}>
            <p className="text-lg md:text-xl lg:text-2xl font-light leading-[1.8] text-[#1a1a1a]/80 mt-10">
              我一直觉得好的工具是帮业务人释放精力，去聚焦真正的需求和增长，特别是 agent 时代，而飞书刚好在做这件事。这是我特别认同的地方。
            </p>
          </Reveal>

          <Reveal delay={0.6} y={30}>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 12px 24px rgba(249,115,22,0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo("why-transition-fit")}
              className="mt-14 inline-flex items-center gap-2 px-8 py-4 bg-[#f97316] text-white rounded-full text-base font-medium hover:bg-[#ea580c] transition-colors duration-300 cursor-pointer shadow-lg"
            >
              继续 <ChevronDown size={18} />
            </motion.button>
          </Reveal>
        </div>
      </section>

      {/* Fit screen */}
      <section
        id="why-transition-fit"
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent px-4 py-24"
      >
        <div className="relative z-10 max-w-3xl w-full mx-auto">
          <Reveal delay={0} y={30}>
            <div className="mb-10">
              <div className="text-sm md:text-base tracking-[0.2em] uppercase text-[#1a1a1a]/40 mb-3">
                匹配度
              </div>
              <p className="text-lg md:text-xl leading-relaxed text-[#1a1a1a]/85">
                另一个原因就是匹配度了。我之前不管是实习还是创业，一直都在和业务一线交流。实习的时候我对接业务端、总部技术和通信供应商，天天做的就是把业务的需求分析明白，制定能落地的方案，并且不断沉淀排查 SOP，让后面的新人少走弯路；创业做家教社群就更直接了，天天研究客户的需求，优化我的策略，解决我面临的困难，从而让我在一个陌生的领域由前期亏损到后期稳定盈利。这些经历练出来的拆问题能力、跨方沟通的能力、还有对着结果死磕、不怕困难的韧性，我觉得跟这个岗位的要求是对上的。而且我本身就爱琢磨各种 AI 工具，喜欢根据自己业务中的低效环节搭建一些工具进行解决，上手一定会很快。
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15} y={30}>
            <div className="mb-12">
              <div className="text-sm md:text-base tracking-[0.2em] uppercase text-[#1a1a1a]/40 mb-3">
                贡献
              </div>
              <p className="text-lg md:text-xl leading-relaxed text-[#1a1a1a]/85">
                如果有幸加入贵公司，我定将努力发挥自己的优势和热情，为飞书的发展做出自己的一份贡献。
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.3} y={30}>
            <div className="text-center">
              <Link href="/about">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 12px 32px rgba(249,115,22,0.35)" }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: [
                      "0 8px 24px rgba(249,115,22,0.25)",
                      "0 12px 32px rgba(249,115,22,0.45)",
                      "0 8px 24px rgba(249,115,22,0.25)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="inline-flex items-center gap-2 px-10 py-4 bg-[#f97316] text-white rounded-full text-lg font-semibold hover:bg-[#ea580c] transition-colors duration-300 cursor-pointer shadow-lg"
                >
                  Come On! <ArrowRight size={20} className="ml-1" />
                </motion.button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
