import express from "express";
import db from "./db/postgres.js";
import authRoutes from "./routes/authRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import categoriesRoutes from "./routes/categoryRoutes.js";
import budgetRoutes from "./routes/budgetRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import env from "dotenv";
env.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes //
app.use("/api", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api", reportRoutes);

app.get("/", (req, res) => {
  res.send("Server 3000 Active");
});

app.listen(PORT, () => {
  console.log("Server Running on port:", PORT);
});
