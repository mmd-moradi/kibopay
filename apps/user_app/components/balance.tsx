"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";

type Props = {
  amount: number;
  locked: number;
} 
const BalanceCard = ({amount, locked}: Props) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Balance</CardTitle>
        <CardDescription>here you can see you account balance.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full flex flex-col items-start">
          <div className="w-full flex items-center justify-between border-b border-slate-300">
            <h3 className="text-base text-black font-medium">
              Unlocked balance
            </h3>
            <span className="text-base text-black font-medium">
              R${amount} 
            </span>
          </div>  
          <div className="w-full flex items-center justify-between border-b border-slate-300">
            <h3 className="text-base text-black font-medium">
              Total Locked Balance
            </h3>
            <span className="text-base text-black font-medium">
              R${locked} 
            </span>
          </div>
          <div className="w-full flex items-center justify-between border-b border-slate-300">
            <h3 className="text-base text-black font-medium">
              Total Balance
            </h3>
            <span className="text-base text-black font-medium">
              R${locked + amount} 
            </span>
          </div>  
        </div>
      </CardContent>
    </Card>
  )
}

export default BalanceCard