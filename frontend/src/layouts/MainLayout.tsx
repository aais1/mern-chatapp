import { Outlet } from "react-router-dom"

export function MainLayout () {
  return (
    <div className="flex">
        <div className="md:flex-[0.3] text-lg font-bold text-white hidden md:flex flex-col items-center justify-center bg-[rgb(44,30,168)] min-h-screen">
            CHATAPP
            
            <div>
              User {localStorage.getItem('username')||'Guest'}
            </div>
        </div>
        <div className="flex-1 bg-[rgb(224,223,224)] min-h-screen">
            <Outlet/>
        </div>
    </div>
  )
}