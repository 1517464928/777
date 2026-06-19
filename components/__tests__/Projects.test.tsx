import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProjectsSection from "../Projects";
import { EditProvider } from "../EditMode";

function Wrapper({ children, editing = true }: { children: React.ReactNode; editing?: boolean }) {
  return <EditProvider initialEditing={editing}>{children}</EditProvider>;
}

describe("ProjectsSection", () => {
  it("renders projects and shows delete button only in edit mode", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            projects: [
              {
                id: 1,
                title: "项目 A",
                description: "描述 A",
                imageUrl: "",
                videoUrl: "",
                link: "",
                style: "{}",
                order: 0,
              },
            ],
          }),
        ok: true,
      } as Response)
    );

    const { rerender } = render(
      <Wrapper editing={false}>
        <ProjectsSection />
      </Wrapper>
    );

    expect(await screen.findByText("项目 A")).toBeInTheDocument();
    expect(screen.getByText("描述 A")).toBeInTheDocument();
    expect(document.querySelector("[data-editable-block]")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("删除项目")).not.toBeInTheDocument();

    rerender(
      <Wrapper editing={true}>
        <ProjectsSection />
      </Wrapper>
    );

    expect(screen.getByLabelText("删除项目")).toBeInTheDocument();
  });

  it("deletes a project when delete button is clicked in edit mode", async () => {
    const fetchMock = vi.fn((input: RequestInfo | URL) => {
      const url = typeof input === "string" ? input : input.toString();
      if (url.includes("/api/public")) {
        return Promise.resolve({
          json: () =>
            Promise.resolve({
              projects: [
                {
                  id: 1,
                  title: "项目 A",
                  description: "描述 A",
                  imageUrl: "",
                  videoUrl: "",
                  link: "",
                  style: "{}",
                  order: 0,
                },
              ],
            }),
          ok: true,
        } as Response);
      }
      return Promise.resolve({ json: () => Promise.resolve({ success: true }), ok: true } as Response);
    });
    global.fetch = fetchMock;

    render(
      <Wrapper editing={true}>
        <ProjectsSection />
      </Wrapper>
    );

    expect(await screen.findByText("项目 A")).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText("删除项目"));

    await waitFor(() => {
      expect(screen.queryByText("项目 A")).not.toBeInTheDocument();
    });

    const saveCall = fetchMock.mock.calls.find((call) =>
      String(call[0]).includes("/api/admin/projects")
    );
    expect(saveCall).toBeDefined();
    const [, init] = saveCall as unknown as [string, RequestInit];
    expect(init.method).toBe("PUT");
    expect(init.body).toContain("projects");
  });
});
