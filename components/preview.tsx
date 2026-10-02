"use client";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { Monitor, Smartphone, Eye } from "lucide-react";
import type { Page } from "@/lib/document";
import { generatePreviewHTML } from "@/lib/export";

export function Preview({
	page,
	disabled,
}: {
	page: Page;
	disabled?: boolean;
}) {
	const [open, setOpen] = useState(false);
	const [mobile, setMobile] = useState(false);
	const html = useMemo(
		() => (open ? generatePreviewHTML(page) : ""),
		[open, page],
	);
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" disabled={disabled}>
					<Eye aria-hidden="true" />
					Preview
				</Button>
			</DialogTrigger>
			<DialogContent
				className="z-100 flex flex-col"
				style={{
					width: "calc(100vw - 40px)",
					maxWidth: "none",
					height: "calc(100dvh - 40px)",
				}}
			>
				<DialogTitle>Page preview</DialogTitle>
				<DialogDescription>
					Your exported page, with internal links kept inside this
					preview. Escape closes preview when focus is outside the
					page.
				</DialogDescription>
				<div className="flex gap-2">
					<Button
						variant={!mobile ? "default" : "outline"}
						aria-pressed={!mobile}
						onClick={() => setMobile(false)}
					>
						<Monitor aria-hidden="true" />
						Desktop
					</Button>
					<Button
						variant={mobile ? "default" : "outline"}
						aria-pressed={mobile}
						onClick={() => setMobile(true)}
					>
						<Smartphone aria-hidden="true" />
						Mobile
					</Button>
				</div>
				<div className="flex min-h-0 flex-1 justify-center overflow-auto rounded-lg bg-muted p-3">
					<iframe
						title="Exported page preview"
						sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"
						srcDoc={html}
						className="h-full border bg-white"
						style={{
							width: mobile ? 390 : "100%",
							maxWidth: "100%",
						}}
					/>
				</div>
			</DialogContent>
		</Dialog>
	);
}
