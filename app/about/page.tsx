import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import PersonalExperience from "@/components/PersonalExperience";

export const metadata = {
  title: "关于我 - 张攀岳",
  description: "张攀岳的个人经历与成长轨迹",
};

export default function AboutPage() {
  return (
    <main>
      <ErrorBoundary>
        <PersonalExperience />
      </ErrorBoundary>
    </main>
  );
}
