import express from "express";
import {
    getTask,
    getTaskById,
    createTask,
    updatenewTask,
    deleteCompany,
    taskLevel,
    taskStatus,
    getTaskForum,
    getTaskForumById,
    createTaskForum} from "../controllers/TaskController.js";
import {TaskValidation,TaskForumValidation} from "../validation/Validation.js";

const router = express.Router();

router.get('/tasks',getTask);
router.get('/tasks/:id',getTaskById);
router.post('/tasks',TaskValidation,createTask);
router.patch('/tasks/:id',TaskValidation,updatenewTask);
router.delete('/tasks/:id',deleteCompany);

router.get('/task/levels', taskLevel);
router.get('/task/statuses', taskStatus);

// hidden
router.get('/taskforums',getTaskForum);
router.get('/taskforums/:id',getTaskForumById);
router.post('/taskforums',TaskForumValidation,createTaskForum);

export default router;