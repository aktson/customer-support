"use client";
/***** IMPORTS *****/
import axios from "axios";
import React, { ChangeEvent, FC, useState } from "react";
import { TextInput, PasswordInput, Text, Group, Stack, Container, LoadingOverlay } from "@mantine/core";
import PrimaryBtn from "@/components/common/buttons/PrimaryBtn";
import LinkElement from "@/components/common/LinkElement";
import { SignInFormData } from "@/types/types";
import CardCustom from "@/components/common/CardCustom";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";

/***** COMPONENT-FUNCTION *****/
const Signin: FC = (): JSX.Element => {
	/*** States ***/
	const [formData, setFormData] = useState<SignInFormData>({ email: "", password: "" });
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	/*** Variables ***/
	const router = useRouter();
	const { setAuth } = useAuth();

	/*** Functions ***/

	/** Sets value to input according to name
	 * @param {event}
	 * @return {void}
	 *
	 */
	const onChange = (event: ChangeEvent): void => {
		const target = event.target as HTMLInputElement;
		setFormData((prevState) => ({
			...prevState,
			[target.name]: target.value,
		}));
	};

	/** Submits form and signsin user
	 * @param {event}
	 * @return {void}
	 */
	const handleFormSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setIsSubmitting(true);

		try {
			const response = await axios.post("http://localhost:5000/api/users/login", formData);

			if (response.statusText === "OK") {
				setAuth(response.data);
				notifications.show({ message: "Login successful!", color: "green" });
				// setFormData({ email: "", password: "" });
				router.push("/");
			}
		} catch (error: any) {
			notifications.show({ message: error?.response?.data?.message, color: "red" });
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
						<h1>Sign In</h1>
						<TextInput required label="Email" name="email" placeholder="Your email address" onChange={onChange} radius="md" />

						<PasswordInput required label="Password" name="password" placeholder="Your password" onChange={onChange} radius="md" />
					</Stack>

					<Group position="apart" mt="2.5em">
						<PrimaryBtn type="submit" fullWidth={true} loading={isSubmitting}>
							{isSubmitting ? "signing in" : "Sign In"}
						</PrimaryBtn>
						<Text fz="xs" ml="auto">
							Don&apos;t have an account?
							<LinkElement href="/signup">Sign Up</LinkElement>
						</Text>
					</Group>
				</form>
				<LoadingOverlay visible={isSubmitting} overlayBlur={2} />
			</CardCustom>
		</Container>
	);
};

export default Signin;
