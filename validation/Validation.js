import {check} from "express-validator";

export const LoginValidation = [
    check('user_name','Name is Required').notEmpty(),
    check('user_password','Password is Required').notEmpty(),
]

export const RegisterValidation = [
    check('user_name','Name is Required').notEmpty(),
    check('user_email','Email is Required').notEmpty().isEmail(),
    check('user_password','Password must be 6 or more characters').isLength({ min: 6 }).notEmpty(),
]

export const CompanyValidation = [
    check('company_name','Name Is Required').notEmpty(),
]

export const ProjectValidation = [
    check('project_name', 'Name Is Required').notEmpty(),
    check('project_level','Level is Required').notEmpty(),
    check('project_team_id'),
    check('project_lead'),
    check('project_company_id'),
    check('project_start','Please fill start Project').notEmpty(),
    check('project_end', 'Please fill end project'),
]