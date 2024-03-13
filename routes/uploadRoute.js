import express from 'express';
import { uploadFileMiddleware } from '../middleware/uploadFileMiddleware.js';
import { uploadController } from '../controllers/uploadController.js';

const router = express.Router();

router.post('/uploadFile', uploadFileMiddleware ,uploadController )

export default router;