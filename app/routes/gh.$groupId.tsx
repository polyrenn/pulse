import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import { db } from "~/.server/db";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({
  params,
}: LoaderFunctionArgs) {
  params.groupId; // "123"
  const group = await db.group.findFirst({where: {id: params.groupId}})
  return json({groupId: params.groupId, groupName: group?.name});
}

export default function GroupHome() {
  const groupId = useLoaderData<typeof loader>();
  return (
    <div>
       Hello {groupId.groupId}
       <p>You are in</p>
    </div>
  );
}