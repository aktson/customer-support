"use client";
/***** IMPORTS *****/
import Section from "@/components/common/Section";
import SecondaryBtn from "@/components/common/buttons/SecondaryBtn";
import { BASE_URL } from "@/constants/settings";
import useAxios from "@/hooks/useAxios";
import { Ticket } from "@/types/types";
import { Badge, Grid, Loader, Table } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import Link from "next/link";
import React, { FC, Suspense, useEffect, useState } from "react";

/***** TYPES *****/
interface MyTicketsProps {}

/***** COMPONENT-FUNCTION *****/
const MyTickets: FC<MyTicketsProps> = (): JSX.Element => {
	const [data, setData] = useState<Ticket[] | []>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const http = useAxios();

	const fetchTickets = async () => {
		try {
			const response = await http.get(BASE_URL + "/tickets");

			if (response.statusText === "OK") {
				setData(response.data);
			}
		} catch (error) {
			console.log(error);
			notifications.show({ message: "Could not fetch", color: "red" });
		}
	};

	useEffect(() => {
		fetchTickets();
	}, []);

	/*** Return statement ***/
	return (
		<Suspense fallback={<Loader />}>
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
						{data.map((ticket: Ticket) => {
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

export default MyTickets;
