"use client";
/***** IMPORTS *****/
import React, { ChangeEvent, FC, useState } from "react";
import axios from "axios";
import { TextInput, PasswordInput, Text, Group, Stack, Container, LoadingOverlay } from "@mantine/core";
import PrimaryBtn from "@/components/common/buttons/PrimaryBtn";
import LinkElement from "@/components/common/LinkElement";
import { SignUpFormData } from "@/types/types";
import CardCustom from "@/components/common/CardCustom";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";

/***** COMPONENT-FUNCTION *****/
const Signup: FC = (): JSX.Element => {
	/*** States ***/
	const [formData, setFormData] = useState<SignUpFormData>({
		name: "",
		email: "",
		password: "",
	});
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	/*** Variables ***/
	const router = useRouter();

	/*** Functions ***/

	/** Sets value to input according to name
	 * @param {event}
	 * @return {void}
	 */
	const onChange = (event: ChangeEvent): void => {
		const target = event.target as HTMLInputElement;
		setFormData((prevState) => ({
			...prevState,
			[target.name]: target.value,
		}));
	};

	/** Submits form and registers new user
	 * @param {event}
	 * @return {void}
	 */
	const handleFormSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setIsSubmitting(true);

		try {
			const response = await axios.post("http://localhost:5000/api/users", formData);
			if (response.statusText === "Created") {
				notifications.show({ message: "User registered", color: "green" });
				router.push("/signin");
			}
		} catch (error: any) {
			notifications.show({ message: error?.response?.data?.message, color: "red", autoClose: 5000 });
			console.log(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	/*** Return statement ***/
	return (
		<Container size="30rem" my="xl">
			<CardCustom>
				<form onSubmit={handleFormSubmit}>
					<Stack spacing="xl">
						<h1>Sign Up</h1>
						<TextInput required label="Name" name="name" placeholder="Your fullname" onChange={onChange} radius="md" />
						<TextInput required label="Email" name="email" placeholder="Your email" onChange={onChange} radius="md" />
						<PasswordInput required label="Password" name="password" placeholder="Your password" onChange={onChange} radius="md" />
					</Stack>

					<Group position="apart" mt="2.5em">
						<PrimaryBtn type="submit" fullWidth={true} loading={isSubmitting}>
							{isSubmitting ? "signing up" : "Sign up"}
						</PrimaryBtn>
						<Text fz="xs" ml="auto">
							Already have an account?
							<LinkElement href="/signin">Sign In</LinkElement>
						</Text>
					</Group>
				</form>
				<LoadingOverlay visible={isSubmitting} overlayBlur={2} />
			</CardCustom>
		</Container>
	);
};

export default Signup;
