"use client";
/***** IMPORTS *****/
import { BASE_URL } from "@/constants/settings";
import useAxios from "@/hooks/useAxios";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { FC } from "react";

/***** TYPES *****/
interface TicketProps {}

/***** COMPONENT-FUNCTION *****/
const Ticket: FC<TicketProps> = (): JSX.Element => {
	const router = useRouter();

	/*** Return statement ***/
	return <div>Ticket</div>;
};

export default Ticket;
