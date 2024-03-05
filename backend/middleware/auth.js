const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.isAuthenticated = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send({ message: "Please login to continue" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).send({ message: "Unauthorized" });
  }
};

// exports.isAdmin = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return next(
//         res.status(403).send(`${req.user.role} can not access this resources!`)
//       );
//     }
//     next();
//   };
// };