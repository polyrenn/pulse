import { json, ActionFunctionArgs, LoaderFunctionArgs, redirect, ActionFunction } from '@remix-run/node'
import { useActionData } from '@remix-run/react';
import { db } from '~/.server/db'
import { getAuth } from '@clerk/remix/ssr.server';

export async function loader({
    request
  }: LoaderFunctionArgs) {
    
    return json({
        message: request
    });
  }

export const action:ActionFunction = async (args) => {
  const formData = await args.request.formData();
  const formValues = Object.fromEntries(formData)

 
  const { userId } = await getAuth(args)
  const inviteCode = formData.get('invite-code') as string;
  if (!inviteCode) {
    return json({ error: 'Invite code is required' }, { status: 400 });
  }

  try {
    const group = await db.group.findUnique({ where: { inviteCode } });
    if (!group) {
      return json({ error: 'Invalid invite code' }, { status: 404 });
    }

    // Get User 

    const user = await db.user.findFirst({where: {clerkId: userId}})


    // Check if user is already a member
    const isMember = await db.groupMembers.count({
      where: { user: { clerkId: userId}, groupId: group.id }
    });
    if (isMember > 0) {
      return json({ message: 'You are already a member of this group' }); //redirect or message
    }

    //Add user to group
    await db.groupMembers.create({
      data: {
        userId: user?.id as string,
        groupId: group.id
      }
    });

    return redirect(`/gh/${group.id}`);

  } catch (error) {
    console.error("Error joining group:", error);
    return json({ error: 'Failed to join group' }, { status: 500 });
  }
}
