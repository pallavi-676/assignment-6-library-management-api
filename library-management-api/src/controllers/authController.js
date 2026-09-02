const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const { generateToken } = require("../utils/jwt");

async function register(req, res, next) {
  try {
    const { name, email, password, role = "student" } = req.body;

    const existing = await userModel.findByEmail(email);
    if (existing) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const now = new Date();

    const user = await userModel.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
      createdAt: now,
      updatedAt: now
    });

    const token = generateToken(user);

    const { password: _, ...safeUser } = user;
    res.status(201).json({ message: "Registration successful", user: safeUser, token });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await userModel.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user);
    const { password: _, ...safeUser } = user;

    res.json({ message: "Login successful", user: safeUser, token });
  } catch (error) {
    next(error);
  }
}

async function profile(req, res, next) {
  try {
    const user = await userModel.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { password: _, ...safeUser } = user;
    res.json(safeUser);
  } catch (error) {
    next(error);
  }
}

async function updateProfile(req, res, next) {
  try {
    const allowed = {};
    if (req.body.name !== undefined) allowed.name = req.body.name;
    if (req.body.email !== undefined) allowed.email = req.body.email.toLowerCase();

    if (req.body.password !== undefined) {
      allowed.password = await bcrypt.hash(req.body.password, 10);
    }

    allowed.updatedAt = new Date();

    const user = await userModel.update(req.user.userId, allowed);
    const { password: _, ...safeUser } = user;

    res.json({ message: "Profile updated", user: safeUser });
  } catch (error) {
    next(error);
  }
}

module.exports = { register, login, profile, updateProfile };