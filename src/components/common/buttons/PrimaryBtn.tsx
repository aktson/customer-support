"use client";
/***** IMPORTS *****/
import React, { FC } from "react";
import { Button } from "@mantine/core";
import { ButtonProps } from "@/types/types";

/***** COMPONENT-FUNCTION *****/
const PrimaryBtn: FC<ButtonProps> = ({ className, type, disabled, loading, onClick, children, fullWidth, leftIcon }): JSX.Element => {
	/** return statement */
	return (
		<Button
			variant="filled"
			fullWidth={fullWidth}
			radius="md"
			type={type}
			onClick={onClick}
			loading={loading}
			loaderPosition="right"
			uppercase={true}
			leftIcon={leftIcon}
			disabled={disabled}
			styles={() => ({
				leftIcon: {
					marginRight: "0.3em",
					fontSize: "1.7em",
					width: "1.5em",
					height: "2em",
				},
			})}>
			{children}
		</Button>
	);
};

/***** EXPORTS *****/
export default PrimaryBtn;
