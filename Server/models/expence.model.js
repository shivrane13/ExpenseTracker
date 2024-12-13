const db = require("../data/database");

class Expense {
  constructor(ExpenseData) {
    this.id = ExpenseData.id;
    (this.title = ExpenseData.title),
      (this.amount = ExpenseData.amount),
      (this.type = "expense"),
      (this.date = ExpenseData.date),
      (this.category = ExpenseData.category),
      (this.description = ExpenseData.description);
  }

  static async findById(id) {
    const [data] = await db.query("SELECT * FROM expense WHERE id = ? ", id);
    const expence = data[0];
    return new Expense(expence);
  }

  static async getExpense(userId) {
    const [data] = await db.query(
      "select * from expense WHERE userId = ? ORDER BY id DESC",
      userId
    );

    return data.map((expence) => {
      return new Expense(expence);
    });
  }

  async save(userId) {
    const expenceData = [
      this.title,
      this.amount,
      this.type,
      this.category,
      this.description,
      userId,
    ];
    if (this.id == null) {
      try {
        const [res] = await db.query(
          "INSERT INTO expense (title, amount, type, category, description, userId) values  (?)",
          [expenceData]
        );
        return res.insertId;
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await db.query(
          "UPDATE expense SET title = ?, amount = ?, type = ? ,date = ?, category = ?, description = ? , userId = ? WHERE id = ?",
          [...expenceData, this.id]
        );
      } catch (error) {
        console.log(error);
      }
    }
  }

  async deleteExpense() {
    try {
      await db.query("DELETE FROM expense WHERE id = ?", this.id);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Expense;
