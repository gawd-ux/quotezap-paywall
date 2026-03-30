import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Header from "../components/layout/Header";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, resetPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const from = (location.state as any)?.from?.pathname || "/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    if (!email) return setError("Enter your email first");
    setError(null);
    setInfo(null);
    try {
      await resetPassword(email);
      setInfo("Password reset email sent. Check your inbox.");
    } catch (err: any) {
      setError(err.message || "Failed to send reset");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      <Header />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid lg:grid-cols-2 gap-12 items-center">
        <div className="hidden lg:block">
          <div className="rounded-3xl bg-zinc-900 text-white p-10">
            <h2 className="text-4xl font-black leading-tight">Welcome back, legend.</h2>
            <p className="mt-4 text-lg font-medium text-zinc-300">Log in to fire off quotes, check replies, and lock in the next job.</p>
            <div className="mt-8 rounded-2xl bg-white/10 p-4">
              <p className="font-bold">Tip:</p>
              <p className="text-zinc-300">Use the mobile app on site for fastest quoting.</p>
            </div>
          </div>
        </div>
        <div className="mx-auto w-full max-w-md">
          <div className="rounded-3xl border-2 border-zinc-200 bg-white p-8 shadow-sm">
            <h1 className="text-2xl font-black">Login</h1>
            <p className="mt-1 text-zinc-600 font-medium">Enter your details to continue.</p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <Input
                label="Email"
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
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              {error && <div className="rounded-xl bg-red-50 border-2 border-red-200 p-3 text-red-700 font-semibold text-sm">{error}</div>}
              {info && <div className="rounded-xl bg-green-50 border-2 border-green-200 p-3 text-green-700 font-semibold text-sm">{info}</div>}
              <Button type="submit" full loading={loading}>Login</Button>
              <button type="button" onClick={handleReset} className="w-full text-sm font-bold text-zinc-700 hover:underline">Forgot password?</button>
            </form>
            <div className="mt-6 text-center text-sm font-semibold text-zinc-700">
              New here? <Link to="/register" className="text-amber-700 hover:underline">Start free trial</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
