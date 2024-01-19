import express from 'express'

import AuthLogin from '../controller/auth.controlller.js';

const router = express.Router();

router.post('/login', AuthLogin.login);
router.get('/logout', AuthLogin.logout);

export default router;