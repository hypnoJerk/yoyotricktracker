import { fail, redirect } from '@sveltejs/kit';
import { authenticate } from '$lib/auth';

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData();
        const username = data.get('username');
        const password = data.get('password');

        if (typeof username !== 'string' || typeof password !== 'string') {
            return fail(400, { error: 'Invalid form data' });
        }

        const user = await authenticate(username, password);

        if (!user) {
            return fail(401, { error: 'Invalid username or password' });
        }

        // Store session as a cookie (In a real app, sign this)
        cookies.set('session', JSON.stringify(user), {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7 // 1 week
        });

        throw redirect(303, '/dashboard');
    }
};
