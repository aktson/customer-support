"use client";
/***** IMPORTS *****/
import React, { FC } from "react";
import PrimaryBtn from "../common/buttons/PrimaryBtn";
import LinkElement from "../common/LinkElement";
import { createStyles, Group, UnstyledButton, Divider, Center, Box, Burger, Drawer, Collapse, ScrollArea, rem, Flex, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconNotification, IconCode, IconBook, IconChartPie3, IconFingerprint, IconCoin, IconChevronDown } from "@tabler/icons-react";
import SecondaryBtn from "../common/buttons/SecondaryBtn";
import Link from "next/link";

/***** INTERFACES *****/
interface NavProps {}

const useStyles = createStyles((theme) => ({
	dropdownFooter: {
		backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
		margin: `calc(${theme.spacing.md} * -1)`,
		marginTop: theme.spacing.sm,
		padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
		paddingBottom: theme.spacing.xl,
		borderTop: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]}`,
	},

	hiddenMobile: {
		[theme.fn.smallerThan("sm")]: {
			display: "none",
		},
	},

	hiddenDesktop: {
		[theme.fn.largerThan("sm")]: {
			display: "none",
		},
	},
}));

/***** COMPONENT-FUNCTION *****/
const Nav: FC<NavProps> = (): JSX.Element => {
	const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
	const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
	const { classes, theme } = useStyles();

	/** return statement */
	return (
		<>
			<Group position="apart" sx={{ padding: "1em" }}>
				<h2>LOGO</h2>
				<Group spacing={16} className={classes.hiddenMobile}>
					<LinkElement href="/"> Home</LinkElement>
					<LinkElement href="/about"> About</LinkElement>
					<LinkElement href="#">Marketplace</LinkElement>
					<LinkElement href="#"> Company</LinkElement>
				</Group>

				<Group className={classes.hiddenMobile} spacing="0.5em">
					<SecondaryBtn>
						<Link href="/login"> Login</Link>
					</SecondaryBtn>
					<PrimaryBtn>
						<Link href="/signup"> Sign Up</Link>
					</PrimaryBtn>
				</Group>
				<Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
			</Group>

			<Drawer
				opened={drawerOpened}
				onClose={closeDrawer}
				size="100%"
				padding="md"
				title="Navigation"
				className={classes.hiddenDesktop}
				zIndex={1000000}>
				<ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
					<Divider my="sm" color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"} />
					<Stack spacing="xs" align="center">
						<LinkElement href="/"> Home</LinkElement>
						<LinkElement href="/about"> About</LinkElement>
						<LinkElement href="#">Marketplace</LinkElement>
						<LinkElement href="#"> Company</LinkElement>
					</Stack>
					<Divider my="sm" color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"} />

					<Stack spacing="xs" align="center">
						<SecondaryBtn>
							<Link href="/login"> Login</Link>
						</SecondaryBtn>
						<PrimaryBtn>
							<Link href="/signup"> Sign Up</Link>
						</PrimaryBtn>
					</Stack>
				</ScrollArea>
			</Drawer>
		</>
	);
};

/***** EXPORTS *****/
export default Nav;
