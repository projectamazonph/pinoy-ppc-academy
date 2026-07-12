import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "./page";
describe("landing page", () => {
  it("states the beginner promise and constraints", () => { render(<HomePage/>); expect(screen.getByRole("heading",{name:/start your va career with proof/i})).toBeInTheDocument(); expect(screen.getByText(/no amazon account required/i)).toBeInTheDocument(); expect(screen.getByText(/no ai-generated lessons/i)).toBeInTheDocument(); });
  it("preserves paid tier choice", () => { render(<HomePage/>); expect(screen.getByRole("link",{name:/choose ppc foundations/i})).toHaveAttribute("href","/signup?tier=ppc-foundations"); });
  it("uses native keyboard-operable FAQs", () => { const {container}=render(<HomePage/>); expect(container.querySelectorAll("details").length).toBeGreaterThanOrEqual(10); });
  it("does not guarantee employment", () => { render(<HomePage/>); expect(screen.getByText(/does not guarantee a job or income/i)).toBeInTheDocument(); });
});
