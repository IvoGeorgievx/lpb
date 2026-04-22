import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useEditor } from "@/context/EditorContext";
import { motion } from "framer-motion";
import { ChangeEvent, useRef } from "react";

export const HeroEditorCenterPreset = () => {
	const { item, onPropsChange } = useEditor();
	const fileUploadRef = useRef<HTMLInputElement>(null);
	if (!item) return;

	const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		console.log(file);
		if (!file) return;
		const tempUrl = URL.createObjectURL(file);

		onPropsChange({
			id: item.id,
			props: { style: { backgroundImage: tempUrl } },
		});
	};
	return (
		<motion.div
			key="settings-panel"
			initial={{ opacity: 0, y: 20, scale: 0.95 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			exit={{ opacity: 0, y: 10, scale: 0.95 }}
			transition={{
				duration: 0.2,
				ease: [0.16, 1, 0.3, 1],
			}}
			className="flex flex-col gap-5"
		>
			<div className="w-full mt-5">
				<div className="p-4 rounded-lg border bg-white shadow-sm">
					<Label>Background Image</Label>

					<div
						className="mt-2 border-2 border-dashed rounded-lg p-6 text-center text-gray-400 cursor-pointer hover:bg-gray-100"
						onClick={() => fileUploadRef.current?.click()}
					>
						Click or drag image to upload
					</div>

					<Input
						id="pic-upload"
						ref={fileUploadRef}
						type="file"
						className="hidden"
						onChange={handleFileUpload}
					/>
				</div>
			</div>
			<Separator />
		</motion.div>
	);
};
