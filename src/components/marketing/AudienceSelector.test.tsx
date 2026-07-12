import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AudienceSelector } from "./AudienceSelector";
describe("AudienceSelector", () => {
  it("starts with VA Career Starter", () => { render(<AudienceSelector/>); expect(screen.getByText("VA Career Starter")).toBeInTheDocument(); });
  it("updates without navigation", () => { render(<AudienceSelector/>); fireEvent.click(screen.getByRole("button",{name:/shifting from another career/i})); expect(screen.getByText("Career Shift Bridge")).toBeInTheDocument(); });
});
