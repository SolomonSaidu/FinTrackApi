import Pool from "../db/postgres.js";

export const addTransactions = async (req, res) => {
  const { amount, type, category, note } = req.body;
  const user_id = req.userId;

  try {
    const result = await Pool.query(
      `INSERT INTO transactions (user_id, amount, type, category, note) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [user_id, amount, type, category, note]
    );
    res.status(201).json({ status: "successful", result: result.rows });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: "faild", error: error.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const { userId } = req;
    const { limit, offset } = req.query;

    const query = `SELECT *
                    FROM transactions
                    WHERE user_id = $1
                    ORDER BY created_at DESC
                    LIMIT $2 OFFSET $3;`;

    const result = await Pool.query(query, [userId, limit, offset]);
    res.status(200).json({ status: "successful", result: result.rows });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal server error..." });
  }
};

export const getSummaries = async (req, res) => {
  try {
    const { userId } = req;

    const result = await Pool.query(
      `    SELECT
      SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS total_income,
      SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expense,
      SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END)
      -
      SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS balance
    FROM transactions
    WHERE user_id = $1
   `,
      [userId]
    );

    res.status(200).json({ result: result.rows[0] });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const deleteTransactions = async (req, res) => {
  const { id } = req.params;
  try {
    const query = `DELETE FROM transactions WHERE id = $1 RETURNING *`;

    const result = await Pool.query(query, [id]);
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Transaction not found" });

    res.status(200).json({
      result: `Transaction with id ${result.rows[0].id} has been deleted succsessfully`,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
