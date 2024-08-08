


import Request from "../components/Request";
import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";


export type Demande={
    _id:string,
    name :string,
    nameEquipment:string,
    service:string,
    salle:string,
    is_New:boolean,
    message:string
}




export default async function Page() {

  const session = await getServerSession(options);

    

  return (
    <Request serviceID={session?.user?.service} serviceName={session?.user?.name} />
  );
}
