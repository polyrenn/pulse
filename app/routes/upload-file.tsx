// app/routes/resources/groups.tsx
import { json, ActionFunctionArgs, redirect } from '@remix-run/node'
import { db } from '~/.server/db'
import { pinata } from "~/.server/pinata";

export async function loader() {
  return json({ hello: 'world' })
}


// Server side action to handle upload
export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData();
	const file = formData.get("file") as File;
	const { cid, name, } = await pinata.upload.file(file);
	const url = await pinata.gateways.createSignedURL({
		cid: cid,
		expires: 60,
	});

    const addFile = await db.file.create({
        data: {
            fileName: name,
            userId: "95c2d950-7afc-4771-8544-8d28c6504e2b", // will get from clerk auth session
            groupId: "3244113e-1ba9-4937-835e-cd7b9121012c", // find a way to set group data with set
            filePath: url     
        }
    })

	return json({ url });
};