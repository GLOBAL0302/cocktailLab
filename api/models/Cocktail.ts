import mongoose from 'mongoose';
import { title } from 'process';

const Schema = mongoose.Schema;

//Need to add User Validation Here

const cocktailSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: [true],
  },
  title: {
    required: [true, 'Please add title to cocktail'],
    type: String,
    trim: true,
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
