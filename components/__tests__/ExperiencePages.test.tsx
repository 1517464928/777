import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ExperiencePages from "../ExperiencePages";
import { EditProvider } from "../EditMode";
import type { ExperienceData } from "@/lib/types";

const sampleExp: ExperienceData = {
  id: 1,
  type: "work",
  title: "实习经历",
  subtitle: "某大厂",
  period: "2024.06 - 2024.09",
  description: "负责前端开发",
  detail1: "",
  detail2: "",
  workContent: "",
  achievements: "",
  growth: "",
  panel1Title: "",
  panel2Title: "",
  panel3Title: "",
  panel4Title: "",
  panels: JSON.stringify([
    { title: "工作内容", content: "写了很多代码" },
    { title: "工作成果", content: "上线了三个项目" },
  ]),
  style: "{}",
  order: 0,
};

function Wrapper({ children }: { children: React.ReactNode }) {
  return <EditProvider initialEditing={true}>{children}</EditProvider>;
}

describe("ExperiencePages DetailPage", () => {
  it("renders title and content boxes for each panel", () => {
    render(
      <Wrapper>
        <ExperiencePages
          exp={sampleExp}
          index={1}
          isActive={true}
          reducedMotion={true}
          updExp={vi.fn()}
          removeExp={vi.fn()}
          updPanels={vi.fn()}
          updStyle={vi.fn()}
        />
      </Wrapper>
    );

    expect(screen.getByText("工作内容")).toBeInTheDocument();
    expect(screen.getByText("写了很多代码")).toBeInTheDocument();
    expect(screen.getByText("工作成果")).toBeInTheDocument();
    expect(screen.getByText("上线了三个项目")).toBeInTheDocument();
  });
});
