import jwt from "jsonwebtoken";
import User from "../model/user.js";

export const getRoleOfUser = async (req) => {
  const cookies =  req.cookies;
  console.log("Hier sind Kekese:")
  console.log(cookies);
  if (!cookies?.jwt) return "Access Denied";
  const refreshToken = cookies.jwt;
  console.log("Hier ist der Token:")
  console.log(refreshToken);
  await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, decoded) => {
      console.log(decoded)
  })
  try {
    const foundUser = await User.findOne({ where: { refreshToken } });
    console.log(foundUser);
    
    if (!foundUser) return "Access Denied";

    return foundUser.role;
  } catch (err) {
    console.log(err);
    return "Access Denied";
  }
};
