const db = require("../data/database");

class User {
  constructor(userData) {
    (this.username = userData.username),
      (this.email = userData.email),
      (this.password = userData.password);
  }

  async save() {
    const data = [this.username, this.email, this.password];
    try {
      await db.query(
        "INSERT INTO user (username, email, password) VALUES (?)",
        [data]
      );
    } catch (error) {
      console.log(error);
    }
  }

  static async findUser(username, password) {
    try {
      const [res] = await db.query(
        "SELECT * FROM user WHERE username = ? AND password = ?",
        [username, password]
      );
      return res[0];
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = User;
