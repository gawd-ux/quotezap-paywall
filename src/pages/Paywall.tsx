import Header from "../components/layout/Header";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { redirectToCheckout } from "../utils/stripe";
import { useNavigate } from "react-router-dom";

export default function Paywall() {
  const { user, profile, trialDaysLeft } = useAuth();
  const navigate = useNavigate();

  const handleUpgrade = () => redirectToCheckout(user?.email);

  return (
    <div className="min-h-screen bg-zinc-50">
      <Header />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-3xl border-4 border-amber-500 bg-white p-8 lg:p-12 shadow-xl text-center">
          <div className="mx-auto h-16 w-16 rounded-2xl bg-amber-100 grid place-items-center mb-6">
            <svg viewBox="0 0 24 24" className="h-8 w-8 text-amber-700" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0110 0v4"/>
            </svg>
          </div>
          <h1 className="text-3xl lg:text-4xl font-black tracking-tight">Your free trial has ended</h1>
          <p className="mt-3 text-lg font-medium text-zinc-600">
            Upgrade to continue using QuoteZap and keep winning jobs without the paperwork.
          </p>

          <div className="mt-8 grid sm:grid-cols-3 gap-4 text-left">
            <div className="rounded-2xl bg-zinc-50 border-2 border-zinc-200 p-5">
              <div className="text-sm font-bold text-zinc-600">Trial status</div>
              <div className="mt-1 text-xl font-black">{profile?.subscriptionStatus === "expired" ? "Expired" : "Inactive"}</div>
              {trialDaysLeft !== null && trialDaysLeft < 0 && (
                <div className="text-sm font-semibold text-zinc-600 mt-1">{Math.abs(trialDaysLeft)} days ago</div>
              )}
            </div>
            <div className="rounded-2xl bg-zinc-50 border-2 border-zinc-200 p-5">
              <div className="text-sm font-bold text-zinc-600">Plan</div>
              <div className="mt-1 text-xl font-black">Pro — $19/mo</div>
              <div className="text-sm font-semibold text-zinc-600 mt-1">AUD inc. GST</div>
            </div>
            <div className="rounded-2xl bg-zinc-50 border-2 border-zinc-200 p-5">
              <div className="text-sm font-bold text-zinc-600">Access</div>
              <div className="mt-1 text-xl font-black">Locked</div>
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="xl" onClick={handleUpgrade} className="sm:min-w-[260px]">Upgrade to continue using QuoteZap</Button>
            <Button variant="outline" size="xl" onClick={() => navigate("/dashboard")} className="sm:min-w-[200px]">Back to dashboard</Button>
          </div>

          <div className="mt-8 rounded-2xl bg-amber-50 border-2 border-amber-200 p-4 text-left">
            <p className="font-extrabold text-amber-900">What you get with Pro</p>
            <ul className="mt-2 grid sm:grid-cols-2 gap-2 font-semibold text-amber-900/90">
              <li>✔ Unlimited quotes</li>
              <li>✔ SMS + email sending</li>
              <li>✔ Professional PDFs</li>
              <li>✔ Priority support</li>
            </ul>
          </div>

          <p className="mt-6 text-sm font-medium text-zinc-500">Secure checkout via Stripe. Cancel anytime.</p>
        </div>
      </div>
    </div>
  );
}
