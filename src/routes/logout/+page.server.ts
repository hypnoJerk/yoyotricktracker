import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ cookies }) => {
        cookies.delete('session', { path: '/' });
        throw redirect(303, '/login');
    }
};
