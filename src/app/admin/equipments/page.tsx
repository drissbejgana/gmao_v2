

import { useState } from "react";
import AddService from "@/app/components/AddService";
import AddSalle from "@/app/components/AddSalle";
import AddEquipment from "@/app/components/AddEquipment";
import Equipments from "@/app/components/Equipments";
import TransferEquipment from "@/app/components/TransferEquipment";
import Services from "@/app/components/Services";
import AddEquipmentFromStock from "@/app/components/AddEquipmentFromStock";







export default function Page() {



  return (
        <>
              <Equipments/>
              <div className="grid grid-cols-1 md:grid-cols-2 my-5">
                    <AddEquipment/>
                <div>
                {/* <TransferEquipment/> */}
                    <AddEquipmentFromStock/>
                </div>  
              </div>


        </>
  );
}
