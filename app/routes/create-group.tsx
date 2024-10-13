// app/routes/resources/groups.tsx
import { json, ActionFunctionArgs, redirect, ActionFunction } from '@remix-run/node'
import { db } from '~/.server/db'
import { capitalizeFirstLetter } from '~/lib/utils'
import { getAuth } from '@clerk/remix/ssr.server'

export async function loader() {
  return json({ hello: 'world' })
}


export const action:ActionFunction = async (args) => {

  const { userId } = await getAuth(args)
  const user = await db.user.findFirst({where: {clerkId: userId}})

  const form = await args.request.formData()
  const groupName = form.get("group-name") as string
  // do validation 👋

  const newGroup = await db.group.create({
    data: {
      name: capitalizeFirstLetter(groupName),
      inviteCode: Math.random().toString(32).slice(2)
    }
  })

  //Add user to group
  await db.groupMembers.create({
    data: {
      userId: user?.id as string,
      groupId: newGroup.id // Add Is Admin
    }
  });
  return redirect(`/gh/${newGroup.id}`)
}
