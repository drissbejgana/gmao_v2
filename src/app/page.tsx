'use client'

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Salles from "./components/Salles";
import TransferEquipment from "./components/TransferEquipment";

export default function Home() {

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/");
    },
  });
if(session?.user.role=="Admin"){
  redirect('/admin/equipments')
}

  return (
    <main className="">
      <Salles/>
    </main>
  );
}
