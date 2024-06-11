import { test } from "@playwright/test";

test("sign up", async ({ page }) => {
  await page.goto("https://localhost:3000/");
  await page.getByRole("link", { name: "Sign Up" }).click();

  await page.getByPlaceholder("Cesar").fill("my-username");

  await page.getByPlaceholder("anemail@gmail.com").click();
  await page.getByPlaceholder("anemail@gmail.com").fill("my-email@gmail.com");

  await page.getByPlaceholder("********").click();
  await page.getByPlaceholder("********").fill("mypassword123123");

  await page.getByRole("button", { name: "Sign Up" }).click();

  await page.locator("button").filter({ hasText: "my-username" }).click();
  await page.getByRole("button", { name: "Sign Out" }).click();
});

test("sign in", async ({ page }) => {
  await page.goto("https://localhost:3000/");
  await page.getByRole("link", { name: "Sign In" }).click();

  await page.getByPlaceholder("myemail@gmail.com").click();
  await page.getByPlaceholder("myemail@gmail.com").fill("my-email@gmail.com");
  await page.getByPlaceholder("**********").click();
  await page.getByPlaceholder("**********").fill("mypassword123123");
  await page.getByRole("button", { name: "Sign In" }).click();

  await page.locator("button").filter({ hasText: "my-username" }).click();
  await page.getByRole("button", { name: "Sign Out" }).click();
});
