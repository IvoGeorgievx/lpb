import { expect, test } from "@playwright/test";
import { DRAFT_KEY, MAX_DOCUMENT_ITEMS, type Page } from "../../lib/document";

test("a page survives editing, undo, recovery, preview, and independent export", async ({
	page,
	context,
	request,
}) => {
	const errors: string[] = [];
	page.on("pageerror", (error) => errors.push(error.message));
	await page.goto("./");
	await page
		.getByRole("button", { name: "Use the studio template", exact: true })
		.click();
	await page.getByRole("button", { name: "Edit Hero", exact: true }).click();
	await page
		.getByLabel("Heading", { exact: true })
		.fill("A portable landing page");
	const png =
		"iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jV1sAAAAASUVORK5CYII=";
	await page.locator("#hero-image").setInputFiles({
		name: "example.png",
		mimeType: "image/png",
		buffer: Buffer.from(png, "base64"),
	});
	await expect(page.locator(".hero-block-surface")).toHaveAttribute(
		"style",
		/data:image\/png;base64/,
	);
	await page
		.getByRole("button", { name: "Page settings", exact: true })
		.click();
	await page
		.getByLabel("Page title", { exact: true })
		.fill("Portable example");
	await page.getByRole("radio", { name: "Dark Neon", exact: true }).check();
	await expect(page.locator(".hero-block h1")).toHaveText(
		"A portable landing page",
	);
	await page
		.getByRole("button", { name: "Remove Hero", exact: true })
		.click();
	await page.getByRole("button", { name: "Undo", exact: true }).click();
	await expect(page.locator(".hero-block h1")).toHaveText(
		"A portable landing page",
	);

	await page
		.getByRole("button", { name: "Edit Features", exact: true })
		.click();
	await page
		.getByLabel("Heading", { exact: true })
		.fill("Latest card heading");
	await page
		.getByRole("button", { name: "Remove selected card", exact: true })
		.click();
	await page.getByRole("button", { name: "Undo", exact: true }).click();
	await expect(page.getByLabel("Heading", { exact: true })).toHaveValue(
		"Latest card heading",
	);
	await page
		.getByLabel("Heading color", { exact: true })
		.fill("linear-gradient(red, blue)");
	await expect(
		page.getByLabel("Heading color", { exact: true }),
	).toHaveAttribute("aria-invalid", "true");
	await expect(
		page.getByRole("alert").filter({ hasText: "Gradients cannot color" }),
	).toBeVisible();
	await page.getByLabel("Heading color", { exact: true }).press("Escape");
	await expect(
		page.getByLabel("Heading color", { exact: true }),
	).toHaveAttribute("aria-invalid", "false");
	await page
		.getByLabel("Card background", { exact: true })
		.fill("linear-gradient(90deg, #eeeeee, #ffffff)");
	await expect(
		page.getByLabel("Card background", { exact: true }),
	).toHaveAttribute("aria-invalid", "false");
	await expect(page.locator(".product-card").first()).toHaveAttribute(
		"style",
		/linear-gradient/,
	);
	await page.setViewportSize({ width: 1024, height: 768 });
	const widths = await page
		.locator(
			".product-editor input, .product-editor textarea, .product-editor select",
		)
		.evaluateAll((elements) =>
			elements.map((element) => element.getBoundingClientRect().width),
		);
	expect(widths.every((width) => width >= 200)).toBeTruthy();
	await page.setViewportSize({ width: 1440, height: 960 });
	await expect(page.locator(".builder-toolbar [role=status]")).toHaveText(
		"Saved locally",
	);
	await page.reload();
	await expect(page.locator(".hero-block h1")).toHaveText(
		"A portable landing page",
	);
	await expect(page.locator(".product-card-heading").first()).toHaveText(
		"Latest card heading",
	);

	await page
		.getByRole("button", { name: "Add Testimonials", exact: true })
		.click();
	await page
		.getByLabel("Section background", { exact: true })
		.fill("#345678");
	await page
		.getByLabel("Testimonial 1 background", { exact: true })
		.fill("#abcdef");
	await page.getByRole("button", { name: "Preview", exact: true }).click();
	const preview = page.frameLocator('iframe[title="Exported page preview"]');
	await preview
		.getByRole("link", { name: "Discuss your project", exact: true })
		.click();
	await expect(preview.locator("#contact")).toBeInViewport();
	await expect(
		preview.getByRole("heading", {
			name: "A portable landing page",
			exact: true,
		}),
	).toHaveCount(1);
	const frame = await preview.locator("html").evaluate(() => location.href);
	expect(frame).toBe("about:srcdoc#contact");
	await preview
		.getByRole("link", { name: "Show testimonial 2", exact: true })
		.click();
	const centers = await preview
		.locator(".testimonial-nav-item")
		.evaluateAll((elements) =>
			elements.map((element) => {
				const outer = element.getBoundingClientRect();
				const inner = element
					.querySelector("span")!
					.getBoundingClientRect();
				return [
					Math.abs(
						outer.x + outer.width / 2 - inner.x - inner.width / 2,
					),
					Math.abs(
						outer.y + outer.height / 2 - inner.y - inner.height / 2,
					),
				];
			}),
		);
	expect(centers.every(([x, y]) => x < 1 && y < 1)).toBeTruthy();
	await page.getByRole("button", { name: "Mobile", exact: true }).click();
	await expect(preview.locator(".testimonial-block")).toHaveCSS(
		"background-color",
		"rgb(52, 86, 120)",
	);
	await page.getByRole("button", { name: "Desktop", exact: true }).focus();
	await page.keyboard.press("Escape");
	await expect(page.getByRole("dialog")).toHaveCount(0);

	const downloaded = page.waitForEvent("download");
	await page
		.getByRole("button", { name: "Export HTML", exact: true })
		.click();
	const download = await downloaded;
	expect(download.suggestedFilename()).toBe("index.html");
	const stream = await download.createReadStream();
	const chunks: Buffer[] = [];
	for await (const chunk of stream!) chunks.push(Buffer.from(chunk));
	const html = Buffer.concat(chunks).toString("utf8");
	expect(html).toContain("<title>Portable example</title>");
	expect(html).toContain(`data:image/png;base64,${png}`);
	expect(html).toContain("background:#345678");
	expect(html).not.toContain("about:srcdoc");
	expect(html).not.toContain("<script");
	const independent = await context.newPage();
	await independent.route("https://example.test/index.html", (route) =>
		route.fulfill({ body: html, contentType: "text/html" }),
	);
	await independent.goto("https://example.test/index.html");
	await independent
		.getByRole("link", { name: "Discuss your project", exact: true })
		.click();
	await expect(independent).toHaveURL(
		"https://example.test/index.html#contact",
	);
	expect(
		await independent
			.locator(".hero-block-surface")
			.evaluate((element) => getComputedStyle(element).backgroundImage),
	).toContain(`data:image/png;base64,${png}`);
	await independent.close();

	await page.setViewportSize({ width: 390, height: 844 });
	await expect(
		page.getByRole("button", {
			name: "Download example HTML",
			exact: true,
		}),
	).toBeVisible();
	await expect(
		page.getByRole("heading", {
			name: "Good spaces start with a conversation.",
			exact: true,
		}),
	).toBeVisible();
	expect(
		await page.evaluate(
			() => document.documentElement.scrollWidth <= innerWidth,
		),
	).toBeTruthy();
	await page.setViewportSize({ width: 1440, height: 960 });
	await expect(
		page.getByRole("link", {
			name: "Source / How it’s built",
			exact: true,
		}),
	).toBeVisible();
	const exampleURL = await page
		.getByRole("link", { name: "Exported example", exact: true })
		.getAttribute("href");
	expect((await request.get(exampleURL!)).ok()).toBeTruthy();
	expect((await request.post("./")).status()).toBe(405);
	expect((await request.get("./%ZZ")).status()).toBe(400);
	await expect(page.locator(".builder-toolbar [role=status]")).toHaveText(
		"Saved locally",
	);
	// Seed after the previous document's final autosave, before hydration reads storage.
	await page.addInitScript(
		({ key, limit }) => {
			if (sessionStorage.getItem("seeded-card-limit")) return;
			const draft = JSON.parse(localStorage.getItem(key)!) as {
				version: number;
				page: Page;
			};
			const features = draft.page.blocks.find(
				(block) => block.type === "product",
			);
			if (!features || !features.props.cards?.[0])
				throw new Error("Missing feature card");
			const card = features.props.cards[0];
			features.props.cards = Array.from(
				{ length: limit },
				(_, index) => ({ ...card, id: `limit-card-${index}` }),
			);
			localStorage.setItem(key, JSON.stringify(draft));
			sessionStorage.setItem("seeded-card-limit", "true");
		},
		{ key: DRAFT_KEY, limit: MAX_DOCUMENT_ITEMS },
	);
	await page.reload();
	await page
		.getByRole("button", { name: "Edit Features", exact: true })
		.click();
	await expect(
		page.getByRole("button", { name: "Add card", exact: true }),
	).toBeDisabled();
	await expect(page.getByLabel("Heading", { exact: true })).toHaveValue(
		"Latest card heading",
	);
	await page.addInitScript(
		({ key, limit }) => {
			if (sessionStorage.getItem("seeded-section-limit")) return;
			const draft = JSON.parse(localStorage.getItem(key)!) as {
				version: number;
				page: Page;
			};
			const header = draft.page.blocks.find(
				(block) => block.type === "header",
			);
			if (!header) throw new Error("Missing header");
			draft.page.blocks = Array.from({ length: limit }, (_, index) => ({
				...header,
				id: `limit-header-${index}`,
			}));
			localStorage.setItem(key, JSON.stringify(draft));
			sessionStorage.setItem("seeded-section-limit", "true");
		},
		{ key: DRAFT_KEY, limit: MAX_DOCUMENT_ITEMS },
	);
	await page.reload();
	await expect(
		page.getByRole("button", { name: "Add Hero", exact: true }),
	).toBeDisabled();
	expect(errors).toEqual([]);
});
