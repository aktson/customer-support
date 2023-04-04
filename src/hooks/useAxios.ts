import React from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function useAxios() {
	const url = process.env.REACT_APP_BASE_URL;

	const { auth } = useAuth();

	const apiClient = axios.create({ baseURL: url });
	if (auth) {
		apiClient.interceptors.request.use((config) => {
			const token = auth?.token;
			config.headers.Authorization = token ? `Bearer ${token}` : "";
			return config;
		});
	}

	return apiClient;
}

export default useAxios;
