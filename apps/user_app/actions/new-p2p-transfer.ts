"use server";

import { authOptions } from "@/lib/auth";
import { balancesTable, db, p2pTransfersTable, usersTable } from "@repo/db";
import { eq, sql } from "drizzle-orm";
import { getServerSession } from "next-auth";
export const newP2PTransfer = async({amount, reciverNumber}: {reciverNumber: string, amount: number}) => {
  console.log("newP2PTransfer");
  const userSession = await getServerSession(authOptions);
  if(!userSession?.user) {
    return { message: "You need to be logged in to make a transfer" };
  }
  const userId = (userSession.user as {id: string}).id as string;
  try {
    const numberResults = await db.select().from(usersTable).where(eq(usersTable.number, reciverNumber))
    const reciver = numberResults[0];
    if (!reciver) {
      return {message: "Make sure the reciver number is correct"};
    }
    if(reciver.id === Number(userId)) {
      return {message: "You can't transfer to yourself"};
    }

    await db.transaction(async (tx) => {
      const statement = sql`SELECT * FROM users.balance WHERE "user_id" = ${Number(userId)} FOR UPDATE`;
      await tx.execute(statement)
      const userBalanceResults = await tx.select().from(balancesTable).where(eq(balancesTable.userId, Number(userId)));
      const userBalance = userBalanceResults[0];

      if (!userBalance || userBalance.amount < amount) {
        throw new Error("You don't have enough balance to make this transfer");
      }

      const reciverBalanceResults = await tx.select().from(balancesTable).where(eq(balancesTable.userId, reciver.id));
      const reciverBalance = reciverBalanceResults[0];

      if (!reciverBalance) {
        throw new Error("You don't have enough balance to make this transfer");
      }

      await tx.update(balancesTable).set({amount: sql`${userBalance.amount}::numeric - ${amount}::numeric`}).where(eq(balancesTable.userId, Number(userId)));
      await tx.update(balancesTable).set({amount: sql`${reciverBalance.amount}::numeric + ${amount}::numeric`}).where(eq(balancesTable.userId, reciver.id));
      await tx.insert(p2pTransfersTable).values({
        amount,
        fromUserId: Number(userId),
        toUserId: reciver.id,
        timestamp: new Date(),
      })
    })
    return {message: "Transferred successfully"};
  } catch (e) {
    return {message: "somthing went wrong, please try again later", error: String(e)};
  }

}


