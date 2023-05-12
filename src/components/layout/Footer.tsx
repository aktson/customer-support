"use client";
/***** IMPORTS *****/
import React, { FC } from "react";
import { createStyles, Group, ActionIcon, Flex, Text } from "@mantine/core";
import { BrandTwitter, BrandYoutube, BrandInstagram } from "tabler-icons-react";

import Section from "../common/Section";
import LinkElement from "../common/LinkElement";

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
					<Text variant="gradient" fz="md" gradient={{ from: "indigo", to: "cyan", deg: 45 }} fw={700}>
						SupportDesk
					</Text>
					<Text color="dimmed" size="sm">
						© 2023 utviklet av
						<LinkElement href="https://ankitsoni.dev/" target="_blank">
							AnkSon
						</LinkElement>
					</Text>
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
