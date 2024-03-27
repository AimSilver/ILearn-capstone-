// adminMiddleware.ts
const adminMid = (req: any, res: any, next: any) => {
  const userRole = req.user?.role; // Assuming your user model has a 'role' property

  if (userRole === "admin") {
    return next(); // User is an admin, proceed to the next middleware
  } else {
    res
      .status(403)
      .json({ error: "Access denied. Admin privileges required." });
  }
};

export default adminMid;
