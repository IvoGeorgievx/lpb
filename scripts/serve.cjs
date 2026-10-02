/* eslint-disable @typescript-eslint/no-require-imports */
// Small local static server shared by npm start and the production browser check.
const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");
const root = path.resolve(__dirname, "../out");
const repo = process.env.GITHUB_REPOSITORY?.split("/")[1];
const base = process.env.GITHUB_ACTIONS === "true" && repo ? `/${repo}` : "";
const port = Number(process.env.PORT || 4173);
const types = {
	".html": "text/html",
	".js": "text/javascript",
	".css": "text/css",
	".json": "application/json",
	".svg": "image/svg+xml",
	".png": "image/png",
	".jpg": "image/jpeg",
	".webp": "image/webp",
	".ico": "image/x-icon",
	".woff": "font/woff",
	".woff2": "font/woff2",
	".txt": "text/plain",
};
const insideRoot = (filename) => {
	const relative = path.relative(root, filename);
	return (
		!relative.startsWith(`..${path.sep}`) &&
		relative !== ".." &&
		!path.isAbsolute(relative)
	);
};

async function start() {
	try {
		await fs.access(path.join(root, "index.html"));
	} catch {
		throw new Error(
			"No static build found. Run npm run build before npm start.",
		);
	}
	if (!Number.isInteger(port) || port < 1 || port > 65535)
		throw new Error("PORT must be between 1 and 65535.");
	http.createServer(async (request, response) => {
		try {
			if (!["GET", "HEAD"].includes(request.method)) {
				response.writeHead(405, { Allow: "GET, HEAD" });
				response.end();
				return;
			}
			let pathname = decodeURIComponent(
				new URL(request.url, "http://localhost").pathname,
			);
			if (base) {
				if (pathname === "/" || pathname === base) {
					response.writeHead(302, { Location: `${base}/` });
					response.end();
					return;
				}
				if (!pathname.startsWith(`${base}/`)) {
					response.writeHead(404);
					response.end();
					return;
				}
				pathname = pathname.slice(base.length);
			}
			let filename = path.resolve(root, `.${pathname}`);
			if (!insideRoot(filename)) {
				response.writeHead(403);
				response.end();
				return;
			}
			if ((await fs.stat(filename)).isDirectory())
				filename = path.join(filename, "index.html");
			filename = await fs.realpath(filename);
			if (!insideRoot(filename)) {
				response.writeHead(403);
				response.end();
				return;
			}
			const content = await fs.readFile(filename);
			response.writeHead(200, {
				"Content-Type":
					types[path.extname(filename)] || "application/octet-stream",
				"Content-Length": content.length,
				"Cache-Control": "no-store",
			});
			response.end(request.method === "HEAD" ? undefined : content);
		} catch (error) {
			response.writeHead(
				error instanceof URIError
					? 400
					: error.code === "ENOENT"
						? 404
						: 500,
			);
			response.end();
		}
	}).listen(port, "127.0.0.1", () =>
		console.log(`Static preview: http://127.0.0.1:${port}${base}/`),
	);
}
start().catch((error) => {
	console.error(error.message);
	process.exitCode = 1;
});
