import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SideBar from "@/components/layout/SideBar";
import AlertProvider from "@/components/providers/AlertProvider";
import UserProvider from "@/components/providers/UserProvider";
import CourseProvider from "@/components/providers/CourseProvider";
import InvitationProvider from "@/components/providers/InvitationProvider";
import AlertRB from "@/components/shared/AlertRB";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Qimia School",
  description:
    "The QimiaSchool project is a web application that manages educational courses and assigns different roles and permissions to students and instructors. The project's goal is to include functionality for registration, login, viewing and managing courses, as well as user interactions inside the application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`min-h-screen flex flex-col ${inter.className}`}>
        <AlertProvider>
          <UserProvider>
            <CourseProvider>
              <InvitationProvider>
                <Header />
                <div className="flex">
                  <SideBar />
                  <div className="size-full min-h-[calc(100vh-14rem)] flex flex-col items-center overflow-hidden p-2 gap-5 sm:p-5">
                    {children}
                  </div>
                </div>
                <AlertRB />
              </InvitationProvider>
            </CourseProvider>
          </UserProvider>
        </AlertProvider>
        <Footer />
      </body>
    </html>
  );
}
