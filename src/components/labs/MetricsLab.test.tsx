import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MetricsLab } from "./MetricsLab";
describe("MetricsLab", () => {
  it("renders calculated metrics and updates from input", () => { render(<MetricsLab/>); expect(screen.getByText("25%")).toBeInTheDocument(); const spend=screen.getByLabelText(/ad spend/i); fireEvent.change(spend,{target:{value:"600"}}); expect(screen.getByText("50%")).toBeInTheDocument(); });
});
