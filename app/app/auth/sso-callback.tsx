import { AuthenticateWithRedirectCallback, useSignUp } from "@clerk/remix";

export default function SignUpSSO() {
    return(
        <AuthenticateWithRedirectCallback />
    )

}