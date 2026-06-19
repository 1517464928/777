import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { EditableText } from "../InlineEdit";
import { EditProvider } from "../../EditMode";

function Wrapper({
  children,
  editing = true,
}: {
  children: React.ReactNode;
  editing?: boolean;
}) {
  return <EditProvider initialEditing={editing}>{children}</EditProvider>;
}

describe("EditableText", () => {
  it("enters edit mode on click and saves on blur", () => {
    const onSave = vi.fn();
    render(
      <Wrapper>
        <EditableText value="Hello" onSave={onSave} />
      </Wrapper>
    );

    const text = screen.getByText("Hello");
    fireEvent.click(text);

    const editable = screen.getByText("Hello");
    expect(editable).toHaveAttribute("contenteditable", "true");

    editable.textContent = "World";
    fireEvent.blur(editable);
    expect(onSave).toHaveBeenCalledWith("World");
  });

  it("cancels editing on Escape without saving", () => {
    const onSave = vi.fn();
    render(
      <Wrapper>
        <EditableText value="Hello" onSave={onSave} />
      </Wrapper>
    );

    fireEvent.click(screen.getByText("Hello"));
    const editable = screen.getByText("Hello");
    editable.textContent = "World";
    fireEvent.keyDown(editable, { key: "Escape" });

    expect(onSave).not.toHaveBeenCalled();
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("stops pointer events from bubbling to parent drag handlers", () => {
    const parentPointerDown = vi.fn();
    render(
      <Wrapper>
        <div onPointerDown={parentPointerDown}>
          <EditableText value="Child" onSave={vi.fn()} />
        </div>
      </Wrapper>
    );

    fireEvent.pointerDown(screen.getByText("Child"));
    expect(parentPointerDown).not.toHaveBeenCalled();
  });

  it("saves on Enter for single-line content", () => {
    const onSave = vi.fn();
    render(
      <Wrapper>
        <EditableText value="Hi" onSave={onSave} />
      </Wrapper>
    );

    fireEvent.click(screen.getByText("Hi"));
    const editable = screen.getByText("Hi");
    editable.textContent = "Bye";
    fireEvent.keyDown(editable, { key: "Enter" });
    expect(onSave).toHaveBeenCalledWith("Bye");
  });

  it("saves on Ctrl+Enter for multiline content", () => {
    const onSave = vi.fn();
    render(
      <Wrapper>
        <EditableText value="Line 1" onSave={onSave} multiline />
      </Wrapper>
    );

    fireEvent.click(screen.getByText("Line 1"));
    const editable = screen.getByText("Line 1");
    editable.textContent = "Line 2";
    fireEvent.keyDown(editable, { key: "Enter", ctrlKey: true });
    expect(onSave).toHaveBeenCalledWith("Line 2");
  });

  it("preserves the same className in display and edit modes", () => {
    const className = "text-xl font-bold text-red-500";
    render(
      <Wrapper>
        <EditableText value="Styled" onSave={vi.fn()} className={className} />
      </Wrapper>
    );

    const display = screen.getByText("Styled");
    expect(display).toHaveClass("text-xl", "font-bold", "text-red-500");

    fireEvent.click(display);
    const editable = screen.getByText("Styled");
    expect(editable).toHaveClass("text-xl", "font-bold", "text-red-500");
  });
});
