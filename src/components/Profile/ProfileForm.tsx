import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import avatar from '../../../public/images/avatar.png';
import { useGetUserProfileQuery, useUpdateProfileImageMutation, useUpdateUserProfileMutation } from '../../features/user/userApi';
import { ProfileData } from '../../types/types';
import { Button } from '@material-tailwind/react';
import toast from 'react-hot-toast';

const ProfileForm: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    username: '',
    email: '',
    phoneNumber: '',
    image: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { data: userData, isSuccess } = useGetUserProfileQuery();
  const [updateProfileImage, { isLoading: updateLoading, isSuccess: isUpdateSuccess }] = useUpdateProfileImageMutation();
  const [updateUserProfile, { isLoading: updateUserLoading, isSuccess: isUserSuccess, error }] = useUpdateUserProfileMutation();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  const isBlocked = userData?.profile?.isBlocked;
  useEffect(() => {
    if (isUserSuccess) {
      toast.success("Updated profile successfully");
    }
  }, [isUserSuccess]);

  useEffect(() => {
    if (isUpdateSuccess) {
      toggleModal();
      toast.success("Successfully updated profile image");
    }
  }, [isUpdateSuccess]);

  useEffect(() => {
    if (isSuccess && userData) {
      setProfileData({
        username: userData?.profile.username,
        email: userData?.profile.email,
        phoneNumber: userData?.profile.phoneNumber,
        image: userData?.profile.image || '',
      });
      setImagePreview(userData?.profile.image || avatar);
    }
  }, [isSuccess, userData]);

  useEffect(() => {
    if (error) {
      toast.error("Failed to update profile");
    }
  }, [error]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const fileUrl = URL.createObjectURL(file);
      setImagePreview(fileUrl);
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await updateUserProfile({
        username: profileData.username,
        phoneNumber: profileData.phoneNumber,
      });
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (!isModalOpen) setImagePreview(profileData.image || avatar);
  };

  const handleSaveImage = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile);
      await updateProfileImage(formData);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Update Profile</h2>

      <div className="flex flex-col items-center mb-6">
        <img
          src={profileData.image ? profileData.image : avatar}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover mb-4"
          referrerPolicy="no-referrer"
        />
        <Button
           size='sm'
           onClick={toggleModal} 
           {...(undefined as any)}
           disabled={isBlocked}
        >
          Change Image
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={profileData.username}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={profileData.email}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            readOnly
          />
        </div>

        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={profileData.phoneNumber}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div className="mt-6">
          <Button
            loading={updateUserLoading}
            type="submit"
            className="px-4 py-2 bg-[#3F51B5] text-white rounded-md"
            {...(undefined as any)}
            disabled={isBlocked}
          >
            Update Profile
          </Button>
        </div>
      </form>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Change Profile Image</h2>
            <div className="flex flex-col items-center mb-6">
              <img
                src={imagePreview}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover mb-4"
              />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mb-4"
            />
            <div className="flex justify-end space-x-2">
              <Button
                onClick={toggleModal}
                className="px-4 py-2 hover:bg-gray-300 rounded-md bg-gray-400"
                {...(undefined as any)}
              >
                Cancel
              </Button>
              <Button
                loading={updateLoading}
                onClick={handleSaveImage}
                className="px-4 py-2 bg-[#3F51B5] text-white rounded-md"
                {...(undefined as any)}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileForm;
