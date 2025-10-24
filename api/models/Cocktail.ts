import mongoose from 'mongoose';
import { title } from 'process';

const Schema = mongoose.Schema;

//Need to add User Validation Here

const cocktailSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    require: true,
  },
  title: {
    require: true,
    type: String,
  },
  image: {
    require: true,
    type: String,
  },
  receipt: {
    type: String,
    require: true,
  },
  isPublished: {
    type: Boolean,
    require: true,
  },
  ingredients: {
    type: [{ _id:String,title: String, amount: String }],
    required: true,
  },
  ratings: {
    type: [
      {
        user: {
          type: mongoose.Types.ObjectId,
          require: true,
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
