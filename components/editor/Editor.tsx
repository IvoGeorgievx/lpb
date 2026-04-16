import { BlockPropsMap, BlockType } from "@/app/page";
import { useEditor } from "@/context/EditorContext";
import { HeaderEditor } from "./HeaderEditor";
import { HeroEditor } from "./HeroEditor";
import { HeroBlockProps } from "../blocks/HeroBlock";

export type UpdatePayload<T extends BlockType = BlockType> = {
	id: string;
	props: BlockPropsMap[T];
};

export function Editor() {
	const { item } = useEditor();
	if (!item) return;
	const { type, props } = item;
	switch (type) {
		case "header":
			return <HeaderEditor props={props} />;
		case "hero":
			return <HeroEditor props={props as HeroBlockProps} />;
	}
}
