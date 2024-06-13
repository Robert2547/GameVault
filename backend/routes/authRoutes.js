import express from "express";
import * as authController from "../controllers/authController.js";



const router = express.Router();

router.post("/register", authController.signup);

router.post("/login", (req, res) => {});

router.post("/logout", (req, res) => {});

export default router;
