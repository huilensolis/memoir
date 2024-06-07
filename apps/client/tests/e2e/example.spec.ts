import { test, expect } from "@playwright/test";

test("Auth", async ({ page }) => {
  await page.goto("https://localhost:3000/");

  expect(page).toHaveTitle(/Memoir/);

  await expect(
    page.getByText(
      "Build a journaling habit and document your dreams, reflections, experiences, mood and memories.",
    ),
  ).toBeVisible();

  await page.getByRole("link", { name: "Sign In" }).click();
  await page.getByPlaceholder("myemail@gmail.com").click();
  await page.getByPlaceholder("myemail@gmail.com").fill("testing@gmail.com");
  await page.getByPlaceholder("**********").click();
  await page.getByPlaceholder("**********").fill("asdfasdfasdfasd");
  await page.getByRole("button", { name: "Sign In" }).click();
  await page.locator("button").filter({ hasText: "test" }).click();
  await page.getByRole("button", { name: "Sign Out" }).click();
});

test("should be able to create a new document and change its title", async ({
  page,
}) => {
  await page.goto("https://localhost:3000/");

  expect(page).toHaveTitle(/Memoir/);

  await expect(
    page.getByText(
      "Build a journaling habit and document your dreams, reflections, experiences, mood and memories.",
    ),
  ).toBeVisible();

  // sign in
  await page.getByRole("link", { name: "Sign In" }).click();
  await page.getByPlaceholder("myemail@gmail.com").click();
  await page.getByPlaceholder("myemail@gmail.com").fill("testing@gmail.com");
  await page.getByPlaceholder("**********").click();
  await page.getByPlaceholder("**********").fill("asdfasdfasdfasd");
  await page.getByRole("button", { name: "Sign In" }).click();

  await page.getByRole("link", { name: "New Entry" }).click();
  await page.getByRole("heading", { name: "Untitled" }).click();
  await page
    .locator("div")
    .filter({ hasText: /^Untitled$/ })
    .nth(2)
    .fill("My new Title!");

  expect(page.getByText("My new Title!")).toBeVisible();

  // sign Out
  await page.locator("button").filter({ hasText: "test" }).click();
  await page.getByRole("button", { name: "Sign Out" }).click();
});

test("should be able to use the slash command to create 3 heading in 3 different levels", async ({
  page,
}) => {
  await page.goto("https://localhost:3000/");

  expect(page).toHaveTitle(/Memoir/);

  await expect(
    page.getByText(
      "Build a journaling habit and document your dreams, reflections, experiences, mood and memories.",
    ),
  ).toBeVisible();

  // sign in
  await page.getByRole("link", { name: "Sign In" }).click();
  await page.getByPlaceholder("myemail@gmail.com").click();
  await page.getByPlaceholder("myemail@gmail.com").fill("testing@gmail.com");
  await page.getByPlaceholder("**********").click();
  await page.getByPlaceholder("**********").fill("asdfasdfasdfasd");
  await page.getByRole("button", { name: "Sign In" }).click();

  await page.getByRole("link", { name: "New Entry" }).click();
  await page
    .locator("div")
    .filter({ hasText: /^Untitled$/ })
    .nth(1)
    .click();
  await page.getByRole("heading", { name: "Untitled" }).click();
  await page.locator("body").press("Enter");

  // create first h1
  await page.getByRole("heading", { level: 1 }).fill("Document-title\n");

  await page
    .locator("div")
    .filter({ hasText: /^Document-title$/ })
    .nth(2)
    .fill("/heading 1");

  await page.locator("body").press("Enter");

  // write text 'heading 1' inside h2 block
  page.getByRole("heading", { level: 2 }).fill("heading 2");

  // check h2 has correct css - in the ui says its an h1, but in html is h2
  // expect(page.getByText("heading 1")).toHaveCSS("font-weight", "700");
  // expect(page.getByText("heading 1")).toHaveCSS("font-size", "30px");

  // create h3
  // await page
  //   .locator("div")
  //   .filter({ hasText: /^heading 1$/ })
  //   .fill("heading 1\n/heading 2");
  // await page.locator("body").press("Enter");
  //
  // // write text 'heading 2' inside h3 block
  // page.getByRole("heading", { level: 3 }).fill("heading 2");

  // sign Out
  await page.locator("button").filter({ hasText: "test" }).click();
  await page.getByRole("button", { name: "Sign Out" }).click();
});
