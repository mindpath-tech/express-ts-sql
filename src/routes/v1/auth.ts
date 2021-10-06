'use-strict';

import { checkToken } from '@src/middlewares/checkToken';
import express from 'express';
import AuthController from '../../controllers/v1/auth';

const { signUp, signIn, resetPassword, forgotPassword, changePassword } = new AuthController();

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/password.forgot', forgotPassword);
router.post('/password.reset.', resetPassword);
router.post('/password.change', checkToken, changePassword);

module.exports = { router, basePath: '/api/v1/auth' };
