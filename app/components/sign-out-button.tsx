import { useClerk } from "@clerk/remix"
import { Button } from "./ui/button"

export const SignOutButton = () => {
  const { signOut } = useClerk()

  return (
    // Clicking this button signs out a user
    // and redirects them to the home page "/".
    <Button variant={"destructive"} onClick={() => signOut({ redirectUrl: '/' })}>Sign Out</Button>
  )
}