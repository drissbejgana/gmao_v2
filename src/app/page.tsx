
import { redirect } from "next/navigation";
import Salles from "./components/Salles";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";


export default async function Home() {

  const session = await getServerSession(options);

 
if(session?.user.role=="Admin"){
  redirect('/admin')
}

  return (
    <main className="">
      <Salles service={session?.user?.service} />
    </main>
  );
}
