'use-strict';

import express from 'express';
import UserController from '../../controllers/v1/user';

const { getUsers, getUser, updateUser, deleteUser } = new UserController();

const router = express.Router();

router.get('/', getUsers);
router.put('/:user-id', updateUser);
router.get('/:user-id', getUser);
router.delete('/:user-id', deleteUser);

module.exports = { router, basePath: '/api/v1/users' };
