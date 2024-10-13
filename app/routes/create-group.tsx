// app/routes/resources/groups.tsx
import { json, ActionFunctionArgs, redirect } from '@remix-run/node'
import { db } from '~/.server/db'
import { capitalizeFirstLetter } from '~/lib/utils'

export async function loader() {
  return json({ hello: 'world' })
}


export async function action({ request }: ActionFunctionArgs) {

  const form = await request.formData()
  const groupName = form.get("group-name") as string
  // do validation 👋

  const newGroup = await db.group.create({
    data: {
      name: capitalizeFirstLetter(groupName),
      inviteCode: Math.random().toString(32).slice(2)
    }
  })
  return redirect(`/gh/${newGroup.id}`)
}
