import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
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

import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-4 mb-8">
        <Card className="p-4 bg-white shadow-sm">
          <div className="flex items-center justify-between">
            <div className="w-2/3 space-y-2">
              <div className="h-2 bg-gray-200 rounded w-full"></div>
              <div className="h-2 bg-gray-200 rounded w-5/6"></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-orange-100 rounded-full overflow-hidden">
                <img
                  src="/placeholder.svg?height=40&width=40"
                  alt="User avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center text-white font-bold">
                ZS
              </div>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-white shadow-sm">
          <div className="flex items-center justify-between">
            <div className="w-2/3 space-y-2">
              <div className="h-2 bg-gray-200 rounded w-full"></div>
              <div className="h-2 bg-gray-200 rounded w-3/4"></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                JS
              </div>
              <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                <img
                  src="/placeholder.svg?height=40&width=40"
                  alt="User avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-white shadow-sm">
          <div className="flex items-center justify-between">
            <div className="w-2/3 space-y-2">
              <div className="h-2 bg-gray-200 rounded w-full"></div>
              <div className="h-2 bg-gray-200 rounded w-2/3"></div>
            </div>
            <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
              <img
                src="/placeholder.svg?height=40&width=40"
                alt="User avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Card>
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Create a Group</h2>
        <p className="text-gray-600 mb-6 max-w-sm">
          A group easily allows you to share Content, Inputs and Templates with
          the right people quicker.
        </p>
        <Link to={`create`}>
            <Button className="bg-black text-white hover:bg-gray-800">
                  <Plus className="w-4 h-4 mr-2" />
                  Create a new Group
            </Button>
        </Link>
        <Dialog>
          <DialogTrigger asChild>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create a group</DialogTitle>
              <DialogDescription>
                A group lets you collaborate with friends and share files.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid items-center gap-4">
                <Input id="name" placeholder="evil rabbit study group" className="col-span-3" />
              </div>

              <div className="px-4 py-4 border-2 border-dotted border-[#efefef] rounded-[8px]">
                <p className="text-sm text-gray-500">Cover image</p>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create</Button>
            </DialogFooter>
            <div className="absolute bottom-0">Hey</div>
          </DialogContent>
      
        </Dialog>
      </div>
    </div>
  );
}
