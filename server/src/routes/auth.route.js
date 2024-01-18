import express from 'express'

import AuthLogin from '../controller/auth.controlller.js';

const router = express.Router();

router.post('/login', AuthLogin.login);

export default router;