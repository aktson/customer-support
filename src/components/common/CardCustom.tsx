/***** IMPORTS *****/
import React, { FC, ReactNode } from "react";
import { Card } from "@mantine/core";

/***** TYPES *****/
interface CardCustomProps {
	children: ReactNode;
}

/***** COMPONENT-FUNCTION *****/
const CardCustom: FC<CardCustomProps> = ({ children }): JSX.Element => {
	/*** Return statement ***/
	return (
		<Card sx={{ maxWidth: "500px" }} m="2em auto" withBorder p="3em">
			{children}
		</Card>
	);
};

export default CardCustom;
