import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
	output: "export",
	images: { unoptimized: true },
	basePath: isProd ? "/lpb-v1" : "",
	assetPrefix: isProd ? "/lpb-v1/" : "",
};

export default nextConfig;
