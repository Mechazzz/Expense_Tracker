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
  if (!result.success)
    return res.status(400).json("Error: Data has been not received correctly");
  const newExpense = result.data;
  const allExpenses = await loadDB("data");
  if (!allExpenses)
    return res.status(400).json("Error: No valid previously saved data");
  const isSuccessful = await saveDB("data", [...allExpenses, newExpense]);
  if (!isSuccessful)
    return res.status(500).json("Error: New data has been not saved");
  res.json(newExpense);
});

server.delete("/api/expenseData/:id", async (req, res) => {
  const decodedID = decodeURIComponent(req.params.id);
  const id = decodedID;
  const allExpenses = await loadDB("data");
  if (!allExpenses)
    return res.status(500).json("Error: No valid previously saved data");
  const selectedItem = allExpenses.find((expense) => expense.id === id);
  const isSuccessful = await saveDB(
    "data",
    allExpenses.filter((expense) => expense.id !== id)
  );
  if (!isSuccessful)
    return res.status(500).json("Error: Data has been not deleted");
  res.json(selectedItem);
});

server.get("/api/allExpenseData", async (req, res) => {
  const allExpenseData = await loadDB("data");
  if (!allExpenseData)
    return res.status(500).json("No valid previously saved data");
  res.json(allExpenseData);
});

server.patch("/api/modifyExpense/:id", async (req, res) => {
  const decodedID = decodeURIComponent(req.params.id);
  const id = decodedID;
  const result = expense.safeParse(req.body);
  if (!result.success)
    return res.status(400).json("Error: Data has been not received correctly");
  const newData = result.data;
  const allExpenseData = await loadDB("data");
  if (!allExpenseData)
    return res.status(500).json("Error: No valid previously saved data");
  const isSuccessful = await saveDB(
    "data",
    allExpenseData.map((theExpense) =>
      theExpense.id !== id ? theExpense : { ...newData, id }
    )
  );
  if (!isSuccessful)
    return res.status(500).json("Error: New data has been not saved");
  res.json(newData);
});

server.listen(5000);
