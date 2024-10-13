import { json, ActionFunctionArgs, LoaderFunctionArgs, redirect } from '@remix-run/node'
import { useActionData } from '@remix-run/react';
import { db } from '~/.server/db'

export async function loader({
    request
  }: LoaderFunctionArgs) {
    
    return json({
        message: request
    });
  }

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const formValues = Object.fromEntries(formData)

  const userIdProbablyFromSession = '95c2d950-7afc-4771-8544-8d28c6504e2b'

  const inviteCode = formData.get('invite-code') as string;
  if (!inviteCode) {
    return json({ error: 'Invite code is required' }, { status: 400 });
  }

  try {
    const group = await db.group.findUnique({ where: { inviteCode } });
    if (!group) {
      return json({ error: 'Invalid invite code' }, { status: 404 });
    }

    // Check if user is already a member
    const isMember = await db.groupMembers.count({
      where: { userId: userIdProbablyFromSession, groupId: group.id }
    });
    if (isMember > 0) {
      return json({ message: 'You are already a member of this group' }); //redirect or message
    }

    //Add user to group
    await db.groupMembers.create({
      data: {
        userId: userIdProbablyFromSession,
        groupId: group.id
      }
    });

    return redirect(`/gh/${group.id}`);

  } catch (error) {
    console.error("Error joining group:", error);
    return json({ error: 'Failed to join group' }, { status: 500 });
  }
}
