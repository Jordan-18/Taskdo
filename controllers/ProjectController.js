import Project from "../models/ProjectModel.js";
import { validationResult } from "express-validator";
import { v4 as uuidv4 } from 'uuid';

export const getProject = async(req, res) => {
    try {
        const response = await Project.findAll();
        res.status(200).json({
            status: 200, 
            msg: "Project Data", 
            total: response.length,
            data: response})
    } catch (error) {
        res.status(500).json({status:500, msg:error});
    }
}

export const getProjectById = async(req, res) => {
    try {
        const response = await Project.findOne({
            where: {
                project_id: req.params.id
            }
        })
        if(!response){
            res.status(404).json({status: 404, msg:"Data Not Found",data: response})
        }else{
            res.status(200).json({status: 200, data: response})
        }
    } catch (error) {
        res.status(500).json({status:500, msg:error});
    }
}

export const CreateProject = async(req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json({status: 500, msg: errors})
        }else{
            let id = {project_id: uuidv4()}
            var data = {
                ...id,
                ...req.body
            }

            await Project.create(data).then( (newproject, created) => {
                if(!newproject){
                    res.status(500).json({status:500, msg: "Project Invalid Input"})
                }else{
                    res.status(201).json({status:201, msg: "Project Data Created"})
                }
            })
        }
    } catch (error) {
        res.status(500).json({status:500, msg:error});
    }
}

export const UpdateProject = async(req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json({status: 500, msg: errors})
        }else{
            await Project.update(req.body,{
                where: {
                    project_id: req.params.id
                }
            }).then( (newproject, created) => {
                if(!newproject){
                    res.status(500).json({status:500, msg: "Project Invalid Input"})
                }else{
                    res.status(201).json({status:201, msg: "Project Data Updated"})
                }
            })
        }
    } catch (error) {
        res.status(500).json({status:500, msg:error});
    }
}

export const deleteProject = async(req, res) => {
    try {
        const response = await Project.findOne({
            where: {
                project_id: req.params.id
            }
        })
        if(!response){
            res.status(404).json({status: 404, msg:"Data Not Found",data: response})
        }else{
            await Project.destroy({
                where:{
                    project_id: req.params.id
                }
                })
            res.status(200).json({status:204,msg:"Project Deleted"})
        }
    } catch (error) {
        res.status(500).json({status:500, msg:error});
    }
}