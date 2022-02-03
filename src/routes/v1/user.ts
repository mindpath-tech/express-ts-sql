'use-strict';

import { checkToken } from '@src/middlewares/checkToken';
import express from 'express';
import { validation } from "../../privateLibs/swagger-generator-express";
import UserController from '../../controllers/v1/user';
import userRequestModel from "../../requestModels/user";

const { getUsers, getUser, updateUser, deleteUser } = new UserController();

const router = express.Router();

router.get('/', validation(userRequestModel[0]), checkToken, getUsers);
router.put('/:userId', validation(userRequestModel[1]), checkToken, updateUser);
router.get('/:userId', validation(userRequestModel[2]), checkToken, getUser);
router.delete('/:userId', validation(userRequestModel[3]), checkToken, deleteUser);

module.exports = { router, basePath: '/api/v1/users' };
