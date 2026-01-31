import express from "express";
import {
  addTransactions,
  getTransactions,
  getSummaries,
  deleteTransactions,
} from "../controller/transactionController.js";
import auth from "../middleware/authMiddleware.js";

const routes = express.Router();

routes.post("/", auth, addTransactions);
routes.get("/", auth, getTransactions);
routes.get("/summaries", auth, getSummaries);
routes.delete("/delete/:id", auth, deleteTransactions);

export default routes;
