import User from "../models/UserModel.js";
import { validationResult } from "express-validator";
import bcryptjs from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';

export const Login = async(req, res)=>{
    try {
        const {user_name, user_password} = req.body;
        const user = await User.findOne({user_name: user_name});
        if(user){
            const ValidationPassword = await bcryptjs.compare(user_password, user.user_password);
            if(ValidationPassword){
                req.session.user_id = user.user_id;
                req.session.user_name = user_name;
                req.user_email = user.user_email;
                res.status(200).json({
                    status: 200,
                    msg: "Login Successfully"
                });
            }else{
                res.status(400).json({status: 400, msg: "Login Failed"});
            }
        }else{
            res.status(400).json({status: 401, msg: "User does Not Exist"});
        }
    } catch (error) {
        res.status(500).json({status:500, msg:error});
    }
}

export const Register = async(req, res)=>{
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json({status:500, msg: errors});
        }else{
            const {user_name, user_email, user_password} = req.body;
            User.findOne({
                where:{
                    user_name: user_name,
                    user_email: user_email
                }
            }).then(async function(user){
                if(user){
                    res.json({status:500,msg:"Name is Already Taken"});
                }else{
                    var salt = bcryptjs.genSaltSync(10);
                    let hashpassword = await bcryptjs.hash(user_password,salt);

                    let data = {
                        user_id: uuidv4(),
                        user_name: user_name,
                        user_email: user_email,
                        user_password: hashpassword
                    }

                    await User.create(data).then(function(newUser, createuser){
                        if(!newUser){
                            res.status(500).json({status:500,msg:"User Input Error"});
                        }else{
                            res.status(200).json({status:200,msg:"User Created"})
                        }
                    })
                }
            })
        }
    } catch (error) {
        res.status(500).json({status:500, msg:error});
    }
}

