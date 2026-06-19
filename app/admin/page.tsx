import { db, schema } from "@/lib/prisma";
export default async function AdminDashboard() {
  const [stats, exps, projs] = await Promise.all([
    db.select().from(schema.stats),
    db.select().from(schema.experiences),
    db.select().from(schema.projects),
  ]);
  return <div>
    <h1 className="text-2xl font-bold text-[#1a1a1a] mb-8">概览</h1>
    <div className="grid grid-cols-3 gap-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-[#1a1a1a]/5">
        <p className="text-sm text-[#1a1a1a]/60">数据卡片</p>
        <p className="text-3xl font-bold text-[#f97316] mt-2">{stats.length}</p>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-sm border border-[#1a1a1a]/5">
        <p className="text-sm text-[#1a1a1a]/60">经历条目</p>
        <p className="text-3xl font-bold text-[#f97316] mt-2">{exps.length}</p>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-sm border border-[#1a1a1a]/5">
        <p className="text-sm text-[#1a1a1a]/60">项目作品</p>
        <p className="text-3xl font-bold text-[#f97316] mt-2">{projs.length}</p>
      </div>
    </div>
  </div>;
}
