/***** IMPORTS *****/
import { createStyles, Anchor } from "@mantine/core";
import Link from "next/link";
import React, { FC, ReactNode } from "react";

/***** INTERFACES *****/
interface LinkElementProps {
	children: ReactNode;
	href: string;
	style?: object;
}

const useSTayle = createStyles((theme) => ({
	link: {
		padding: `0.5em`,
		borderRadius: theme.radius.md,
		color: theme.colors.blue[7],
		...theme.fn.hover({
			backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
		}),

		"&:active": theme.activeStyles,
	},
}));

/***** COMPONENT-FUNCTION *****/
const LinkElement: FC<LinkElementProps> = ({ children, href, style }): JSX.Element => {
	const { classes } = useSTayle();
	/** return statement */
	return (
		<Link href={href} className={classes.link} style={style}>
			{children}
		</Link>
	);
};

/***** EXPORTS *****/
export default LinkElement;
