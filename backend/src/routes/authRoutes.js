import { Router } from "express";

import {
  body,
  validationResult
} from "express-validator";

import {
  register,
  login,
  me
} from "../controllers/authController.js";

import {
  protect
} from "../middleware/authMiddleware.js";

const router = Router();

const validate = (
  req,
  res,
  next
) => {

  const errors =
    validationResult(req);

  if (!errors.isEmpty()) {

    return res.status(400).json({

      success: false,

      message:
        "Validation failed",

      errors:
        errors
          .array()
          .map(
            (error) =>
              error.msg
          )

    });

  }

  next();
};

router.post(

  "/register",

  [

    body("name")
      .trim()
      .isLength({
        min: 2,
        max: 80
      })
      .withMessage(
        "Name must be 2-80 characters"
      ),

    body("email")
      .trim()
      .isEmail()
      .withMessage(
        "Please provide a valid email"
      ),

    body("password")
      .isLength({
        min: 6
      })
      .withMessage(
        "Password must be at least 6 characters"
      )

  ],

  validate,

  register

);

router.post(

  "/login",

  [

    body("email")
      .trim()
      .isEmail()
      .withMessage(
        "Please provide a valid email"
      ),

    body("password")
      .isLength({
        min: 6
      })
      .withMessage(
        "Password must be at least 6 characters"
      )

  ],

  validate,

  login

);

router.get(
  "/me",
  protect,
  me
);

export default router;