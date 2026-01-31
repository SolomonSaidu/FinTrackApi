import Pool from "../db/postgres.js";

export const addCategories = async (req, res) => {
  try {
    const { name } = req.body;
    const result = await Pool.query(
      `INSERT INTO categories (name) VALUES ($1) RETURNING *`,
      [name]
    );

    res.status(201).json({ status: "successful", result: result.rows[0] });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getCategories = async (req, res) => {
  try {
    const result = await Pool.query(`SELECT * FROM  categories`);

    res.status(201).json({ result: result.rows });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
