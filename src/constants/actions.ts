export const getLocalTimeString = (dateString: string) => {
	if (!dateString) return;
	const date = new Date(dateString).toLocaleString("no-NO");

	return date || "";
};

/**
 * Formats price from Stripe
 * @param value Price string from Stripe
 * @returns {number} Formatted price
 */
export const currencyFormatter = (value: number) => {
	const val = value / 100;

	if (val % 1 === 0)
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "NOK",
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(val);

	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "NOK",
		minimumFractionDigits: 2,
	}).format(val);
};
/**
 * Function that returns firstName and lastName from fullName
 * @param {string} fullName
 * @returns {genObject} object with firstName and lastName
 */
export function getFirstAndLastname(fullName: string): object {
	if (!fullName) return { firstName: "", lastName: "" };

	const nameArray = safeString(fullName)?.trim().split(" ");
	const capitalizedNameArray = nameArray.map((name) => capitalize(name));

	const lastName = capitalizedNameArray.length > 1 ? capitalizedNameArray.pop?.() || "" : "";
	const firstName = capitalizedNameArray.join?.(" ") || "";

	return { firstName, lastName };
}

/**
 * Creates an anchor element with the base64 pdf source and a filename with the  HTML5 `download` attribute
 * @param  {string} pdf
 * @param  {string} filename
 * @return {void}
 */
export function downloadPDF(base64String: string, fileName: string): void {
	if (!base64String) return;
	const linkSource = base64String;
	const downloadLink = document.createElement("a");
	downloadLink.href = linkSource;
	downloadLink.download = fileName;
	downloadLink.click();
}

/**
 * Makes sure a value is a string
 * @param {string} value
 * @return {string}
 */
function safeString(value = "") {
	if (typeof value === "string") return value;
	return "";
}

/**
 * Makes the first character in a string uppercase.
 * @param text string to be formatted.
 * @return text with uppercase first char.
 */
const capitalize = (text = "") => {
	const thisText = safeString(text);
	const textArray = thisText.split("");
	textArray[0] = safeString(textArray[0]).toUpperCase();
	return textArray.join("");
};
/**
 * Makes sure an array-object is returned.
 * @param {any[]} array Array to be checked
 * @return {any[]} Safe array.
 */
function safeArray(array: any) {
	if (Array.isArray(array)) return array;
	return [];
}

/**
 * Adds passed prop-class to native component-class. If non exists, empty string is returned instead
 * @param nativeClass
 * @param propClass
 * @returns
 */
export const propClass = (nativeClass = "", propClass = "") => {
	return `${nativeClass}${nativeClass ? " " + propClass : propClass}`;
};
/**
 * Checks if a string is a valid email
 * @param {string} email
 */
export const isValidEmail = (email: string) => {
	if (typeof email !== "string") return false;
	//Regex for testing valid emails
	//TODO: What rules does this check for?
	const regex =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regex.test(email.toLowerCase());
};
/**
 * Decodes a base64-string
 * @param {string} value String to be decoded
 * @return {string}
 */
export const decode64 = (value: string) => {
	if (!value || typeof value !== "string") return "";
	return Buffer.from(value, "base64").toString("utf-8");
};

/**
 * Converts a date to unix-timestamp
 * @param {Date | string | number} date Date as date-object, string or number.
 * @returns {number}
 */
export const dateToUnix = (date: Date | string | number) => {
	if (!date) return 0;
	const newDate = (0, exports.tryCatch)(() => new Date(date));
	if ((0, exports.isError)(newDate)) return 0;
	return newDate.valueOf();
};
