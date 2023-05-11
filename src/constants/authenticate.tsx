import { useAuth } from "@/context/AuthContext";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { ComponentType, useEffect, useState } from "react";

export const authenticate = <P extends object>(Component: ComponentType<P>) => {
	const AuthComponent = (props: P) => {
		const { auth } = useAuth();
		const router = useRouter();

		useEffect(() => {
			if (!auth) {
				router.replace("/signin");
			}
		}, [auth]);

		// Pass the props to the wrapped component
		return auth ? <Component {...props} /> : null;
	};

	return AuthComponent;
};
