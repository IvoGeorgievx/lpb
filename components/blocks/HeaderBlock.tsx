interface HeaderProps {
	heightInPx: number;
	heightInPercentage: number;
	sticky?: boolean;
	padding?: number;
	blur?: boolean;
	blurPx?: number;
	logo?: string;
	links?: string[];
	gap?: number;
	animation?: string;
}

export default function Header({ ...props }: HeaderProps) {
	return <></>;
}
