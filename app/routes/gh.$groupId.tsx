import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Form, Link, useFetcher, useLoaderData } from "@remix-run/react";
import type { ActionFunction, MetaFunction } from "@remix-run/node";
import { db } from "~/.server/db";
import { CustomFileInput } from "~/components/custom-file-input";
import { useEffect, useState, useRef } from "react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

import { redirect } from "@remix-run/node";

import { getAuth } from "@clerk/remix/ssr.server";

import {
  Horse,
  Heart,
  Cube,
  Paperclip,
  ArrowUp,
  Upload,
  FileText,
  Download,
} from "@phosphor-icons/react";

import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Card, CardContent } from "~/components/ui/card";
import SideBar from "~/components/side-bar";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader:ActionFunction = async (args) => {
  args.params.groupId; // "123"

  const { userId } = await getAuth(args)
  const user = await db.user.findFirst({where: {clerkId: userId}})

  if (!userId) {
    return redirect('/app/auth/sign-up')
  }
  const group = await db.group.findFirst({ where: { id: args.params.groupId }, include: {groupMembers: true, _count: {
    select: { groupMembers: true },
  },}});

  const files = await db.file.findMany({ where: { groupId: args.params.groupId } });

  const activity = await db.activity.findMany({
    where: { groupId: args.params.groupId },
    include: {
      file: {
        where: {
          groupId: args.params.groupId,
        },
      },
    },
  });
  return json({
    groupId: args.params.groupId,
    groupName: group?.name,
    files: files,
    activity: activity,
    memberCount: group?._count,
    inviteCode: group?.inviteCode
  });
}

export default function GroupHome() {
  const uploader = useFetcher();
  const data = useLoaderData<typeof loader>();

  const fetcher = useFetcher();
  const [messages, setMessages] = useState([]);
  const formRef = useRef<HTMLFormElement>(null);
  const chatAreaRef = useRef<HTMLDivElement>(null);

  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleAddReaction = async (fileId: string, reactionType: string) => {
    fetcher.submit({ fileId, reactionType }, { method: 'post', action: '/add-reaction' });
  };

  return (
    <div className="grid  grid-cols-[minmax(50%,1fr)minmax(0,max-content)] font-geist bg-[#F7F7F8]">
       
      <div className="main-content relative  flex flex-col bg-white my-8 mx-8 px-8 pt-8 rounded-[16px]">
        <div className="relative h-full flex flex-col max-w-[48rem] mx-auto">
          <div className="flex flex-col justify-start items-start w-full">

         <div className="mb-8">  
         <p className="text-[#55556D]">Hello again!</p>
         <p className="text-lg text-purple-950">You are in {data.groupName}</p>
         </div>
       
        {data.activity.map((activity: any) => (
          <div key={activity.id} className="activity mb-8">
            <div className="flex items-center mb-2">
              <Upload color="#55556D" className="w-6 h-6 mr-2" />
              <p> {activity.details}</p>
            </div>

            <div className="flex items-center ml-8 px-4 w-[560px] h-[56px] border border-[#efefef] shadow-sm rounded-[8px]">
              <div className="flex flex-row items-center w-full">
                <div className="flex items-center">
                  <FileText color="#FF571F" weight="fill" className=" w-6 h-6 mr-2" />
                  <p className="text-[#55556D]">{activity.file?.fileType}</p>
                </div>
                <div className="ml-auto">
                  <Link download to={`${activity.file?.filePath}`}>
                  <Download className="w-6 h-6" />
                  </Link>
               
                </div>
              </div>
            </div>
            <div className="reactions flex items-center gap-2">
                <button className="ml-8 mt-2" onClick={() => handleAddReaction(activity.fileId, 'like')}>👍</button>
                <button onClick={() => handleAddReaction(activity.fileId, 'dislike')}>👎</button>
              </div>
           
          </div>
        ))}
         </div>
        <div className="flex flex-col items-center justify-end mt-auto w-full  mx-auto font-sans px-4">
          <div
            ref={chatAreaRef}
            className="chat-area overflow-y-scroll px-2 mb-10  flex-grow"
          >
            {}
          </div>
          <div className="flex relative gap-2 items-center h-[72px] bg-white border border-[#efefef] px-6 py-2 rounded-t-[16px] w-full">
            <fetcher.Form
              method="post"
              action="/upload-file"
              encType="multipart/form-data"
              ref={formRef}
              className="flex items-center flex-grow"
            >
              <Input
                type="text"
                name="chat"
                placeholder="Upload a file or add a chat"
                className="focus-visible:ring-white focus:ring-gray-white focus:ring-inset focus:ring-offset-white bg-white shadow-none focus:outline-offset-12 focus:outline-white flex-grow border-0 resize-none"
              />
              <input
                type="text"
                name="groupId"
                defaultValue={`${data.groupId}`}
                className="hidden"
              ></input>
              <CustomFileInput />
              <Button
                disabled={fetcher.state === "submitting"}
                className="bg-[#582CD6] w-max text-white rounded-md p-2"
                type="submit"
              >
                {fetcher.state === "submitting" ? "Sending..." : "Send"}
              </Button>
            </fetcher.Form>
            </div>
          </div>
        </div>
        {/*
      <uploader.Form
        className="flex flex-col gap-4"
        method="post"
        action="/upload-file"
        encType="multipart/form-data"
      >
        <input type="text" name="groupId" defaultValue={`${data.groupId}`} className="hidden"></input>
        <CustomFileInput />
        <button
          className="bg-[#582CD6] w-max text-white rounded-md p-2"
          type="submit"
        >
          {uploader.state === "submitting" ? "Uploading..." : "Upload"}
        </button>
      </uploader.Form>
      */}
      </div>
      <SideBar inviteCode={data.inviteCode} groupMemberCount={data.memberCount?.groupMembers}/>
    </div>
  );
}
