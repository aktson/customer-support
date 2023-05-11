"use client";
import CardCustom from "@/components/common/CardCustom";
import LinkElement from "@/components/common/LinkElement";
import Section from "@/components/common/Section";
import PrimaryBtn from "@/components/common/buttons/PrimaryBtn";
import SecondaryBtn from "@/components/common/buttons/SecondaryBtn";
import { Stack, Space } from "@mantine/core";
import Link from "next/link";

export default function Home(): JSX.Element | null {
	return (
		<Section>
			<CardCustom>
				<Stack justify="center" align="center">
					<h1>Register your issue here</h1>
					<p>Please choose from option below</p>
				</Stack>
				<Space h="xl" />
				<Stack>
					<SecondaryBtn>
						<Link href="/newTicket">Register New Issue</Link>
					</SecondaryBtn>

					<PrimaryBtn>
						<Link href="/myTickets">View issues</Link>
					</PrimaryBtn>
				</Stack>
			</CardCustom>
		</Section>
	);
}
