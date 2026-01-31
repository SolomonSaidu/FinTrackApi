import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: "No tokens found" });
  const token = header.split(" ")[1];

  try {
    const decoded = jwt.decode(token, process.env.SECRET_KEY);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ error: "Invalid tokens" });
  }
};

export default auth;
