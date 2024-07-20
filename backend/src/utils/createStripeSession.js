import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const createStripeSession = async (cartItems, orderId) => {
    try {
        const line_items = cartItems.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.product_name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Shipping Charges"
                },
                unit_amount: 50
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `http://localhost:3000/verify?success=true&orderId=${orderId}`,
            cancel_url: `http://localhost:3000/verify?success=false&orderId=${orderId}`,
        })

        return session.url

    } catch (error) {
        console.error('Error creating Stripe session:', error)
        return { success: false, message: "Error" }
    }
}