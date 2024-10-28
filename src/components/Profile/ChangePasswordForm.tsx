import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Button } from '@material-tailwind/react';
import toast from 'react-hot-toast';
import { useChangePasswordMutation, useGetUserProfileQuery } from '../../features/user/userApi';
 

const ChangePasswordForm: React.FC = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

 const [changePassword, { isLoading, isSuccess, error }] = useChangePasswordMutation();
 const { data: userData } = useGetUserProfileQuery();
 const isBlocked = userData?.profile?.isBlocked;

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password changed successfully");
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { currentPassword, newPassword, confirmPassword } = passwordData;

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
  
    
    try {
      await changePassword({ oldPassword:currentPassword, newPassword });
    } catch (error) {
      toast.error("Failed to change password");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md mt-8 mb-8">
      <h2 className="text-2xl font-bold mb-6">Change Password</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
            Current Password
          </label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={passwordData.currentPassword}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        <div className="mt-6">
          <Button
            loading={isLoading}
            type="submit"
            className="px-4 py-2 bg-[#3F51B5] text-white rounded-md"
            {...(undefined as any)}
            disabled={isBlocked}
          >
            Change Password
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
