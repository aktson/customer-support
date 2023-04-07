"use client";
/***** IMPORTS *****/
import Section from "@/components/common/Section";
import { BASE_URL } from "@/constants/settings";
import useAxios from "@/hooks/useAxios";
import { Ticket } from "@/types/types";
import { Badge, Grid, Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
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
			<Section>
				{data.map((ticket: Ticket) => {
					return (
						<Grid key={ticket._id} my={16} sx={{ border: "1px solid gray" }}>
							<Grid.Col span={3}>{ticket.product}</Grid.Col>
							<Grid.Col span={3}>{ticket.description}</Grid.Col>
							<Grid.Col span={3}>{ticket.createdAt}</Grid.Col>
							<Grid.Col span={3}>
								<Badge color="teal">{ticket.status} </Badge>
							</Grid.Col>
						</Grid>
					);
				})}
			</Section>
		</Suspense>
	);
};

export default MyTickets;
