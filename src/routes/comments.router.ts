import { Router } from 'express';
import { check, param } from 'express-validator';
import { createComment, deleteComment, getCommentByPk, getCommentByUserPk, getComments, patchComment, testComment } from '../controllers/comment.controller';
import { isCommentExistByPk, isUserExistByPk, validator } from '../middlewares/validator';
import { validateJwt } from '../middlewares/validator-jsw';

const router = Router();

router.put('/test', testComment);

router.get('/', getComments);

router.get('/:id', [
  check('id', 'Is not a valid ID').isUUID(),
  validator
], getCommentByPk);

router.get('/all/:userId', [
  param('userId', 'Is not a valid ID').isUUID(),
  validator
], getCommentByUserPk);

router.patch('/:commentId/:loggedUserId', [
  validateJwt,
  check('comment', 'Comment should not be empty').not().isEmpty(),
  param('commentId').custom(isCommentExistByPk),
  param('loggedUserId').custom(isUserExistByPk),
  validator,
], patchComment);

router.post('/', [
  validateJwt,
  // check('comment', 'Comment should not be empty').not().isEmpty(),
  // check('autorId', 'The user not exist.').isUUID(),
  // check('userId', 'The user not exist.').isUUID,
  // check('userId').custom(isUserExistByPk),
  validator,
], createComment);

router.delete('/:commentId/:loggedUserId', [
  validateJwt,
  param('commentId').custom(isCommentExistByPk),
  param('loggedUserId').custom(isUserExistByPk),
  validator
], deleteComment);

export default router;
