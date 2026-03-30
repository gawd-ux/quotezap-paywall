export async function redirectToCheckout(email?: string | null) {
  // In production, this should call your backend to create a Stripe Checkout Session
  // using your secret key, to avoid exposing it in the client.
  // This client-only fallback opens a Stripe test checkout via a pre-created payment link
  // or a placeholder. Replace with your backend endpoint.

  const priceId = import.meta.env.VITE_STRIPE_PRICE_ID;
  const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

  if (!priceId || !publishableKey) {
    alert("Stripe not configured. Add VITE_STRIPE_PRICE_ID and VITE_STRIPE_PUBLISHABLE_KEY to .env, and implement a backend endpoint to create Checkout Sessions.");
    return;
  }

  // Simple demo: redirect to Stripe Checkout using client-only flow (not recommended for prod)
  // Replace this with fetch('/api/create-checkout-session', { method: 'POST', body: ... })
  try {
    const params = new URLSearchParams({
      client_reference_id: email || "",
      prefunded_email: email || "",
    });
    // This is a placeholder URL. In real app, use backend to create session and redirect to session.url
    const demoUrl = `https://checkout.stripe.com/c/pay/${priceId}?${params.toString()}`;
    window.location.href = demoUrl;
  } catch (e) {
    console.error(e);
    alert("Unable to start checkout. Configure backend endpoint for Stripe.");
  }
}
