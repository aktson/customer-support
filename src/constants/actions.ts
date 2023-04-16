export const getLocalTimeString = (dateString: string) => {
	if (!dateString) return;
	const date = new Date(dateString).toLocaleString("no-NO");

	return date || "";
};
