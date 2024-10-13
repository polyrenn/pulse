import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData, useFetcher, useNavigation } from "@remix-run/react";
import { pinata } from "~/.server/pinata";
import { CustomFileInput } from "~/components/custom-file-input";

export const meta: MetaFunction = () => {
	return [
		{ title: "Remix + Pinata" },
		{ name: "description", content: "Upload files on Remix with Pinata!" },
	];
};

// Server side action to handle our upload

export default function Index() {
	//const actionData = useActionData<typeof action>();
	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";

	const uploader = useFetcher()

	return (
		<div className="font-sans p-4 flex flex-col gap-4 justify-center items-center min-h-screen max-w-[500px] mx-auto">
			<h1 className="text-3xl font-bold">Remix + Pinata</h1>
			<uploader.Form className="flex flex-col gap-4" method="post" action="/upload-file" encType="multipart/form-data">
				<CustomFileInput/>
					<button
						className="bg-[#582CD6] text-white rounded-md p-2"
						type="submit"
					>
						{uploader.state === "submitting" ? "Uploading..." : "Upload"}
					</button>
				</uploader.Form>
			<Form
				navigate={false}	
				encType="multipart/form-data"
				method="post"
				action="/upload-file"
				className="flex flex-col gap-4"
			>
				
			</Form>
			
		</div>
	);
}
