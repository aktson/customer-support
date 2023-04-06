"use client";
import CardCustom from "@/components/common/CardCustom";
import Section from "@/components/common/Section";
import PrimaryBtn from "@/components/common/buttons/PrimaryBtn";
import SecondaryBtn from "@/components/common/buttons/SecondaryBtn";
import useAxios from "@/hooks/useAxios";
import { Stack, Space, Modal, TextInput, Textarea, Autocomplete, NativeSelect } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import { useState } from "react";

export default function Home() {
	const [open, setOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [product, setProduct] = useState("");
	const [description, setDescription] = useState("");

	const http = useAxios();

	// console.log(product, description);

	const handleFormSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		const formdata = { product: product, description: description };

		setIsSubmitting(false);

		try {
			const response = await http.post("/tickets", formdata);
			console.log("response ", response);
			if (response.statusText === "Created") {
				notifications.show({ message: "Issue added successfully!", color: "green" });
				// setFormData({ email: "", password: "" });
				// setOpen(false);
			}
		} catch (error: any) {
			notifications.show({ message: error?.response?.data?.message, color: "red" });
			console.log(error);
		} finally {
			setIsSubmitting(false);
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
					<SecondaryBtn onClick={() => setOpen(true)}>Book new appointment</SecondaryBtn>
					<PrimaryBtn>View appointment</PrimaryBtn>
				</Stack>
			</CardCustom>

			<Modal
				opened={open}
				onClose={() => setOpen(false)}
				padding="xl"
				title="Add your issue"
				styles={() => ({
					title: {
						fontSize: "1.2em",
						fontWeight: "bold",
					},
				})}>
				<form onSubmit={handleFormSubmit}>
					<Stack spacing="xl">
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
			</Modal>
		</Section>
	);
}
