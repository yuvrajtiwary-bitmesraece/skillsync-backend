const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ msg: 'Unauthorized: No token provided' });

  const token = authHeader.split(' ')[1]; // Bearer token

  if (!token) return res.status(401).json({ msg: 'Unauthorized: Token missing' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // store decoded user data in req.user
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Unauthorized: Invalid token' });
  }
};

module.exports = verifyToken;
