import User from "../models/UserModel.js";

export const getUsers = async(req, res) => {
    try {
        const response = await User.findAll();
        res.status(200).json({
            status:200,
            msg:"Users Data",
            total: response.length,
            data:response
        });
    } catch (error) {
        res.status(500).json({status:500, msg:error});
    }
}

export const getUserById = async(req, res) => {
    try {
        const response = await User.findOne({
            where: {
                user_id : req.params.id
            }
        })
        if(!response){
            res.status(500).json({status:404, msg:"Data Not Found", data:response});
        }else{
            res.status(200).json({status:200, data:response});
        }
    } catch (error) {
        res.status(500).json({status:500, msg:"User Data By Id", msg:error});
    }
}

export const deleteUser = async(req, res)=> {
    try {
        const response = await User.findOne({
            where: {
                user_id : req.params.id
            }
        })
        if(!response){
            res.status(500).json({status:404, msg:"Data Not Found", data:response});
        }else{
            await User.destroy({
                where:{
                    user_id:req.params.id
                }
            })
            res.status(200).json({status:204,msg:"User Deleted"})
        }
    } catch (error) {
        res.status(500).json({status:500, msg:error});
    }
}