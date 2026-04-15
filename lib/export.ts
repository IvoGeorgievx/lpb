import { DroppedItem } from "@/app/page";

export const exportToHTML = (items: DroppedItem[]) => {
	const htmlContent = items
		.map((item) => {
			if (item.type === "header") {
				const s = item.props.style || {};

				const inlineStyle = Object.entries(s)
					.map(
						([key, val]) =>
							`${key.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase())}: ${val}${typeof val === "number" ? "px" : ""}`,
					)
					.join("; ");

				return `<header style="${inlineStyle}" class="${item.props.className}">
                <nav>Test Header Content</nav>
              </header>`;
			}
			return "";
		})
		.join("\n");

	const fullDocument = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Export Test</title>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body style="margin: 0;">
      ${htmlContent}
    </body>
    </html>
  `;

	const blob = new Blob([fullDocument], { type: "text/html" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = "index.html";
	a.click();
};
