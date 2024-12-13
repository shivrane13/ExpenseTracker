const express = require("express");
const router = express.Router();

const expenseController = require("../controllers/expence.controller");

router.get("/getexpense", expenseController.getAllExpenses);
router.post("/addexpense", expenseController.addExpense);

router.get("/getexpense/:id", expenseController.getExpenseById);
router.post("/deleteexpense/:id", expenseController.deleteExpense);

module.exports = router;
