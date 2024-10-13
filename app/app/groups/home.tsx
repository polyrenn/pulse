import type { MetaFunction, LoaderFunction, } from "@remix-run/node";
import { getAuth } from '@clerk/remix/ssr.server'
import { redirect } from "@remix-run/node";
import { EmptyState } from "~/components/empty-state";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};


export const loader: LoaderFunction = async (args) => {
  const { userId } = await getAuth(args)
  if (!userId) {
    return redirect('/sign-in')
  }
  return {}
}

export default function App() {
  return (
    <div>
        <EmptyState />
    </div>
  );
}