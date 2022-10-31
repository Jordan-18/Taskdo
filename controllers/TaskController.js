import { validationResult } from "express-validator";
import Task from "../models/TaskModel.js";
import { v4 as uuidv4 } from 'uuid';
import TaskLevel from "../models/TaskLevelModel.js";
import TaskStatus from "../models/TaskStatusModel.js";
import conn from "../config/Mysql.js"
import TaskForum from "../models/TaskForumModel.js";

export const getTask = async(req, res) => {
    try {
        const response = await Task.findAll();
        res.status(200).json({
            status: 200, 
            msg: "Task Data", 
            total: response.length,
            data: response})
    } catch (error) {
        res.status(500).json({status:500, msg:error});
    }
}

export const getTaskById = async(req, res) => {
    try {
        conn.query(
            `SELECT
                Taskforums.Task_forum_id, 
                users.user_id, 
                users.user_name, 
                Tasks.task_name, 
                Tasks.task_level, 
                Tasks.task_status, 
                Tasks.task_progres_status, 
                Tasks.task_keterangan, 
                projects.project_name, 
                projects.project_level
            FROM users 
                INNER JOIN Tasks 
                INNER JOIN projects 
                    ON Tasks.task_project_id = projects.project_id 
                INNER JOIN Taskforums 
                    ON users.user_id = Taskforums.Task_forum_user_id 
                AND 
                    Tasks.task_id = Taskforums.Task_forum_Task_id
            WHERE 
                Task_forum_id = '${req.params.id}'
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

export const createTask = async(req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json({status: 500, msg: errors})
        }else{
            let id = {task_id : uuidv4()}
            let data = {
                ...id,
                ...req.body
            }
            
            await Task.create(data).then(async function(createtask){
                let data_forum = {
                    task_forum_id: uuidv4(),
                    task_forum_user_id: req.session.user_id,
                    task_forum_user_name: req.session.user_name,
                    task_forum_task_id: createtask.task_id,
                    task_forum_task_name: createtask.task_name
                }
                await TaskForum.create(data_forum).then(function(newTaskForum, CreateTaskForum){
                    if (!newTaskForum) {
                        res.status(500).json({status:500, msg: "Task Input Errors"})
                    } else {
                        res.status(200).json({status:201, msg: "New Task Data Created"})
                    }
                })
            })
            // if(!newTask){
            //     res.status(500).json({status:500, msg: "Task Input Errors"})
            // }else{
            //     res.status(200).json({status:201, msg: "New Task Data Created"})
            // }

        }
    } catch (error) {
        res.status(500).json({status:500, msg:error});
    }
}

export const updatenewTask = async(req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json({status: 500, msg: errors})
        }else{
            Task.findOne({
                where: {
                    task_id: req.params.id
                }
            }).then(async function(companies){
                if(companies){
                    await Task.update(req.body, {
                        where:{
                            task_id: req.params.id
                        }
                    }).then(function(newTask, CreateTask){
                        if(!newTask){
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
        const response = await Task.findOne({
            where: {
                task_id: req.params.id
            }
        })
        if(!response){
            res.status(404).json({status:404,msg:"Data not Found" ,data:response});
        }else{
            await Task.destroy({
            where:{
                task_id: req.params.id
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
                Taskforums.Task_forum_id, 
                users.user_id, 
                users.user_name, 
                Tasks.task_name, 
                Tasks.task_level, 
                Tasks.task_status, 
                Tasks.task_progres_status, 
                Tasks.task_keterangan, 
                projects.project_name, 
                projects.project_level
            FROM users 
                INNER JOIN Tasks 
                INNER JOIN projects 
                    ON Tasks.task_project_id = projects.project_id 
                INNER JOIN Taskforums 
                    ON users.user_id = Taskforums.Task_forum_user_id 
                AND 
                    Tasks.task_id = Taskforums.Task_forum_Task_id
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
                Taskforums.Task_forum_id, 
                users.user_id, 
                users.user_name, 
                Tasks.task_name, 
                Tasks.task_level, 
                Tasks.task_status, 
                Tasks.task_progres_status, 
                Tasks.task_keterangan, 
                projects.project_name, 
                projects.project_level
            FROM users 
                INNER JOIN Tasks 
                INNER JOIN projects 
                    ON Tasks.task_project_id = projects.project_id 
                INNER JOIN Taskforums 
                    ON users.user_id = Taskforums.Task_forum_user_id 
                AND 
                    Tasks.task_id = Taskforums.Task_forum_Task_id
            WHERE 
                Task_forum_id = '${req.params.id}'
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
            const {Task_forum_user_id, Task_forum_Task_id} = req.body;
            let data = {
                Task_forum_id:uuidv4(),
                Task_forum_user_id,
                Task_forum_Task_id
            }

            await TaskForum.create(data).then(function(newTaskForum, CreateTaskForum){
                if (!newTaskForum) {
                    res.status(500).json({status:500, msg: "TaskForum Input Errors"})
                } else {
                    res.status(200).json({status:201, msg: "New TaskForum Data Created"})
                }
            })
        }
    } catch (error) {
        res.status(500).json({status:500, msg:error});
    }
}