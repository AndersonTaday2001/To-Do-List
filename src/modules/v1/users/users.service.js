import bcrypt from "bcrypt";
import getDatabase from "../../../config/dataBase.js";
import userSchema from "./users.validator.js";
import jwt from "jsonwebtoken";

const db = getDatabase();

const serviceUser = {
  register: async (userData) => {
  
    const { error, value } = userSchema.register.validate(userData);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const { firstName, lastName, email, password } = value;

    const rows = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length > 0) throw new Error("Correo ya en uso");

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)",
      [firstName, lastName, email, hashedPassword]
    );

    return { firstName, lastName, email};
  },
  login: async(loginData) => {

    const { error, value } = userSchema.login.validate(loginData);
    if (error) {
      throw new Error(error.details[0].message);
    }

    const { email, password } = value;

    const rows = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0) throw new Error("Correo no encontrado");

    const user = rows[0];
    const isValidPassword = await bcrypt.compareSync(password, user.password);
    if (!isValidPassword) throw new Error("Contraseña incorrecta");

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;

  },
  logout: () => {
    return "User logged out successfully";
  },
  jwt: (user) => {
    const token = jwt.sign(
      { userId: user.id, firstName: user.firstName, lastName: user.lastName }, 
      process.env.JWT_SECRET, 
      {
        expiresIn: "1h",
      }
    );
    return token;
  },
};

export default serviceUser;
