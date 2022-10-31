import express from "express";
import {
    getTeam,
    getTeamById,
    createTeam,
    updatenewTeam,
    deleteCompany,
    getTeamDetail,
    getTeamDetailById,
    createTeamForum} from "../controllers/TeamController.js";
import {TeamValidation, TeamForumValidation} from "../validation/Validation.js";

const router = express.Router();

router.get('/teams',getTeam);
router.get('/teams/:id',getTeamById);
router.post('/teams',TeamValidation,createTeam);
router.patch('/teams/:id',TeamValidation,updatenewTeam);
router.delete('/teams',deleteCompany);

// hidden
router.get('/teamsdetail',getTeamDetail);
router.get('/teamsdetail/:id',getTeamDetailById);

router.post('/teamforums',TeamForumValidation,createTeamForum);

export default router;