"use client";

import type { DroppedItem } from "@/app/page";
import {
	createContext,
	type Dispatch,
	type ReactNode,
	type SetStateAction,
	useContext,
	useMemo,
	useState,
} from "react";

export interface Page {
	blocks: DroppedItem[];
}

interface PageContextValue {
	page: Page;
	setPage: Dispatch<SetStateAction<Page>>;
}

const initialPage: Page = {
	blocks: [],
};

export const PageContext = createContext<PageContextValue | null>(null);

interface PageProviderProps {
	children: ReactNode;
}

export function PageProvider({ children }: PageProviderProps) {
	const [page, setPage] = useState<Page>(initialPage);
	const value = useMemo(() => ({ page, setPage }), [page]);

	return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
}

export const usePage = () => {
	const ctx = useContext(PageContext);
	if (!ctx) {
		throw new Error("usePage must be used within a PageProvider");
	}

	return ctx;
};
