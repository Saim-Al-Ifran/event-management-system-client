// AddUserForm.tsx
import React, { useState } from 'react';
 
import { Button, Input, Typography, Card, Navbar } from '@material-tailwind/react';
import { NavLink } from 'react-router-dom';

const AddUser: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

   
    const newUser = {
      username,
      phoneNumber,
      email,
      password,
    };

    console.log('User added:', newUser);

  
  };

  return (
    <div>
 
     <Navbar className="bg-[#607D8B] p-4" {...(undefined as any)}>
        <div className="container mx-auto flex justify-between items-center">
          <Typography variant="h5" color="white" className="font-bold" {...(undefined as any)}>
            Add new user
          </Typography>
          <div className="flex space-x-4">
             <NavLink to="/dashboard/users">
                <Button
                  variant="text"
                  color="white"
                  {...(undefined as any)}
                >
                  View Users
                </Button>
             </NavLink>

  
          </div>
        </div>
      </Navbar>
      {/* Form Section */}
      <div className="flex justify-center items-center   bg-gray-50 pt-10">
        
        <Card className="max-w-lg p-8 shadow-lg rounded-lg" {...(undefined as any)}>
          <Typography variant="h4" color="blue-gray" className="text-center mb-4" {...(undefined as any)}>
            Add a New User
          </Typography>
          <Typography className="text-center text-gray-600 mb-6" {...(undefined as any)}>
            Please fill in the details below to create a new user profile.
          </Typography>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-4">
              <Input
                type="text"
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full"
                required
                {...(undefined as any)}
              />
            </div>
            <div className="mb-4">
              <Input
                type="text"
                label="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full"
                required
                {...(undefined as any)}
              />
            </div>
            <div className="mb-4">
              <Input
                type="email"
                label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                required
                {...(undefined as any)}
              />
            </div>
            <div className="mb-4">
              <Input
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
                required
                {...(undefined as any)}
              />
            </div>
            <div className="text-center">
              <Button type="submit" color="blue-gray" className="w-full" {...(undefined as any)}>
                Add User
              </Button>
            </div>
          </form>
          <Typography variant="small" color="gray" className="mt-4 text-center" {...(undefined as any)}>
            Make sure the details are accurate before submitting the form.
          </Typography>
        </Card>
      </div>
    </div>
  );
};

export default AddUser;
