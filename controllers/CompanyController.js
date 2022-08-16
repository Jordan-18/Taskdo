import { validationResult } from "express-validator";
import Company from "../models/CompanyModel.js";
import { v4 as uuidv4 } from 'uuid';

export const getCompany = async(req, res) => {
    try {
        const response = await Company.findAll();
        res.status(200).json({
            status:200, 
            msg: "Company Data", 
            total: response.length,
            data:response
        })
    } catch (error) {
        res.status(500).json({status:500, msg:error});
    }
}

export const getCompanyById = async(req, res) => {
    try {
        const response = await Company.findOne({
            where: {
                company_id: req.params.id
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

export const createCompany = async(req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json({status: 500, msg: errors})
        }else{
            const {company_name} =  req.body;
            let data = {
                company_id : uuidv4(),
                company_name: company_name
            }
            
            await Company.create(data).then(function(newCompany, Createcompany){
                if(!newCompany){
                    res.status(500).json({status:500, msg: "Company Input Errors"})
                }else{
                    res.status(200).json({status:201, msg: "New Company Data Created"})
                }
            })

        }
    } catch (error) {
        res.status(500).json({status:500, msg:error});
    }
}

export const updateCompany = async(req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json({status: 500, msg: errors})
        }else{
            const {company_name} =  req.body;
            Company.findOne({
                where: {
                    company_id: req.params.id
                }
            }).then(async function(companies){
                if(companies){
                    let data = {
                        company_name: company_name
                    }

                    await Company.update(data, {
                        where:{
                            company_id: req.params.id
                        }
                    }).then(function(newCompany, Createcompany){
                        if(!newCompany){
                            res.status(500).json({status:500, msg: "Company Input Errors"})
                        }else{
                            res.status(200).json({status:201, msg: "Company Data Updated"})
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
        const response = await Company.findOne({
            where: {
                company_id: req.params.id
            }
        })
        if(!response){
            res.status(404).json({status:404,msg:"Data not Found" ,data:response});
        }else{
            await Company.destroy({
            where:{
                company_id: req.params.id
            }
            })
            res.status(200).json({status:204,msg:"Company Deleted"})
        }
    } catch (error) {
        res.status(500).json({status:500, msg:error});
    }
}