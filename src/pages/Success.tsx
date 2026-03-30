import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";

export default function Success() {
  const navigate = useNavigate();
  const { user, refreshProfile } = useAuth();

  useEffect(() => {
    const markActive = async () => {
      if (!user) return;
      try {
        await updateDoc(doc(db, "users", user.uid), {
          subscriptionStatus: "active",
          updatedAt: serverTimestamp()
        });
        await refreshProfile();
      } catch (e) {
        console.error(e);
      }
    };
    markActive();
  }, [user, refreshProfile]);

  return (
    <div className="min-h-screen bg-zinc-50">
      <Header />
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-3xl border-2 border-green-300 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto h-16 w-16 rounded-2xl bg-green-100 grid place-items-center mb-6">
            <svg viewBox="0 0 24 24" className="h-8 w-8 text-green-700" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>
          <h1 className="text-3xl font-black">Payment successful</h1>
          <p className="mt-2 text-lg font-medium text-zinc-600">Your Pro subscription is active. You’ve got full access to QuoteZap.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="xl" onClick={() => navigate("/app")}>Open QuoteZap</Button>
            <Button variant="outline" size="xl" onClick={() => navigate("/dashboard")}>Go to dashboard</Button>
          </div>
          <p className="mt-6 text-sm text-zinc-500 font-medium">A receipt has been sent to your email by Stripe.</p>
        </div>
      </div>
    </div>
  );
}
