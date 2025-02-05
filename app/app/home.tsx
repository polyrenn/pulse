import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { Plus } from "lucide-react";
import { getAuth } from "@clerk/remix/ssr.server";
import { redirect, json, LoaderFunctionArgs } from "@remix-run/node";
import { NewGroupDialog } from "~/components/new-group-dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";
import { SignOutButton } from "~/components/sign-out-button";
import { db } from "~/.server/db";
import { Group } from "@prisma/client";
import { getSession } from "~/session";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};



export const loader: LoaderFunction = async (args) => {
  const session = await getSession(
    args.request.headers.get("Cookie")
  );

  const { userId } = await getAuth(args)
  const user = await db.user.findFirst({where: {clerkId: userId}})
  const groups = await db.group.findMany({ where: { groupMembers: { some: { user: { clerkId: user?.clerkId } }} } }) // Where UserID == Authed User

  if (!userId) {
    return redirect('/app/auth/sign-up')
  }
  
  return json({userId: user, groups: groups});
}


export default function App() {
  const user = useLoaderData<typeof loader>()
  const groupList = [
    {
      groupId: "3244113e-1ba9-4937-835e-cd7b9121012c",
      groupName: "Pinata Files Party",
    },
    {
      groupId: "",
      groupName: "Class of 2023 ( Biology ) Study",
    },
    {
      groupId: "",
      groupName: "🔥",
    },
    {
      groupId: "",
      groupName: "Breath Travel Trip",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-2xl flex flex-col items-center gap-6 ">
      <h1 className="text-3xl">Your groups</h1>
        <div className="flex flex-wrap gap-4">
          {
            /* Remove in prod  <p>Hello {user.userId}</p>
          <SignOutButton/> */ 
          }
        {user.groups.map((group: Group) => (
          <Link key={`${group.name}`} to={`/gh/${group.id}`} >
           <div className="group flex  py-4 px-8 items-center gap-1  bg-gray-50 rounded-[24px] border border-[#efefef] hover:scale-105 transition-transform duration-200">
            <h4 className="text-lg">{group.name}</h4>
            {/* Members.map */}
            <div className="flex flex-row-reverse">
              <div className="relative border-2 border-gray-50 bg-gray-200 rounded-full overflow-hidden w-6 h-6 -ml-4"></div>
              <div className="relative border-2 border-gray-50 bg-gray-200 rounded-full overflow-hidden w-6 h-6 -ml-4"></div>
              <div className="relative border-2 border-gray-50 bg-gray-200 rounded-full overflow-hidden w-6 h-6"></div>
            </div>
          </div>
          </Link>
        ))}
        </div>
        <NewGroupDialog />
      </div>
      <Separator className="my-4" />
      <div className="w-full max-w-md flex flex-col items-center space-y-2 mb-8">
        <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-1">Join a group</h2>
            <p className="text-gray-600 mb-6 max-w-sm">
              Got a link from a friend? Join and get in on the action
            </p>
        </div>
        <div className="flex my-4">
          <Form className="flex gap-2" action="/join-group" method="post">
            <Input
              name="invite-code"
              id="invite-code"
              placeholder="Enter your invite code"
            />
            <Button type="submit">Join</Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
