import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { EditableBlock } from "../EditableBlock";
import { EditProvider } from "../../EditMode";

function Wrapper({
  children,
  editing = false,
}: {
  children: React.ReactNode;
  editing?: boolean;
}) {
  return <EditProvider initialEditing={editing}>{children}</EditProvider>;
}

describe("EditableBlock", () => {
  it("renders children in display mode", () => {
    render(
      <Wrapper>
        <EditableBlock blockKey="test" onStyleChange={vi.fn()}>
          Hello World
        </EditableBlock>
      </Wrapper>
    );
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("shows toolbar after clicking and hides when clicking outside", () => {
    render(
      <Wrapper editing>
        <div data-testid="outside">
          <EditableBlock blockKey="test" onStyleChange={vi.fn()}>
            Editable
          </EditableBlock>
        </div>
      </Wrapper>
    );

    const block = screen.getByText("Editable").closest("[data-editable-block]");
    expect(block).toBeInTheDocument();

    // Toolbar should not be visible before activation
    expect(screen.queryByText("标题")).not.toBeInTheDocument();

    fireEvent.mouseDown(block!);
    expect(screen.getByText("标题")).toBeInTheDocument();
    expect(screen.getByText("内容")).toBeInTheDocument();
    expect(screen.getByText("关键")).toBeInTheDocument();

    fireEvent.mouseDown(screen.getByTestId("outside"));
    expect(screen.queryByText("标题")).not.toBeInTheDocument();
  });

  it("does not render drag or resize handles", () => {
    render(
      <Wrapper editing>
        <EditableBlock blockKey="test" onStyleChange={vi.fn()}>
          No Rnd
        </EditableBlock>
      </Wrapper>
    );
    fireEvent.mouseDown(screen.getByText("No Rnd").closest("[data-editable-block]")!);
    expect(document.querySelector(".react-resizable-handle")).not.toBeInTheDocument();
    expect(document.querySelector(".react-draggable")).not.toBeInTheDocument();
  });

  it("calls onStyleChange when selecting role, color or font", () => {
    const onChange = vi.fn();
    render(
      <Wrapper editing>
        <EditableBlock blockKey="test" onStyleChange={onChange}>
          Style me
        </EditableBlock>
      </Wrapper>
    );

    fireEvent.mouseDown(screen.getByText("Style me").closest("[data-editable-block]")!);

    fireEvent.click(screen.getByText("标题"));
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ role: "title" }));

    // Click a color button by aria-label
    fireEvent.click(screen.getByLabelText("primary"));
    expect(onChange).toHaveBeenLastCalledWith(expect.objectContaining({ color: "#f97316" }));

    fireEvent.click(screen.getByText("等宽"));
    expect(onChange).toHaveBeenLastCalledWith(expect.objectContaining({ font: "mono" }));
  });

  it("renders with the same classes and inline styles in display and edit modes", () => {
    const style = { color: "#f97316", font: "serif" as const, role: "title" as const };
    const { rerender } = render(
      <Wrapper>
        <EditableBlock blockKey="test" style={style} onStyleChange={vi.fn()} className="inline-block">
          WYSIWYG
        </EditableBlock>
      </Wrapper>
    );

    const displaySpan = screen.getByText("WYSIWYG").closest("span")!;
    expect(displaySpan).toHaveClass("font-serif", "inline-block");
    expect(displaySpan).toHaveStyle({ color: "#f97316", fontWeight: "700" });

    rerender(
      <Wrapper editing>
        <EditableBlock blockKey="test" style={style} onStyleChange={vi.fn()} className="inline-block">
          WYSIWYG
        </EditableBlock>
      </Wrapper>
    );

    const editSpan = screen.getByText("WYSIWYG").closest("[data-editable-block]")!;
    expect(editSpan).toHaveClass("font-serif", "inline-block");
    expect(editSpan).toHaveStyle({ color: "#f97316", fontWeight: "700" });
  });
});
