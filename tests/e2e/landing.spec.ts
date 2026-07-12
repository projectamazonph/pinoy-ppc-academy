import { expect, test } from "@playwright/test";
test("landing has no horizontal overflow at 390px", async ({page}) => { await page.setViewportSize({width:390,height:844}); await page.goto("/"); expect(await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth)).toBeLessThanOrEqual(0); });
test("career shifter route updates", async ({page}) => { await page.goto("/"); await page.getByRole("button",{name:/shifting from another career/i}).click(); await expect(page.getByText("Career Shift Bridge")).toBeVisible(); });
