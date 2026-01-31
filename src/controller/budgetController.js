import Pool from "../db/postgres.js";

export const addBudgets = async (req, res) => {
  const { category, amount, month, year } = req.body;
  const userId = req.userId;
  try {
    const result = await Pool.query(
      `INSERT INTO budgets (user_id, category, amount, month, year)
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT (user_id, category, month, year)
    DO UPDATE SET amount = EXCLUDED.amount
    RETURNING *`,
      [userId, category, amount, month, year]
    );

    res.status(200).json({ result: result.rows[0] });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getBudgets = async (req, res) => {
  const userId = req.userId;
  try {
    const result = await Pool.query(
      `SELECT * FROM budgets WHERE user_id = $1`,
      [userId]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "No budgets added" });

    res.status(200).json({ result: result.rows });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getBudgetReports = async (req, res) => {
  const userId = req.userId;
  try {
    const query = `SELECT
  b.category,
  b.amount AS budget,
  COALESCE(SUM(t.amount), 0) AS spent,
  b.amount - COALESCE(SUM(t.amount), 0) AS remaining
FROM budgets b
LEFT JOIN transactions t
  ON b.user_id = t.user_id
  AND b.category = t.category
  AND t.type = 'expense'
  AND EXTRACT(MONTH FROM t.created_at) = b.month
  AND EXTRACT(YEAR FROM t.created_at) = b.year
WHERE b.user_id = $1
GROUP BY b.category, b.amount;`;

    const result = await Pool.query(query, [userId]);
    res.status(200).json({ result: result.rows });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteBudgets = async (req, res) => {
  const { id } = req.params;
  try {
    const query = `DELETE FROM budgets WHERE id = $1 RETURNING *`;

    const result = await Pool.query(query, [id]);

    if (result.rows.length === 0)
      return res.status(404).json({ error: "Budget not found" });

    res
      .status(201)
      .json({
        result: `Budget with Id ${result.rows} has been deleted successfully`,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
