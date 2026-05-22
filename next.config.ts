import type { NextConfig } from "next";

const isGithubActionsBuild = process.env.GITHUB_ACTIONS === "true";
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const basePath =
	isGithubActionsBuild && repoName ? `/${repoName}` : "";

const nextConfig: NextConfig = {
	output: "export",
	trailingSlash: true,
	images: { unoptimized: true },
	basePath,
	assetPrefix: basePath ? `${basePath}/` : "",
};

export default nextConfig;
