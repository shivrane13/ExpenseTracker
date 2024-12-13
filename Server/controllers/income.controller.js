const Income = require("../models/income.model");

async function getAllIncome(req, res) {
  try {
    const userId = req.session.user.id;

    const income = await Income.getIncome(userId);
    return res.json(income);
  } catch (error) {
    console.log(error);
  }
}

async function addIncome(req, res) {
  try {
    const income = new Income(req.body);
    const userId = req.session.user.id;

    const id = await income.save(userId);
    return res.json({ ...income, id: id });
  } catch (error) {
    console.log(error);
  }
}

async function updateIncome(req, res) {
  const id = req.params.id;
  try {
    const userId = req.session.user.id;

    const income = new Income({ ...req.body, id });
    await income.save(userId);
    console.log("update");
  } catch (error) {
    console.log(error);
  }
}

async function deleteIncome(req, res) {
  try {
    const id = req.params.id;
    const income = await Income.findById(id);
    await income.delete();
    console.log("deleted");
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllIncome: getAllIncome,
  addIncome: addIncome,
  updateIncome: updateIncome,
  deleteIncome: deleteIncome,
};
