"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";
import SplitText from "./animations/SplitText";
import Reveal from "./ui/Reveal";

export default function WhyTransition() {
  const scrollToAnswer = () => {
    const el = document.getElementById("why-transition-answer");
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
                首先回答一个最关键的问题：
              </div>
            </Reveal>

            <SplitText
              text="为什么我想从运营转到这个岗"
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
              onClick={scrollToAnswer}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#f97316] text-white rounded-full text-base font-medium hover:bg-[#ea580c] transition-colors duration-300 cursor-pointer shadow-lg"
            >
              GO <ChevronDown size={18} />
            </motion.button>
          </Reveal>
        </div>
      </section>

      {/* Answer screen */}
      <section
        id="why-transition-answer"
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent px-4 py-24"
      >
        <div className="relative z-10 max-w-4xl w-full mx-auto text-center">
          <Reveal delay={0} y={40}>
            <p className="text-lg md:text-xl leading-relaxed text-[#1a1a1a]/85 mb-6">
              首先我一直以来都想从事一线的业务，我非常喜欢这种跟人打交道，挖掘需求痛点并解决，从而实现商业增长、双方共赢，直接面对业务结果的工作，而我之前的运营实习与这有很大重叠，比如说我实习时作为业务老师与总部技术、通信供应商的桥梁，能依据业务需求，共同进行问题的分析解决，完成解决方案的成功落地，从而实现业务指标的稳定与上涨；再比如说我创业时进行的社群运营，我需要直接与客户交流，分析他们的需求，并给出解决方案，从而完成交易过程……
            </p>
          </Reveal>

          <Reveal delay={0.15} y={40}>
            <p className="text-lg md:text-xl leading-relaxed text-[#1a1a1a]/85 mb-6">
              所以说这也是我之前选择运营的原因，我想借由运营的经历锻炼我的能力，从而将其变成我迈向理想岗位的跳板。
            </p>
          </Reveal>

          <Reveal delay={0.3} y={40}>
            <p className="text-lg md:text-xl leading-relaxed text-[#1a1a1a]/85 mb-10">
              如果有幸加入贵公司，我定将努力发挥自己的优势，为企业发展做出自己的一份贡献。
            </p>
          </Reveal>

          <Reveal delay={0.45} y={30}>
            <Link href="/about">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 12px 24px rgba(249,115,22,0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#f97316] text-white rounded-full text-base font-medium hover:bg-[#ea580c] transition-colors duration-300 cursor-pointer shadow-lg"
              >
                探索更多 <ArrowRight size={18} />
              </motion.button>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
