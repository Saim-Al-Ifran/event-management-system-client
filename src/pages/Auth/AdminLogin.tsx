import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@material-tailwind/react";
import { IFormInput } from "../../types/types";
import { toast } from "react-hot-toast";
import { useAdminLoginMutation } from "../../features/auth/authApi";
import { useNavigate } from "react-router-dom";
 

const AdminLogin: React.FC = () => {
 
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
  const [adminLogin,{isError,error,isSuccess}] = useAdminLoginMutation();
  const onSubmit: SubmitHandler<IFormInput> = data => {
    console.log("Email:", data.email, "Password:", data.password);
    adminLogin({
        email:data.email,
        password:data.password
    })
  };
  useEffect(()=>{
      if(isSuccess){
           navigate('/dashboard');
           toast.success("login success")
      }
      if(isError){
           toast.error(error?.data?.message);
          
           
      }

  },[isSuccess,isError,navigate])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center text-gray-900">Admin Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Invalid email address",
                },
              })}
              className={`block w-full p-3 mt-1 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              placeholder="admin@example.com"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              type="password"
              className={`block w-full p-3 mt-1 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="mt-2 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <Button
              type="submit"
              className="flex justify-center w-full bg-blue-gray-700"
              {...(undefined as any)}
            >
              Log In
            </Button>
          </div>
        </form>
        <p className="text-sm text-center text-gray-500">
          © {new Date().getFullYear()} EventVerse. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
