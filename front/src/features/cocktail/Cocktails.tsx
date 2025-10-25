import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchCocktailsThunk } from './cocktailThunk';
import { selectCocktails } from './cocktailSlice';
import Cocktail from './Cocktail';
import { useLocation } from 'react-router-dom';
import { selectUser } from '../user/userSlice';

const Cocktails = () => {
  const cocktails = useAppSelector(selectCocktails);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const fetchCocktails = useCallback(async () => {
    try {
      if (pathname == '/') {
        await dispatch(fetchCocktailsThunk('all')).unwrap();
      } else if (pathname == '/myCocktails') {
        if (user) await dispatch(fetchCocktailsThunk(user._id)).unwrap();
      }
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
        <Cocktail key={cocktail._id} cocktail={cocktail} showMyCocktail={pathname === '/myCocktails'} />
      ))}
    </div>
  );
};

export default Cocktails;
