"use client";
/***** IMPORTS *****/
import { BASE_URL } from "@/constants/settings";
import { useAuth } from "@/context/AuthContext";
import useAxios from "@/hooks/useAxios";
import { notifications } from "@mantine/notifications";
import { useRouter, usePathname, notFound } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import Section from "@/components/common/Section";
import { Ticket } from "@/types/types";
import SecondaryBtn from "@/components/common/buttons/SecondaryBtn";
import { ArrowBack, CircleLetterX } from "tabler-icons-react";
import { Flex, Paper, Stack, Space, Badge } from "@mantine/core";
import { getLocalTimeString } from "@/constants/actions";
import PrimaryBtn from "@/components/common/buttons/PrimaryBtn";

/***** TYPES *****/
interface TicketProps {}

/***** COMPONENT-FUNCTION *****/
const Ticket: FC<TicketProps> = (): JSX.Element => {
	/*** States ***/
	const [ticket, setTicket] = useState<Partial<Ticket>>({});
	const [isLoading, setIsLoading] = useState<boolean>(false);

	/*** Variables ***/
	const http = useAxios();
	const router = useRouter();
	const { auth } = useAuth();
	const pathname = usePathname();

	const ticketId = pathname.split("/").slice(-1).toString();

	/*** Functions ***/

	/**
	 * @description Submits new ticket request to backend
	 * @param {event}
	 * @return {void}
	 */
	const fetchTicket = async () => {
		try {
			const response = await http.get(BASE_URL + `/tickets/${ticketId}`);

			if (response.statusText === "OK") {
				setTicket(response.data);
			}
		} catch (error) {
			console.log(error);
			notifications.show({ message: "Could not fetch", color: "red" });
		}
	};

	console.log(ticket);

	/*** Effect ***/

	//redirects from page if not logged in
	//fetches single ticket if there is id
	useEffect(() => {
		if (!auth) router.push("/");
		if (!ticketId) return;
		fetchTicket();
	}, [ticketId, auth]);

	if (!ticketId) return notFound();
	/*** Return statement ***/
	return (
		<Section size="md">
			<Stack spacing="md" mx="auto" p="lg">
				<Flex justify="space-between">
					<SecondaryBtn leftIcon={<ArrowBack />} onClick={() => router.push("/myTickets")}>
						Back
					</SecondaryBtn>
					<PrimaryBtn leftIcon={<CircleLetterX />} onClick={() => router.push("/myTickets")}>
						Close Ticket
					</PrimaryBtn>
				</Flex>
				<Stack spacing="sm">
					<h2>
						Product: {ticket?.product} <Badge color="teal">{ticket.status} </Badge>
					</h2>
					<h4>TicketId: {ticket?._id} </h4>
					<p>Date Submitted: {ticket.createdAt && getLocalTimeString(ticket?.createdAt)}</p>
				</Stack>

				<Paper shadow="md" p="lg">
					<h3>Descritpion of issue:</h3>
					<Space h="md" />
					<p>{ticket?.description}</p>
				</Paper>
			</Stack>
		</Section>
	);
};
export default Ticket;
