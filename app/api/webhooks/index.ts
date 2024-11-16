import { json } from '@remix-run/node';
import { Webhook } from 'svix';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { WebhookEvent } from '@clerk/clerk-sdk-node';

export async function action({ request }: LoaderFunctionArgs) {
	const SIGNING_SECRET = process.env.SIGNING_SECRET;

	if (!SIGNING_SECRET) {
		console.error('Error: Missing SIGNING_SECRET in environment variables.');
		throw new Error(
			'Please add SIGNING_SECRET from Clerk Dashboard to your .env or .env.local.'
		);
	}

	// Create a new Svix Webhook instance
	const wh = new Webhook(SIGNING_SECRET);

	// Extract headers
	const svix_id = request.headers.get('svix-id');
	const svix_timestamp = request.headers.get('svix-timestamp');
	const svix_signature = request.headers.get('svix-signature');

	if (!svix_id || !svix_timestamp || !svix_signature) {
		return json({ error: 'Missing required Svix headers.' }, { status: 400 });
	}

	// Parse the body
	const payload = await request.text(); // Use `.text()` to access raw body for signature verification

	let evt: WebhookEvent;

	// Verify the webhook payload
	try {
		evt = wh.verify(payload, {
			'svix-id': svix_id,
			'svix-timestamp': svix_timestamp,
			'svix-signature': svix_signature,
		}) as WebhookEvent;
	} catch (err) {
		console.error('Error: Could not verify webhook payload:', err);
		return json({ error: 'Webhook verification failed.' }, { status: 400 });
	}

	// Process the event
	const { id } = evt.data;
	const eventType = evt.type;
	console.log(`Received webhook with ID ${id} and event type: ${eventType}`);
	console.log('Webhook payload:', payload);

	// Return a success response
	return new Response('Webhook received successfully', { status: 200 });
}
