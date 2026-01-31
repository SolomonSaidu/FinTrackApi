import express from "express";
import {
  addCategories,
  getCategories,
} from "../controller/categoryController.js";

const routes = express.Router();

routes.post("/", addCategories);
routes.get("/", getCategories);

export default routes;
