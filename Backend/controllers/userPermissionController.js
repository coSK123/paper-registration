import User from "../model/user.js";

export const getRoleOfUser = async (req) => {
  if (!req?.cookies?.jwt) return "Access Denied";
  
  const refreshToken = req.cookies.jwt;
  
  try {
    const foundUser = await User.findOne({ where: { refreshToken } });
    
    if (!foundUser) return "Access Denied";

    return foundUser.role;
  } catch (err) {
    return "Access Denied";
  }
};

export default getRoleOfUser;