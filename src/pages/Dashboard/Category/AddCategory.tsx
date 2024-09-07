import React, { useEffect, useState } from 'react';
import { Input, Button, Textarea, Typography, Card, Avatar, Navbar } from '@material-tailwind/react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { CategoryFormData } from '../../../types/types';
import { useCreateCategoryMutation } from '../../../features/categories/categoriesApi';
import toast from 'react-hot-toast';

const AddCategory: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CategoryFormData>();

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [createCategory,{isLoading,isError,isSuccess,error}] = useCreateCategoryMutation();
  const navigate = useNavigate();

  useEffect(()=>{
    
    if(isSuccess){
        toast.success("succesfully created category");
        navigate('/dashboard/categories');
    }
    if(isError){      
      toast.error(error?.data?.message);
    }
  },[isSuccess,isError])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: CategoryFormData) => {    
    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('image', data.image[0]); // Append the image file

    await createCategory(formData);

    reset();
    setImagePreview(null);
  };

  return (
    <>
      <Navbar className="bg-[#607D8B] p-4" {...(undefined as any)}>
        <div className="container mx-auto flex justify-between items-center">
          <Typography variant="h5" color="white" className="font-bold" {...(undefined as any)}>
            Add new category
          </Typography>
          <div className="flex space-x-4">
            <NavLink to="/dashboard/categories">
              <Button variant="text" color="white" {...(undefined as any)}>
                View categories
              </Button>
            </NavLink>
          </div>
        </div>
      </Navbar>

      <div className="p-6 flex justify-center items-center bg-gray-50 min-h-screen">
        <Card className="max-w-lg p-6 shadow-lg rounded-lg" {...(undefined as any)}>
          <Typography variant="h4" className="text-center mb-4" {...(undefined as any)}>
            Add a New Category
          </Typography>
          <Typography className="text-center text-gray-600 mb-6" {...(undefined as any)}>
            Please fill in the details below to create a new category.
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input
                type="text"
                label="Category Name"
                {...register('name', { required: 'Category name is required' })}
                className="w-full"
                {...(undefined as any)}
              />
              {errors.name && (
                <Typography color="red" className="text-sm mt-1" {...(undefined as any)}>
                  {errors.name.message}
                </Typography>
              )}
            </div>
            <div>
              <Textarea
                label="Description"
                {...register('description', { required: 'Description is required' })}
                className="w-full"
                {...(undefined as any)}
              />
              {errors.description && (
                <Typography color="red" className="text-sm mt-1" {...(undefined as any)}>
                  {errors.description.message}
                </Typography>
              )}
            </div>
            <div className="flex flex-col items-center">
              {imagePreview ? (
                <Avatar src={imagePreview} alt="Category Preview" className="w-32 h-32 mb-4" {...(undefined as any)}/>
              ) : (
                <div className="w-32 h-32 flex justify-center items-center border-2 border-dashed border-gray-300 mb-4">
                  <Typography color="gray" {...(undefined as any)}>Image Preview</Typography > 
                </div>
              )}
              <Input
                type="file"
                {...register('image', {
                  required: 'Category image is required',
                  onChange: handleImageChange,
                })}
                accept="image/*"
                className="w-full"
                {...(undefined as any)}
              />
              {errors.image && (
                <Typography color="red" className="text-sm mt-1" {...(undefined as any)}>
                  {errors.image.message}
                </Typography>
              )}
            </div>
            <div className="text-center">
              <Button type="submit" className="w-full" loading={isLoading} color="blue-gray" {...(undefined as any)}>
                Add Category
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AddCategory;
