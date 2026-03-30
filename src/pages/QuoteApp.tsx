import { useState, useMemo } from "react";
import Header from "../components/layout/Header";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

type LineItem = {
  id: string;
  desc: string;
  qty: number;
  rate: number;
};

const defaultItems: LineItem[] = [
  { id: "1", desc: "Switchboard upgrade (incl. RCBOs)", qty: 1, rate: 1850 },
  { id: "2", desc: "Labour (sparky) per hour", qty: 8, rate: 120 },
  { id: "3", desc: "Downlights LED (supply & install) ea", qty: 12, rate: 85 },
];

export default function QuoteApp() {
  const [customer, setCustomer] = useState("");
  const [site, setSite] = useState("");
  const [items, setItems] = useState<LineItem[]>(defaultItems);
  const [marginPct, setMarginPct] = useState(15);
  const [sent, setSent] = useState(false);

  const subtotal = useMemo(() => items.reduce((s, i) => s + i.qty * i.rate, 0), [items]);
  const margin = useMemo(() => (subtotal * marginPct) / 100, [subtotal, marginPct]);
  const gst = useMemo(() => (subtotal + margin) * 0.1, [subtotal, margin]);
  const total = useMemo(() => subtotal + margin + gst, [subtotal, margin, gst]);

  const updateItem = (id: string, patch: Partial<LineItem>) => {
    setItems(prev => prev.map(it => it.id === id ? { ...it, ...patch } : it));
  };

  const addItem = () => {
    setItems(prev => [...prev, { id: crypto.randomUUID(), desc: "", qty: 1, rate: 0 }]);
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(it => it.id !== id));
  };

  const handleSend = () => {
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      <Header />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 grid lg:grid-cols-[1.15fr_0.85fr] gap-8">
        {/* Builder */}
        <div className="rounded-3xl border-2 border-zinc-200 bg-white p-6 lg:p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-black">New Quote</h1>
            <span className="text-sm font-bold text-zinc-500">QuoteZap</span>
          </div>

          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <Input label="Customer name" placeholder="e.g. John Smith" value={customer} onChange={e => setCustomer(e.target.value)} />
            <Input label="Mobile" placeholder="04xx xxx xxx" />
            <Input className="sm:col-span-2" label="Site address" placeholder="12 Example St, Brisbane QLD" value={site} onChange={e => setSite(e.target.value)} />
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-black">Line items</h2>
              <Button variant="outline" size="sm" onClick={addItem}>Add item</Button>
            </div>
            <div className="space-y-3">
              {items.map(it => (
                <div key={it.id} className="grid grid-cols-12 gap-3 items-end rounded-2xl border-2 border-zinc-200 p-3">
                  <div className="col-span-12 sm:col-span-6">
                    <Input label="Description" value={it.desc} onChange={e => updateItem(it.id, { desc: e.target.value })} placeholder="Work description" />
                  </div>
                  <div className="col-span-6 sm:col-span-2">
                    <Input label="Qty" type="number" min={0} value={it.qty} onChange={e => updateItem(it.id, { qty: Number(e.target.value) })} />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <Input label="Rate ($)" type="number" min={0} value={it.rate} onChange={e => updateItem(it.id, { rate: Number(e.target.value) })} />
                  </div>
                  <div className="col-span-12 sm:col-span-1 flex sm:justify-end">
                    <button onClick={() => removeItem(it.id)} className="text-sm font-bold text-red-600 hover:underline">Remove</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2 rounded-2xl bg-zinc-50 border-2 border-zinc-200 p-4">
              <label className="block text-sm font-bold text-zinc-700 mb-2">Margin %</label>
              <input
                type="range" min={0} max={40} value={marginPct} onChange={e => setMarginPct(Number(e.target.value))}
                className="w-full"
              />
              <div className="mt-1 text-sm font-semibold text-zinc-600">{marginPct}%</div>
            </div>
            <div className="rounded-2xl bg-zinc-900 text-white p-4">
              <div className="text-sm font-bold text-zinc-300">Estimated total</div>
              <div className="text-3xl font-black mt-1">${total.toLocaleString("en-AU", { maximumFractionDigits: 0 })} inc GST</div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button className="sm:min-w-[220px]" onClick={handleSend}>{sent ? "Sent ✓" : "Send via SMS"}</Button>
            <Button variant="outline">Download PDF</Button>
            <Button variant="ghost">Save as template</Button>
          </div>
        </div>

        {/* Preview */}
        <div className="rounded-3xl border-2 border-zinc-200 bg-white p-6 lg:p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black">Preview</h2>
            <span className="text-xs font-bold text-zinc-500">Customer view</span>
          </div>

          <div className="mt-6 rounded-2xl border-2 border-zinc-200 p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 grid place-items-center">
                <svg viewBox="0 0 24 24" className="h-6 w-6 text-black" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/>
                </svg>
              </div>
              <div>
                <div className="font-black">QuoteZap Electrical</div>
                <div className="text-sm text-zinc-600 font-medium">ABN 12 345 678 901 • support@quotezap.au</div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-bold text-zinc-600">Bill to</div>
                <div className="font-semibold">{customer || "Customer name"}</div>
                <div className="text-zinc-600">{site || "Site address"}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-zinc-600">Quote #</div>
                <div className="font-semibold">QZ-{new Date().getFullYear()}-{(Math.random()*9000+1000).toFixed(0)}</div>
                <div className="text-zinc-600">Valid 14 days</div>
              </div>
            </div>

            <div className="mt-6 border-t-2 border-zinc-200">
              <div className="grid grid-cols-12 text-xs font-bold text-zinc-500 py-2">
                <div className="col-span-6">Description</div>
                <div className="col-span-2 text-right">Qty</div>
                <div className="col-span-2 text-right">Rate</div>
                <div className="col-span-2 text-right">Amount</div>
              </div>
              <div className="divide-y divide-zinc-200">
                {items.map(it => (
                  <div key={it.id} className="grid grid-cols-12 py-2 text-sm">
                    <div className="col-span-6 font-medium pr-2">{it.desc || "—"}</div>
                    <div className="col-span-2 text-right">{it.qty}</div>
                    <div className="col-span-2 text-right">${it.rate.toFixed(0)}</div>
                    <div className="col-span-2 text-right font-semibold">${(it.qty * it.rate).toFixed(0)}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="text-sm text-zinc-600 font-medium">
                <p>Includes GST. Payment terms: 7 days. Warranty as per manufacturer. Variations by approval.</p>
              </div>
              <div className="rounded-2xl bg-zinc-50 border-2 border-zinc-200 p-4">
                <div className="flex justify-between text-sm"><span className="font-semibold">Subtotal</span><span>${subtotal.toFixed(0)}</span></div>
                <div className="flex justify-between text-sm"><span className="font-semibold">Margin ({marginPct}%)</span><span>${margin.toFixed(0)}</span></div>
                <div className="flex justify-between text-sm"><span className="font-semibold">GST (10%)</span><span>${gst.toFixed(0)}</span></div>
                <div className="flex justify-between text-lg font-black mt-2 pt-2 border-t-2 border-zinc-200"><span>Total</span><span>${total.toFixed(0)}</span></div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <Button size="md">Accept Quote</Button>
              <Button variant="outline" size="md">Ask Question</Button>
            </div>
          </div>

          <p className="mt-4 text-xs text-zinc-500 font-medium">This is a demo. Connect your Stripe account to accept payments in production.</p>
        </div>
      </div>
    </div>
  );
}
