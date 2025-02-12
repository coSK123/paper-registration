import User from "../model/user.js";
import { getRoleOfUser } from "../controllers/userPermissionController.js";

export async function getUsers(req, res) {
  const userRole = await getRoleOfUser(req);
  console.log(userRole);
  if (userRole !== "Administrator")
  {
    
    return res.status(403).json({ message: "Access Denied" });
  }
  else {
    try {
      const users = await User.findAll({
        attributes: ["email", "lastname", "firstname", "role"],
      });
      res.json(users);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}
