import { DroppedItem } from "@/app/page";
import { UpdatePayload } from "@/components/editor/Editor";
import { createContext, useContext } from "react";

interface IEditorContext {
	item?: DroppedItem;
	onPropsChange: (payload: UpdatePayload) => void;
}
export const EditorContext = createContext<IEditorContext | null>(null);

export const useEditor = () => {
	const ctx = useContext(EditorContext);
	if (!ctx) throw new Error("useEditor must be used inside provider");
	return ctx;
};
