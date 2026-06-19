import Database from "better-sqlite3";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const db = new Database("prisma/dev.db", { readonly: true });

function safeQuery<T>(sql: string): T[] {
  try { return db.prepare(sql).all() as T[]; }
  catch { return []; }
}

const stats = safeQuery('SELECT * FROM "stat" ORDER BY "order" ASC');
const experiences = safeQuery('SELECT * FROM "experience" ORDER BY "order" ASC');
const advantages = safeQuery('SELECT * FROM "advantage" ORDER BY "order" ASC');
const projects = safeQuery('SELECT * FROM "project" ORDER BY "order" ASC');
const socialLinks = safeQuery('SELECT * FROM "social_link" ORDER BY "order" ASC');
const siteConfig = safeQuery('SELECT * FROM "site_config" LIMIT 1');

const data = {
  stats,
  experiences,
  advantages,
  projects,
  socialLinks,
  siteConfig: siteConfig[0] || null,
};

const outPath = join(process.cwd(), "public", "data.json");
mkdirSync(join(process.cwd(), "public"), { recursive: true });
writeFileSync(outPath, JSON.stringify(data, null, 2), "utf-8");

console.log(`Exported ${stats.length} stats, ${experiences.length} experiences, ${advantages.length} advantages, ${projects.length} projects`);
db.close();
