import { fail, redirect } from '@sveltejs/kit';

export const load = async (event) => {
    if (event.locals.user) throw redirect(302, '/account');
    return {};
};

export const actions = {
    subscribe: async ({ request }) => {
        const formData = await request.formData();

        const name = formData.get('name')?.toString() ?? '';
        const email = formData.get('email')?.toString() ?? '';
        const phone = formData.get('phone')?.toString() ?? '';
        const dob = formData.get('dob')?.toString() ?? '';
        const plan = formData.get('plan')?.toString() ?? '';
        const billing = formData.get('billing')?.toString() ?? '';
        const cardName = formData.get('cardName')?.toString() ?? '';
        const cardNumber = formData.get('cardNumber')?.toString() ?? '';
        const expiry = formData.get('expiry')?.toString() ?? '';
        const cvv = formData.get('cvv')?.toString() ?? '';

        // Basic validation
        if (!name || !email || !plan || !billing || !cardNumber || !expiry || !cvv) {
            return fail(400, { message: 'Please fill in all required fields.' });
        }

        if (cardNumber.replace(/\s/g, '').length !== 16) {
            return fail(400, { message: 'Card number must be 16 digits.' });
        }

        // TODO: save to database
        console.log('New subscription:', { name, email, phone, dob, plan, billing });

        throw redirect(302, '/subscription/success');
    }
};