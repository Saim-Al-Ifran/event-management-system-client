import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Card, CardBody, Input, Button, Typography } from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../../features/user/userApi';
import toast from 'react-hot-toast';
import { RegistrationcFormData } from '../../types/types';

 

const UserRegister: React.FC = () => {
  const { register:validateRegister, handleSubmit, formState: { errors } } = useForm<RegistrationcFormData>();
  const [register,{isLoading,isError,isSuccess,error}] = useRegisterMutation();
  const navigate = useNavigate();

  useEffect(()=>{
       if(isSuccess){
        toast.success("Successfully registered");
        navigate('/login');
       }

       if(isError){
        toast.error(error?.data?.message);
        console.log(error);
        
       }

  },[isSuccess,isError,navigate])

  const onSubmit: SubmitHandler<RegistrationcFormData> = async (data) => {
    await register(data)
  };
  console.log(error);
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6"  {...(undefined as any)}>
        <CardBody  {...(undefined as any)}>
          <Typography variant="h4" color="blue-gray" className="text-center mb-6"  {...(undefined as any)}>
            Create an Account
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Input
                {...validateRegister('username', { required: 'Username is required' })}
                type="text"
                color="blue"
                size="lg"
                label="Username"
                className="mb-4"
                {...(undefined as any)}
                error={errors.username  ? true : false}
              />
              {errors.username && <span className="text-red-500">{errors.username.message}</span>}
            </div>
            <div>
              <Input
                {...validateRegister('phoneNumber', { 
                  required: 'Phone Number is required', 
                  pattern: { 
                    value: /^[0-9]{11}$/, 
                    message: 'Phone number must be exactly 11 digits' 
                  } 
                })}
                type="tel"
                color="blue"
                size="lg"
                label="Phone Number"
                className="mb-4"
                {...(undefined as any)}
                error={errors.phoneNumber  ? true : false}
              />
              {errors.phoneNumber && <span className="text-red-500">{errors.phoneNumber.message}</span>}
            </div>
            <div>
              <Input
                {...validateRegister('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' } })}
                type="email"
                color="blue"
                size="lg"
                label="Email"
                className="mb-4"
                {...(undefined as any)}
                error={errors.email ? true : false}
              />
              {errors.email && <span className="text-red-500">{errors.email.message}</span>}
            </div>
            <div>
              <Input
                {...validateRegister('password',  { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters long' } })}
                type="password"
                color="blue"
                size="lg"
                label="Password"
                className="mb-4"
                {...(undefined as any)}
                error={errors.password ? true : false}
              />
              {errors.password && <span className="text-red-500">{errors.password.message}</span>}
            </div>
            <Button
              loading={isLoading}
              type="submit"
              size="lg"
              fullWidth
              className="mb-4 bg-[#3F51B5] flex items-center justify-center"
              {...(undefined as any)}
            >
              Register
            </Button>
          </form>
          <Typography variant="body2" color="blue-gray" className="text-center mt-4"  {...(undefined as any)}>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </Typography>
        </CardBody>
      </Card>
    </div>
  );
};

export default UserRegister;
