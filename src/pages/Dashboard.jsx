import Maincontent from "../components/Maincontent";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar"

export default function Dasboard(){
    return (
        <>
           <Navbar/>
           <div className="dashboard">
              <Sidebar />
              <Maincontent />
           </div>
        </>
    )
}