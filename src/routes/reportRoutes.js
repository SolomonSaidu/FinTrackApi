import express from "express";
import { getReport } from "../controller/reportController.js";
import auth from "../middleware/authMiddleware.js";

const routes = express.Router();

routes.get("/reports/monthly", auth, getReport);

export default routes;
