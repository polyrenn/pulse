// app/routes/resources/groups.tsx
import { getAuth } from '@clerk/remix/ssr.server';
import { json, ActionFunctionArgs, redirect, ActionFunction } from '@remix-run/node'
import { db } from '~/.server/db'
import { pinata } from "~/.server/pinata";

export async function loader() {
  return json({ hello: 'world' })
}


// Server side action to handle upload
export const action:ActionFunction = async (args) => {

    const { userId } = await getAuth(args)
    const user = await db.user.findFirst({where: {clerkId: userId}})
	const formData = await args.request.formData();
	const file = formData.get("file") as File;
    const groupId = formData.get("groupId") as string
	const { cid, name, } = await pinata.upload.file(file);
	const url = await pinata.gateways.createSignedURL({
		cid: cid,
		expires: 86400,
	});

    const addFile = await db.file.create({
        data: {
            fileName: name,
            userId: user?.id as string, // will get from clerk auth session
            groupId: groupId, // find a way to set group data with set
            filePath: url,
            fileType: file.type    
        }
    })

     // Create the activity entry immediately after successful file creation:
     await db.activity.create({
        data: {
          groupId: groupId,
          userId: user?.id as string,
          type: 'fileUpload',
          details: `File ${name} uploaded.`,
          fileId: addFile.id,
        },
      });

	return json({ url });
};