import Header from "../components/layout/Header";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

export default function Cancel() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-zinc-50">
      <Header />
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-3xl border-2 border-zinc-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto h-16 w-16 rounded-2xl bg-zinc-100 grid place-items-center mb-6">
            <svg viewBox="0 0 24 24" className="h-8 w-8 text-zinc-700" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="15" y1="9" x2="9" y2="15"/>
              <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
          </div>
          <h1 className="text-3xl font-black">Checkout cancelled</h1>
          <p className="mt-2 text-lg font-medium text-zinc-600">No worries. You can resume your trial or upgrade anytime.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="xl" onClick={() => navigate("/dashboard")}>Back to dashboard</Button>
            <Button variant="outline" size="xl" onClick={() => navigate("/paywall")}>View pricing</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
