import { test as setup } from "@playwright/test";

const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto("http://localhost:3000/auth/sign-up");

  await page.getByLabel("Name").fill("my-name");
  await page.getByLabel("Email").fill("inextisting-email@gmail.com");
  await page.getByLabel("Password").fill("my-long-password");
  await page.getByRole("button", { name: "Sign Up" }).click();
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL("http://localhost:3000/app");

  // End of authentication steps.
  await page.context().storageState({ path: authFile });
});
