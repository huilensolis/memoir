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

  test("can edit title of document", async ({ page }) => {
    await page.goto("http://localhost:3000/app");

    await page
      .locator("button")
      .filter({ hasText: "New EntryCreate a new" })
      .click();

    await expect(page).toHaveURL(
      new RegExp("^http://localhost:3000/app/entry/"),
    );

    await page.getByPlaceholder("Title").click();
    await page.getByPlaceholder("Title").fill("");
    await page.getByPlaceholder("Title").fill("My document title!");
  });

  test("can use slash command on document", async ({ page }) => {
    await page.goto("http://localhost:3000/app");

    await page.getByRole("button", { name: "New Entry" }).click();
    await expect(page).toHaveURL(
      new RegExp("^http://localhost:3000/app/entry/"),
    );

    await page.getByRole("paragraph").nth(1).click();

    // we open the slash command menu and search for a heading 1
    await page
      .locator("main")
      .filter({ hasText: /^a few seconds ago$/ })
      .locator("div")
      .nth(2)
      .fill("/heading1");

    // we select the heading 1
    await page.locator("body").press("Enter");

    const h1Block = page.getByRole("heading", { level: 2 }).nth(0);

    // we write "heading 1" on the heading 1 block - the heading 1 block is <h2></h2> in HTML
    await h1Block.fill("heading 1");

    // verify the heading 1 block is a heading 1 block! - heading 1 blocks are <h2></h2> in HTML!
    expect(h1Block).toBeVisible();
    expect(h1Block).toContainText("heading 1");
    expect(h1Block).toHaveCSS("font-weight", "700");
    expect(h1Block).toHaveCSS("font-size", "30px");

    // create a new paragraphh block bellow
    await h1Block.click();
    await h1Block.fill("heading 1 \n");

    // select the paragraph generated bellow the h1 block
    await page.getByRole("paragraph").nth(1).click();

    // we open the slash command menu and search for a heading 2
    await page.getByRole("paragraph").nth(1).fill("/heading2");

    // we select the heading 2
    await page.locator("body").press("Enter");

    const h2Block = page
      .locator("main")
      .filter({ hasText: "waitinga few seconds" })
      .locator("h3");

    // we write "heading 2" on the heading 2 block
    await h2Block.fill("heading 2");

    expect(h2Block).toBeVisible();
    expect(h2Block).toContainText("heading 2");
    expect(h2Block).toHaveCSS("font-weight", "700");
    expect(h2Block).toHaveCSS("font-size", "24px");
  });
});
