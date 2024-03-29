import { Router } from 'express';
import { check, param } from 'express-validator';
import { asignCategoryToProfesional, createCategory, getCategorieByPk, getCategories, testCategory } from '../controllers/category.controller';
import { isCategoryExistByPk, isUserExistByPk, validator } from '../middlewares/validator';

const router = Router();

router.put('/test', testCategory);

router.get('/', getCategories);

router.get('/:id', [
  check('id', 'Is not a valid ID').isUUID(),
  validator
], getCategorieByPk);

router.post('/', [
  check('name', 'Category name should not be empty').not().isEmpty(),
  validator
], createCategory);

router.patch('/:profesionalId/:categoryId', [
  param('profesionalId', 'The profesional ID is not valid.').isUUID(),
  param('categoryId', 'The category ID is not valid.').isUUID(),
  param('profesionalId').custom(isUserExistByPk),
  param('categoryId').custom(isCategoryExistByPk),
  validator
], asignCategoryToProfesional);

export default router;
