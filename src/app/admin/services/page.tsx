


import AddService from "@/app/components/AddService";
import AddSalle from "@/app/components/AddSalle";
import Services from "@/app/components/Services";








export default function Page() {



  return (
        <>
            {/* <Services/> */}
              <div className="grid grid-cols-1 md:grid-cols-2 my-5">
                <AddService/>
                <AddSalle/>
              </div>

        </>
  );
}
