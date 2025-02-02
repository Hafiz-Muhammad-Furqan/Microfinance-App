import jwt from "jsonwebtoken";

const adminMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    l;
    if (!decoded) {
      return res.status(401).json({ message: "Token is not valid" });
    }
    if (decoded.email === process.env.Email) {
      next();
    } else {
      return res.status(403).json({ message: "Unauthorized" });
    }
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default adminMiddleware;
