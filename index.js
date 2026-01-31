import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("api", (req, res) => {
  res.send("api works");
});

app.listen(PORT, () => {
  console.log("server Running...", PORT);
});
