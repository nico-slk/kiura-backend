import { Request, Response } from "express";
import Comment from '../models/comments.model';
import User from "../models/user.models";

export const testComment = async (_req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server' + Date.now().toLocaleString());
};

export const getComments = async (_req: Request, res: Response) => {
  try {
    const comments = await Comment.findAll();
    res.json({
      msj: 'Comentario',
      comments
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getCommentByPk = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findByPk(id);

    res.json({
      msj: 'Comentario',
      comment
    });

  } catch (error) {

    res.status(500).json({ error });
  }
};

export const getCommentByUserPk = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const comments = await Comment.findAll({ where: { userId } });

    res.json({
      msj: 'Comentario',
      comments
    });

  } catch (error) {

    res.status(500).json({ error });
  }
};

export const patchComment = async (req: Request, res: Response) => {
  const { loggedUserId, commentId } = req.params;
  const { body } = req;

  try {

    // get user to check if the autor is the editor
    const comment = await Comment.findByPk(commentId);
    const user = await User.findByPk(loggedUserId);
    const { id: userId } = user?.dataValues;


    if (loggedUserId !== userId) {
      throw new Error(`Only the autor can edit the comment.`);
    }

    // Update and get the updated comment
    comment?.setDataValue('comment', body.comment);
    await Comment.update(comment?.dataValues, { where: { id: commentId } });

    // Response
    res.json({
      msg: 'patchComment',
      comment
    });

  } catch (error) {
    res.status(500).json({ error });
  }
};

export const createComment = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    // Build new user
    const comment = await Comment.build(body);
    console.log(comment);

    // // Save the new user
    await comment.save();

    // Response
    res.json({
      msg: 'createComment',
      comment
    });

  } catch (error) {

    res.status(500).json({ error });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  const { loggedUserId, commentId } = req.params;

  try {

    const user = await User.findByPk(loggedUserId);
    const comment = await Comment.findByPk(commentId);

    if (!user) {
      throw new Error(`Error at try to read the user with ID: ${loggedUserId}`);
    }

    if (!comment) {
      throw new Error(`Error at try to read the user with ID: ${commentId}`);
    }

    if (user.dataValues.id !== comment.dataValues.autorId) {
      if (user.dataValues.rol !== 'ADMIN') {
        throw new Error(`Only the autor can delete this comment.`);
      }
    }

    await Comment.destroy({ where: { id: commentId } });
    res.json({
      msg: `Comment with message: ${comment.dataValues.comment} has been deleted`,
      id: commentId,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
