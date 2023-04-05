"use client";
/***** IMPORTS *****/
import React, { FC } from "react";
import { Notifications } from "@mantine/notifications";

/***** TYPES *****/
interface NotificationProps {}

/***** COMPONENT-FUNCTION *****/
const Notification: FC<NotificationProps> = (): JSX.Element => {
	/*** Return statement ***/
	return (
		<>
			<Notifications defaultChecked position="top-right" autoClose={3000} />
		</>
	);
};

export default Notification;
