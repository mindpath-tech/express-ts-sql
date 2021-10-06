'use-strict';

import { checkToken } from '@src/middlewares/checkToken';
import express from 'express';
import UserController from '../../controllers/v1/user';

const { getUsers, getUser, updateUser, deleteUser } = new UserController();

const router = express.Router();

router.get('/', checkToken, getUsers);
router.put('/:user-id', checkToken, updateUser);
router.get('/:user-id', checkToken, getUser);
router.delete('/:user-id', checkToken, deleteUser);

module.exports = { router, basePath: '/api/v1/users' };
