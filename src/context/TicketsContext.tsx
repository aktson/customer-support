"use client";
/***** IMPORTS *****/
import React, { ReactNode, useContext, useEffect, useState } from "react";
import { Ticket } from "@/types/types";
import useAxios from "@/hooks/useAxios";
import { BASE_URL } from "@/constants/settings";
import { notifications } from "@mantine/notifications";
import { useAuth } from "./AuthContext";

/***** TYPES *****/
interface ProviderProps {
	children: ReactNode;
}

interface TicketsContext {
	tickets: Ticket[];
	setTickets: React.Dispatch<Ticket[]>;
	isLoading: boolean;
}

const TicketsContext = React.createContext<TicketsContext | null>(null);

export function TicketsProvider({ children }: ProviderProps) {
	/*** States ***/
	const [tickets, setTickets] = useState<Ticket[] | []>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	/*** Variables ***/
	const http = useAxios();
	const { auth } = useAuth();

	/*** Functions ***/

	/**
	 * @description Submits new ticket request to backend
	 * @param {event}
	 * @return {void}
	 */
	const fetchTickets = async () => {
		setIsLoading(true);

		if (!auth) return;
		try {
			const response = await http.get(BASE_URL + "/tickets");

			if (response.statusText === "OK") {
				setTickets(response.data);
			}
		} catch (error) {
			console.log(error);
			notifications.show({ message: "Could not fetch", color: "red" });
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchTickets();
	}, [auth]);
	return <TicketsContext.Provider value={{ tickets, setTickets, isLoading }}>{children}</TicketsContext.Provider>;
}

export function useTickets() {
	return useContext(TicketsContext)!;
}
