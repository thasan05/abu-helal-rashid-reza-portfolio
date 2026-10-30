"use client";

import React, { useActionState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { loginAction } from "../actions";
import { ShieldCheck, Lock, User, ArrowRight, AlertCircle } from "lucide-react";

function LoginForm() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/admin";
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className="min-h-screen bg-[#070C14] text-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative selection:bg-[#B79A63] selection:text-[#070C14]">
      {/* Background architectural grid texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#14223610_1px,transparent_1px),linear-gradient(to_bottom,#14223610_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        {/* Monograph brand header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-[#142236] border border-white/10 text-xs font-semibold tracking-[0.14em] uppercase text-[#CBB077] mb-4">
            <ShieldCheck className="w-4 h-4 text-[#B79A63]" />
            <span>Executive CMS Console</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-white tracking-tight">
            Abu Helal Rashid Reza
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-400 font-light">
            Architectural Portfolio Content Management &amp; Administrative Headquarters
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#0B121E] border border-white/15 rounded-xl p-6 sm:p-8 shadow-2xl">
          {state?.error && (
            <div className="mb-6 p-3.5 rounded-[4px] bg-red-950/40 border border-red-500/30 text-red-200 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{state.error}</span>
            </div>
          )}

          <form action={formAction} className="space-y-5">
            <input type="hidden" name="redirectTo" value={redirectTo} />

            <div>
              <label
                htmlFor="username"
                className="block text-xs uppercase tracking-[0.1em] font-medium text-slate-300 mb-2"
              >
                Administrative Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-slate-500" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  autoComplete="username"
                  placeholder="admin"
                  defaultValue="admin"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#070C14] border border-white/15 rounded-[4px] text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#B79A63] transition-colors"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs uppercase tracking-[0.1em] font-medium text-slate-300 mb-2"
              >
                Security Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-slate-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#070C14] border border-white/15 rounded-[4px] text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#B79A63] transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full mt-2 flex items-center justify-center gap-2 py-3 px-4 rounded-[4px] bg-[#B79A63] hover:bg-[#CBB077] text-[#070C14] font-semibold text-xs uppercase tracking-wider transition-colors disabled:opacity-50 min-h-[44px]"
            >
              <span>{isPending ? "Authenticating..." : "Authorize Access"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-[11px] text-slate-500 font-light">
              Restricted Area &bull; End-to-end encrypted session &bull; Unauthorized attempts logged
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#070C14] flex items-center justify-center text-slate-400">Loading console...</div>}>
      <LoginForm />
    </Suspense>
  );
}
