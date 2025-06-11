const logWrites = (req, res, next) => {
  const method = req.method;

  if (["POST", "PUT", "DELETE"].includes(method)) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${method} ${req.originalUrl}`);
    console.log("Body:", req.body);
    console.log("User (if any):", req.user || "Unauthenticated");
  }

  next();
};

export default logWrites;
