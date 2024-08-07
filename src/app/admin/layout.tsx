import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

export const metadata = {
    title: 'Admin Page',
  };
  
  export default async function AdminLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const session = await getServerSession(options);

    if(session.user.role!="Admin")
      return <h1 className="text-center text-5xl">No access</h1>

    
    return (
      <>
        {children}
      </>
    );
  }
  
