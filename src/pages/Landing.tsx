import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Header from "../components/layout/Header";

function Feature({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="rounded-2xl border-2 border-zinc-200 bg-white p-6 shadow-sm">
      <div className="h-12 w-12 rounded-xl bg-amber-100 text-amber-700 grid place-items-center mb-4">{icon}</div>
      <h3 className="text-lg font-extrabold text-zinc-900 mb-1">{title}</h3>
      <p className="text-zinc-600 font-medium">{desc}</p>
    </div>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <Header />
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(251,191,36,0.25),transparent)] pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1.5 text-sm font-bold text-amber-900 mb-6">
              <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
              Made for Aussie electricians
            </div>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-[1.05]">
              Quote Faster. <span className="text-zinc-500">Win More Jobs.</span>
            </h1>
            <p className="mt-6 text-xl lg:text-2xl font-medium text-zinc-700 max-w-2xl">
              Stop wasting nights on quotes. Send professional electrical quotes in minutes, follow up via SMS, and lock in jobs faster—straight from your phone.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button size="xl" onClick={() => navigate("/register")} className="sm:min-w-[220px]">Start Free Trial</Button>
              <Button variant="outline" size="xl" onClick={() => navigate("/login")} className="sm:min-w-[160px]">Login</Button>
            </div>
            <div className="mt-6 flex items-center gap-4 text-sm font-semibold text-zinc-600">
              <span className="inline-flex items-center gap-2"><span className="text-green-600">✓</span> 7-day free trial</span>
              <span className="inline-flex items-center gap-2"><span className="text-green-600">✓</span> No credit card</span>
              <span className="inline-flex items-center gap-2"><span className="text-green-600">✓</span> Cancel anytime</span>
            </div>
          </div>

          {/* Phone mock */}
          <div className="mt-14 lg:mt-0 lg:absolute lg:right-8 lg:top-24">
            <div className="mx-auto w-[340px] rounded-[3rem] border-[10px] border-zinc-900 bg-zinc-900 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.35)]">
              <div className="relative rounded-[2.2rem] bg-white h-[680px] overflow-hidden">
                <div className="h-10 bg-zinc-900 relative">
                  <div className="absolute left-1/2 -translate-x-1/2 top-3 h-1.5 w-24 rounded-full bg-zinc-700" />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-8 w-8 rounded-lg bg-amber-500" />
                    <div className="text-sm font-bold">New Quote</div>
                    <div className="h-8 w-8" />
                  </div>
                  <div className="space-y-3">
                    {[
                      "Customer details",
                      "Site address",
                      "Switchboard upgrade",
                      "Labour (8h @ $120)",
                      "Materials",
                    ].map((t, i) => (
                      <div key={i} className="rounded-xl border-2 border-zinc-200 p-3">
                        <div className="h-3 w-32 bg-zinc-200 rounded mb-2" />
                        <div className="h-8 bg-zinc-100 rounded-lg" />
                        <div className="mt-2 text-xs text-zinc-500">{t}</div>
                      </div>
                    ))}
                    <div className="rounded-2xl bg-zinc-900 text-white p-4 flex items-center justify-between">
                      <div className="font-bold">Total</div>
                      <div className="text-2xl font-black">$3,840 inc GST</div>
                    </div>
                    <button className="w-full rounded-xl bg-amber-500 py-3 font-extrabold text-black">Send via SMS</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Features */}
      <section className="py-16 lg:py-24 bg-white border-y border-zinc-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight">Everything you need to win work</h2>
            <p className="mt-3 text-lg font-medium text-zinc-600">Built for real jobs, not office admins.</p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Feature
              icon={
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>
              }
              title="Quote Builder"
              desc="Pre-filled line items for switchboards, lights, power, faults. Add labour and materials in seconds."
            />
            <Feature
              icon={
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
              }
              title="SMS Replies"
              desc="Send quotes by text with one tap. Auto-follow ups. No more chasing customers."
            />
            <Feature
              icon={
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06A2 2 0 016.05 3.6l.06.06a1.65 1.65 0 001.82.33H8a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51h.09a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V8a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
              }
              title="Automation"
              desc="Templates, GST, margins, and your logo auto-included. Copy jobs to new quotes with one tap."
            />
            <Feature
              icon={
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              }
              title="Look Professional"
              desc="Clean PDFs with your ABN, terms, and branding. Customers say yes faster."
            />
            <Feature
              icon={
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>
              }
              title="More Conversions"
              desc="Follow-ups and clear totals lift acceptance. Track opens and replies."
            />
            <Feature
              icon={
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              }
              title="Built for Tradies"
              desc="Big buttons, fast load, works offline-ish on site. No fluff, just jobs."
            />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 lg:py-24 bg-zinc-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight">Save hours every week</h2>
            <p className="mt-3 text-lg font-medium text-zinc-600">Type less, tap more. Reuse items, auto-calc GST and margins, and send before you leave the driveway.</p>
            <ul className="mt-6 space-y-3 text-zinc-800 font-semibold">
              <li className="flex gap-3"><span className="text-green-600">✔</span> Average quote time cut from 45 mins → 6 mins</li>
              <li className="flex gap-3"><span className="text-green-600">✔</span> Follow-ups done for you by SMS</li>
              <li className="flex gap-3"><span className="text-green-600">✔</span> Professional branding builds trust and higher prices</li>
            </ul>
          </div>
          <div className="rounded-3xl border-2 border-zinc-200 bg-white p-6 shadow-sm">
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                {k:"Avg. time saved", v:"4.5 hrs/wk"},
                {k:"Faster payment", v:"38% quicker"},
                {k:"Close rate", v:"+27%"},
              ].map((s,i)=>(
                <div key={i} className="rounded-2xl bg-zinc-50 py-6">
                  <div className="text-3xl font-black">{s.v}</div>
                  <div className="mt-1 text-sm font-bold text-zinc-600">{s.k}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl bg-amber-50 p-4 border border-amber-200">
              <p className="font-bold text-amber-900">“I’m quoting on site and getting approvals before I leave. Game changer.”</p>
              <p className="mt-2 text-sm font-semibold text-amber-800">— Dan, Brisbane Electrician</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 lg:py-24 bg-white border-y border-zinc-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight">Simple pricing</h2>
            <p className="mt-3 text-lg font-medium text-zinc-600">Try free for 7 days. No credit card. Cancel anytime.</p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl border-2 border-zinc-200 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-black">Free Trial</h3>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-5xl font-black">$0</span>
                <span className="text-zinc-500 font-semibold">/ 7 days</span>
              </div>
              <ul className="mt-6 space-y-3 font-semibold">
                <li>✔ Full access for 7 days</li>
                <li>✔ Unlimited quotes</li>
                <li>✔ SMS sending</li>
                <li>✔ Email support</li>
              </ul>
              <Button full className="mt-8" onClick={() => navigate("/register")}>Start free trial</Button>
            </div>

            <div className="relative rounded-3xl border-4 border-amber-500 bg-zinc-900 text-white p-8 shadow-xl scale-[1.02]">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-black text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">Most Popular</div>
              <h3 className="text-xl font-black">Pro</h3>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-5xl font-black">$19</span>
                <span className="text-zinc-300 font-semibold">/ month</span>
              </div>
              <ul className="mt-6 space-y-3 font-semibold text-zinc-100">
                <li>✔ Everything in trial</li>
                <li>✔ Unlimited quotes forever</li>
                <li>✔ Priority support</li>
                <li>✔ Team sharing (soon)</li>
              </ul>
              <Button full className="mt-8" onClick={() => navigate("/register")}>Get Pro</Button>
              <p className="mt-3 text-center text-sm text-zinc-400 font-medium">AUD inc. GST. Cancel anytime.</p>
            </div>

            <div className="rounded-3xl border-2 border-zinc-200 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-black">Team</h3>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-5xl font-black">$49</span>
                <span className="text-zinc-500 font-semibold">/ month</span>
              </div>
              <ul className="mt-6 space-y-3 font-semibold">
                <li>✔ 3 users</li>
                <li>✔ Shared templates</li>
                <li>✔ Approval workflows</li>
                <li>✔ Priority onboarding</li>
              </ul>
              <Button variant="secondary" full className="mt-8" onClick={() => navigate("/register")}>Contact us</Button>
            </div>
          </div>

          {/* Testimonials placeholder */}
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              {name:"Mick • Sydney", text:"Quotes used to take my nights. Now I do them on site and win more."},
              {name:"Sarah • Perth", text:"Customers love the SMS quotes. I get quick yes or no."},
              {name:"Jai • Melbourne", text:"Looks pro, easy to use. Paid for itself in the first job."},
            ].map((t, i)=>(
              <div key={i} className="rounded-2xl border-2 border-zinc-200 bg-zinc-50 p-6">
                <p className="font-bold text-zinc-900">“{t.text}”</p>
                <p className="mt-3 text-sm font-semibold text-zinc-600">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 grid place-items-center">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-black" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/>
              </svg>
            </div>
            <span className="font-black">QuoteZap</span>
          </div>
          <p className="text-sm font-medium text-zinc-600">© {new Date().getFullYear()} QuoteZap — Built for Aussie sparkies.</p>
          <div className="flex items-center gap-4 text-sm font-semibold">
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
