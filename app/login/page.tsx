"use client"

import { signIn } from "next-auth/react"

export default function Login(){

  return (

    <div>

      <button onClick={() => signIn("google"  ,{ callbackUrl: "/" })}>
        Login with Google
      </button>

      <button onClick={() => signIn("credentials",{
        email:"test@test.com",
        password:"123456"
      })}>
        Login
      </button>

    </div>

  )
}