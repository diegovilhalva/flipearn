import stripe from "stripe"
import prisma from "../configs/prisma.js";
import { inngest } from "../inngest/index.js";

export const stripeWebhook = async (request, response) => {
    const stripeWebhook = new stripe(process.env.STRIPE_SECRET_KEY)
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET
    let event;
    if (endpointSecret) {
        // Get the signature sent by Stripe
        const signature = request.headers['stripe-signature'];
        try {
            event = stripe.webhooks.constructEvent(
                request.body,
                signature,
                endpointSecret
            );
        } catch (err) {
            console.log(`⚠️ Webhook signature verification failed.`, err.message);
            return response.sendStatus(400);
        }

        try {
            switch (event.type) {
                case 'payment_intent.succeeded':
                    const paymentIntent = event.data.object;
                    const sessionList = await stripeInstance.checkout.list({
                        payment_intent: paymentIntent.id
                    })

                    const session = sessionList.data[0]

                    const { transactionId, appId } = session.metadata

                    if (appId === "flipearn" && transactionId) {
                        const transaction = await prisma.transaction.update({
                            where: { id: transactionId },
                            data: { isPaid: true }
                        })

                        await inngest.send({ name: "app/purchase", data: { transaction } })

                        await prisma.listing.update({
                            where: { id: transaction.listingId },
                            data: { status: "sold" }
                        })

                        await prisma.user.update({
                            where: { id: transaction.ownerId },
                            data: { earned: { increment: transaction.amount } }
                        })
                    }
                    break;

                default:
                    console.log(`Unhandled event type ${event.type}`);
            }

            response.json({ received: true });
        } catch (error) {
            console.log(error)
            response.status(500).send("Internal server error")
        }
    }
}