import { Router } from 'express';
import { check } from 'express-validator';
import {
  createUser,
  deleteUser,
  getPaginatedUsers,
  getUser,
  getUserByPk,
  patchUser,
  testUser
} from '../controllers/user.controller';
// import { validateJwt } from '../middlewares/validate-jwt';
import { emailExist, isUserExistByPk, validator } from '../middlewares/validator';

const router = Router();

router.get('/test', testUser);

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
  // validateJwt,
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

router.put('/:id', patchUser);

router.delete('/:id', [
  // validateJwt,
  check('id', 'Is not a valid ID').isUUID(),
  check('id').custom(isUserExistByPk),
  validator
], deleteUser);

export default router;
