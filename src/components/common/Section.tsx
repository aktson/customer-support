/***** IMPORTS *****/
import React, { FC, ReactNode } from "react";
import { Container } from "@mantine/core";

/***** TYPES *****/
interface SectionProps {
	children: ReactNode;
	size?: number | "xs" | "sm" | "md" | "lg" | "xl";
	fluid?: boolean;
}

/***** COMPONENT-FUNCTION *****/
const Section: FC<SectionProps> = ({ children, size = "lg", fluid = false }): JSX.Element => {
	/*** Return statement ***/
	return (
		<Container size={size} fluid={fluid}>
			{children}
		</Container>
	);
};

export default Section;
