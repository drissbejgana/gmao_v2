
import UpdateEquipment from "@/app/components/UpdateEquipment";
import { useState } from "react";


type Props = {
    params: { id: string };
  };
  

export default function Page({params}:Props) {



  return (
        <>
            <UpdateEquipment id={params.id} />
        </>
  );
}
