import express from "express";
import pool from "../db/postgres.js";
import { createUsers } from "../controller/authController.js";
import { login } from "../controller/authController.js";
import { profile } from "../controller/authController.js";
import auth from "../middleware/authMiddleware.js";

const routes = express.Router();

// Routes //

routes.post("/register", createUsers);

routes.post("/login", login);

routes.get("/me", auth, profile);

export default routes;
