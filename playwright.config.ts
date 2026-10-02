import { defineConfig } from "@playwright/test";

const repo = process.env.GITHUB_REPOSITORY?.split("/")[1];
const base = process.env.GITHUB_ACTIONS === "true" && repo ? `/${repo}` : "";
const baseURL = `http://127.0.0.1:4173${base}/`;

export default defineConfig({
	testDir: "./tests/e2e",
	forbidOnly: !!process.env.CI,
	workers: 1,
	timeout: 90_000,
	use: {
		browserName: "chromium",
		baseURL,
		viewport: { width: 1440, height: 960 },
		trace: "retain-on-failure",
	},
	webServer: {
		command: "npm start",
		url: baseURL,
		reuseExistingServer: false,
		timeout: 30_000,
	},
});
