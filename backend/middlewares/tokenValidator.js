const jwt = require("jsonwebtoken");
const tokenValidator = (req, res, next) => {
  const header = req.headers.Authorization || req.headers.authorization;
  console.log(header);

  if (!header) {
    return res.status(401).json({ message: "Access Denied" });
  }
  const token = header.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRETKEY, (err, decoded) => {
    if (err) {
      next(new Error("Invalid Token"));
    } else {
      req.userId = decoded.id;
      next();
    }
  });
};

module.exports = tokenValidator;
