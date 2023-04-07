"use client";
import CardCustom from "@/components/common/CardCustom";
import Section from "@/components/common/Section";
import PrimaryBtn from "@/components/common/buttons/PrimaryBtn";
import SecondaryBtn from "@/components/common/buttons/SecondaryBtn";
import { useAuth } from "@/context/AuthContext";

import { Stack, Space, Modal, Textarea, NativeSelect } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
	const router = useRouter();
	const { auth } = useAuth();

	const handleRedirect = (href: string) => {
		if (auth) {
			router.push(href);
		} else {
			router.push("/signin");
		}
	};
	return (
		<Section>
			<CardCustom>
				<Stack justify="center" align="center">
					<h1>Book your appointment</h1>
					<p>Please choose from option below</p>
				</Stack>
				<Space h="xl" />
				<Stack>
					<SecondaryBtn onClick={() => handleRedirect("/newTicket")}>Book new appointment</SecondaryBtn>
					<PrimaryBtn onClick={() => handleRedirect("/myTickets")}>View appointment</PrimaryBtn>
				</Stack>
			</CardCustom>
		</Section>
	);
}
