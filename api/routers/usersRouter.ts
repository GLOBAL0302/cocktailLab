import express from 'express';
import { Error } from 'mongoose';
import { User } from '../models/User';
import { upload } from '../middleware/multer';
import { error } from 'console';
import { auth, IReqWithUser } from '../middleware/auth';
import { randomUUID } from 'crypto';

const usersRouter = express.Router();

usersRouter.post('/', upload.single('avatar'), async (req, res, next) => {
  try {
    const newUser = {
      username: req.body.username,
      password: req.body.password,
      displayName: req.body.displayName,
      mail: req.body.mail,
      avatar: req.file ? 'images' + req.file.filename : null,
    };
    const user = new User(newUser);
    user.generateToken();
    await user.save();
    res.status(200).send(user);
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send({ error });
    }
    next(error);
  }
});

usersRouter.post('/session', async (req, res, next) => {
  try {
    if (!req.body.username) {
      res.status(400).send({ error: 'Please Provide username' });
      return;
    }
    if (!req.body.password) {
      res.status(400).send({ error: 'Please Provide password' });
    }

    const user = await User.findOne({
      username: req.body.username,
    });
    if (!user) {
      res.status(400).send({ error: 'No User Found' });
      return;
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      res.status(400).send({ error: 'Username or password is not correct' });
      return;
    }

    user.generateToken();
    await user.save();
    res.status(200).send(user);
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send({ error });
    }
    next(error);
  }
});

usersRouter.delete('/session', auth, async (req, res, next) => {
  try {
    const token = (req as IReqWithUser).user.token;
    const success = { message: 'Success logout' };
    if (!token) {
      res.send(success);
      return;
    }
    const user = await User.findOne({ token });
    if (!user) {
      res.send(success);
      return;
    }
    user.token = randomUUID();
    await user.save();
    res.status(200).send(success);
    return;
  } catch (error) {
    next(error);
  }
});

export default usersRouter;
