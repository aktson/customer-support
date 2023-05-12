/***** IMPORTS *****/
import { FC } from "react";

/***** INTERFACES *****/
interface IButtonProps {
	/** The content to be displayed within the button. text or Reactnode*/
	children: React.ReactNode;

	/** Additional CSS class name(s) to be applied to the button.*/
	className?: string;

	/** Specifies whether the button is in a loading state.*/
	isLoading?: boolean;

	/** The event handler for the button's click event.*/
	onClick?: React.MouseEventHandler;

	/** The variant style of the button*/
	variant?: "primary" | "secondary" | "outline";

	/**An optional property that allows you to pass render button with icon,  name of the icon, see utdannet icons on http://localhost:3001/utils/icons/ */
	icon?: string;

	/** Specifies whether the button is disabled.*/
	disabled?: boolean;

	/** Specifies whether the button should occupy the full width of its container.*/
	fullWidth?: boolean;
}

// /***** COMPONENT-FUNCTION *****/
const MainButton: FC<IButtonProps> = ({
	children,
	className,
	isLoading = false,
	onClick,
	variant = "primary",
	icon,
	disabled = false,
	fullWidth = false,
}): JSX.Element => {
	/*** Functions ***/

	/**
	 * Get type of button variant and gives classnames accordingly default primary button
	 * @param {string} variant type of button variant default primary button
	 * @returns {void}
	 */
	function getButtonVariant(variant: IButtonProps["variant"]) {
		let buttonClass = styles.Button + ` ${isLoading && styles.minWidth}`;

		switch (variant) {
			case "primary":
				buttonClass += " " + styles.PrimaryButton;
				break;
			case "outline":
				buttonClass += " " + styles.OutlineButton;
				break;
			case "secondary":
				buttonClass += " " + styles.SecondaryButton;
				break;
			default:
				"";
		}

		return buttonClass;
	}

	/*** Return-statement ***/
	return (
		<button
			className={propClass(getButtonVariant(variant), className)}
			disabled={disabled || isLoading}
			onClick={onClick}
			style={fullWidth ? { width: "100%" } : {}}>
			{isLoading ? (
				<LoadingDots />
			) : (
				<>
					{!!icon && getIcon(`${icon}`)}
					{children}
				</>
			)}
		</button>
	);
};
export default Button;
