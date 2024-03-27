import { Router } from 'express';
import { check } from 'express-validator';
import {
  createUbication,
  getUbication,
  getUbicationByPk,
  testUbication,
} from '../controllers/ubication.controller';
import { isUbicationExistByName, isUbicationExistByPk, validator } from '../middlewares/validator';

const router = Router();

router.get('/test', testUbication);

router.get('/', getUbication);

router.get('/:id', [
  check('id', 'Is not a valid ID').isUUID(),
  check('id').custom(isUbicationExistByPk),
  validator
], getUbicationByPk);

router.post('/', [
  check('city', 'city should not be empty').not().isEmpty(),
  check('region', 'User region should not be empty').not().isEmpty(),
  check('region', 'User region should not be more than 20 characters').isLength({ max: 20 }),
  check('country', 'User country should not be empty').not().isEmpty(),
  check('country', 'User country should not be more than 20 characters').isLength({ max: 20 }),
  check('city').custom(isUbicationExistByName),
  validator,
], createUbication);

export default router;
