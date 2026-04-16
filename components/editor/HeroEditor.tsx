import { useEditor } from "@/context/EditorContext";
import { HeroBlockProps } from "../blocks/HeroBlock";

interface HeroEditorProps {
	props: HeroBlockProps;
}

export function HeroEditor({ props }: HeroEditorProps) {
	const { item, onPropsChange } = useEditor();
	if (!item) return null;
}
