"use server";

import { authOptions } from "@/lib/auth";
import { db, onRampTransactionsTable } from "@repo/db";
import { getServerSession } from "next-auth";


export const newOnrampTransaction = async ({amount, provider}:{amount: number, provider: string}) => {
  try {
      const session = await getServerSession(authOptions);
      if(!session || !session.user) {
        return {message: "Unauthorized"}
      }
      const newRamp = await db.insert(onRampTransactionsTable).values({
        userId: Number(((session?.user as {id: string}).id) as string),
        amount,
        provider,
        status: "Processing",
        startTime: new Date(),
        token: (Math.random() * 1e2).toString(),
      }).returning()
    
      return {message: "Done"}
  } catch (error) {
    return {message: "Failed"}
  }
  // Ideally the token should come from the banking provider but we don't have that :)
}
