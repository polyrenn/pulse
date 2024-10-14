import { Button } from "./ui/button";
import { ArrowDown, ChevronDown, ChevronRight } from "lucide-react";
import { Folder, Home, Password, Stacks } from "./icons/icons";
import { SetStateAction, useState } from "react";

import { Card, CardContent, CardTitle, CardHeader } from "./ui/card";
import { Progress } from "./ui/progress";

import { FileText, FileImage, FilePdf, FileAudio, File, Copy } from "@phosphor-icons/react";
import { GroupMembers } from "@prisma/client";

interface SideBarProps {
    groupMemberCount: number | undefined
    inviteCode: string | undefined
}

export default function SideBar({ groupMemberCount,
    inviteCode
  }: SideBarProps) {
    return (
        <aside className="aside w-[306px] pr-6 flex flex-col font-geist h-dvh">
            <div className="flex flex-row  py-4">
               
             
            </div>

            <div className="border-t bottom-1 border-t-slate-100">
                <div className="flex items-center">
                    <h4 className=" font-medium text-[16px] mr-2">Members </h4>
                    <span className="w-6 h-6 rounded-[4px] text-sm bg-purple-100 text-purple-500 font-medium flex justify-center items-center">{groupMemberCount}</span>
                </div>
           

            </div>

        <div className="relative">
           
        <Card className="p-0 my-8 shadow-none border-0 bg-transparent">
        <CardHeader className="p-0">
          <CardTitle className="text-sm font-medium">Pooled Storage</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm">100/200 MB</span>
          </div>
          <Progress value={50} className="w-full" />
          <div className="mt-4 space-y-2 grid grid-cols-2">
            <div className="flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              <span className="text-sm">Documents</span>
            </div>
            <div className="flex items-center">
              <FileImage className="w-4 h-4 mr-2" />
              <span className="text-sm">Images</span>
            </div>
            <div className="flex items-center">
              <FileAudio className="w-4 h-4 mr-2" />
              <span className="text-sm">Audio</span>
            </div>
            <div className="flex items-center">
              <File className="w-4 h-4 mr-2" />
              <span className="text-sm">Other</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="border-t bottom-1 border-t-slate-100">
                <div className="flex flex-col">
                    <h4 className=" font-medium text-[16px] mr-2">Invite Code </h4>
                    <div className="flex items-center text=[#EBEBEF]">{inviteCode} <Copy className="ml-2"/></div>
                </div>
           

            </div>
        </div>
    </aside>
    )
}