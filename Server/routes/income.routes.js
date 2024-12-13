const express = require("express");
const router = express.Router();
const incomeController = require("../controllers/income.controller");

router.get("/getincome", incomeController.getAllIncome);
router.post("/addincome", incomeController.addIncome);

router.post("/updateincome/:id", incomeController.updateIncome);
router.post("/deleteincome/:id", incomeController.deleteIncome);

module.exports = router;
