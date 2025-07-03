import bcrypt from "bcrypt";
import getDatabase from "../../../config/dataBase.js";

const serviceUser = {
  register: async ({ firstName, lastName, email, password }) => {
    const db = getDatabase();

    const existing = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (existing.length > 0) throw new Error("User existing");

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)",
      [firstName, lastName, email, hashedPassword]
    );
    return { firstName, lastName, email, password };
  },
  login: () => {},
  logout: () => {},
  delete: () => {},
};

export default serviceUser;
