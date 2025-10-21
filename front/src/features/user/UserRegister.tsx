import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { IoMdLogIn } from 'react-icons/io';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { GoogleIcon } from '../../components/loginIcon';
import {
  Card,
  SignUpContainer,
  VisuallyHiddenInput,
  HeaderContainer,
  titleStyles,
  iconStyles,
  formStyles,
  socialButtonsContainer,
  linkTextStyles,
} from './UserRegister.styles';

const UserRegister = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <CssBaseline enableColorScheme />
      <Box sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <HeaderContainer>
            <Typography component="h4" variant="h5" sx={titleStyles}>
              Sign up
            </Typography>
            <IoMdLogIn style={iconStyles} />
          </HeaderContainer>
          <Box component="form" onSubmit={handleSubmit} sx={formStyles}>
            <FormControl>
              <FormLabel htmlFor="name">Username</FormLabel>
              <TextField autoComplete="username" name="username" required fullWidth id="name" placeholder="Jon Snow" />
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
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Display Name</FormLabel>
              <TextField
                required
                fullWidth
                id="displayName"
                placeholder="Jonnatan"
                name="displayName"
                autoComplete="email"
                variant="outlined"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="your@email.com"
                name="email"
                autoComplete="email"
                variant="outlined"
              />
            </FormControl>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload files
              <VisuallyHiddenInput 
                type="file" 
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => console.log(event.target.files)} 
                multiple 
              />
            </Button>
            <Button type="submit" fullWidth variant="contained">
              Sign up
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
              <Link href="/login" variant="body2" sx={{ alignSelf: 'center' }}>
               Login
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </>
  );
};

export default UserRegister;
