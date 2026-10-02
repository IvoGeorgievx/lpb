/* eslint-disable @typescript-eslint/no-require-imports */
// A tiny TS/TSX loader lets Node assertions exercise the real components without a test framework.
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const ts = require("typescript");
const assert = require("node:assert/strict");
const root = path.resolve(__dirname, "..");
const resolve = Module._resolveFilename;
Module._resolveFilename = function (request, ...args) {
	return resolve.call(
		this,
		request.startsWith("@/") ? path.join(root, request.slice(2)) : request,
		...args,
	);
};
for (const extension of [".ts", ".tsx"])
	require.extensions[extension] = (module, filename) => {
		const { outputText } = ts.transpileModule(
			fs.readFileSync(filename, "utf8"),
			{
				compilerOptions: {
					module: ts.ModuleKind.CommonJS,
					jsx: ts.JsxEmit.ReactJSX,
					esModuleInterop: true,
					target: ts.ScriptTarget.ES2022,
				},
				fileName: filename,
			},
		);
		module._compile(outputText, filename);
	};
const { createTemplate } = require("../lib/template.ts");
const { generateHTML, generatePreviewHTML } = require("../lib/export.tsx");
if (process.argv.includes("--example")) {
	const page = createTemplate();
	fs.writeFileSync(
		path.join(root, "public", "example.html"),
		generateHTML(page.blocks, page.activeTheme, page),
	);
	console.log(
		"Generated public/example.html from the actual export pipeline.",
	);
} else {
	const { getThemeDefaultProps, createBlock } = require("../lib/blocks.tsx");
	const {
		resolveEditorProps,
		preserveThemeBindings,
	} = require("../lib/theme.ts");
	const {
		EMPTY_PAGE,
		MAX_DOCUMENT_ITEMS,
		applyTheme,
		restoreDraft,
		serializeDraft,
		historyReducer,
		initialHistory,
		safeLink,
		safeEmbed,
		validateImage,
	} = require("../lib/document.ts");
	const page = createTemplate();
	page.blocks[1].props.heading = "Edited <heading> & content";
	page.blocks.push({ ...structuredClone(page.blocks[1]), id: "second-hero" });
	const changed = applyTheme(page, "darkNeon");
	assert.deepEqual(
		changed.blocks,
		page.blocks,
		"Theme changes must preserve all content and ordering",
	);
	const raw = getThemeDefaultProps().header;
	const view = resolveEditorProps(raw, page.activeTheme);
	assert.equal(
		view.style.background,
		"#f7f8fb",
		"Controls must show resolved colors",
	);
	assert.equal(view.cta.backgroundColor, "#1f3a6e");
	const edit = preserveThemeBindings(raw, view, {
		...view,
		logoText: "Edited logo",
	});
	assert.equal(
		edit.style.background,
		"var(--lpb-background)",
		"Editing text must not detach theme colors",
	);
	assert.equal(edit.cta.backgroundColor, "var(--lpb-primary)");
	const colorEdit = preserveThemeBindings(raw, view, {
		style: { background: "#123456" },
	});
	assert.equal(
		colorEdit.style.background,
		"#123456",
		"Custom colors must persist",
	);
	const rawSlides = [{ bgColor: "var(--lpb-card)" }, { bgColor: "#ffffff" }];
	const slideView = resolveEditorProps(rawSlides, page.activeTheme);
	assert.equal(
		preserveThemeBindings(rawSlides, slideView, slideView.slice(1))[0]
			.bgColor,
		"#ffffff",
		"Removing an earlier item must not rebind a later custom color to the theme",
	);
	assert.equal(
		resolveEditorProps(
			{ style: { borderRadius: "var(--lpb-radius)" } },
			page.activeTheme,
		).style.borderRadius,
		20,
		"Pixel tokens must become numeric control values",
	);
	assert.deepEqual(
		restoreDraft(serializeDraft(changed)),
		changed,
		"Drafts must round-trip",
	);
	for (const invalid of [
		"{}",
		"not json",
		JSON.stringify({ version: 9, page }),
		JSON.stringify({
			version: 1,
			page: { ...page, activeTheme: "unknown" },
		}),
		JSON.stringify({
			version: 1,
			page: { ...page, blocks: [...page.blocks, page.blocks[0]] },
		}),
		JSON.stringify({
			version: 1,
			page: {
				...page,
				blocks: [{ ...page.blocks[1], props: { heading: {} } }],
			},
		}),
		JSON.stringify({
			version: 1,
			page: {
				...page,
				blocks: [{ ...page.blocks[1], props: { onClick: "bad" } }],
			},
		}),
	])
		assert.throws(() => restoreDraft(invalid));
	let history = initialHistory(EMPTY_PAGE);
	history = historyReducer(history, { type: "edit", page, time: 1 });
	history = historyReducer(history, {
		type: "edit",
		page: { ...page, title: "First" },
		group: "title",
		time: 2,
	});
	history = historyReducer(history, {
		type: "edit",
		page: { ...page, title: "Second" },
		group: "title",
		time: 200,
	});
	assert.equal(
		history.past.length,
		2,
		"Continuous edits should form one undo step",
	);
	history = historyReducer(history, { type: "undo" });
	assert.equal(history.present.title, page.title);
	history = historyReducer(history, { type: "redo" });
	assert.equal(history.present.title, "Second");
	history = historyReducer(history, { type: "undo" });
	history = historyReducer(history, {
		type: "edit",
		page: changed,
		time: 1000,
	});
	assert.equal(
		history.future.length,
		0,
		"An edit after undo must discard the old redo branch",
	);
	for (let i = 0; i < 60; i++)
		history = historyReducer(history, {
			type: "edit",
			page: { ...page, title: String(i) },
			time: 2000 + i,
		});
	assert.equal(history.past.length, 40, "History must remain bounded");
	const features = {
		...page,
		blocks: [
			{
				id: "features",
				type: "product",
				timestamp: 0,
				props: { cards: getThemeDefaultProps().product.cards },
			},
		],
	};
	const renamed = structuredClone(features);
	renamed.blocks[0].props.cards[0].heading.content = "Latest heading";
	let edits = initialHistory(features);
	edits = historyReducer(edits, {
		type: "edit",
		page: renamed,
		group: "features:card-heading",
		time: 1000,
	});
	const removed = {
		...renamed,
		blocks: [
			{
				...renamed.blocks[0],
				props: { cards: renamed.blocks[0].props.cards.slice(1) },
			},
		],
	};
	edits = historyReducer(edits, {
		type: "edit",
		page: removed,
		group: "features:card-heading",
		time: 1100,
	});
	assert.equal(
		historyReducer(edits, { type: "undo" }).present.blocks[0].props.cards[0]
			.heading.content,
		"Latest heading",
		"Undo deletion must retain the preceding content edit",
	);
	edits = historyReducer(initialHistory(page), {
		type: "edit",
		page: { ...page, title: "First" },
		group: "title",
		time: 1000,
	});
	edits = historyReducer(edits, { type: "boundary" });
	edits = historyReducer(edits, {
		type: "edit",
		page: { ...page, title: "Second" },
		group: "title",
		time: 1100,
	});
	assert.equal(
		historyReducer(edits, { type: "undo" }).present.title,
		"First",
		"Leaving and returning to a field must start a new undo group",
	);
	const largest = {
		...features,
		blocks: [
			{
				...features.blocks[0],
				props: {
					cards: Array.from(
						{ length: MAX_DOCUMENT_ITEMS },
						(_, index) => ({
							...features.blocks[0].props.cards[0],
							id: String(index),
						}),
					),
				},
			},
		],
	};
	assert.deepEqual(
		restoreDraft(serializeDraft(largest)),
		largest,
		"The maximum supported card count must restore",
	);
	largest.blocks[0].props.cards.push({
		...largest.blocks[0].props.cards[0],
		id: "too-many",
	});
	assert.throws(
		() => restoreDraft(serializeDraft(largest)),
		/Draft too large/,
	);
	assert(
		generatePreviewHTML(page).includes('<base href="about:srcdoc"/>'),
		"Preview fragments need their own base URL",
	);
	assert(
		!generateHTML(page.blocks, page.activeTheme, page).includes(
			"about:srcdoc",
		),
		"Preview-only behavior must not leak into exported files",
	);
	assert.equal(safeLink("javascript:alert(1)"), "#");
	assert.equal(safeLink("https://example.com"), "https://example.com");
	assert.equal(safeLink("#contact"), "#contact");
	assert.equal(safeEmbed("data:text/html,bad"), "");
	assert.equal(
		safeEmbed("https://example.com/embed"),
		"https://example.com/embed",
	);
	assert.throws(() => validateImage({ type: "image/svg+xml", size: 5 }));
	assert.throws(() =>
		validateImage({ type: "image/png", size: 1024 * 1024 + 1 }),
	);
	validateImage({ type: "image/png", size: 100 });
	const testimonial = getThemeDefaultProps().testimonial;
	const blocks = ["default", "default", "fade", "fade"].map((type, i) => ({
		id: `testimonial-${i}`,
		type: "testimonial",
		timestamp: i,
		props: { ...testimonial, carousel: { ...testimonial.carousel, type } },
	}));
	const firstCTA = createBlock("cta", []);
	assert.equal(
		firstCTA.props.id,
		"contact",
		"The first CTA must be reachable from the default hero link",
	);
	assert.notEqual(
		createBlock("cta", [firstCTA]).props.id,
		"contact",
		"Additional CTAs need unique anchors",
	);
	const html = generateHTML(
		[
			...page.blocks,
			...blocks,
			createBlock("cta", page.blocks),
			createBlock("cta", page.blocks),
		],
		page.activeTheme,
		{
			title: '</title><script>alert("x")</script>',
			description: '"/><script>bad</script>',
		},
	);
	const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
	assert.equal(
		ids.length,
		new Set(ids).size,
		"All exported IDs must be unique",
	);
	assert(
		!html.includes("<script>"),
		"Text and metadata must not inject HTML",
	);
	assert(html.includes("Edited &lt;heading&gt; &amp; content"));
	assert(
		html.includes("data:image/svg+xml"),
		"Starter image must be embedded",
	);
	assert(!html.includes("blob:"));
	assert(!html.includes("lucide-static"));
	assert(html.includes("<svg"), "Icons must be inline SVG");
	assert(
		!/<a\b[^>]*>\s*<button/.test(html),
		"Links must not contain buttons",
	);
	const png = "data:image/png;base64,iVBORw0KGgo=";
	page.blocks[1].props.style.backgroundImage = `url("${png}")`;
	assert(
		generateHTML(page.blocks, page.activeTheme, page).includes(png),
		"Uploaded data must survive export serialization",
	);
	assert(
		generateHTML(page.blocks, page.activeTheme, page).includes(
			'href="#contact"',
		),
		"Hero CTA must have a destination",
	);
	for (const type of ["default", "fade"]) {
		const colored = generateHTML(
			[
				{
					id: "custom-testimonial",
					type: "testimonial",
					timestamp: 0,
					props: {
						style: { background: "#123456" },
						carousel: {
							type,
							slides: [
								{
									heading: "Custom colors",
									bgColor: "#abcdef",
									textColor: "#fedcba",
								},
							],
						},
					},
				},
			],
			page.activeTheme,
		);
		assert(
			colored.includes("background:#123456"),
			"Testimonial section background must export",
		);
		assert(
			colored.includes("background:#abcdef"),
			"Testimonial slide background must export",
		);
		assert(
			colored.includes("color:#fedcba"),
			"Testimonial text color must export in both carousel modes",
		);
	}
	console.log(
		"Passed: theme preservation, draft validation, history, URL/image boundaries, unique carousels, escaped export, embedded assets, and CTA links.",
	);
}
