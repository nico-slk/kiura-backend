import { Router } from 'express';
import { check, param } from 'express-validator';
import {
  contratedUser,
  createUser,
  deleteUser,
  getPaginatedUsers,
  getUser,
  getUserByPk,
  patchUser,
  testUser
} from '../controllers/user.controller';
import { emailExist, isUserExistByPk, isUserProfesional, validator } from '../middlewares/validator';
import { validateJwt } from '../middlewares/validator-jsw';

const router = Router();

router.put('/test', testUser);

router.get('/', getUser);

router.get('/p/', getPaginatedUsers);

router.get('/:id', [
  check('id', 'Is not a valid ID').isUUID(),
  check('id').custom(isUserExistByPk),
  validator
], getUserByPk);

router.post('/', [
  check('email', 'Email should not be empty').not().isEmpty(),
  check('email', 'Email format is not valid').isEmail(),
  check('name', 'User name should not be empty').not().isEmpty(),
  check('name', 'User name should not be more than 20 characters').isLength({ max: 20 }),
  check('last_name', 'User name should not be empty').not().isEmpty(),
  check('last_name', 'User name should not be more than 20 characters').isLength({ max: 20 }),
  check('password', 'Password should not be empty').not().isEmpty(),
  check('password', 'Password should be more than 6 characters').isLength({ min: 6 }),
  check('email').custom(emailExist),
  validator,
], createUser);

router.patch('/:id', [
  validateJwt,
  check('email', 'Email should not be empty').not().isEmpty(),
  check('email', 'Email format is not valid').isEmail(),
  check('userName', 'User name should not be empty').not().isEmpty(),
  check('userName', 'User name should not be more than 20 characters').isLength({ max: 20 }),
  check('password', 'Password should not be empty').not().isEmpty(),
  check('password', 'Password should be more than 6 characters').isLength({ min: 6 }),
  check('id', 'Is not a valid ID').isUUID(),
  check('id').custom(isUserExistByPk),
  validator
], patchUser);

router.put('/:targetId/:loggedId', [
  validateJwt,
], patchUser);

router.delete('/:id', [
  validateJwt,
  check('id', 'Is not a valid ID').isUUID(),
  check('id').custom(isUserExistByPk),
  validator
], deleteUser);

router.patch('/conract/:profesionalId/:clientId', [
  validateJwt,
  param('profesionalId').custom(isUserExistByPk),
  param('profesionalId').custom(isUserProfesional),
  param('clientId').custom(isUserExistByPk),
  validator
], contratedUser);

export default router;
