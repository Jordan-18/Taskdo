import express from "express";
import {Login,Register} from "../controllers/AuthController.js";
import {LoginValidation, RegisterValidation} from "../validation/Validation.js";

const router = express.Router();

router.post('/login',LoginValidation,Login);
router.post('/register',RegisterValidation, Register);
router.post('/logout', (req,res) => {
    req.session.destroy();
    res.status(200).json({status:200,msg:"Account Has Logout"})
})

export default router;