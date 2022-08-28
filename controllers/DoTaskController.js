import { validationResult } from "express-validator";
import Dotask from "../models/DoTaskModel.js";
import { v4 as uuidv4 } from 'uuid';
import TaskLevel from "../models/TaskLevelModel.js";
import TaskStatus from "../models/TaskStatusModel.js";
import conn from "../config/Mysql.js"
import DoTaskForum from "../models/DoTaskForumModel.js";

export const getDoTask = async(req, res) => {
    try {
        const response = await Dotask.findAll();
        res.status(200).json({
            status: 200, 
            msg: "Task Data", 
            total: response.length,
            data: response})
    } catch (error) {
        res.status(500).json({status:500, msg:error});
    }
}

export const getDoTaskById = async(req, res) => {
    try {
        conn.query(
            `SELECT
                dotaskforums.dotask_forum_id, 
                users.user_id, 
                users.user_name, 
                dotasks.do_task_name, 
                dotasks.do_task_level, 
                dotasks.do_task_status, 
                dotasks.do_task_progres_status, 
                dotasks.do_task_keterangan, 
                projects.project_name, 
                projects.project_level
            FROM users 
                INNER JOIN dotasks 
                INNER JOIN projects 
                    ON dotasks.do_task_project_id = projects.project_id 
                INNER JOIN dotaskforums 
                    ON users.user_id = dotaskforums.dotask_forum_user_id 
                AND 
                    dotasks.do_task_id = dotaskforums.dotask_forum_dotask_id
            WHERE 
                dotask_forum_id = '${req.params.id}'
            `,
            function(err, response, fields){
                if(err){
                    res.status(500).json({status:500, msg: "Query Errors", error:err})
                }else{
                    res.status(200).json({
                        status:200, 
                        msg: "TaskForum Data", 
                        total: response.length,
                        data: response
                    })
                }
            }
        )
    } catch (error) {
        res.status(500).json({status:500, msg:error});
    }
}

export const createDoTask = async(req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json({status: 500, msg: errors})
        }else{
            const {do_task_name,do_task_project_id,do_task_status,do_task_progres_status,do_task_parent_id,do_task_keterangan} =  req.body;
            let data = {
                do_task_id : uuidv4(),
                do_task_name,
                do_task_project_id,
                do_task_status,
                do_task_progres_status,
                do_task_parent_id,
                do_task_keterangan
            }
            
            await Dotask.create(data).then(async function(CreateDoTask){
                let data_forum = {
                    dotask_forum_id: uuidv4(),
                    dotask_forum_user_id: req.session.user_id,
                    dotask_forum_dotask_id: CreateDoTask.do_task_id
                }
                await DoTaskForum.create(data_forum).then(function(newDoTaskForum, CreateDoTaskForum){
                    if (!newDoTaskForum) {
                        res.status(500).json({status:500, msg: "DoTask Input Errors"})
                    } else {
                        res.status(200).json({status:201, msg: "New DoTask Data Created"})
                    }
                })
            })
            // if(!newDoTask){
            //     res.status(500).json({status:500, msg: "DoTask Input Errors"})
            // }else{
            //     res.status(200).json({status:201, msg: "New DoTask Data Created"})
            // }

        }
    } catch (error) {
        res.status(500).json({status:500, msg:error});
    }
}

export const updatenewDoTask = async(req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json({status: 500, msg: errors})
        }else{
            const {do_task_name,do_task_project_id,do_task_status,do_task_progres_status,do_task_parent_id,do_task_keterangan} =  req.body;
            Dotask.findOne({
                where: {
                    do_task_id: req.params.id
                }
            }).then(async function(companies){
                if(companies){
                    let data = {
                        do_task_name,
                        do_task_project_id,
                        do_task_status,
                        do_task_progres_status,
                        do_task_parent_id,
                        do_task_keterangan
                    }

                    await Dotask.update(data, {
                        where:{
                            do_task_id: req.params.id
                        }
                    }).then(function(newDoTask, CreateDoTask){
                        if(!newDoTask){
                            res.status(500).json({status:500, msg: "Task Input Errors"})
                        }else{
                            res.status(200).json({status:201, msg: "Task Data Updated"})
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
        const response = await Dotask.findOne({
            where: {
                do_task_id: req.params.id
            }
        })
        if(!response){
            res.status(404).json({status:404,msg:"Data not Found" ,data:response});
        }else{
            await Dotask.destroy({
            where:{
                do_task_id: req.params.id
            }
            })
            res.status(200).json({status:204,msg:"Task Deleted"})
        }
    } catch (error) {
        res.status(500).json({status:500, msg:error});
    }
}

export const taskLevel = async(req, res) => {
    try {
        const response = await TaskLevel.findAll();
        res.status(200).json({
            status: 200,
            msg:"Task Level Data",
            total: response.length,
            data: response
        })
    } catch (error) {
        res.status(500).json({status:500, msg:error});
    }
}

export const taskStatus = async(req, res) => {
    try {
        const response = await TaskStatus.findAll();
        res.status(200).json({
            status:200,
            msg: "Task Status Data",
            total: response.length,
            data: response
        })
    } catch (error) {
        res.status(500).json({status:500, msg:error});
    }
}

export const getTaskForum = async(req, res) =>{
    try {
        conn.query(
            `SELECT
                dotaskforums.dotask_forum_id, 
                users.user_id, 
                users.user_name, 
                dotasks.do_task_name, 
                dotasks.do_task_level, 
                dotasks.do_task_status, 
                dotasks.do_task_progres_status, 
                dotasks.do_task_keterangan, 
                projects.project_name, 
                projects.project_level
            FROM users 
                INNER JOIN dotasks 
                INNER JOIN projects 
                    ON dotasks.do_task_project_id = projects.project_id 
                INNER JOIN dotaskforums 
                    ON users.user_id = dotaskforums.dotask_forum_user_id 
                AND 
                    dotasks.do_task_id = dotaskforums.dotask_forum_dotask_id
            `,
            function(err, response, fields){
                if(err){
                    res.status(500).json({status:500, msg: "Query Errors", error:err})
                }else{
                    res.status(200).json({
                        status:200, 
                        msg: "TaskForum Data", 
                        total: response.length,
                        data: response
                    })
                }
            }
        )
    } catch (error) {
        res.status(500).json({status:500, msg:error});
    }
}

export const getTaskForumById = async(req, res) =>{
    try {
        conn.query(
            `SELECT
                dotaskforums.dotask_forum_id, 
                users.user_id, 
                users.user_name, 
                dotasks.do_task_name, 
                dotasks.do_task_level, 
                dotasks.do_task_status, 
                dotasks.do_task_progres_status, 
                dotasks.do_task_keterangan, 
                projects.project_name, 
                projects.project_level
            FROM users 
                INNER JOIN dotasks 
                INNER JOIN projects 
                    ON dotasks.do_task_project_id = projects.project_id 
                INNER JOIN dotaskforums 
                    ON users.user_id = dotaskforums.dotask_forum_user_id 
                AND 
                    dotasks.do_task_id = dotaskforums.dotask_forum_dotask_id
            WHERE 
                dotask_forum_id = '${req.params.id}'
            `,
            function(err, response, fields){
                if(err){
                    res.status(500).json({status:500, msg: "Query Errors", error:err})
                }else{
                    res.status(200).json({
                        status:200, 
                        msg: "TaskForum Data", 
                        total: response.length,
                        data: response
                    })
                }
            }
        )
    } catch (error) {
        res.status(500).json({status:500, msg:error});
    }
}

export const createTaskForum = async(req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json({status: 500, msg: errors})
        }else{
            const {dotask_forum_user_id, dotask_forum_dotask_id} = req.body;
            let data = {
                dotask_forum_id:uuidv4(),
                dotask_forum_user_id,
                dotask_forum_dotask_id
            }

            await DoTaskForum.create(data).then(function(newDoTaskForum, CreateDoTaskForum){
                if (!newDoTaskForum) {
                    res.status(500).json({status:500, msg: "DoTaskForum Input Errors"})
                } else {
                    res.status(200).json({status:201, msg: "New DoTaskForum Data Created"})
                }
            })
        }
    } catch (error) {
        res.status(500).json({status:500, msg:error});
    }
}