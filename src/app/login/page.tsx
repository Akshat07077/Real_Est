"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });

      if (res.ok) {
        router.push("/dashboard");
      } else {
        setError("Invalid PIN. Try '1234'");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 relative">
      <Link
        href="/"
        className="absolute top-8 left-8 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft size={16} /> Back to Site
      </Link>

      <div className="w-full max-w-md p-8 bg-card rounded-3xl shadow-xl border border-border/50 text-center">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Lock size={32} />
        </div>
        <h1 className="font-display text-3xl font-bold mb-2">Broker Login</h1>
        <p className="text-muted-foreground mb-8">
          Enter your access PIN to continue to the portal.
        </p>

        <form onSubmit={handleLogin} className="space-y-6 text-left">
          <div>
            <Input
              type="password"
              placeholder="Enter PIN (1234)"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="h-14 text-center text-xl tracking-widest bg-muted/50 border-none"
              autoFocus
            />
            {error && (
              <p className="text-sm text-destructive mt-2 text-center">
                {error}
              </p>
            )}
          </div>
          <Button
            type="submit"
            size="lg"
            className="w-full h-14 text-lg"
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Access Dashboard"}
          </Button>
        </form>
      </div>
    </div>
  );
}
