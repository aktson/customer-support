"use client";
/***** IMPORTS *****/
import React, { FC } from "react";
import { Flex, Container } from "@mantine/core";
import { useRouter, usePathname } from "next/navigation";
import SubtleBtn from "@/components/common/buttons/SubtelBtn";
import { Login, User, Home, UserCircle, Logout } from "tabler-icons-react";
import { useAuth } from "@/context/AuthContext";
import PrimaryBtn from "@/components/common/buttons/PrimaryBtn";
import dynamic from "next/dynamic";

/***** COMPONENT-FUNCTION *****/
const Header: FC = (): JSX.Element => {
	/*** Variables ***/
	const router = useRouter();
	const pathname = usePathname();
	const { auth, setAuth } = useAuth();

	/*** Functions ***/

	/** logs out user
	 * @param {}
	 * @return {void}
	 */
	const logout = (): void => {
		setAuth(null);
		router.push("/");
	};

	/*** Return statement ***/
	return (
		<header>
			<Container size="lg">
				<Flex justify="space-between" align="center">
					<h2>LOGO</h2>
					<Flex gap={8} align="center">
						<SubtleBtn onClick={() => router.push("/")} leftIcon={<Home />} color={pathname === "/" ? "blue" : "gray"}>
							Home
						</SubtleBtn>
						{auth ? (
							<>
								<SubtleBtn
									leftIcon={<UserCircle />}
									onClick={() => router.push("/profile")}
									color={pathname === "/profile" ? "blue" : "gray"}>
									{auth.name}
								</SubtleBtn>
								<PrimaryBtn leftIcon={<Logout />} onClick={logout}>
									Sign out
								</PrimaryBtn>
							</>
						) : (
							<>
								<SubtleBtn
									onClick={() => router.push("/signin")}
									leftIcon={<Login />}
									color={pathname === "/signin" ? "blue" : "gray"}>
									Sign In
								</SubtleBtn>
								<SubtleBtn
									onClick={() => router.push("/signup")}
									leftIcon={<User />}
									color={pathname === "/signup" ? "blue" : "gray"}>
									Sign Up
								</SubtleBtn>
							</>
						)}
					</Flex>
				</Flex>
			</Container>
		</header>
	);
};

export default dynamic(() => Promise.resolve(Header), { ssr: false });
