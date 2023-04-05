"use client";
/***** IMPORTS *****/
import React, { FC } from "react";
import { createStyles, Group, ActionIcon, Flex } from "@mantine/core";
import { BrandTwitter, BrandYoutube, BrandInstagram } from "tabler-icons-react";

import Section from "../common/Section";

//styles
const useStyles = createStyles((theme) => ({
	footer: {
		marginTop: "1rem",
		borderTop: ` 1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]}`,
		padding: "1rem",
	},
}));

/***** COMPONENT-FUNCTION *****/
const Footer: FC = (): JSX.Element => {
	const { classes } = useStyles();
	/*** Return statement ***/
	return (
		<footer className={classes.footer}>
			<Section>
				<Flex align="center" justify="space-between">
					<h4>LOGO</h4>
					<Group spacing={0} position="right" noWrap>
						<ActionIcon size="lg">
							<BrandTwitter size="1.05rem" />
						</ActionIcon>
						<ActionIcon size="lg">
							<BrandYoutube size="1.05rem" />
						</ActionIcon>
						<ActionIcon size="lg">
							<BrandInstagram size="1.05rem" />
						</ActionIcon>
					</Group>
				</Flex>
			</Section>
		</footer>
	);
};

export default Footer;
