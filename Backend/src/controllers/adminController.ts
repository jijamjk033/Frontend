import { Request, Response } from "express";
import User from "../models/userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const verifyAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const adminData = await User.findOne({ email: email });
    if (adminData && adminData.isAdmin == true) {
      const isMatch = await bcrypt.compare(password, adminData.password);

      if (isMatch) {
        const options = {
          expiresIn: "1h",
        };
        const token = jwt.sign(req.body, "mysecretkey", options);
        res.json({ adminToken: token });
      } else {
        res.json({ passMatch: "Incorrect password" });
      }
    } else {
      res.json({ emailMatch: "Email not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to verify user" });
  }
};

const fetchAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const userDatas = await User.find({ isUser: true });
    res.json({ users: userDatas });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
};

const newUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const checkMail = await User.findOne({ email: email });
    if (checkMail) {
      res.json({ message: "Email already exists!" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        name: name,
        email: email,
        password: hashedPassword,
        isUser: true,
      });

      await newUser.save();
      res.status(200).json({ message: "User created successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create user" });
  }
};

const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email } = req.body;
    await User.findOneAndUpdate(
      { email: email },
      { $set: { name: name, email: email } }
    ).then(() => {
      res.json({ message: "User Updated SuccessFuly!" });
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.query.id;
    await User.findByIdAndDelete({ _id: userId }).then(() => {
      res.json({ message: "User Deleted Successfully!" });
    });
  } catch (error) {
    console.log(error);
  }
};
export { verifyAdmin, fetchAllUsers, newUser, updateUser, deleteUser };
