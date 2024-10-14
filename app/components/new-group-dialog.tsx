import { Form, useNavigation } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Loader2, Plus } from "lucide-react";
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
  const navigation = useNavigation()
  const isSubmitting = navigation.state === "submitting";
    return (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-max bg-[#FF7D52] hover:text-[#1a1a1a] hover:bg-transparent  text-white rounded-full">
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
                </div>
                <DialogFooter>
                  
                  <Button disabled={isSubmitting} className="active:scale-95 transition-transform duration-200" type="submit">
                    {isSubmitting &&  <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isSubmitting ? 'Creating' : 'Create'}
                  </Button>
                </DialogFooter>
            </Form>
          </DialogContent>
      
        </Dialog>
    )
}