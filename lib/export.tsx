import { renderToStaticMarkup } from "react-dom/server";
import { DroppedItem } from "@/app/page";
import { COMPONENT_MAP } from "@/app/page";
import { exportCss } from "./exportCss";

export const generateHTML = (items: DroppedItem[]) => {
	const htmlContent = items
		.map((item) => {
			const Component = COMPONENT_MAP[item.type];

			if (!Component) return "";

			return renderToStaticMarkup(<Component {...item.props} />);
		})
		.join("\n");

	return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <link
    rel="stylesheet"
    href="https://unpkg.com/lucide-static@latest/font/lucide.css"
  />

	<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Baloo+2:wght@400;500;700;800&family=Cormorant+Garamond:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&family=Nunito+Sans:wght@400;600;700;800&family=Playfair+Display:wght@500;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">

  <style>
    ${exportCss}
  </style>
</head>

<body style="margin:0;">
${htmlContent}
</body>
</html>
`;
};

export const exportToHTML = (items: DroppedItem[]) => {
	const html = generateHTML(items);

	const blob = new Blob([html], { type: "text/html" });

	const url = URL.createObjectURL(blob);

	const a = document.createElement("a");

	a.href = url;
	a.download = "index.html";
	a.click();
};
