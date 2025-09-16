import express from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

const router = express.Router();

// Signup endpoint
router.post(
  "/register",
  [
    // Validation middleware
    body("email").isEmail(),
    body("password").isLength({ min: 8 }),
    body("fullName").notEmpty(),
    // Add other validations
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {
        email,
        password,
        fullName,
        dateOfBirth,
        gender,
        collegeName,
        department,
        graduationYear,
        degree,
        mobile,
        jobTitle,
        companyName,
        linkedinUrl,
      } = req.body;

      // Check if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ error: "User already exists" });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create user
      user = new User({
        email,
        password: hashedPassword,
        fullName,
        dateOfBirth,
        gender,
        collegeName,
        department,
        graduationYear,
        degree,
        mobile,
        jobTitle,
        companyName,
        linkedinUrl,
      });

      await user.save();

      // Generate JWT
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET!,
        { expiresIn: "24h" }
      );

      res.json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// Login endpoint
router.post(
  "/login",
  [
    body("identifier").notEmpty(),
    body("password").notEmpty(),
  ],
  async (req, res) => {
    try {
      const { identifier, password } = req.body;

      // Find user by email or mobile
      const user = await User.findOne({
        $or: [{ email: identifier }, { mobile: identifier }],
      });

      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      // Verify password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      // Generate JWT
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET!,
        { expiresIn: "24h" }
      );

      res.json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

export default router;
