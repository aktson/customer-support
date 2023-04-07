"use client";
import CardCustom from "@/components/common/CardCustom";
/***** IMPORTS *****/
import PrimaryBtn from "@/components/common/buttons/PrimaryBtn";
import { useAuth } from "@/context/AuthContext";
import useAxios from "@/hooks/useAxios";
import { NativeSelect, Stack, TextInput, Textarea } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react";

/***** TYPES *****/
interface NewTicketProps {}

/***** COMPONENT-FUNCTION *****/
const NewTicket: FC<NewTicketProps> = (): JSX.Element => {
	/*** States ***/
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [product, setProduct] = useState("");
	const [description, setDescription] = useState("");

	/*** Variables ***/
	const http = useAxios();
	const router = useRouter();
	const { auth } = useAuth();

	/*** Functions ***/

	/**
	 * @description Submits new ticket request to backend
	 * @param {event}
	 * @return {void}
	 */
	const handleFormSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		const formdata = { product: product, description: description };

		setIsSubmitting(false);

		try {
			const response = await http.post("/tickets", formdata);

			if (response.statusText === "Created") {
				notifications.show({ message: "Issue added successfully!", color: "green" });
				setDescription("");
				setProduct("");
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
	useEffect(() => {
		if (!auth) router.push("/");
	}, []);

	/*** Return statement ***/
	return (
		<CardCustom>
			<form onSubmit={handleFormSubmit}>
				<Stack spacing="xl">
					<TextInput label="Name" name="name" value={auth.name} disabled radius="md" />
					<TextInput label="Email" name="email" placeholder="Your email" value={auth.email} disabled radius="md" />
					<NativeSelect
						data={["Iphone", "Macbook", "IMac", "Ipad"]}
						label="Product"
						placeholder="Choose product"
						withAsterisk
						value={product}
						onChange={(e) => setProduct(e.currentTarget.value)}
					/>

					<Textarea
						required
						label="Description"
						name="description"
						placeholder="Decription of issue"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
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

export default NewTicket;
