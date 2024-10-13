// app/routes/api/clerk-webhooks.ts

import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Webhook } from "svix";
import { WebhookEvent, } from "@clerk/remix/ssr.server";
import { db } from "~/.server/db";
import { getSession } from "~/session";

export const action: ActionFunction = async ({ request }) => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("Missing CLERK_WEBHOOK_SECRET");
  }

  // Get the headers
  const svix_id = request.headers.get("svix-id");
  const svix_timestamp = request.headers.get("svix-timestamp");
  const svix_signature = request.headers.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return json({ error: "Error occured -- no svix headers" }, { status: 400 });
  }

  // Get the body
  const payload = await request.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return json({ error: "Error occured" }, { status: 400 });
  }

  // Handle the webhook
  const { id, object } = evt.data;
  const eventType = evt.type;

  if (eventType === "user.created") {
    // Create a new user in your database
    try {
      const createUser = await db.user.create({
        data: {
          username: 'New User',
          email: evt.data.email_addresses[0].email_address,
          password: 'null',
          clerkId:  evt.data.id
        },
      });
      const session = await getSession(
        request.headers.get("Cookie")
      );
      session.set("name", `${createUser.id}`);
      return json({ message: `User ${evt.data.email_addresses[0].email_address} created successfully`  });
    } catch (error) {
      console.error("Error creating user:", error);
      return json({ error: "Error creating user" }, { status: 500 });
    }
  }

  return json({ message: "Webhook received" });
};