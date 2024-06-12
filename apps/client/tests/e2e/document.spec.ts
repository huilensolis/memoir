import test, { expect } from "@playwright/test";

test.describe("Document", () => {
  test("can create document from home buttons", async ({ page }) => {
    await page.goto("http://localhost:3000/app");

    await page
      .locator("button")
      .filter({ hasText: "New EntryCreate a new" })
      .click();

    await expect(page).toHaveURL(
      new RegExp("^http://localhost:3000/app/entry/"),
    );
  });

  test("can create document from side bar", async ({ page }) => {
    await page.goto("http://localhost:3000/app");

    await page.getByRole("button", { name: "New Entry" }).click();

    await expect(page).toHaveURL(
      new RegExp("^http://localhost:3000/app/entry/"),
    );
  });

  test("can read document from search-entry command modal - opened from aside button", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/app");

    await page.getByRole("button", { name: "Search Entry" }).click();

    await page.getByRole("option", { name: "Untitled" }).first().click();

    await expect(page).toHaveURL(
      new RegExp("^http://localhost:3000/app/entry/"),
    );
  });

  test("can read document from search-entry command modal - opened from home menu", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/app");

    await page
      .locator("button")
      .filter({ hasText: "Search EntrySearch and find" })
      .click();

    await page.getByRole("option", { name: "Untitled" }).first().click();

    await expect(page).toHaveURL(
      new RegExp("^http://localhost:3000/app/entry/"),
    );
  });

  test("can edit title of document", () => {});

  test("can use slash command on document", () => {});
});
