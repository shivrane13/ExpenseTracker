const db = require("../data/database");

class Income {
  constructor(IncomeData) {
    this.id = IncomeData.id;
    this.title = IncomeData.title;
    this.amount = IncomeData.amount;
    this.type = "income";
    this.date = IncomeData.date;
    this.category = IncomeData.category;
    this.description = IncomeData.description;
  }

  static async findById(id) {
    const [data] = await db.query("SELECT * FROM income WHERE id = ?", id);
    const income = new Income(data[0]);
    return income;
  }

  static async getIncome(userId) {
    const [data] = await db.query(
      "select * from income WHERE userId = ? ORDER BY id DESC",
      userId
    );
    return data.map((income) => {
      return new Income(income);
    });
  }

  async save(userId) {
    const data = [
      this.title,
      this.amount,
      this.type,
      this.category,
      this.description,
      userId,
    ];

    try {
      if (!this.id) {
        const [res] = await db.query(
          "insert into income(title, amount, type, category, description, userId) values (?)",
          [data]
        );
        return res.insertId;
      } else {
        console.log("update  called");
        await db.query(
          "update income set title = ? , amount = ?, type = ?, date = ?, category = ? , description = ?, userId = ? where id = ?",
          [...IncomeData, this.id]
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  async delete() {
    try {
      await db.query("delete from income where id = ?", this.id);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Income;
