import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import PersonalAdvantages from "../PersonalAdvantages";
import { EditProvider } from "../EditMode";
import type { AdvantageData } from "@/lib/types";

const sampleItems: AdvantageData[] = [
  {
    id: 1,
    title: "执行力",
    description: "高效推进项目落地。",
    icon: "Zap",
    style: "{}",
    order: 0,
  },
  {
    id: 2,
    title: "学习能力",
    description: "快速掌握新技术。",
    icon: "Brain",
    style: "{}",
    order: 1,
  },
];

function Wrapper({ children, editing = true }: { children: React.ReactNode; editing?: boolean }) {
  return <EditProvider initialEditing={editing}>{children}</EditProvider>;
}

describe("PersonalAdvantages", () => {
  it("renders static content in edit mode without editable outlines", () => {
    render(
      <Wrapper>
        <PersonalAdvantages
          items={sampleItems}
          isActive={true}
          reducedMotion={true}
        />
      </Wrapper>
    );

    expect(screen.getByText("个人优势")).toBeInTheDocument();
    expect(screen.getByText("执行力")).toBeInTheDocument();
    expect(screen.getByText("高效推进项目落地。")).toBeInTheDocument();
    expect(document.querySelector("[data-editable-block]")).not.toBeInTheDocument();
  });

  it("does not show add or remove advantage controls in edit mode", () => {
    render(
      <Wrapper>
        <PersonalAdvantages
          items={sampleItems}
          isActive={true}
          reducedMotion={true}
        />
      </Wrapper>
    );

    expect(screen.queryByText("添加优势")).not.toBeInTheDocument();
    expect(screen.queryByText("删除")).not.toBeInTheDocument();
  });
});
