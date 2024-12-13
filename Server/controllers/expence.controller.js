const { json } = require("express");
const Expense = require("../models/expence.model");

async function getAllExpenses(req, res) {
  try {
    const userId = req.session.user.id;
    const expences = await Expense.getExpense(userId);
    res.json(expences);
  } catch (error) {
    console.log(error);
  }
}

async function addExpense(req, res) {
  try {
    const expence = new Expense(req.body);
    const userId = req.session.user.id;

    const id = await expence.save(userId);
    res.json({ ...expence, id: id });
  } catch (error) {
    console.log(error);
  }
}

async function updateExpenseData(req, res) {
  try {
    const id = req.params.id;
    const userId = req.session.user.id;

    const expence = new Expense({
      ...req.body,
      id,
    });

    await expence.save(userId);
  } catch (error) {
    console.log(error);
  }
}

async function getExpenseById(req, res) {
  const id = req.params.id;
  const expence = await Expense.findById(id);

  return res.json(expence);
}

async function deleteExpense(req, res) {
  const id = req.params.id;
  const expence = await Expense.findById(id);
  expence.deleteExpense();
  res.json({
    result: true,
  });
}

module.exports = {
  getAllExpenses: getAllExpenses,
  addExpense: addExpense,
  updateExpenseData: updateExpenseData,
  getExpenseById: getExpenseById,
  deleteExpense: deleteExpense,
};
