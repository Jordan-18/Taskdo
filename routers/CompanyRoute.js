import express from "express";
import { createCompany, deleteCompany, getCompany, getCompanyById, updateCompany } from "../controllers/CompanyController.js";
import { CompanyValidation } from "../validation/Validation.js";

const router = express.Router();

router.get('/company', getCompany);
router.get('/company/:id', getCompanyById);
router.post('/company',CompanyValidation,createCompany)
router.patch('/company/:id',CompanyValidation,updateCompany)
router.delete('/company/:id',deleteCompany)

export default router;