import bcrypt from "bcrypt";
import getDatabase from "../../../config/dataBase.js";
import userSchema from "./users.validator.js";

const serviceUser = {
  register: async ({ firstName, lastName, email, password }) => {
    
    const { error } = userSchema.validate({
      firstName,
      lastName,
      email,
      password,
    });
    if (error) throw new Error(error.details[0].message);
    
    const db = getDatabase();

    const existing = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    
    if (existing.length > 0) throw new Error("Correo ya en uso");

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
