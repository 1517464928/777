import { db, schema } from "@/lib/prisma";
import SettingsEditor from "@/components/admin/SettingsEditor";
export default async function SettingsPage() {
  const config = await db.select().from(schema.siteConfig).limit(1);
  const c = config[0];
  return <SettingsEditor heroTitle={c?.heroTitle ?? ""} heroButtonText={c?.heroButtonText ?? ""} />;
}
