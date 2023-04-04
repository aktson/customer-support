"use client";
/***** IMPORTS *****/
import React, { ReactNode, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { AuthObject } from "@/types/types";

/***** TYPES *****/
interface ProviderProps {
	children: ReactNode;
}

interface AuthContext {
	auth: AuthObject;
	setAuth: React.Dispatch<AuthObject | null>;
}

const AuthContext = React.createContext<AuthContext | null>(null);

export function AuthProvider({ children }: ProviderProps) {
	const [auth, setAuth] = useLocalStorage("auth", null);

	return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	return useContext(AuthContext)!;
}
