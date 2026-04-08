import jwt from "jsonwebtoken";

export function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

export function authenticate(req, res, next) {
  try {
    const authorization = req.headers.authorization || "";
    const [scheme, token] = authorization.split(" ");

    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = verifyToken(token);
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
}
