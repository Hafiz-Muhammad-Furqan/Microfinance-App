import jwt from "jsonwebtoken";

const adminMiddleware = async (req, res, next) => {
  console.log(req.headers.authorization.split(" "));

  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    if (!decoded) {
      return res.status(401).json({ message: "Token is not valid" });
    }
    if (decoded.email === "iamadmin@gmail.com") {
      next();
    } else {
      return res.status(403).json({ message: "Unauthorized" });
    }
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default adminMiddleware;
