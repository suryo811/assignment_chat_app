import express from 'express';
import { getRecentMessages } from '../controller/messageController.js';

const router = express.Router();



router.get('/', getRecentMessages);

export default router