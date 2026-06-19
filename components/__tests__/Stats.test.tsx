import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import StatsSection from "../Stats";
import { EditProvider } from "../EditMode";

function Wrapper({ children }: { children: React.ReactNode }) {
  return <EditProvider initialEditing={true}>{children}</EditProvider>;
}

describe("StatsSection", () => {
  it("renders stats and allows editing the project count value", async () => {
    const fetchMock = vi.fn((input: RequestInfo | URL) => {
      const url = typeof input === "string" ? input : input.toString();
      if (url.includes("/api/public")) {
        return Promise.resolve({
          json: () =>
            Promise.resolve({
              stats: [{ id: 1, label: "项目", value: "12", order: 0 }],
            }),
          ok: true,
        } as Response);
      }
      return Promise.resolve({
        json: () => Promise.resolve({ success: true }),
        ok: true,
      } as Response);
    });
    global.fetch = fetchMock;

    render(
      <Wrapper>
        <StatsSection />
      </Wrapper>
    );

    await waitFor(() => {
      expect(screen.getByText("项目")).toBeInTheDocument();
      expect(screen.getByText("12")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("12"));
    const editable = screen.getByText("12");
    expect(editable).toHaveAttribute("contenteditable", "true");

    editable.textContent = "24";
    fireEvent.blur(editable);

    await waitFor(() => {
      const saveCall = fetchMock.mock.calls.find((call) =>
        String(call[0]).includes("/api/admin/stats")
      );
      expect(saveCall).toBeDefined();
      const [, init] = saveCall as unknown as [string, RequestInit];
      expect(init.method).toBe("PUT");
      expect(init.body).toContain("24");
    });
  });
});
