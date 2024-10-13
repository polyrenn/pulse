import type { MetaFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Separator className="my-4" />
    <div className="w-full max-w-md flex flex-col items-center space-y-0 mb-8">
      <h2 className="text-2xl font-bold mb-2">Join a group</h2>
          <p className="text-gray-600 mb-6 max-w-sm">
          Got a link from a friend? Join and get in on the action
          </p>

          <div className="flex">
            <Form className="flex" action="/join-group" method="post">
                <Input name="invite-code" id="invite-code" placeholder="Enter your invite code" />
                <Button type="submit">Join</Button>
            </Form>
          </div>
    </div>
  </div>
  );
}