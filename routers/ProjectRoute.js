import express from "express";
import { CreateProject, deleteProject, getProject, getProjectById, UpdateProject } from "../controllers/ProjectController.js";
import { ProjectValidation } from "../validation/Validation.js"

const router = express.Router();

router.get('/projects', getProject)
router.get('/projects/:id', getProjectById)
router.post('/projects',ProjectValidation, CreateProject)
router.patch('/projects/:id',ProjectValidation, UpdateProject)
router.delete('/projects/:id',deleteProject)

export default router;