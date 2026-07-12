import { describe, expect, it } from "vitest";
import { getLearnerRoute } from "./routes";
describe("getLearnerRoute", () => {
  it("starts beginners with the free route", () => expect(getLearnerRoute("starting").slug).toBe("va-career-starter"));
  it("bridges career shifters", () => expect(getLearnerRoute("shifting").title).toBe("Career Shift Bridge"));
  it("moves experienced VAs to Amazon foundations", () => expect(getLearnerRoute("experienced").slug).toBe("amazon-foundations"));
});
