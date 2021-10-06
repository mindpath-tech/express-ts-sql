'use-strict';

import express from 'express';
import AuthController from '../../controllers/v1/auth';
import swagger from "../../privateLibs/swagger-generator-express";
import authRequestModel from "../../requestModels/auth";

const { signUp, signIn, resetPassword, forgotPassword, changePassword } = new AuthController();

const router = express.Router();

router.post('/signup', swagger.validation(authRequestModel[0]), signUp);
router.post('/signin', swagger.validation(authRequestModel[1]), signIn);
router.post('/password.forgot', swagger.validation(authRequestModel[2]), forgotPassword);
router.post('/password.reset', swagger.validation(authRequestModel[3]), resetPassword);
router.post('/password.change', swagger.validation(authRequestModel[4]), changePassword);

module.exports = { router, basePath: '/api/v1/auth' };
