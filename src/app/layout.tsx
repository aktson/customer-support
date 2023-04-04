import "./globals.css";
import Header from "@/app/layout/Header";
import Footer from "@/app/layout/Footer";
import { AuthProvider } from "@/context/AuthContext";
import Notification from "@/components/common/Notification";

export const metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<AuthProvider>
					<Header />
					<main>{children}</main>
					<Footer />
					<Notification />
				</AuthProvider>
			</body>
		</html>
	);
}
