import mongoose, { HydratedDocument } from 'mongoose';
import { title } from 'process';
import { User } from './User';
import { ICocktailFields } from '../types';

const Schema = mongoose.Schema;

const cocktailSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: [true],
    validate: [
      {
        validator: async (value: mongoose.Types.ObjectId) => {
          const user = await User.findById(value);
          return Boolean(user);
        },
        message: 'User Id is required for Cocktail',
      },
    ],
  },
  title: {
    required: [true, 'Please add title to cocktail'],
    type: String,
    trim: true,
    validate: [
      {
        validator: async function (this: HydratedDocument<ICocktailFields>, title: string): Promise<boolean> {
          if (!this.isModified('title')) return true;
          const cocktailTitle: HydratedDocument<ICocktailFields> | null = await Cocktail.findOne({ title });
          return !Boolean(cocktailTitle);
        },
        message: 'This Cocktail title is already exist',
      },
    ],
  },
  image: {
    required: [true, 'Cocktail required image'],
    type: String,
  },
  receipt: {
    type: String,
    trim: true,
    required: [true, 'Cocktail required receipt'],
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  ingredients: {
    type: [{ title: String, amount: String }],
    required: true,
  },
  ratings: {
    type: [
      {
        user: {
          type: mongoose.Types.ObjectId,
          ref: 'user',
          required: true,
        },
        rating: {
          type: Number,
          required: true,
          min: [1, 'Quantity must be at least 1'],
          max: [5, 'Quantity can not exceed 5'],
        },
      },
    ],
  },
});

export const Cocktail = mongoose.model('cocktail', cocktailSchema);
