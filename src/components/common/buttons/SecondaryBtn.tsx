"use client";
/***** IMPORTS *****/
import React, { FC } from "react";
import { Button } from "@mantine/core";
import { ButtonProps } from "@/types/types";

/***** COMPONENT-FUNCTION *****/
const SecondaryBtn: FC<ButtonProps> = ({ className, disabled, loading, onClick, children, fullWidth, leftIcon }): JSX.Element => {
	/** return statement */
	return (
		<Button
			radius="md"
			variant="outline"
			fullWidth={fullWidth}
			onClick={onClick}
			loading={loading}
			loaderPosition="right"
			uppercase={true}
			leftIcon={leftIcon}
			disabled={disabled}
			styles={() => ({
				leftIcon: {
					marginRight: "0.3em",
				},
			})}>
			{children}
		</Button>
	);
};

/***** EXPORTS *****/
export default SecondaryBtn;
