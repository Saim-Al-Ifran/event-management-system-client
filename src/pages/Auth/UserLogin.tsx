import React, { useEffect } from 'react';
import { Card, CardBody, Input, Button, Typography } from '@material-tailwind/react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import app from '../../firebase/firebase.config';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { LoginFormData } from '../../types/types';
import { useSaveFirebaseUserMutation, useUserLoginMutation } from '../../features/auth/authApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useDispatch } from 'react-redux';
import { userLoggedIn, userLoggedOut } from '../../features/auth/authSlice';
import Cookies from 'js-cookie';
 

const TOKEN_LIFETIME_MS = 60 * 60 * 1000;  

const UserLogin: React.FC = () => {
  
  const auth = getAuth(app);
  const getUser = useSelector((state: RootState) => state.auth);
  const { user } = getUser;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation() ;
  const [userLogin, { isSuccess, isError, error: loginError }] = useUserLoginMutation();
  const [saveFirebaseUser] = useSaveFirebaseUserMutation();
  
  const { register: loginForm, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  
  useEffect(() => {
    if (user && user.role === 'user') {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
      toast.success('Login successful');
    }
    if (isError) {
      toast.error(loginError?.data?.message);
    }
  }, [isSuccess, isError, navigate, loginError]);

  const clearTokenAndUserData = () => {
    Cookies.remove('token');
    localStorage.removeItem('user');
    dispatch(userLoggedOut());
    toast('Session expired. You have been logged out.');
  };

  const onSubmit = async (data: any) => {
    await userLogin({
      email: data.email,
      password: data.password,
    });
  };

  const handleGoogleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (result) {

        const accessToken = await user.getIdToken();
        await saveFirebaseUser({
          uid: user.uid,
          username: user.displayName,
          email: user.email,
          image: user.photoURL,
          phoneNumber: user.phoneNumber,
        });

        const  loggedInUser = {
          name: user.displayName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: 'user',
          image: user.photoURL
       }
        dispatch(userLoggedIn({
          accessToken: accessToken,
          user: loggedInUser,
        }));

        const expirationTime = new Date();
        expirationTime.setTime(expirationTime.getTime() + TOKEN_LIFETIME_MS);

        Cookies.set('token', JSON.stringify({ accessToken: accessToken }), { expires: expirationTime });
        localStorage.setItem('user', JSON.stringify(loggedInUser));

    
        setTimeout(() => {
          clearTokenAndUserData();
        }, TOKEN_LIFETIME_MS);

        navigate(location?.state ? location.state : '/');
      }
    } catch (error) {
      console.error('Google login error:', error);
      toast.error('Google login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6" {...(undefined as any)}>
        <CardBody {...(undefined as any)}>
          <Typography variant="h4" color="blue-gray" className="text-center mb-6" {...(undefined as any)}>
            Login to Your Account
          </Typography>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Input
                type="email"
                color="blue"
                size="lg"
                label="Email"
                className="mb-4"
                {...loginForm("email", { 
                  required: "Email is required", 
                  pattern: { 
                    value: /^\S+@\S+$/i, 
                    message: "Invalid email format" 
                  } 
                })}
                error={errors.email ? true : false}
                {...(undefined as any)}
              />
              {errors.email && (
                <Typography variant="small" color="red" className="mt-1" {...(undefined as any)}>
                  {errors.email.message}
                </Typography>
              )}
            </div>

            <div>
              <Input
                type="password"
                color="blue"
                size="lg"
                label="Password"
                className="mb-4"
                {...loginForm("password", { 
                  required: "Password is required", 
                  minLength: { 
                    value: 6, 
                    message: "Password must be at least 6 characters" 
                  } 
                })}
                error={errors.password ? true : false}
                {...(undefined as any)}
              />
              {errors.password && (
                <Typography variant="small" color="red" className="mt-1" {...(undefined as any)}>
                  {errors.password.message}
                </Typography>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              fullWidth
              className="mb-4 bg-[#3F51B5] flex items-center justify-center"
              {...(undefined as any)}
            >
              Login
            </Button>
          </form>

          <div className="flex items-center justify-center my-4">
            <span className="text-gray-500">or</span>
          </div>

          <Button
            onClick={handleGoogleLogin}
            size="lg"
            variant="outlined"
            fullWidth
            className="flex items-center justify-center mb-4 border-[#3F51B5] text-[#3F51B5] hover:bg-[#3F51B5] hover:text-white transition-all"
            {...(undefined as any)}
          >
            <FcGoogle size={24} className="mr-2" />
            Login with Google
          </Button>

          <Typography variant="body2" color="blue-gray" className="text-center" {...(undefined as any)}>
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register here
            </Link>
          </Typography>
        </CardBody>
      </Card>
    </div>
  );
};

export default UserLogin;
