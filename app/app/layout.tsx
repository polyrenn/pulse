import { UserButton } from "@clerk/remix";
import { Outlet, useLoaderData } from "@remix-run/react";
import { LoaderFunction, redirect, json } from "@remix-run/node";
import { getAuth } from "@clerk/remix/ssr.server";

export const loader: LoaderFunction = async (args) => {
  const { userId: user } = await getAuth(args)
  if (!user) {
    //return redirect('/app/auth/sign-in')
  }
  
  return json({ok: true, user: user});
}

export default function AppLayout() {
  const data = useLoaderData<typeof loader>()
    return (
      <>
        <header className="flex justify-center items-center font-medium h-[56px] border-[#efefef] border-b-[1px]">
            <p>Interview Simulation</p>
            {data.user ? <UserButton/> : 'Not Logged in'}
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