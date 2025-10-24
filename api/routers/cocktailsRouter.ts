import express from 'express';
import { Error } from 'mongoose';
import { auth, IReqWithUser } from '../middleware/auth';
import { upload } from '../middleware/multer';
import { Cocktail } from '../models/Cocktail';

const cocktailsRouter = express.Router();

cocktailsRouter.get('/', async (req, res, next) => {
  try {
  } catch (e) {
    next(e);
  }
});

cocktailsRouter.post('/', auth, upload.single('image'), async (req, res, next) => {
  try {
    const user = (req as IReqWithUser).user;
    const newCocktails = {
      user,
      title: req.body.title,
      receipt: req.body.receipt,
      image: req.file ? 'images' + req.file.filename : null,
      ingredients: JSON.parse(req.body.ingredients),
    };

    const cocktail = new Cocktail(newCocktails);
    await cocktail.save();
    res.status(200).send(cocktail);
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

export default cocktailsRouter;
