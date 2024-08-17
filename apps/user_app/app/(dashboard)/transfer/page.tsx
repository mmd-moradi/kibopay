import AddMoney from "@/components/add-mony-card"
import BalanceCard from "@/components/balance"
import TransactionsCard from "@/components/transactions"
import { authOptions } from "@/lib/auth"
import { balancesTable, db, onRampTransactionsTable, p2pTransfersTable } from "@repo/db"
import { getServerSession } from "next-auth"
import { eq, or } from "drizzle-orm";

async function getBalance():Promise<{amount: number, locked: number}> {
  const session = await getServerSession(authOptions)
  const sessionUserId = (session?.user as {id: string}).id as string;
  const balance = await db.select().from(balancesTable).where(eq(balancesTable.userId, Number(sessionUserId)))
  if(balance.length === 0) {
    return {
      amount: 0,
      locked: 0
    }
  }
  const userBalance = balance[0]!
  return {
    amount: userBalance.amount || 0,
    locked: userBalance.locked || 0
  }

}

async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  const sessionUserId = (session?.user as {id: string}).id as string;
  const transactions = await db.select().from(onRampTransactionsTable).where(eq(onRampTransactionsTable.userId, Number(sessionUserId)))
  if (transactions.length === 0) {
    return []
  }
  return transactions.map((transaction) => ({
    time: transaction.startTime,
    amount: transaction.amount,
    status: transaction.status,
    provider: transaction.provider,
    type: "onRamp" as const,
  }))
}

async function getP2PTransfers() {
  const session = await getServerSession(authOptions);
  const sessionUserId = (session?.user as {id: string}).id as string;
  const transactionsResult = await db.select().from(p2pTransfersTable).where(or(eq(p2pTransfersTable.fromUserId, Number(sessionUserId)), eq(p2pTransfersTable.toUserId, Number(sessionUserId))))
  if (transactionsResult.length === 0) {
    return []
  }
  return transactionsResult.map((transaction) => ({
    time: transaction.timestamp,
    amount: transaction.amount,
    fromUserId: transaction.fromUserId,
    toUserId: transaction.toUserId,
    type: "p2p" as const,
  }))
}

const TransferPage = async () => {
  const balance = await getBalance()
  const transactions = await getOnRampTransactions()
  const p2pTransfers = await getP2PTransfers()
  const session = await getServerSession(authOptions);
  const userId = Number((session?.user as {id: string}).id as string);
  return (
    <div className="w-full flex flex-col gap-4">
      <h1 className="text-primary text-xl font-semibold">
        Transfer
      </h1>
      <div className="grid grid-cols-[1fr_1fr] gap-4">
        <AddMoney />
        <div className="w-full flex flex-col items-start gap-2">
          <BalanceCard amount={balance.amount} locked={balance.locked} />
          <TransactionsCard p2pTransfers={p2pTransfers} onRampTransactions={transactions} userId={userId} />
        </div>
      </div>
    </div>
  )
}

export default TransferPage