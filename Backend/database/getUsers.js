import User from "../model/user.js";

export async function getUsers(req, res) {
  try {
    const users = await User.findAll({
      attributes: ['email', 'lastname', 'firstname', 'role']
    });
    res.json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
}