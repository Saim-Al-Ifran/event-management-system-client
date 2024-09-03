// AddCategoryForm.tsx
import React, { useState } from 'react';
import { Input, Button, Textarea, Typography, Card, Avatar,Navbar } from '@material-tailwind/react';
import { NavLink } from 'react-router-dom';

const AddCategory: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Perform validation and handle the form submission
    const newCategory = {
      name,
      description,
      image,
    };

    console.log('Category added:', newCategory);

    // Reset the form
    setName('');
    setDescription('');
    setImage(null);
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
                <Button
                  variant="text"
                  color="white"
                  {...(undefined as any)}
                >
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              label="Category Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
              required
              {...(undefined as any)}
            />
          </div>
          <div>
            <Textarea
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full"
              required
              {...(undefined as any)}
            />
          </div>
          <div className="flex flex-col items-center">
            {imagePreview ? (
              <Avatar src={imagePreview} alt="Category Preview" className="w-32 h-32 mb-4"  {...(undefined as any)}/>
            ) : (
              <div className="w-32 h-32 flex justify-center items-center border-2 border-dashed border-gray-300 mb-4">
                <Typography color="gray" {...(undefined as any)}>Image Preview</Typography>
              </div>
            )}
            <Input
              type="file"
              onChange={handleImageChange}
              className="w-full"
              accept="image/*"
              required
              {...(undefined as any)}
            />
          </div>
          <div className="text-center">
            <Button type="submit" className="w-full" color="blue-gray" {...(undefined as any)}>
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
