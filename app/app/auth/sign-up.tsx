import { Link } from "@remix-run/react"

import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"

import { useSignIn, useSignUp } from "@clerk/remix"
import { OAuthStrategy } from '@clerk/types'
import { useState } from "react"

export const description =
  "A login page with two columns. The first column has the login form with email and password. There's a Forgot your passwork link and a link to sign up if you do not have an account. The second column has a cover image."

export default function SignUp() {
    const { signIn } = useSignIn()
    const { signUp, setActive } = useSignUp()

    const [isSigningUp, setIsSigningUp] = useState<boolean>(false)
  
    //if (!signIn || !signUp) return null
  
    const signInWith = (strategy: OAuthStrategy) => {
      return signIn?.authenticateWithRedirect({
        strategy,
        redirectUrl: '/app/auth/sso-callback',
        redirectUrlComplete: '/app',
      })
    }
  
    async function handleSignIn(strategy: OAuthStrategy) {
      if (!signIn || !signUp) return null
  
      // If the user has an account in your application, but does not yet
      // have an OAuth account connected to it, you can transfer the OAuth
      // account to the existing user account.
      const userExistsButNeedsToSignIn =
        signUp.verifications.externalAccount.status === 'transferable' &&
        signUp.verifications.externalAccount.error?.code === 'external_account_exists'
  
      if (userExistsButNeedsToSignIn) {
        const res = await signIn.create({ transfer: true })
  
        if (res.status === 'complete') {
          setActive({
            session: res.createdSessionId,
          })
        }
      }
  
      // If the user has an OAuth account but does not yet
      // have an account in your app, you can create an account
      // for them using the OAuth information.
      const userNeedsToBeCreated = signIn.firstFactorVerification.status === 'transferable'
  
      if (userNeedsToBeCreated) {
        const res = await signUp.create({
          transfer: true,
        })
  
        if (res.status === 'complete') {
          setActive({
            session: res.createdSessionId,
          })
        }
      } else {
        // If the user has an account in your application
        // and has an OAuth account connected to it, you can sign them in.
        signInWith(strategy)
      }
    }
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <div className="flex justify-center">
            <p className=" w-max px-4 py-1 rounded-full text-[#FF571F] bg-[#FFE8E1]">SIGN UP</p>
            </div>
            <h1 className="text-3xl">Welcome</h1>
          
            <p className="text-balance text-muted-foreground">
              Welcome to CrewSpace. Sign up with your Google account to get started.
            </p>
          </div>
          <div className="grid gap-4">
             {/*
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
            */}
            <Button disabled={isSigningUp} onClick={() => handleSignIn('oauth_google')} variant="outline" className="w-full active:scale-95 transition-transform duration-200">
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="#" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img src="/splash-screen.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover rounded-[24px] dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
