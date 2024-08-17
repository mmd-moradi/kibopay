"use client"

import { SessionProvider } from "next-auth/react"
import { BalanceProvider } from "./balance"



export function ApplicationProviders({children}: {children: React.ReactNode}) {
  return (
    <SessionProvider>
      <BalanceProvider>
        {children}
      </BalanceProvider>
    </SessionProvider>
  )
}




