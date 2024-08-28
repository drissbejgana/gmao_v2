import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import { Navbar } from "./components/Navbar";
import AuthProvider from "./components/AuthProvider";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";



const DynamicComponentWithNoSSR = dynamic(
  () => import('./components/Sidebar'),
  { ssr: false }
  )

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gmao",
  description: "Gestion de maintenance ",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession(options);
  if(!session){
    redirect("/api/auth/signin?callbackUrl=/"); 
  }

  return (
    <html lang="en">
       <AuthProvider>
         <body className={inter.className}>
          <DynamicComponentWithNoSSR/>
          <div className="p-4 sm:ml-64">
            <Navbar/>
             <div className="p-4 border-2 border-gray-200  rounded-lg dark:border-gray-700">
                {children}
              </div>
            </div> 
          </body>
      </AuthProvider>
  </html>
  );
}
