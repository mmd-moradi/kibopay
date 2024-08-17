import { balancesTable, db, onRampTransactionsTable } from "@repo/db";
import { eq, sql } from "drizzle-orm";
import express from "express";

const app = express();
app.use(express.json());

app.post("/nubankWebhook", async(req, res) => {
  //TODO: Implement webhook handler
  const {token, user_identifier, amount} = req.body;
  const paymentInformation: {
    token: string;
    userId: string;
    amount: number;
  
  } = {
    token,
    userId: user_identifier,
    amount: Number(amount)
  }
  try {
      await db.transaction(async(tx) => {
        const onRampTransactionResults = await tx.select().from(onRampTransactionsTable).where(eq(onRampTransactionsTable.token, paymentInformation.token));
        const onRampTransaction = onRampTransactionResults[0];
        if (!onRampTransaction) {
          throw new Error("Transaction not found");
        }
        if (onRampTransaction.status !== "Processing") {
          throw new Error("Transaction already processed");
        }
        await tx.update(balancesTable).set({amount: sql`${balancesTable.amount} + ${paymentInformation.amount}`}).where(eq(balancesTable.userId, Number(paymentInformation.userId)));
        await tx.update(onRampTransactionsTable).set({status: "Success"}).where(eq(onRampTransactionsTable.token, paymentInformation.token));
        res.json({message: "Captured payment"});
      })
  } catch (error) {
    console.error(error);
    res.status(411).json({message: "Failed to capture payment"});
  }
})

app.listen(3000, () => {
  console.log("Server started at 3000");
})