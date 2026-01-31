import query from "pg/lib/native/query";
import Pool from "../db/postgres.js";

export const getReport = async (req, res) => {
  const { month, year } = req.query;
  const userId = req.userId;
  try {
    const query = `SELECT
category,
SUM(amount) AS total_spent
FROM transactions
WHERE
user_id = $1
AND type = 'expense'
AND EXTRACT(MONTH FROM created_at) = $2
AND EXTRACT(YEAR FROM created_at) = $3
GROUP BY category;`;

    const result = await Pool.query(query, [userId, month, year]);
    res.status(200).json({ result: result.rows });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server error" });
  }
};
