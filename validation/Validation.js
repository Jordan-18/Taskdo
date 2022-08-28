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
export const DoTaskValidation = [
    check('do_task_name', 'Name Is Required').notEmpty(),
    check('do_task_project_id','Project ID is Required').notEmpty(),
    check('do_task_level','Must Data From Task Level Data').notEmpty().isIn('MEDIUM','EASY','HARD'),
    check('do_task_status', 'Must Data From Status Data').notEmpty().isIn('HOLD','OPEN','DONE','PROSES','CANCEL','UNKNOWED'),
    check('do_task_progres_status'),
    check('do_task_parent_id'),
    check('do_task_keterangan'),
]

export const TeamValidation = [
    check('team_name','Name is Required').notEmpty(),
    check('team_lead'),
    check('team_kode','Kode is Required').notEmpty(),
]

export const TeamForumValidation = [
    check('team_forum_user_id','Field is Required').notEmpty(),
    check('team_forum_team_id','Field is Required').notEmpty(),
]

export const DoTaskForumValidation = [
    check('dotask_forum_user_id','Field is Required').notEmpty(),
    check('dotask_forum_dotask_id','Field is Required').notEmpty(),
]