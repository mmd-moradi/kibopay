import { useContext } from "react";
import { balanceContext } from "./provider";


export function useBalance() {
  const context = useContext(balanceContext);
  if (!context) {
    throw new Error("useBalance must be used within a BalanceProvider");
  }
  return context;
}




