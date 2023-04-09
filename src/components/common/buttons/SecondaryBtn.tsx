"use client";
/***** IMPORTS *****/
import React, { FC } from "react";
import { Button } from "@mantine/core";
import { ButtonProps } from "@/types/types";

/***** COMPONENT-FUNCTION *****/
const SecondaryBtn: FC<ButtonProps> = ({ className, disabled, loading, onClick, children, fullWidth, leftIcon, compact }): JSX.Element => {
	/** return statement */
	return (
		<Button
			radius="sm"
			variant="outline"
			fullWidth={fullWidth}
			onClick={onClick}
			loading={loading}
			loaderPosition="right"
			uppercase={true}
			leftIcon={leftIcon}
			disabled={disabled}
			compact={compact}
			size={compact ? "xs" : "md"}
			styles={() => ({
				leftIcon: {
					marginRight: "0.3em",
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
export default SecondaryBtn;
