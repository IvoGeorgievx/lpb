"use client";

import { Button } from "@/components/ui/button";
import { Monitor, Smartphone, X } from "lucide-react";
import { useState } from "react";

interface PreviewModalProps {
	open: boolean;
	onClose: () => void;
	html: string;
}

export function PreviewModal({ open, onClose, html }: PreviewModalProps) {
	const [mode, setMode] = useState<"desktop" | "mobile">("desktop");

	if (!open) return null;

	return (
		<div className="fixed inset-0 z-[9999] bg-black">
			<div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-950 p-4">
				<div className="flex items-center gap-2">
					<Button
						variant={mode === "desktop" ? "default" : "secondary"}
						size="sm"
						onClick={() => setMode("desktop")}
					>
						<Monitor className="h-4 w-4 mr-2" />
						Desktop
					</Button>

					<Button
						variant={mode === "mobile" ? "default" : "secondary"}
						size="sm"
						onClick={() => setMode("mobile")}
					>
						<Smartphone className="h-4 w-4 mr-2" />
						Mobile
					</Button>
				</div>

				<Button variant="ghost" size="icon" onClick={onClose}>
					<X className="h-5 w-5" />
				</Button>
			</div>

			<div className="flex h-[calc(100vh-73px)] items-center justify-center overflow-auto bg-zinc-800 p-10">
				<iframe
					srcDoc={html}
					title="Preview"
					className={
						mode === "desktop"
							? "h-full w-full max-w-[1440px] bg-white transition-all"
							: "h-full w-[390px] bg-white transition-all rounded-[20px]"
					}
				/>
			</div>
		</div>
	);
}
