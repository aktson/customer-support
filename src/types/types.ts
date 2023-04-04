/***** IMPORTS *****/
import { ReactNode } from "react";

export interface SignUpFormData {
	name: string;
	email: string;
	password: string;
}

export interface SignInFormData {
	email: string;
	password: string;
}

export interface ButtonProps {
	children?: ReactNode;
	disabled?: boolean;
	className?: string | string[];
	loading?: boolean;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	fullWidth?: boolean;
	type?: "button" | "reset" | "submit";
	leftIcon?: JSX.Element;
	color?: string;
	isActive?: boolean;
	style?: object;
}

export interface AuthObject {
	email: string;
	name: string;
	token: string;
	_id: string;
}
