import express from "express";
import cors from "cors";
import fs from "fs/promises";
import { expense, ExpensesType } from "../../common/types/expense";
import { z } from "zod";

const server = express();

server.use(cors());
server.use(express.json());

const loadDB = async (filename: string) => {
  try {
    const rawData = await fs.readFile(
      `${__dirname}/../database/${filename}.json`,
      "utf-8"
    );
    const data = JSON.parse(rawData);
    return data as ExpensesType[];
  } catch (error) {
    return null;
  }
};

const saveDB = async (filename: string, data: ExpensesType[]) => {
  try {
    const fileContent = JSON.stringify(data);
    await fs.writeFile(
      `${__dirname}/../database/${filename}.json`,
      fileContent
    );
    return true;
  } catch (error) {
    return false;
  }
};

server.post("/api/expenseData", async (req, res) => {
  const result = expense.safeParse(req.body);
  if (!result.success) return res.status(400).json(result.error);
  const newExpense = result.data;
  console.log(newExpense);
  const allExpenses = await loadDB("data");
  if (!allExpenses) return res.sendStatus(500);
  const isSuccessful = await saveDB("data", [...allExpenses, newExpense]);
  if (!isSuccessful) return res.sendStatus(500);
  res.json(newExpense);
});

server.delete("/api/expenseData/:id", async (req, res) => {
  console.log("adat");
  const result = z.string().safeParse(req.params.id);
  console.log(result);
  if (!result.success) return res.status(400).json(result.error.issues);
  const id = result.data;
  console.log(id);
  const allExpenses = await loadDB("data");
  console.log(allExpenses);

  if (!allExpenses) return res.sendStatus(500);
  const selectedItem = allExpenses.find((expense) => expense.id === id);
  const isSuccessful = await saveDB(
    "data",
    allExpenses.filter((expense) => expense.id !== id)
  );
  if (!isSuccessful) return res.sendStatus(500);
  res.json(selectedItem);
});

server.listen(5000);
