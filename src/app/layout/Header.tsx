"use client";
/***** IMPORTS *****/
import React, { FC, useState } from "react";
import { Flex, Container } from "@mantine/core";
import { useRouter, usePathname } from "next/navigation";
import SubtleBtn from "@/components/common/buttons/SubtelBtn";
import { Login, User, Home, UserCircle, Logout } from "tabler-icons-react";
import { useAuth } from "@/context/AuthContext";

/***** TYPES *****/
interface HeaderProps {}

/***** COMPONENT-FUNCTION *****/
const Header: FC<HeaderProps> = (): JSX.Element => {
	const router = useRouter();

	const { auth, setAuth } = useAuth();
	const pathname = usePathname();

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
								<SubtleBtn leftIcon={<Logout />} onClick={() => setAuth(null)}>
									Sign out
								</SubtleBtn>
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

export default Header;
