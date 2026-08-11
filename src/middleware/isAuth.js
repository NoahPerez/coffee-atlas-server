import jwt from "jsonwebtoken"

export default function isAuth(req, res, next) {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer" &&
      req.headers.authorization.split(" ")[1]
    ) {
      const token = req.headers.authorization.split(" ")[1]
      const payload = jwt.verify(token, process.env.JWT_SECRET)

      req.user = payload
      next()
    } else {
      res.status(401).json({ message: "Invalid token" })
    }
  } catch (error) {
    if (
      error?.name === "TokenExpiredError" ||
      error?.name === "JsonWebTokenError"
    ) {
      return res.status(401).json({ message: "Invalid token" })
    }
    next(error)
  }
}
