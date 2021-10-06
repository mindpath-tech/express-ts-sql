'use-strict';

import { checkToken } from '@src/middlewares/checkToken';
import express from 'express';
import swagger from "../../privateLibs/swagger-generator-express";
import UserController from '../../controllers/v1/user';
import userRequestModel from "../../requestModels/user";

const { getUsers, getUser, updateUser, deleteUser } = new UserController();

const router = express.Router();

router.get('/', swagger.validation(userRequestModel[0]), checkToken, getUsers);
router.put('/:user-id', swagger.validation(userRequestModel[1]), checkToken, updateUser);
router.get('/:user-id', swagger.validation(userRequestModel[2]), checkToken, getUser);
router.delete('/:user-id', swagger.validation(userRequestModel[3]), checkToken, deleteUser);

module.exports = { router, basePath: '/api/v1/users' };
