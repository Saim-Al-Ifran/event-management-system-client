import React, { useEffect, useState } from 'react';
import { Button, Input, Typography, Card, Navbar, Select, Option } from '@material-tailwind/react';
import { NavLink, useNavigate } from 'react-router-dom';
import useUserRoles from '../../../hooks/auth/useCheckRoles';
import toast from 'react-hot-toast';
import { useCreateUserMutation } from '../../../features/user/userApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';

const AddUser: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<string>('user');  
  const { isSuperAdmin } = useUserRoles();
  const getUser = useSelector((state: RootState) => state.auth);
  const { role: userRole } = getUser?.user;
  const entity = userRole === 'super-admin' ? 'entities' : 'users';
  const [createUser, { isLoading, isError, isSuccess, error }] = useCreateUserMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully added a user");
      setUsername('');
      setPhoneNumber('');
      setEmail('');
      setPassword('');
      setRole('user');
      navigate('/dashboard/users');
    }

    if (isError) {
      console.error(error);
      toast.error(error?.data?.message || 'An unexpected error occurred.');
    }
  }, [isSuccess, isError, navigate, error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !phoneNumber || !email || !password) {
      toast.error('Please fill out all fields.');
      return;
    }

    const formData = {
      username,
      phoneNumber,
      email,
      password,
      role,
    };

    try {
      await createUser({ role: userRole, entity, data: formData });

      setUsername('');
      setEmail('');
      setPhoneNumber('');
      setPassword('');
      setRole('user');
    } catch (err) {
   
    }
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
              <Button variant="text" color="white" {...(undefined as any)}>
                View Users
              </Button>
            </NavLink>
          </div>
        </div>
      </Navbar>

      <div className="flex justify-center items-center bg-gray-50 pt-10">
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
                {...(undefined as any)}
              />
            </div>

            {isSuperAdmin && (
              <div className="mb-4">
                <Select label="Assign Role" value={role} onChange={(value) => setRole(value as string)} {...(undefined as any)}>
                  <Option value="user">User</Option>
                  <Option value="admin">Admin</Option>
                </Select>
              </div>
            )}

            <div className="text-center">
              <Button type="submit" color="blue-gray" className="w-full" disabled={isLoading} {...(undefined as any)}>
                {isLoading ? 'Adding...' : 'Add User'}
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
