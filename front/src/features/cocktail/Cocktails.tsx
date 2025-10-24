import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchCocktailsThunk } from './cocktailThunk';
import { selectCocktails } from './cocktailSlice';
import Cocktail from './Cocktail';

const Cocktails = () => {
  const cocktails = useAppSelector(selectCocktails);
  const dispatch = useAppDispatch();

  const fetchCocktails = useCallback(async () => {
    try {
      await dispatch(fetchCocktailsThunk());
    } catch (e) {
      console.error;
    }
  }, []);

  useEffect(() => {
    void fetchCocktails();
  }, [dispatch, fetchCocktails]);
  return (
    <div className="flex gap-2 flex-wrap justify-center mt-2">
      {cocktails.map((cocktail) => (
        <Cocktail key={cocktail._id} cocktail={cocktail} />
      ))}
    </div>
  );
};

export default Cocktails;
