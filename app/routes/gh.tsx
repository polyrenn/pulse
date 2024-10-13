import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Form, useFetcher, useLoaderData } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import { db } from "~/.server/db";
import { CustomFileInput } from "~/components/custom-file-input";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  params.groupId; // "123"
  const group = await db.group.findFirst({ where: { id: params.groupId } });

  const files = await db.file.findMany({ where: { groupId: params.groupId } });
  return json({
    groupId: params.groupId,
    groupName: group?.name,
    files: files,
  });
}

export default function GroupHome() {
  const uploader = useFetcher();
  const data = useLoaderData<typeof loader>();
  return (
    <div>
      Hello {data.groupId}
      <p>You are in {data.groupName}</p>
      <h3 className="text-xl">Files</h3>
      {data.files.map((file) => (
        <div>
          <p>Name: {file.fileName}</p>
          <p>Created at: {file.createdAt}</p>
          <p>Link: {file.filePath}</p>
        </div>
      ))}
      <uploader.Form
        className="flex flex-col gap-4"
        method="post"
        action="/upload-file"
        encType="multipart/form-data"
      >
        <CustomFileInput />
        <button
          className="bg-[#582CD6] w-max text-white rounded-md p-2"
          type="submit"
        >
          {uploader.state === "submitting" ? "Uploading..." : "Upload"}
        </button>
      </uploader.Form>
    </div>
  );
}
