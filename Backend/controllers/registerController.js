import bcrypt from 'bcrypt';
import User from '../model/user.js';

export const handleNewUser = async (req, res) => {
  const { user, password } = req.body;
  if (!user || !password) return res.status(400).json({ 'message': 'Username and Password are required' });

  try {
    const duplicate = await User.findOne({ where: { username: user } });
    if (duplicate) return res.sendStatus(409);

    const hashedPwd = await bcrypt.hash(password, 10);
    await User.create({ username: user, password: hashedPwd });

    res.status(201).json({ 'success': `New user ${user} created!` });
  } catch (err) {
    res.status(500).json({ 'message': err.message });
  }
};