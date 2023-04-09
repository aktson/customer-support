"use client";
/***** IMPORTS *****/
import React, { FC } from "react";
import { Button } from "@mantine/core";
import { ButtonProps } from "@/types/types";

/***** COMPONENT-FUNCTION *****/
const SubtleBtn: FC<ButtonProps> = ({ type, loading, onClick, children, fullWidth, leftIcon, style, color = "gray" }): JSX.Element => {
	/** return statement */
	return (
		<Button
			style={style}
			variant="subtle"
			color={color}
			fullWidth={fullWidth}
			radius="sm"
			type={type}
			onClick={onClick}
			loading={loading}
			loaderPosition="right"
			uppercase={true}
			leftIcon={leftIcon}
			disabled={loading}
			styles={() => ({
				leftIcon: {
					marginRight: "0.1em",
					fontSize: "1em",
					width: "1.5em",
					height: "2em",
				},
			})}>
			{children}
		</Button>
	);
};

/***** EXPORTS *****/
export default SubtleBtn;
