"use client";

import { newOnrampTransaction } from "@/actions/new-transfer";
import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";

import { Input } from "@repo/ui/components/ui/input";
import { Label } from "@repo/ui/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import { useCallback, useState } from "react";


const SUPPORTED_BANKS = [{
    name: "Nubank",
    redirectUrl: "https://nubank.com.br/"
  }, {
    name: "Banco do Brasil",
    redirectUrl: "https://www.bb.com.br/"
  },

];

const AddMoney = () => {
  const [provider, setProvider] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  console.log(provider, "provider");
  const addMoneyFn = useCallback(async() => {
    await newOnrampTransaction({amount, provider})
    const bank = SUPPORTED_BANKS.find((bank) => bank.name === provider);
    if(bank){
      window.location.href = bank.redirectUrl;
    }
  }, [amount, provider])
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Money</CardTitle>
        <CardDescription>in order to add money to your account write the amount then select you bank and click "Add money"</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full flex flex-col items-start gap-4">
          <div className="w-full flex flex-col gap-2">
            <Label htmlFor="amount">
              Amount
            </Label>
            <Input placeholder="Amount" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
          </div>
          <div className=" w-full flex flex-col gap-2">
            <Label htmlFor="bank">
              Bank
            </Label>
            <Select onValueChange={setProvider} defaultValue={provider}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {SUPPORTED_BANKS.map((bank) => (
                  <SelectItem key={bank.name} value={bank.name}>{bank.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button className="self-center px-8" onClick={addMoneyFn}>
            Add Money
          </Button>
      </div>
      </CardContent>
    </Card>
  )
}

export default AddMoney