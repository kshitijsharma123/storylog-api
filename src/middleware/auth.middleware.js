import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.AccessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token)
      return res.status(401).json(new ApiResponse(401, "No Cookie Present"));

    // const { _id } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

   

    // sending user in request Object
    req.user = user;
    next();
  } catch (error) {
  
  }
});
