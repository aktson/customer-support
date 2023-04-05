"use client";
/***** IMPORTS *****/
import Section from "@/components/common/Section";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { FC, useEffect } from "react";

/***** TYPES *****/
interface ProfileProps {}

/***** COMPONENT-FUNCTION *****/
const Profile: FC<ProfileProps> = (): JSX.Element => {
	/*** Variables ***/
	const { auth } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!auth) router.push("/");
	}, []);

	/*** Return statement ***/
	return <Section>Profile</Section>;
};

export default Profile;
