import { Outlet } from "@remix-run/react";
export default function AppLayout() {
    return (
      <>
        <header className="flex justify-center items-center font-medium h-[56px] border-[#efefef] border-b-[1px]">
            <p>Interview Simulation</p>
        </header>
        <main>
          <Outlet />
        </main>
        <footer className="flex justify-center items-center h-[48px] border-t-[1px] border-[#efefef]">
            <p>© 2024</p>
        </footer>
      </>
    );
}