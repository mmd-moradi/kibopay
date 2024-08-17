"use client";
import React, { useCallback, useState } from 'react'
import { Button } from "@repo/ui/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/ui/dialog"
import { Input } from "@repo/ui/components/ui/input"
import { Label } from "@repo/ui/components/ui/label"
import { newP2PTransfer } from "@/actions/new-p2p-transfer";
const P2PCard = () => {
  const [reciverNumber, setReciverNumber] = useState<string>("")
  const [amount, setAmount] = useState<string>("");

  const handleP2PTransfer = useCallback(async () => {
    await newP2PTransfer({reciverNumber, amount: Number(amount)})
    console.log("transfered")
  }, [reciverNumber, amount])
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Send money to another user</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Send Money</DialogTitle>
          <DialogDescription>
            write the user phone number and the amount and click on send.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Number
            </Label>
            <Input
              id="number"
              className="col-span-3"
              placeholder="Enter the phone number"
              value={reciverNumber}
              onChange={(e) => setReciverNumber(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Amount
            </Label>
            <Input
              id="amount"
              placeholder="Enter the amount"
              className="col-span-3"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleP2PTransfer} type="submit">Send</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default P2PCard