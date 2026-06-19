import Stats from "@/components/Stats";

export default function StrengthsPage() {
  return (
    <main>
      <section className="min-h-[60vh] flex flex-col items-center justify-center px-4 bg-[#faf7f4]">
        <h1 className="text-5xl md:text-7xl font-bold text-[#1a1a1a] mb-6">我的优势</h1>
        <p className="text-lg text-[#1a1a1a]/70 max-w-2xl text-center">
          通过数据了解我的成长历程与专业能力。
        </p>
      </section>
      <Stats />
    </main>
  );
}
