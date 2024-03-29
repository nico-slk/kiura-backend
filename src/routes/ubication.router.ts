import { Router } from 'express';
import { check, param } from 'express-validator';
import {
  createUbication,
  getUbication,
  getUbicationByName,
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

router.get('/name/:city', [
  param('city', 'City name cannot be empty').not().isEmpty(),
  validator
], getUbicationByName);

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
