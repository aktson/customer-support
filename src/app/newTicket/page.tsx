"use client";
/***** IMPORTS *****/
import CardCustom from "@/components/common/CardCustom";
import PrimaryBtn from "@/components/common/buttons/PrimaryBtn";
import { authenticate } from "@/constants/authenticate";
import { useAuth } from "@/context/AuthContext";
import { useTickets } from "@/context/TicketsContext";
import useAxios from "@/hooks/useAxios";
import { Select, Stack, TextInput, Textarea } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react";

/***** TYPES *****/
interface NewTicketProps {}

/***** COMPONENT-FUNCTION *****/
const NewTicket: FC<NewTicketProps> = (): JSX.Element => {
	/*** States ***/
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [product, setProduct] = useState<string | null>("");
	const [description, setDescription] = useState<string | null>("");
	const [productError, setProductError] = useState<string | null>("");
	const [descriptionError, setDescriptionError] = useState<string | null>("");

	/*** Variables ***/
	const http = useAxios();
	const router = useRouter();
	const { auth } = useAuth();
	const { setTickets, tickets } = useTickets();

	/*** Functions ***/

	/**
	 * @description Submits new ticket request to backend
	 * @param {event}
	 * @return {void}
	 */
	const handleFormSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		const formdata = { product: product, description: description };
		product === "" ? setProductError("Please select atleast one") : setProductError(null);
		description === "" ? setDescriptionError("Description missing") : setDescriptionError(null);
		setIsSubmitting(true);

		try {
			const response = await http.post("/tickets", formdata);

			if (response.statusText === "Created") {
				notifications.show({ message: "Issue added successfully!", color: "green" });
				setTickets([...tickets, response.data]);
				router.push(`/ticket/${response.data._id}`);
			}
		} catch (error: any) {
			notifications.show({ message: error?.response?.data?.message, color: "red" });
			console.log(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	/*** Effect ***/

	//redirects from page if not logged in
	// useEffect(() => {
	// 	if (!auth) router.push("/");
	// }, []);

	/*** Return statement ***/
	return (
		<CardCustom>
			<form onSubmit={handleFormSubmit}>
				<Stack spacing="xl">
					<TextInput label="Name" name="name" value={auth.name} disabled radius="md" />
					<TextInput label="Email" name="email" placeholder="Your email" value={auth.email} disabled radius="md" />
					<Select
						label="Choose product"
						placeholder="Pick one"
						data={["Iphone", "Macbook", "IMac", "Ipad"]}
						value={product}
						clearable
						error={productError}
						onChange={setProduct}
					/>

					<Textarea
						label="Description"
						name="description"
						placeholder="Decription of issue"
						value={description || ""}
						onChange={(e) => setDescription(e.target.value)}
						error={descriptionError}
						radius="md"
					/>
					<PrimaryBtn type="submit" loading={isSubmitting}>
						Register issue
					</PrimaryBtn>
				</Stack>
			</form>
		</CardCustom>
	);
};

export default authenticate(NewTicket);
