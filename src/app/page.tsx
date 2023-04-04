"use client";
import CardCustom from "@/components/common/CardCustom";
import Section from "@/components/common/Section";
import PrimaryBtn from "@/components/common/buttons/PrimaryBtn";
import SecondaryBtn from "@/components/common/buttons/SecondaryBtn";
import { Stack, Space, Center } from "@mantine/core";

export default function Home() {
	return (
		<Section>
			<CardCustom>
				<Stack justify="center" align="center">
					<h1>Book your appointment</h1>
					<p>Please choose from option below</p>
				</Stack>
				<Space h="xl" />
				<Stack>
					<SecondaryBtn>Book new appointment</SecondaryBtn>
					<PrimaryBtn>View appointment</PrimaryBtn>
				</Stack>
			</CardCustom>
		</Section>
	);
}
