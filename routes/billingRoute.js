import express from 'express';
import { inputValidation } from '../middleware/inputValidation.js';
import { readFileController } from '../controllers/readFileController.js';

const router = express.Router();

router.post('/processData',inputValidation, readFileController)

export default router
