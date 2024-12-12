import User from '../model/user.js';


export const handleLogout = async (req, res) => {
  const cookies = req.cookies;
 
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  try {
    const foundUser = await User.findOne({ where: { refreshToken } });
    if (!foundUser) {
        res.clearCookie('jwt', {httpOnly: true, maxAge: 24*60*60*1000});
        return res.sendStatus(204);}

   foundUser.update({refreshToken: null});
   res.clearCookie('jwt', {httpOnly: true, maxAge: 24*60*60*1000}); // in production secure: true
   res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ 'message': err.message });
  }
};

