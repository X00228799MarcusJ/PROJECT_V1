import { fail, redirect } from '@sveltejs/kit';
import Stripe from 'stripe';
import { STRIPE_SECRET_KEY } from '$env/static/private';

const stripe = new Stripe(STRIPE_SECRET_KEY);

export const actions = {
    subscribe: async ({ request, url }) => {
        const formData = await request.formData();
        const plan = formData.get('plan');
        const billing = formData.get('billing') || 'monthly';

        const prices = {
            basic_monthly: 'price_1TQ5JwRzUaeZwoE6JEWfvNgV',
            basic_yearly: 'price_1TQG14RzUaeZwoE6jL1dRUUR',
            pro_monthly: 'price_1TQFaERzUaeZwoE6W4N8DvQ4',
            pro_yearly: 'price_1TQG1LRzUaeZwoE6QZqBqgQJ',
            premium_monthly: 'price_1TQFaXRzUaeZwoE64qC5WTab',
            premium_yearly: 'price_1TQGG5RzUaeZwoE6QdfM0H7x'
        };

        const key = `${plan}_${billing}`;
        const priceId = prices[key];
        if (!priceId) {
            throw new error('Invalid plan.');
        }

        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1
                }
            ],
            success_url: `${url.origin}/success`,
            cancel_url: `${url.origin}/cancel`
        });
            
        
        console.log('SESSION:', session);
        console.log('SESSION URL:', session.url);
        throw redirect(303, session.url);
    }
};