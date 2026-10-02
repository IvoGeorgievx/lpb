"use client";
import {
	useCallback,
	useEffect,
	useReducer,
	useState,
	type SetStateAction,
} from "react";
import {
	DRAFT_KEY,
	EMPTY_PAGE,
	historyReducer,
	initialHistory,
	restoreDraft,
	serializeDraft,
	type Page,
} from "@/lib/document";

export function useDocument() {
	const [history, dispatch] = useReducer(
		historyReducer,
		EMPTY_PAGE,
		initialHistory,
	);
	const [ready, setReady] = useState(false);
	const [saveStatus, setSaveStatus] = useState("Loading draft…");
	const [dirty, setDirty] = useState(false);
	useEffect(() => {
		const load = setTimeout(() => {
			try {
				const draft = localStorage.getItem(DRAFT_KEY);
				if (draft)
					dispatch({ type: "restore", page: restoreDraft(draft) });
				setSaveStatus(
					draft ? "Draft restored" : "Saved on this device",
				);
			} catch {
				setSaveStatus(
					"Draft could not be restored. Start a new page or export your current work.",
				);
			}
			setReady(true);
		}, 0);
		return () => clearTimeout(load);
	}, []);
	useEffect(() => {
		if (!ready || !dirty) return;
		const pending = setTimeout(() => setSaveStatus("Saving locally…"), 0);
		const save = () => {
			try {
				localStorage.setItem(
					DRAFT_KEY,
					serializeDraft(history.present),
				);
				setSaveStatus("Saved locally");
			} catch {
				setSaveStatus(
					"Local save failed. Export your page before closing this tab.",
				);
			}
		};
		const timer = setTimeout(save, 300);
		window.addEventListener("pagehide", save);
		const beforeClose = (event: BeforeUnloadEvent) => {
			try {
				localStorage.setItem(
					DRAFT_KEY,
					serializeDraft(history.present),
				);
			} catch {
				event.preventDefault();
				event.returnValue = "";
			}
		};
		window.addEventListener("beforeunload", beforeClose);
		return () => {
			clearTimeout(pending);
			clearTimeout(timer);
			window.removeEventListener("pagehide", save);
			window.removeEventListener("beforeunload", beforeClose);
		};
	}, [history.present, ready, dirty]);
	const setPage = useCallback(
		(update: SetStateAction<Page>, group?: string) => {
			dispatch({ type: "change", update, group, time: Date.now() });
			setDirty(true);
		},
		[],
	);
	const undo = useCallback(() => {
		dispatch({ type: "undo" });
		setDirty(true);
	}, []);
	const redo = useCallback(() => {
		dispatch({ type: "redo" });
		setDirty(true);
	}, []);
	useEffect(() => {
		const handle = (e: KeyboardEvent) => {
			if (!(e.metaKey || e.ctrlKey) || e.altKey) return;
			if (e.key.toLowerCase() === "z") {
				e.preventDefault();
				if (e.shiftKey) redo();
				else undo();
			} else if (e.key.toLowerCase() === "y") {
				e.preventDefault();
				redo();
			}
		};
		const boundary = () => dispatch({ type: "boundary" });
		window.addEventListener("keydown", handle);
		window.addEventListener("focusin", boundary);
		return () => {
			window.removeEventListener("keydown", handle);
			window.removeEventListener("focusin", boundary);
		};
	}, [undo, redo]);
	return {
		page: history.present,
		setPage,
		undo,
		redo,
		canUndo: history.past.length > 0,
		canRedo: history.future.length > 0,
		ready,
		saveStatus,
	};
}
