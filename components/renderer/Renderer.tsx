import { COMPONENT_MAP, DroppedItem } from "@/app/page";

export default function Renderer({ item }: { item: DroppedItem }) {
	const Component = COMPONENT_MAP[item.type];
	if (!Component) return null;

	return <Component {...item.props} />;
}
