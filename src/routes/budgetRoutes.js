import express from "express";
import {
  addBudgets,
  getBudgets,
  getBudgetReports,
  deleteBudgets,
} from "../controller/budgetController.js";
import { getReport } from "../controller/reportController.js";
import auth from "../middleware/authMiddleware.js";

const routes = express.Router();

routes.post("/", auth, addBudgets);
routes.get("/", auth, getBudgets);
routes.get("/reports", auth, getBudgetReports);
routes.delete("/delete/:id", auth, deleteBudgets);

export default routes;
