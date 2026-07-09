import User from "../models/User.js";
import bcrypt from "bcrypt";

const createuser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Error generating salt",
        });
      }

      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Error hashing password",
          });
        }

        try {
          const user = await User.create({
            name,
            email,
            password: hash, // Agar schema me 'passward' hai to yahan bhi 'passward: hash' likho
          });

          return res.status(201).json({
            success: true,
            message: "Data created successfully",
            user,
          });
        } catch (error) {
          return res.status(500).json({
            success: false,
            message: "Database Error",
            error: error.message,
          });
        }
      });
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export { createuser };