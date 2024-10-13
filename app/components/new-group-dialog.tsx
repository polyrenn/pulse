import { Form } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog";

import { Input } from "~/components/ui/input";
export function NewGroupDialog() {
    return (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-black w-max text-white hover:bg-gray-800 rounded-full">
                  <Plus className="w-4 h-4 mr-2" />
                  New group
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create a group</DialogTitle>
              <DialogDescription>
                A group lets you collaborate with friends and share files.
              </DialogDescription>
            </DialogHeader>
            <Form action="/create-group" method="post">
                <div className="grid gap-4 py-4">
                  <div className="grid items-center gap-4">
                    <Input name="group-name" id="name" placeholder="evil rabbit study group" className="col-span-3" />
                  </div>

                  <div className="px-4 py-4 border-2 border-dotted border-[#efefef] rounded-[8px]">
                    <p className="text-sm text-gray-500">Cover image</p>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Create</Button>
                </DialogFooter>
            </Form>
            <div className="absolute bottom-0">Hey</div>
          </DialogContent>
      
        </Dialog>
    )
}