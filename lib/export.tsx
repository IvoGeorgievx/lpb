/* eslint-disable @next/next/no-head-element -- This renders an exported document, not a Next.js route. */
import { renderToStaticMarkup } from "react-dom/server";
import { renderBlock, type DroppedItem } from "./blocks";
import { Fragment } from "react";
import { exportCss } from "./exportCss";
import {
	DEFAULT_THEME_ID,
	serializeThemeCssVariables,
	getThemePreset,
	type ThemeId,
} from "./theme";
import type { Page } from "./document";

export function fontStylesheet(theme: ThemeId) {
	const fonts = getThemePreset(theme).typography;
	const families = [
		...new Set(
			[fonts.body, fonts.heading].map((font) =>
				font.split(",")[0].replace(/["']/g, "").trim(),
			),
		),
	];
	return `https://fonts.googleapis.com/css2?${families
		.map((font) => {
			const weights =
				font === "Archivo Black"
					? "400"
					: [
								"Space Grotesk",
								"IBM Plex Sans",
								"Cormorant Garamond",
						  ].includes(font)
						? "400;500;600;700"
						: "400;500;600;700;800";
			return `family=${encodeURIComponent(font).replace(/%20/g, "+")}:wght@${weights}`;
		})
		.join("&")}&display=swap`;
}

export function generateHTML(
	items: DroppedItem[],
	activeTheme: ThemeId = DEFAULT_THEME_ID,
	metadata = { title: "My landing page", description: "" },
) {
	// A single root keeps useId unique across repeated blocks. React escapes content and metadata.
	return (
		"<!DOCTYPE html>\n" +
		renderToStaticMarkup(
			<html lang="en">
				<head>
					<meta charSet="UTF-8" />
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1"
					/>
					<title>{metadata.title || "My landing page"}</title>
					<meta name="description" content={metadata.description} />
					<link
						rel="preconnect"
						href="https://fonts.googleapis.com"
					/>
					<link
						rel="preconnect"
						href="https://fonts.gstatic.com"
						crossOrigin="anonymous"
					/>
					<link rel="stylesheet" href={fontStylesheet(activeTheme)} />
					<style>{`:root { ${serializeThemeCssVariables(activeTheme)} } ${exportCss}`}</style>
				</head>
				<body style={{ margin: 0 }}>
					<main id="top" className="lpb-page">
						{items.map((item) => (
							<Fragment key={item.id}>
								{renderBlock(item)}
							</Fragment>
						))}
					</main>
				</body>
			</html>,
		)
	);
}

export function exportToHTML(
	items: DroppedItem[],
	activeTheme: ThemeId = DEFAULT_THEME_ID,
	metadata?: { title: string; description: string },
) {
	const blob = new Blob([generateHTML(items, activeTheme, metadata)], {
		type: "text/html;charset=utf-8",
	});
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = "index.html";
	document.body.append(a);
	a.click();
	a.remove();
	setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function generatePreviewHTML(page: Page) {
	// srcdoc otherwise resolves #contact and carousel anchors against the builder URL.
	return generateHTML(page.blocks, page.activeTheme, page).replace(
		"<head>",
		'<head><base href="about:srcdoc"/>',
	);
}
