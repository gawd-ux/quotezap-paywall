import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password.length < 6) return setError("Password must be at least 6 characters");
    if (password !== confirm) return setError("Passwords do not match");
    setLoading(true);
    try {
const userCredential = await register(email, password);
const user = userCredential.user;

await setDoc(doc(db, "users", user.uid), {
  uid: user.uid,
  email: user.email,
  trialStart: new Date(),
  trialEnd: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  subscriptionStatus: "trial",
  createdAt: new Date(),
});

navigate("/dashboard", { replace: true });
    } catch (err: any) {
      setError(err?.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      <Header />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid lg:grid-cols-2 gap-12 items-center">
        <div className="mx-auto w-full max-w-md order-2 lg:order-1">
          <div className="rounded-3xl border-2 border-zinc-200 bg-white p-8 shadow-sm">
            <h1 className="text-2xl font-black">Start your free trial</h1>
            <p className="mt-1 text-zinc-600 font-medium">7 days, full access. No credit card.</p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <Input
                label="Work email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@company.com.au"
                required
              />
              <Input
                label="Password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                required
              />
              <Input
                label="Confirm password"
                type="password"
                autoComplete="new-password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                placeholder="Repeat password"
                required
              />
              {error && <div className="rounded-xl bg-red-50 border-2 border-red-200 p-3 text-red-700 font-semibold text-sm">{error}</div>}
              <Button type="submit" full loading={loading}>Create account</Button>
              <p className="text-xs text-zinc-500 font-medium">By creating an account you agree to our Terms and Privacy.</p>
            </form>
            <div className="mt-6 text-center text-sm font-semibold text-zinc-700">
              Already have an account? <Link to="/login" className="text-amber-700 hover:underline">Login</Link>
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <div className="rounded-3xl bg-gradient-to-br from-amber-400 to-amber-600 p-10 text-black">
            <h2 className="text-4xl font-black leading-tight">Get quoting in minutes.</h2>
            <ul className="mt-6 space-y-3 font-bold text-lg">
              <li className="flex gap-3"><span>⚡</span> Prebuilt electrical items</li>
              <li className="flex gap-3"><span>📱</span> Works great on mobile</li>
              <li className="flex gap-3"><span>💬</span> SMS + email quotes</li>
            </ul>
            <div className="mt-8 rounded-2xl bg-black/10 p-4">
              <p className="font-extrabold">What’s included in trial:</p>
              <p className="font-semibold">Unlimited quotes, SMS, PDF export.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
