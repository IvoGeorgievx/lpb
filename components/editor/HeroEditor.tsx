import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useEditor } from "@/context/EditorContext";
import { HeroBlockProps } from "../blocks/HeroBlock";
interface HeroEditorProps {
	props: HeroBlockProps;
}

export function HeroEditor({ props }: HeroEditorProps) {
	// const [color, setColor] = useState("rgba(255,255,255,1)");
	const { item, onPropsChange } = useEditor();
	if (!item) return null;

	return (
		<div className="w-full p-4">
			<Select
				value={props.bgType}
				onValueChange={(value) =>
					onPropsChange({
						id: item.id,
						props: {
							bgType: value as HeroEditorProps["props"]["bgType"],
						},
					})
				}
			>
				<SelectTrigger className="w-full max-w-48">
					<SelectValue placeholder="Select background" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Fruits</SelectLabel>
						<SelectItem value="image">Image</SelectItem>
						<SelectItem value="color">Color</SelectItem>
						<SelectItem value="gradient">Gradient</SelectItem>
						<SelectItem value="transparent">Transparent</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
}
