import { renderToStaticMarkup } from "react-dom/server";
import { DroppedItem } from "@/app/page";
import { COMPONENT_MAP } from "@/app/page";
import { exportCss } from "./exportCss";

export const exportToHTML = (items: DroppedItem[]) => {
	const htmlContent = items
		.map((item) => {
			const Component = COMPONENT_MAP[item.type];

			if (!Component) return "";

			return renderToStaticMarkup(<Component {...item.props} />);
		})
		.join("\n");

	const fullDocument = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Export</title>

  <script src="https://cdn.tailwindcss.com"></script>

  <style>
    ${exportCss}
  </style>
</head>
<body style="margin:0;">
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
