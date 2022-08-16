import express from "express";
import {Login,Register} from "../controllers/AuthController.js";
import {LoginValidation, RegisterValidation} from "../validation/Validation.js";

const router = express.Router();

router.post('/login',LoginValidation,Login);
router.post('/register',RegisterValidation, Register);

export default router;