import express from "express";
import cors from "cors";
import fs from "fs/promises";
import { expense, ExpensesType } from "../../common/types/expense";
/* import { z } from "zod"; */

const server = express();

server.use(cors());
server.use(express.json());

const loadDB = async (filename: string) => {
  try {
    const rawData = await fs.readFile(
      `${__dirname}/../../../database/${filename}.json`,
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
      `${__dirname}/../../../database/${filename}.json`,
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
  const decodedID = decodeURIComponent(req.params.id);
  const id = decodedID;
  const allExpenses = await loadDB("data");
  if (!allExpenses) return res.sendStatus(500);
  const selectedItem = allExpenses.find((expense) => expense.id === id);
  const isSuccessful = await saveDB(
    "data",
    allExpenses.filter((expense) => expense.id !== id)
  );
  if (!isSuccessful) return res.sendStatus(500);
  res.json(selectedItem);
});

server.get("/api/allExpenseData", async (req, res) => {
  const allExpenseData = await loadDB("data");
  if (!allExpenseData) return res.sendStatus(500);
  res.json(allExpenseData);
  console.log("getapiteszt2");
});

server.patch("/api/modifyExpense/:id", async (req, res) => {
  const decodedID = decodeURIComponent(req.params.id);
  const id = decodedID;
  const result = expense.safeParse(req.body);
  if (!result.success) return res.status(400).json(result.error.issues);
  const newData = result.data;
  const allExpenseData = await loadDB("data");
  if (!allExpenseData) return res.sendStatus(500);
  const isSuccessful = await saveDB(
    "data",
    allExpenseData.map((theExpense) =>
      theExpense.id !== id ? theExpense : { ...newData, id }
    )
  );
  if (!isSuccessful) return res.sendStatus(500);
  res.json(newData);
});

server.listen(5000);
