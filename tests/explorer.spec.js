import { test, expect } from "@playwright/test";
test("filter cities, persist shortlist, and plan a day", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".city-card")).toHaveCount(6);
  await page.getByRole("button", { name: "East Africa", exact: true }).click();
  await expect(page.locator(".city-card")).toHaveCount(2);
  await page.getByRole("button", { name: "Everywhere", exact: true }).click();
  await page.getByRole("searchbox").fill("Nigeria");
  await expect(page.locator(".city-card")).toHaveCount(1);
  await page.getByRole("button", { name: "Save Lagos", exact: true }).click();
  await page.reload();
  await page.getByRole("button", { name: /Your shortlist/ }).click();
  await expect(page.locator(".city-card")).toHaveCount(1);
  await page.getByRole("link", { name: "Explore Lagos", exact: true }).click();
  await expect(page.getByTestId("budget")).toHaveText("$65 demo USD");
  await page.getByRole("checkbox").first().uncheck();
  await expect(page.getByTestId("budget")).toHaveText("$53 demo USD");
  await page.reload();
  await expect(page.getByRole("checkbox").first()).not.toBeChecked();
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download your day" }).click();
  expect((await download).suggestedFilename()).toBe("atlas-lagos.txt");
});
test("static deep links and mobile layout work", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/cities/cape-town/");
  await expect(
    page.getByRole("heading", { name: "Hello, Cape Town." }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.goto("/");
  await expect(page.locator(".city-card")).toHaveCount(6);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
