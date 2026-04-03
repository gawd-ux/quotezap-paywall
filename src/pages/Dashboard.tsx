import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import Header from "../components/layout/Header";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { redirectToCheckout } from "../utils/stripe";

function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    trial: "bg-amber-100 text-amber-900 border-amber-300",
    active: "bg-green-100 text-green-900 border-green-300",
    expired: "bg-red-100 text-red-900 border-red-300",
    none: "bg-zinc-100 text-zinc-800 border-zinc-300"
  };
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border-2 px-3 py-1 text-sm font-extrabold ${map[status] || map.none}`}>
      <span className="h-2 w-2 rounded-full bg-current" />
      {status.toUpperCase()}
    </span>
  );
}

export default function Dashboard() {
  const { user, profile, logout, trialDaysLeft, isTrialActive, isSubscribed, hasAccess } = useAuth();
  const navigate = useNavigate();

import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const handleLogout = async () => {
  try {
    await signOut(auth);
    navigate("/login", { replace: true });
  } catch (err) {
    console.error("Logout error:", err);
  }
};

  const handleOpenApp = () => {
    if (hasAccess) {
      navigate("/app", { replace: true });
    } else {
      navigate("/paywall", { replace: true });
    }
  };

  const handleSubscribe = () => {
    redirectToCheckout(user?.email);
  };

  const trialLabel = (() => {
    if (!profile) return "—";
    if (isSubscribed) return "Active subscription";
    if (isTrialActive && trialDaysLeft !== null) {
      if (trialDaysLeft > 1) return `${trialDaysLeft} days remaining`;
      if (trialDaysLeft === 1) return "1 day remaining";
      if (trialDaysLeft === 0) return "Last day of trial";
    }
    if (profile.subscriptionStatus === "expired") return "Trial expired";
    return "No active plan";
  })();

  return (
    <div className="min-h-screen bg-zinc-50">
      <Header />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl lg:text-4xl font-black tracking-tight">G’day, {user?.email?.split("@")[0] || "sparky"} 👋</h1>
            <p className="mt-2 text-lg font-medium text-zinc-600">Your QuoteZap dashboard</p>
          </div>
          <div className="flex items-center gap-3">
            <StatusPill status={profile?.subscriptionStatus || "none"} />
            <Button variant="secondary" onClick={handleLogout}>Logout</Button>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-3xl border-2 border-zinc-200 bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black">Subscription</h2>
              <span className="text-sm font-bold text-zinc-600">{trialLabel}</span>
            </div>

            <div className="mt-6 grid sm:grid-cols-3 gap-4">
              <div className="rounded-2xl bg-zinc-50 p-5 border-2 border-zinc-200">
                <div className="text-sm font-bold text-zinc-600">Status</div>
                <div className="mt-1 text-2xl font-black capitalize">{profile?.subscriptionStatus || "—"}</div>
              </div>
              <div className="rounded-2xl bg-zinc-50 p-5 border-2 border-zinc-200">
                <div className="text-sm font-bold text-zinc-600">Trial ends</div>
                <div className="mt-1 text-2xl font-black">
                  {profile?.trialEnd ? new Date(profile.trialEnd.toDate ? profile.trialEnd.toDate() : profile.trialEnd).toLocaleDateString("en-AU") : "—"}
                </div>
              </div>
              <div className="rounded-2xl bg-zinc-50 p-5 border-2 border-zinc-200">
                <div className="text-sm font-bold text-zinc-600">Access</div>
                <div className="mt-1 text-2xl font-black">{hasAccess ? "Full" : "Locked"}</div>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button onClick={handleOpenApp} className="sm:min-w-[220px]">Open QuoteZap App</Button>
              {!isSubscribed && (
                <Button variant="outline" onClick={handleSubscribe}>Manage Subscription</Button>
              )}
            </div>

            {!hasAccess && (
              <div className="mt-6 rounded-2xl border-2 border-amber-300 bg-amber-50 p-4">
                <p className="font-extrabold text-amber-900">Your trial has ended.</p>
                <p className="font-semibold text-amber-900/80">Upgrade to continue quoting and sending SMS.</p>
                <Button className="mt-4" onClick={handleSubscribe}>Upgrade to Pro — $19/mo</Button>
              </div>
            )}
          </div>

          <div className="rounded-3xl border-2 border-zinc-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-black">Quick tips</h2>
            <ul className="mt-4 space-y-3 font-semibold text-zinc-700">
              <li>• Add your logo and ABN in Settings (coming soon)</li>
              <li>• Use saved items for switchboards and lights</li>
              <li>• Send quotes via SMS for fastest replies</li>
            </ul>
            <div className="mt-6 rounded-2xl bg-zinc-900 text-white p-5">
              <p className="font-black">Pro tip</p>
              <p className="text-zinc-300 font-medium">Quote on site. Don’t go home to do paperwork.</p>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border-2 border-dashed border-zinc-300 bg-white p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-black">Need help?</h3>
              <p className="text-zinc-600 font-medium">We’re sparkies too. Shoot us an email and we’ll sort you out.</p>
            </div>
            <a href="mailto:support@quotezap.au" className="font-bold underline">support@quotezap.au</a>
          </div>
        </div>
      </div>
    </div>
  );
}
