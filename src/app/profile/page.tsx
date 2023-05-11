"use client";
/***** IMPORTS *****/
import Section from "@/components/common/Section";
import { authenticate } from "@/constants/authenticate";
import React, { FC } from "react";

/***** TYPES *****/
interface ProfileProps {}

/***** COMPONENT-FUNCTION *****/
const Profile: FC<ProfileProps> = (): JSX.Element => {
	/*** Variables ***/

	/*** Return statement ***/
	return <Section>Profile</Section>;
};

export default authenticate(Profile);
