"use client";

import { useState, useMemo } from "react";
import { formatINR } from "@/lib/formatINR";

export function PropertyDetailClient({ price }: { price: number }) {
  const defaultLoan = Math.round(price * 0.8);
  const [loanAmount, setLoanAmount] = useState(defaultLoan);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const { emi, totalInterest, totalAmount } = useMemo(() => {
    const p = loanAmount;
    const r = rate / 12 / 100;
    const n = tenure * 12;
    if (r === 0) return { emi: p / n, totalInterest: 0, totalAmount: p };
    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalAmount = emi * n;
    const totalInterest = totalAmount - p;
    return { emi, totalInterest, totalAmount };
  }, [loanAmount, rate, tenure]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">EMI Calculator</h2>
      <div className="bg-card rounded-2xl border border-border/50 p-6 space-y-6">
        {/* Loan Amount */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium">Loan Amount</label>
            <span className="text-sm font-semibold text-accent">
              {formatINR(loanAmount)}
            </span>
          </div>
          <input
            type="range"
            min={100000}
            max={price}
            step={50000}
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="w-full accent-accent"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>₹1 Lakh</span>
            <span>{formatINR(price)}</span>
          </div>
        </div>

        {/* Rate + Tenure inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium block mb-2">
              Interest Rate (% p.a.)
            </label>
            <input
              type="number"
              min={1}
              max={20}
              step={0.1}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full bg-muted/50 border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
            />
          </div>
          <div>
            <label className="text-sm font-medium block mb-2">
              Loan Tenure (Years)
            </label>
            <input
              type="number"
              min={1}
              max={30}
              step={1}
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="w-full bg-muted/50 border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
            />
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Loan Amount", value: formatINR(loanAmount) },
            {
              label: "Monthly EMI",
              value: formatINR(Math.round(emi)),
              highlight: true,
            },
            { label: "Total Interest", value: formatINR(Math.round(totalInterest)) },
            { label: "Total Amount", value: formatINR(Math.round(totalAmount)) },
          ].map((item) => (
            <div
              key={item.label}
              className={`rounded-xl p-4 ${item.highlight ? "bg-accent/10 border border-accent/20" : "bg-muted/40"}`}
            >
              <div className="text-xs text-muted-foreground mb-1">
                {item.label}
              </div>
              <div
                className={`font-bold text-base ${item.highlight ? "text-accent" : "text-foreground"}`}
              >
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
