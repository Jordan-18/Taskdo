import express from "express";
import {
    getDoTask,
    getDoTaskById,
    createDoTask,
    updatenewDoTask,
    deleteCompany,
    taskLevel,
    taskStatus,
    getTaskForum,
    getTaskForumById,
    createTaskForum} from "../controllers/DoTaskController.js";
import {DoTaskValidation,DoTaskForumValidation} from "../validation/Validation.js";

const router = express.Router();

router.get('/tasks',getDoTask);
router.get('/tasks/:id',getDoTaskById);
router.post('/tasks',DoTaskValidation,createDoTask);
router.patch('/tasks/:id',DoTaskValidation,updatenewDoTask);
router.delete('/tasks/:id',deleteCompany);

router.get('/task/levels', taskLevel);
router.get('/task/statuses', taskStatus);

// hidden
router.get('/taskforums',getTaskForum);
router.get('/taskforums/:id',getTaskForumById);
router.post('/taskforums',DoTaskForumValidation,createTaskForum);

export default router;