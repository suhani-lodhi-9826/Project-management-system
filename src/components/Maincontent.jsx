import { Outlet } from "react-router-dom";

export default function Maincontent(){
    return (
        <>
          <div className="main-content">
            <Outlet />
          </div>
        </>
    )
}