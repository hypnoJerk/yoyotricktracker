import { redirect } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    const session = event.cookies.get('session');

    if (session) {
        // In a real app, verify the session/token
        // For simplicity, we just assume it's valid if it exists
        event.locals.user = JSON.parse(session);
    }

    if (event.url.pathname.startsWith('/dashboard')) {
        if (!event.locals.user) {
            throw redirect(303, '/login');
        }
    }

    const response = await resolve(event);
    return response;
}
