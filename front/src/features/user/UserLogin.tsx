import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import {
  Card,
  formStyles,
  HeaderContainer,
  iconStyles,
  linkTextStyles,
  SignUpContainer,
  socialButtonsContainer,
  titleStyles,
} from './UserRegister.styles';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { GoogleIcon } from '../../components/loginIcon';
import Link from '@mui/material/Link';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUserLoginLoading } from './userSlice';
import { logInThunk } from './userThunk';
import { useNavigate } from 'react-router-dom';
const initialState = {
  username: '',
  password: '',
};

const UserLogin = () => {
  const [loginForm, setLoginForm] = useState(initialState);
  const loginLoading = useAppSelector(selectUserLoginLoading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await dispatch(logInThunk(loginForm)).unwrap();
      navigate('/');
    } catch (e) {
      console.error(e);
    }
  };

  const onChangeRegisterForm = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <CssBaseline enableColorScheme />
      <Box sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <HeaderContainer>
            <Typography component="h4" variant="h5" sx={titleStyles}>
              Login
            </Typography>
            <FingerprintIcon style={iconStyles} />
          </HeaderContainer>
          <Box component="form" onSubmit={handleSubmit} sx={formStyles}>
            <FormControl>
              <FormLabel htmlFor="name">Username</FormLabel>
              <TextField
                onChange={onChangeRegisterForm}
                autoComplete="username"
                name="username"
                required
                fullWidth
                id="name"
                placeholder="Jon Snow"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                onChange={onChangeRegisterForm}
              />
            </FormControl>

            <Button loading={loginLoading} type="submit" fullWidth variant="contained">
              Login
            </Button>
          </Box>
          <Divider>
            <Typography sx={{ color: 'text.secondary' }}>or</Typography>
          </Divider>
          <Box sx={socialButtonsContainer}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign up with Google')}
              startIcon={<GoogleIcon />}
            >
              Sign up with Google
            </Button>
            <Typography sx={linkTextStyles}>
              Already have an account?{' '}
              <Link href="/register" variant="body2" sx={{ alignSelf: 'center' }}>
                Sign in
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </>
  );
};

export default UserLogin;
