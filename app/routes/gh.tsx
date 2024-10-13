import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
export async function loader({
    params,
  }: LoaderFunctionArgs) {
    params.groupId; // "123"

    return json({groupId: params.groupId});
}

import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function GroupHome() {
  const groupId = useLoaderData<typeof loader>();
  return (
    <div>
       Hello {groupId.groupId}
    </div>
  );
}