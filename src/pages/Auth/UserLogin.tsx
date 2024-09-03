import React from 'react';
import { Card, CardBody, Input, Button, Typography } from '@material-tailwind/react';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';

const UserLogin: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6" {...(undefined as any)}>
        <CardBody {...(undefined as any)}>
          <Typography variant="h4" color="blue-gray" className="text-center mb-6" {...(undefined as any)}>
            Login to Your Account
          </Typography>
          <form className="space-y-6">
            <div>
              <Input
                type="email"
                color="blue"
                size="lg"
                label="Email"
                className="mb-4"
                {...(undefined as any)}
              />
            </div>
            <div>
              <Input
                type="password"
                color="blue"
                size="lg"
                label="Password"
                className="mb-4"
                {...(undefined as any)}
              />
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
