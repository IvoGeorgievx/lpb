import { FooterSection } from "./FooterBlock";

export const FooterSectionRenderer = ({
	section,
}: {
	section: FooterSection;
}) => {
	switch (section.type) {
		case "links":
			return <></>;
	}
};
