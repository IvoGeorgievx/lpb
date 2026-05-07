import { Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FooterBlockProps } from "@/components/blocks/FooterBlock";
import { useEditor } from "@/context/EditorContext";
import clsx from "clsx";

export interface FooterEditorProps {
	props: FooterBlockProps;
}

const layouts = [
	{
		id: "1-col",
		label: "1 Columns",
		columns: 1,
	},
	{
		id: "2-col",
		label: "2 Columns",
		columns: 2,
	},
	{
		id: "3-col",
		label: "3 Columns",
		columns: 3,
	},
	{
		id: "4-col",
		label: "4 Columns",
		columns: 4,
	},
];

export function FooterEditor({ props }: FooterEditorProps) {
	const { item, onPropsChange } = useEditor();
	if (!item) return null;

	return (
		<Tabs defaultValue="layout" className="w-full">
			<div className="p-4 border-b">
				<TabsList className="grid w-full grid-cols-1">
					<TabsTrigger value="layout">Layout</TabsTrigger>
				</TabsList>
			</div>

			<TabsContent value="layout" className="p-4 mt-0">
				<div className="flex flex-col gap-3">
					<div>
						<h3 className="text-sm font-medium">Footer Layout</h3>
						<p className="text-xs text-muted-foreground mt-1">
							Choose how many columns your footer should have.
						</p>
					</div>

					<div className="grid grid-cols-1 gap-3">
						{layouts.map((layout) => {
							const active = props.layout?.columns === layout.columns;

							return (
								<button
									key={layout.id}
									onClick={() => {
										onPropsChange({
											id: item.id,
											props: {
												...props,
												layout: {
													...layout,
													columns: layout.columns,
												},
											},
										});
									}}
									className={clsx(
										"group relative overflow-hidden rounded-2xl border bg-background p-4 text-left transition-all duration-200",
										"hover:scale-[1.01] hover:border-primary/40 hover:shadow-md",
										active && "border-primary ring-2 ring-primary/20",
									)}
								>
									<div
										className={clsx(
											"absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full border transition-all",
											active
												? "border-primary bg-primary text-primary-foreground"
												: "border-muted-foreground/30",
										)}
									>
										{active && <Check className="h-3 w-3" />}
									</div>

									<div className=" cursor-pointer mb-4 flex h-24 items-end gap-2 rounded-xl border bg-muted/30 p-3">
										{Array.from({
											length: layout.columns,
										}).map((_, i) => (
											<div
												key={i}
												className="flex-1 rounded-lg border bg-background shadow-sm transition-all duration-200 group-hover:-translate-y-1"
												style={{
													height: `${50 + i * 10}%`,
												}}
											/>
										))}
									</div>

									<div className="flex items-center justify-between">
										<div>
											<p className="font-medium text-sm">{layout.label}</p>
											<p className="text-xs text-muted-foreground">
												{layout.columns} grid sections
											</p>
										</div>

										<div className="text-xs text-muted-foreground">
											{layout.columns} cols
										</div>
									</div>
								</button>
							);
						})}
					</div>
				</div>
			</TabsContent>
		</Tabs>
	);
}
