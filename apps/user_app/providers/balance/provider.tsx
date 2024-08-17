"use client";

import { createContext, useState } from "react";
import { BalanceContextType } from "./type";




export const balanceContext = createContext<BalanceContextType | undefined>(undefined);

export function BalanceProvider({ children }: { children: React.ReactNode}) {
  const [balance, setBalance] = useState<number>(0);

  return (
    <balanceContext.Provider value={{
      balance,
      setBalance
    }}>
      {children}
    </balanceContext.Provider>
  )
}











