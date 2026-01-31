import Pool from "../db/postgres.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUsers = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await Pool.query(
      `INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email`,
      [name, email, passwordHash]
    );

    res.status(201).send({ status: "Successful...", user: newUser.rows[0] });
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
    console.log(error.message);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await Pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);
    if (result.rows.length === 0)
      return res.status(401).json({ error: "Invalid credentials" });

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const profile = async (req, res) => {
  const { userId } = req;
  try {
    const result = await Pool.query(
      `SELECT name, email FROM users WHERE id = $1`,
      [userId]
    );
    if (result.rows.length === 0)
      return res.status(401).json({ error: "User dose not exist" });
    res.status(200).json({ status: "succesful", result: result.rows[0] });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};
