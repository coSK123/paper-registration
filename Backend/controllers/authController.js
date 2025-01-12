import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/user.js';
import dotenv from 'dotenv';

dotenv.config();

export const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ 'message': 'Email and Password are required' });

  try {
    const foundUser = await User.findOne({ where: { email: email } });
    if (!foundUser) return res.sendStatus(401);

    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
      const accessToken = jwt.sign(
        { "email": foundUser.email, "role": foundUser.role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '30m' }
      );
      const refreshToken = jwt.sign(
        { "email": foundUser.email },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
      );

      foundUser.refreshToken = refreshToken;
      await foundUser.save();
      console.log('User: ', foundUser);
      res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
      res.json({ accessToken });
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    res.status(500).json({ 'message': err.message });
  }
};