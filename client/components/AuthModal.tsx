"use client";

import { useState } from "react";

interface AuthModalProps {
  onSuccess?: () => void;
  onClose?: () => void;
  canClose?: boolean;
}

export default function AuthModal({ onSuccess, onClose, canClose = true }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const url = isLogin
      ? "http://localhost:5000/api/auth/login"
      : "http://localhost:5000/api/auth/register";

    const payload = isLogin
      ? { email, password }
      : { name, email, password, role: "PATIENT" };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (json.success) {
        // Save token & user
        localStorage.setItem("aura_patient_token", json.data.token);
        localStorage.setItem("aura_patient_user", JSON.stringify(json.data.user));

        // Fire dynamic auth event to update header/other components
        window.dispatchEvent(new Event("aura_auth_change"));

        if (onSuccess) onSuccess();
      } else {
        setError(json.message || "Authentication failed. Please check credentials.");
      }
    } catch (err: any) {
      setError(err.message || "A network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Frosted Glass Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity duration-300"
        onClick={() => {
          if (canClose && onClose) onClose();
        }}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-[#0B1F3A]/95 text-white rounded-3xl border border-slate-800 shadow-2xl p-8 z-10 animate-pop-in">
        {/* Close button (conditional) */}
        {canClose && onClose && (
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors p-2 rounded-full hover:bg-slate-800"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        )}

        {/* Brand/Heading */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 text-tertiary mb-3">
            <span className="material-symbols-outlined text-3xl">health_and_safety</span>
          </div>
          <h2 className="text-headline-md font-headline-md font-bold tracking-tight text-white">
            {isLogin ? "Welcome back" : "Create Account"}
          </h2>
          <p className="text-sm text-slate-300 mt-1">
            {isLogin ? "Sign in to access your clinic portal" : "Sign up for concierge scheduling"}
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex bg-slate-900/50 p-1.5 rounded-xl mb-6 border border-slate-800">
          <button
            type="button"
            onClick={() => {
              setIsLogin(true);
              setError(null);
            }}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
              isLogin 
                ? "bg-[#ce3636] text-white shadow" 
                : "text-slate-400 hover:text-white"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setIsLogin(false);
              setError(null);
            }}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
              !isLogin 
                ? "bg-[#ce3636] text-white shadow" 
                : "text-slate-400 hover:text-white"
            }`}
          >
            Register
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-4 bg-red-950/50 border border-red-800 text-red-200 rounded-xl text-xs font-semibold mb-6 flex items-start gap-2 animate-shake">
            <span className="material-symbols-outlined text-[16px] mt-[1px]">error</span>
            <span>{error}</span>
          </div>
        )}

        {/* Authentication Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Full Name</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">person</span>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-900/60 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-[#ce3636] focus:ring-1 focus:ring-[#ce3636] transition-colors"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">Email Address</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">mail</span>
              <input
                type="email"
                required
                placeholder="patient@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-900/60 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-[#ce3636] focus:ring-1 focus:ring-[#ce3636] transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">Password</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">lock</span>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-900/60 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-[#ce3636] focus:ring-1 focus:ring-[#ce3636] transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#ce3636] hover:bg-[#b02c2c] text-white font-semibold rounded-xl text-sm shadow-lg hover:shadow-xl active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer mt-6 disabled:opacity-50"
          >
            {loading ? (
              <span className="animate-spin material-symbols-outlined text-[18px]">sync</span>
            ) : (
              isLogin ? "Sign In" : "Register Account"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
