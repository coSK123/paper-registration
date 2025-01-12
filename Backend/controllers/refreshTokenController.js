import jwt from 'jsonwebtoken';
import User from '../model/user.js';
import dotenv from 'dotenv';

dotenv.config();

export const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  try {
    const foundUser = await User.findOne({ where: { refreshToken } });
    if (!foundUser) return res.sendStatus(403);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err || foundUser.email !== decoded.email) return res.sendStatus(403);

      const accessToken = jwt.sign(
        { "email": foundUser.email, "role": foundUser.role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
      );

      res.json({ accessToken });
    });
  } catch (err) {
    res.status(500).json({ 'message': err.message });
  }
};