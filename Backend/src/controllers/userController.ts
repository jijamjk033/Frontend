import { Request, Response } from "express";
import User from "../models/userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    const checkMail = await User.findOne({ email: email });

    if (checkMail) {
      res.json({ emailUsed: "Email already exists!" });
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

const verifyUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const userData = await User.findOne({ email: email });

    if (userData && userData.isUser === true) {
      const isMatch = await bcrypt.compare(password, userData.password);

      if (isMatch) {
        const options = {
          expiresIn: "75h",
        };

        // Assuming you want to sign only certain properties of req.body
        const { email: userEmail } = req.body;
        const token = jwt.sign(
          { email: userEmail, userId: userData._id },
          "mysecretkey",
          options
        );

        res.json({ userId: userData._id, userToken: token });
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

const fetchUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.query.id;
    console.log(userId);
    await User.findOne(
      { _id: userId },
      { name: 1, email: 1, _id: 0, image: 1 }
    ).then((data) => {
      res.json({ userDetails: data });
    });
  } catch (error) {
    console.log(error);
  }
};

const imageUpload = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.query.id;
    const image =req.file?.filename;
    await User.updateOne({ _id: id }, { $set: { image: image } });
    res.json({ message: "Image added" });
  } catch (error) {
    console.log(error);
  }
};

const imageDelete = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.query.id;
    await User.updateOne({ _id: id }, { $unset: { image: '' } });
    res.json({ message: "image removed" });
  } catch (error) {
    console.log(error);
  }
};

export { createUser, verifyUser, fetchUser, imageUpload,imageDelete };
