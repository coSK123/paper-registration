import bcrypt from "bcrypt";
import User from "../model/user.js";
import { getRoleOfUser } from "./userPermissionController.js";
import { validateUserInput } from "../services/validationService.js";

const createUser = async (userData) => {
  const { firstname, lastname, email, password, role } = userData;
  
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPwd = await bcrypt.hash(password, 10);

  const user = await User.create({
    firstname,
    lastname,
    email,
    password: hashedPwd,
    role,
  });

  return user;
};

export const handleNewUser = async (req, res) => {
  if (!req?.body) {
    return res.status(400).json({ message: "User data required" });
  }
  
  try {
    const userRole = await getRoleOfUser(req);
    if (userRole !== "Administrator") {
      return res.status(403).json({ message: "Access Denied" });
    }

    const validation = validateUserInput(req.body);
    if (!validation.isValid) {
      return res.status(400).json({ message: validation.error });
    }

    const user = await createUser(validation.data);
    
    return res.status(201).json({ 
      success: `New user ${user.email} created!`,
      user: {
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role
      }
    });
  } catch (err) {
    if (err.message === "User already exists") {
      return res.status(409).json({ message: err.message });
    }

    return res.status(500).json({ 
      message: "An unexpected error occurred during registration" 
    });
  }
};


