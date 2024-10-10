import { Outlet } from "@remix-run/react";
export default function AppLayout() {
    return (
      <>
        <main>
          <Outlet />
        </main>
      </>
    );
}