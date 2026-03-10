"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"

export default function Login() {
  const [isLoading, setIsLoading] = useState<"google" | "credentials" | null>(null)

  async function handleGoogle() {
    setIsLoading("google")
    await signIn("google", { callbackUrl: "/" })
    setIsLoading(null)
  }

  async function handleCredentials() {
    setIsLoading("credentials")
    await signIn("credentials", {
      email: "test@test.com",
      password: "123456",
      callbackUrl: "/"
    })
    setIsLoading(null)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4"
      style={{ fontFamily: "'Georgia', serif" }}>

      {/* Ambient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)" }} />
      </div>

      <div className="relative w-full max-w-sm">

        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/5 border border-white/10 mb-6">
            <svg className="w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-normal text-white/90 tracking-wide mb-1">
            Welcome back
          </h1>
          <p className="text-sm text-white/30 tracking-wider uppercase" style={{ fontFamily: "monospace" }}>
            Sign in to continue
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 space-y-3 backdrop-blur-sm">

          {/* Google Button */}
          <button
            onClick={handleGoogle}
            disabled={isLoading !== null}
            className="w-full flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white/80 transition-all duration-200 hover:bg-white/10 hover:border-white/20 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isLoading === "google" ? (
              <svg className="w-4 h-4 animate-spin text-white/50" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            )}
            <span style={{ fontFamily: "monospace", letterSpacing: "0.05em" }}>
              {isLoading === "google" ? "Signing in..." : "Continue with Google"}
            </span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 py-1">
            <div className="flex-1 h-px bg-white/[0.06]" />
            <span className="text-[11px] text-white/20 uppercase tracking-widest" style={{ fontFamily: "monospace" }}>or</span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>

          {/* Credentials Button */}
          <button
            onClick={handleCredentials}
            disabled={isLoading !== null}
            className="w-full flex items-center justify-center gap-3 rounded-xl bg-white px-4 py-3.5 text-sm font-medium text-zinc-900 transition-all duration-200 hover:bg-zinc-100 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isLoading === "credentials" ? (
              <svg className="w-4 h-4 animate-spin text-zinc-400" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            )}
            <span style={{ fontFamily: "monospace", letterSpacing: "0.05em" }}>
              {isLoading === "credentials" ? "Signing in..." : "Sign in with Email"}
            </span>
          </button>

        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-[11px] text-white/20 tracking-wider uppercase" style={{ fontFamily: "monospace" }}>
          Secured by NextAuth
        </p>

      </div>
    </div>
  )
}