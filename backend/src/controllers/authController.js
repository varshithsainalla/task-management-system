import bcrypt from "bcryptjs";

import User from "../models/User.js";

import {
  generateToken
} from "../utils/generateToken.js";

export const register =
  async (req, res) => {

    const {
      name,
      email,
      password
    } = req.body;

    const normalizedEmail =
      email.trim().toLowerCase();

    const existing =
      await User.findOne({
        email: normalizedEmail
      });

    if (existing) {

      return res.status(409).json({
        success: false,

        message:
          "Email is already registered"
      });

    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        12
      );

    const user =
      await User.create({
        name: name.trim(),

        email: normalizedEmail,

        password: hashedPassword
      });

    res.status(201).json({

      success: true,

      token:
        generateToken(user),

      user: {
        id: user._id,

        name: user.name,

        email: user.email,

        role: user.role
      }

    });

  };

export const login =
  async (req, res) => {

    const {
      email,
      password
    } = req.body;

    const user =
      await User.findOne({
        email:
          email.trim().toLowerCase()
      }).select("+password");

    if (
      !user ||
      !(await bcrypt.compare(
        password,
        user.password
      ))
    ) {

      return res.status(401).json({
        success: false,

        message:
          "Invalid email or password"
      });

    }

    res.json({

      success: true,

      token:
        generateToken(user),

      user: {
        id: user._id,

        name: user.name,

        email: user.email,

        role: user.role
      }

    });

  };

export const me =
  async (req, res) => {

    res.json({
      success: true,

      user: req.user
    });

  };