import { useState } from 'react';
import type { ICocktailMutation } from '../../types';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import {
  Card,
  SignUpContainer,
  VisuallyHiddenInput,
  HeaderContainer,
  titleStyles,
  iconStyles,
  formStyles,
} from '../user/UserRegister.styles';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { MdAddCircle } from 'react-icons/md';
import Divider from '@mui/material/Divider';

const initialState = {
  title: '',
  image: null,
  receipt: '',
  ingredients: [{ title: '', amount: '' }],
};

const AddCocktail = () => {
  const [addCocktailForm, setAddCocktailForm] = useState<ICocktailMutation>(initialState);
  //   React.useEffect(() => {
  //     dispatch(unSetSignInError());
  //   }, [location]);

  const onChangeAddCocktailForm = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddCocktailForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const createIngredientHandler = (ingredientIndex: number) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setAddCocktailForm((prevState) => {
        const updatedIngredients = prevState.ingredients.map((ingredient, index) => {
          if (index === ingredientIndex) {
            return { ...ingredient, [name]: value };
          }
          return ingredient;
        });

        return {
          ...prevState,
          ingredients: updatedIngredients,
        };
      });
    };
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(addCocktailForm);
    try {
      //   await dispatch(signInThunk(registerForm)).unwrap();
      //   navigate('/');
    } catch (e) {
      console.error(e);
    }
  };

  const changeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files) {
      setAddCocktailForm((prevState) => ({
        ...prevState,
        image: files[0],
      }));
    }
  };

  const addMoreIngredients = () => {
    setAddCocktailForm((prevState) => {
      const ingredients = prevState.ingredients;
      return {
        ...prevState,
        ingredients: [...ingredients, { title: '', amount: '' }],
      };
    });
  };
  return (
    <>
      <CssBaseline enableColorScheme />
      <Box sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <HeaderContainer>
            <Typography component="h4" variant="h5" sx={titleStyles}>
              Add Cocktail
            </Typography>
          </HeaderContainer>
          <Box component="form" onSubmit={handleSubmit} sx={formStyles}>
            <FormControl>
              <FormLabel htmlFor="title">Title</FormLabel>
              <TextField
                onChange={onChangeAddCocktailForm}
                value={addCocktailForm.title}
                autoComplete="title"
                name="title"
                fullWidth
                id="title"
                placeholder="Mochito"
                // helperText={getError('username')}
                // error={Boolean(getError('username'))}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="title">Receipt</FormLabel>
              <TextField
                onChange={onChangeAddCocktailForm}
                value={addCocktailForm.receipt}
                autoComplete="receipt"
                name="receipt"
                fullWidth
                id="receipt"
                placeholder="Detail procedure of making current cocktail"
              />
            </FormControl>
            <Divider sx={{ border: '1px dashed grey' }} />

            <Box component="div" className="gap-3 ">
              <Typography component="p" variant="body2" className="underline uppercase text-end text-slate-600">
                Ingredienst
              </Typography>

              <Box component="div" className="overflow-scroll max-h-40">
                {addCocktailForm.ingredients.map((ingredient, index) => {
                  const handleIngredientChange = createIngredientHandler(index);
                  return (
                    <Box key={index} component="div" className="flex items-center gap-2 border-b-2 py-1">
                      <Typography className="w-5 h-5 rounded-2xl bg-black text-center text-white">
                        {index + 1}
                      </Typography>
                      <FormControl>
                        <FormLabel htmlFor="title">Title</FormLabel>
                        <TextField
                          onChange={handleIngredientChange}
                          value={ingredient.title}
                          autoComplete="title"
                          name="title"
                          fullWidth
                          placeholder="Ingredient cocktail"
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel htmlFor="amount">Amount</FormLabel>
                        <TextField
                          onChange={handleIngredientChange}
                          value={ingredient.amount}
                          autoComplete="amount"
                          name="amount"
                          fullWidth
                          placeholder="Ingredient amount"
                        />
                      </FormControl>
                    </Box>
                  );
                })}
              </Box>

              <Button color="primary" onClick={addMoreIngredients} startIcon={<MdAddCircle style={iconStyles} />} />
            </Box>

            <Button
              color={addCocktailForm.image ? 'success' : 'primary'}
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={addCocktailForm.image ? <CloudDownloadIcon /> : <CloudUploadIcon />}
            >
              {addCocktailForm.image ? addCocktailForm.image.name.slice(1, 5) + '...' : 'Upload File'}

              <VisuallyHiddenInput type="file" onChange={changeFile} multiple />
            </Button>
            <Button type="submit" fullWidth variant="contained">
              Add Cocktail
            </Button>
          </Box>
        </Card>
      </SignUpContainer>
    </>
  );
};

export default AddCocktail;
