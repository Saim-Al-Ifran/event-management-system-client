import React, { useEffect, useState } from 'react';
import { Button, Input, Typography, Card, Navbar, Select, Option } from '@material-tailwind/react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useGetUserByIdQuery, useUpdateUserMutation } from '../../../features/user/userApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import toast from 'react-hot-toast';
import useUserRoles from '../../../hooks/auth/useCheckRoles';

const EditUser: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [blockStatus, setBlockStatus] = useState<boolean>(false); // boolean for block status
  const { id } = useParams();
  const getUser = useSelector((state: RootState) => state.auth);
  const [role, setRole] = useState<string>(''); 
  const { role: userRole } = getUser?.user;
  const entity = userRole === 'super-admin' ? 'entities' : 'users';
  const { isSuperAdmin } = useUserRoles();
  const navigate = useNavigate();
  const { data: userData } = useGetUserByIdQuery({ role: userRole, entity, id });
  const [updateUser, { isError: updatingError, isSuccess: isUpdateSuccess, isLoading, error }] = useUpdateUserMutation();

  useEffect(() => {
    if (userData?.user) {
      setUsername(userData?.user.username);
      setPhoneNumber(userData?.user.phoneNumber);
      setEmail(userData?.user.email);
      setRole(userData?.user.role);
      setBlockStatus(userData?.user.isBlocked || false); // Setting block status
    }
    if (updatingError) {
      toast.error("Failed to load user data.");
    }
  }, [userData?.user, updatingError]);

  useEffect(() => {
    if (isUpdateSuccess) {
      toast.success("User updated successfully!");
      navigate("/dashboard/users");
    }
    if (updatingError) {
      toast.error(error?.data?.message);
    }
  }, [isUpdateSuccess, updatingError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      username,
      phoneNumber,
      isBlocked: blockStatus 
    });
    
    let formData;
    if (userRole === 'super-admin') {
      formData = {
        username,
        phoneNumber,
        email,
        role,
        isBlocked: blockStatus // Pass block status boolean
      };
    } else if (userRole === 'admin') {
      formData = {
        username,
        phoneNumber,
        isBlocked: blockStatus 
      };
    }

    try {
      await updateUser({ role: userRole, entity, id, data: formData });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar className="bg-[#607D8B] p-4" {...(undefined as any)}>
        <div className="container mx-auto flex justify-between items-center">
          <Typography variant="h5" color="white" className="font-bold" {...(undefined as any)}>
            Edit existing user
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
      
      {/* Form Section */}
      <div className="flex justify-center items-center bg-gray-50 pt-10">
        <Card className="max-w-lg p-8 shadow-lg rounded-lg" {...(undefined as any)}>
          <Typography variant="h4" color="blue-gray" className="text-center mb-4" {...(undefined as any)}>
            Edit User
          </Typography>
          <Typography className="text-center text-gray-600 mb-6" {...(undefined as any)}>
            Please fill in the details below to update the user profile.
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
                readOnly
                {...(undefined as any)}
              />
            </div>
            
            {isSuperAdmin && (
              <>
                <div className="mb-4">
                  <Select label="Assign Role" value={role} onChange={(value) => setRole(value as string)} {...(undefined as any)}>
                    <Option value="user">User</Option>
                    <Option value="admin">Admin</Option>
                  </Select>
                </div>
              </>
            )}
                <div className="mb-4">
                  <Select
                    label="Block Status"
                    value={blockStatus ? 'blocked' : 'active'}
                    onChange={(value) => setBlockStatus(value === 'blocked')}
                    {...(undefined as any)}
                  >
                    <Option value="active">Active</Option>
                    <Option value="blocked">Blocked</Option>
                  </Select>
                </div>
            <div className="text-center">
              <Button type="submit" color="blue-gray" className="w-full" loading={isLoading} {...(undefined as any)}>
                Edit User
              </Button>
            </div>
          </form>
          <Typography variant="small" color="gray" className="mt-4 text-center" {...(undefined as any)}>
            Ensure the details are accurate before submitting the form.
          </Typography>
        </Card>
      </div>
    </div>
  );
};

export default EditUser;
