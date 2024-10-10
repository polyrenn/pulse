import type { MetaFunction } from "@remix-run/node";
import { EmptyState } from "~/components/empty-state";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function App() {
  return (
    <div>
        <EmptyState />
    </div>
  );
}