"use client";
import CardCustom from "@/components/common/CardCustom";
/***** IMPORTS *****/
import Section from "@/components/common/Section";
import SecondaryBtn from "@/components/common/buttons/SecondaryBtn";
import { authenticate } from "@/constants/authenticate";
import { useTickets } from "@/context/TicketsContext";
import { Ticket } from "@/types/types";
import { Badge, Loader, Table, Text } from "@mantine/core";
import Head from "next/head";
import Link from "next/link";
import React, { FC, Suspense } from "react";

/***** TYPES *****/
interface MyTicketsProps {}

/***** COMPONENT-FUNCTION *****/
const MyTickets: FC<MyTicketsProps> = (): JSX.Element => {
	/*** Variables ***/
	const { tickets } = useTickets();

	if (tickets.length < 1)
		return (
			<CardCustom>
				<Text c="dimmed" ta="center">
					No tickets found
				</Text>
			</CardCustom>
		);
	/*** Return statement ***/
	return (
		<Suspense fallback={<Loader />}>
			<Head>
				<title>My tickets</title>
			</Head>
			<Section size="sm">
				<Table verticalSpacing="sm" striped>
					<thead>
						<tr>
							<th>Date</th>
							<th>Product</th>
							<th>Status</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{tickets.map((ticket: Ticket) => {
							return (
								<tr key={ticket._id}>
									<td>{new Date(ticket.createdAt).toLocaleString("da-DK")}</td>
									<td>{ticket.product}</td>
									<td>
										<Badge color="teal">{ticket.status} </Badge>
									</td>
									<td>
										<SecondaryBtn compact={true}>
											<Link href={`/ticket/${ticket._id}`}>view</Link>
										</SecondaryBtn>
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</Section>
		</Suspense>
	);
};

export default authenticate(MyTickets);
