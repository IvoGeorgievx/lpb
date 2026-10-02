"use client";
import { createContext, useContext, type SetStateAction } from "react";
import type { Page } from "@/lib/document";
export type { Page } from "@/lib/document";
export const PageContext = createContext<{
	page: Page;
	setPage: (update: SetStateAction<Page>, group?: string) => void;
} | null>(null);
export function usePage() {
	const context = useContext(PageContext);
	if (!context) throw new Error("usePage requires PageContext");
	return context;
}
