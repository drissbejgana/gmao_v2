
import { getServerSession } from "next-auth";
import Link from "next/link";
import { options } from "../api/auth/[...nextauth]/options";
import EtatNotification from "./EtatNotification";


export async function Navbar() {

    const session = await getServerSession(options);
       
    return <>
    
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                      {/* <Image
                        src="/logo.svg"
                        alt="clinique errahma Logo"
                        width={250}
                        height={80}
                        priority
                        /> */}
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl text-blue-700 font-semibold whitespace-nowrap dark:text-white">Hello {session?.user?.name}</span>
                </Link>
                <div className="flex items-center space-x-6 rtl:space-x-reverse">
                {session?.user?.role=="Admin" && <EtatNotification/>}
                    {session ? (
                            <Link className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" href="/api/auth/signout?callbackUrl=/">Logout</Link>
                            ) : (
                            <Link className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" href="/api/auth/signin">Login</Link>
                            )}
                </div>
            </div>
        </nav>
    </>
    
}