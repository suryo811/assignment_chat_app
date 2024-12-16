import express from 'express'
const router = express.Router();

import { register } from '../controller/authController.js';

router.post('/register', register);
router.post('/login')

export default router;