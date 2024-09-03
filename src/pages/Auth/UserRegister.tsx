import React from 'react';
import { Card, CardBody, Input, Button, Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

const UserRegister: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6"  {...(undefined as any)}>
        <CardBody  {...(undefined as any)}>
          <Typography variant="h4" color="blue-gray" className="text-center mb-6"  {...(undefined as any)}>
            Create an Account
          </Typography>
          <form className="space-y-6">
            <div>
              <Input
                type="text"
                color="blue"
                size="lg"
                label="Username"
                className="mb-4"
                {...(undefined as any)}
              />
            </div>
            <div>
              <Input
                type="tel"
                color="blue"
                size="lg"
                label="Phone Number"
                className="mb-4"
                {...(undefined as any)}
              />
            </div>
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
