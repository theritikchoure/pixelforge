const checkAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).send("Invalid token.");
      }
      // Attach user info to the request
      req.user = user;
      next();
    });
  } else {
    // No token, user is unauthenticated
    req.user = null;
    next();
  }
};


module.exports = checkAuth;