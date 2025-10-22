import express from 'express';
import { Error } from 'mongoose';
import { auth } from '../middleware/auth';

const cocktailsRouter = express.Router();

cocktailsRouter.get('/', async (req, res, next) => {
  try {
  } catch (e) {
    next(e);
  }
});

cocktailsRouter.post('/cocktailId', auth, async (req, res, next) => {
  try {
  } catch (e) {
    if (e instanceof Error.ValidationError) {
      res.status(400).send(e);
    }
    next(e);
  }
});

cocktailsRouter.patch('/cocktailId', auth, async (req, res, next) => {
  try {
  } catch (e) {
    if (e instanceof Error.ValidationError) {
      res.status(400).send(e);
    }
    next(e);
  }
});

cocktailsRouter.delete('/cocktailId', auth, async (req, res, next) => {
  try {
  } catch (e) {
    if (e instanceof Error.ValidationError) {
      res.status(400).send(e);
    }
    next(e);
  }
});
