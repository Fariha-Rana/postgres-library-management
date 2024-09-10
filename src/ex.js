// Middleware example
function authorizeRole(requiredRole) {
  return (req, res, next) => {
    const user = req.user; // Assume user is set in authentication middleware
    if (user.role_id === requiredRole) {
      next();
    } else {
      res.status(403).send("Forbidden");
    }
  };
}

// Example usage
app.get("/admin", authenticateJWT, authorizeRole("admin"), (req, res) => {
  res.send("Welcome Admin");
});
