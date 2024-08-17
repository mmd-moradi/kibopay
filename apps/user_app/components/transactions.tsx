"use client";
import React from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { OnRampStatusType, OnRampTransactionsTable, P2PTransfersTable } from "@repo/db";
import { ScrollArea } from "@repo/ui/components/ui/scroll-area"
import { useSession } from "next-auth/react";


export type OnRamp = {time: Date, amount: number, status: OnRampStatusType, provider: string, type: "onRamp"}[]
export type P2P = {time: Date, amount: number, fromUserId: number, toUserId: number, type: "p2p"}[]
type Props = {
  onRampTransactions: OnRamp,
  p2pTransfers: P2P,
  userId: number
}
const TransactionsCard = ({onRampTransactions, p2pTransfers, userId}: Props) => {
  const transactions = [...onRampTransactions, ...p2pTransfers].sort((a, b) => b.time.getTime() - a.time.getTime())
  if ( transactions.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Recent Trasactions</CardTitle>
          <CardDescription>here you can see all your transactions.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full flex items-center justify-center">
            <h3 className="text-base text-black font-medium">
              No transactions yet
            </h3>
          </div>
        </CardContent>
      </Card>
    )
  }
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Recent Trasactions</CardTitle>
        <CardDescription>here you can see all your transactions.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="w-full h-20 pr-4">
          <div className="w-full flex flex-col items-start pt-2">
            {transactions.map((transaction, index) => (
              transaction.type === "onRamp" ? (
                <div key={`${transaction.time} ${transaction.status}`} className="w-full flex items-center justify-between">
                  <div className="flex flex-col items-center gap-1">
                    <h3 className="text-sm">
                    Received BRL
                    </h3>
                    <span className="text-xs text-slate-600 font-medium">
                      {transaction.time.toDateString()}
                    </span>
                  </div>
                  <span className="text-sm text-black font-medium">
                    + R$ {transaction.amount}
                  </span>
                </div>
              ):(
                <div key={`${transaction.time} ${transaction.toUserId}`} className="w-full flex items-center justify-between">
                  <div className="flex flex-col items-start gap-1">
                    <h3 className="text-sm">
                    {transaction.toUserId === userId ? "Received BRL" : "Sent BRL"}
                    </h3>
                    <span className="text-xs text-slate-600 font-medium">
                      {transaction.time.toDateString()}
                    </span>
                  </div>
                  <span className="text-sm text-black font-medium">
                    {transaction.toUserId === userId ? "+": "-"} R$ {transaction.amount}
                  </span>
              </div>
            )))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card> 
  )
}

export default TransactionsCard