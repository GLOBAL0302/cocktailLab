import express from 'express';
import { Error } from 'mongoose';
import { auth, IReqWithUser } from '../middleware/auth';
import { upload } from '../middleware/multer';
import { Cocktail } from '../models/Cocktail';

const cocktailsRouter = express.Router();

cocktailsRouter.get('/', async (req, res, next) => {
  const { filter } = req.query;

  try {
    if (filter == 'all') {
      const cocktails = await Cocktail.find({ isPublished: true });
      res.status(200).send(cocktails);
      return;
    }
    const cocktails = await Cocktail.find({ user: filter });
    res.status(200).send(cocktails);
    return;
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

cocktailsRouter.delete('/:cocktailId', auth, async (req, res, next) => {
  const user = (req as IReqWithUser).user;
  const { cocktailId } = req.params;
  try {
    const cocktails = await Cocktail.findOne({ _id: cocktailId });
    if (!cocktails) {
      res.status(400).send({ error: 'No cocktail with such Id' });
      return;
    }
    if (!user) {
      return;
    }
    const objectId = cocktails.user;
    if (!objectId) {
      res.status(400).send({ error: 'Cocktail has no associated user' });
      return;
    }
    const userIdString = String(user._id);
    const objectIdString = String(objectId);
    const isOwner = userIdString === objectIdString;

    if (!isOwner) {
      res.status(403).send({ error: 'You are not authorized to delete this cocktail' });
      return;
    }
    await Cocktail.findByIdAndDelete({ _id: cocktailId });
    res.status(200).send({ message: 'Cocktail deleted successfully' });
  } catch (e) {
    if (e instanceof Error.ValidationError) {
      res.status(400).send(e);
    }
    next(e);
  }
});

export default cocktailsRouter;
