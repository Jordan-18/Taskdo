import { validationResult } from "express-validator";
import { v4 as uuidv4 } from 'uuid';
import TeamForum from "../models/TeamForumModels.js";
import Team from "../models/TeamModel.js";
import User from "../models/UserModel.js";

export const getTeam = async(req, res) => {
    try {
        const response = await Team.findAll();
        res.status(200).json({
            status:200, 
            msg: "Team Data", 
            total: response.length,
            data:response
        })
    } catch (error) {
        res.status(500).json({status:500, msg:error});
    }
}

export const getTeamById = async(req, res) => {
    try {
        const response = await Team.findOne({
            where: {
                team_id: req.params.id 
            }
        })
        if(!response){
            res.status(404).json({status:404,msg:"Data not Found" ,data:response});
        }else{
            res.status(200).json({status:200, data:response});
        }
    } catch (error) {
        res.status(500).json({status:500, msg:error});
    }
}

export const createTeam = async(req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json({status: 500, msg: errors})
        }else{
            let id = {team_id : uuidv4()}
            let data = {
                ...id,
                ...req.body
            }
            
            await Team.create(data).then(function(newTeam, CreateTeam){
                if(!newTeam){
                    res.status(500).json({status:500, msg: "Team Input Errors"})
                }else{
                    res.status(200).json({status:201, msg: "New Team Data Created"})
                }
            })

        }
    } catch (error) {
        res.status(500).json({status:500, msg:error});
    }
}

export const updatenewTeam = async(req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json({status: 500, msg: errors})
        }else{
            Team.findOne({
                where: {
                    team_id: req.params.id
                }
            }).then(async function(companies){
                if(companies){
                    await Team.update(req.body, {
                        where:{
                            team_id: req.params.id
                        }
                    }).then(function(newTeam, CreateTeam){
                        if(!newTeam){
                            res.status(500).json({status:500, msg: "Team Input Errors"})
                        }else{
                            res.status(200).json({status:201, msg: "Team Data Updated"})
                        }
                    })
                }else{
                    res.status(404).json({status:404,msg:"Data not Found"});
                }
            })
        }
    } catch (error) {
        res.status(500).json({status:500, msg:error});
    }
}

export const deleteCompany = async(req, res) => {
    try {
        const response = await Team.findOne({
            where: {
                team_id: req.params.id
            }
        })
        if(!response){
            res.status(404).json({status:404,msg:"Data not Found" ,data:response});
        }else{
            await Team.destroy({
            where:{
                team_id: req.params.id
            }
            })
            res.status(200).json({status:204,msg:"Team Deleted"})
        }
    } catch (error) {
        res.status(500).json({status:500, msg:error});
    }
}

export const getTeamDetail = async(req,res) => {
    try {
        const response = await Team.findAll(
            {
                attributes: [
                    'team_id',
                    'team_name',
                    'team_kode'
                ],
                include: [
                    {
                        model: User,
                        attributes: [
                            ['user_id', 'lead_id'],
                            ['user_name', 'lead_name'],
                            ['user_email', 'lead_email']
                        ]
                    },
                    {
                        model: TeamForum,
                        attributes: [
                            ['team_forum_user_id','member_id'],
                            ['team_forum_user_name', 'member_name']
                        ]
                    },
                ],
            }
        );

        res.status(200).json({
            status:200, 
            msg: "TeamForum Data", 
            total: response.length,
            data:response
        })
    } catch (error) {
        res.status(500).json({status:500, msg:error});
    }
}

export const getTeamDetailById = async(req,res) => {
    try {
        const response = await Team.findAll(
            {
                where: {
                    team_id: req.params.id
                },
                attributes: [
                    'team_id',
                    'team_name',
                    'team_kode'
                ],
                include: [
                    {
                        model: User,
                        attributes: [
                            ['user_id', 'lead_id'],
                            ['user_name', 'lead_name'],
                            ['user_email', 'lead_email']
                        ]
                    },
                    {
                        model: TeamForum,
                        attributes: [
                            ['team_forum_user_id','member_id'],
                            ['team_forum_user_name', 'member_name']
                        ]
                    },
                ],
            }
        );

        res.status(200).json({
            status:200, 
            msg: "TeamForum Data", 
            total: response.length,
            data:response
        })

        
    } catch (error) {
        res.status(500).json({status:500, msg:error});
    }
}

export const createTeamForum = async(req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json({status: 500, msg: errors})
        }else{
            let id = {team_forum_id:uuidv4()}
            let data = {
                ...id,
                ...req.body
            }

            await TeamForum.create(data).then(function(newTeamForum, CreateTeamForum){
                if (!newTeamForum) {
                    res.status(500).json({status:500, msg: "TeamForum Input Errors"})
                } else {
                    res.status(200).json({status:201, msg: "New TeamForum Data Created"})
                }
            })
        }
    } catch (error) {
        res.status(500).json({status:500, msg:error});
    }
}