
import { options } from "@/app/api/auth/[...nextauth]/options";
import UpdateEquipment from "@/app/components/UpdateEquipment";
import { getServerSession } from "next-auth";



type Props = {
    params: { id: string };
  };
  

export default async function Page({params}:Props) {
  const session = await getServerSession(options);



  return (
        <>
            <UpdateEquipment id={params.id}  role={session?.user?.role}  />
        </>
  );
}
