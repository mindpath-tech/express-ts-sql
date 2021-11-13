'use-strict';

import { checkToken } from '@src/middlewares/checkToken';
import express from 'express';
import AuthController from '../../controllers/v1/auth';
import { validation } from "../../privateLibs/swagger-generator-express";
import authRequestModel from "../../requestModels/auth";

const { signUp, signIn, resetPassword, forgotPassword, changePassword } = new AuthController();

const router = express.Router();

router.post('/signup', validation(authRequestModel[0]), signUp);
router.post('/signin', validation(authRequestModel[1]), signIn);
router.post('/password.forgot', validation(authRequestModel[2]), forgotPassword);
router.post('/password.reset', validation(authRequestModel[3]), resetPassword);
router.post('/password.change', validation(authRequestModel[4]), checkToken, changePassword);

module.exports = { router, basePath: '/api/v1/auth' };
