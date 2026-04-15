export interface HeroBlockProps extends React.ComponentPropsWithRef<"div"> {
	image?: string;
	title: string;
	fontSize?: string;
	animation?: string;
}

export default function HeroBlock() {
	return <>Hero block</>;
}
