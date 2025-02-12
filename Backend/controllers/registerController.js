import bcrypt from "bcrypt";
import User from "../model/user.js";
import { getRoleOfUser } from "./userPermissionController.js";

export const handleNewUser = async (req, res) => {
  const userRole = await getRoleOfUser(req);
  console.log(userRole);
  if (userRole !== "Administrator")
    return res.status(403).json({ message: "Access Denied" });
  else {
    const { firstname, lastname, email, password, role } = req.body;
    if (!firstname || !lastname || !email || !password || !role)
      return res
        .status(400)
        .json({ message: "Not all required fields where filled out" });

    try {
      const duplicate = await User.findOne({ where: { email: email } });
      if (duplicate)
        return res.status(409).json({ message: "User already exists" });

      const hashedPwd = await bcrypt.hash(password, 10);
      await User.create({
        firstname,
        lastname,
        email,
        password: hashedPwd,
        role,
      });

      res.status(201).json({ success: `New user ${email} created!` });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};
