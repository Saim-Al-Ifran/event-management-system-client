import React, { useEffect, useState } from 'react';
import {
  Input,
  Button,
  Textarea,
  Typography,
  Card,
  Avatar,
  Select,
  Option,
  Navbar,
} from '@material-tailwind/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useGetSingleEventQuery, useUpdateEventMutation } from '../../../features/Events/eventsApi';
import toast from 'react-hot-toast';
import { useGetCategoriesQuery } from '../../../features/categories/categoriesApi';
import { Category } from '../../../types/api-types';

const EditEvent: React.FC = () => {
  const { id } = useParams();
  const {data:event} = useGetSingleEventQuery(id);
  const [title, setTitle] = useState<string>('');
  const [date, setDate] = useState<Date | null>(null);
  const [location, setLocation] = useState<string>('');
  const [capacity, setCapacity] = useState<number | string>('');
  const [category, setCategory] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [price, setPrice] = useState<number | string>('');
  const [description, setDescription] = useState<string>('');
  const [updateEvent, { isLoading, isSuccess, isError, error }] = useUpdateEventMutation();
  const { data: categories } = useGetCategoriesQuery();
  const navigate = useNavigate();

 
 
  
  useEffect(()=>{
    if (event) {
      setTitle(event.title);
      setDate(new Date(event.date));
      setLocation(event.location);
      setCapacity(event.capacity);
      setCategory(event.category._id);
      setPrice(event.price);
      setDescription(event.description);
      setImagePreview(event.image);  
      setStatus(event.status)
    }
  },[event]);
   
  useEffect(() => {
    if (isSuccess) {
      toast.success('Event updated successfully!');
      navigate('/dashboard/events');
    }
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isSuccess, isError, navigate]);


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !date || !location || !capacity || !category || !status || !price || !description) {
      toast.error('Please fill out all fields.');
      return;
    }
    console.log({
      title,
      date,
      location,
      capacity,
      category,
      status,
      price,
      description,

    });
    
    const formData = new FormData();
    formData.append('title', title);
    if (date) formData.append('date', date.toISOString());
    formData.append('location', location);
    formData.append('capacity', capacity.toString());
    formData.append('category', category);
    formData.append('status', status);
    formData.append('price', price.toString());
    formData.append('description', description);

    if (image) {
      formData.append('image', image);
    }

    try {
        await updateEvent({id,data:formData}); 
    } catch (err) {
      console.error('Failed to update event', err);
    }
  };
 
  return (
    <>
      <Navbar className="bg-[#607D8B] p-4" {...(undefined as any)}>
        <div className="container mx-auto flex justify-between items-center">
          <Typography variant="h5" color="white" className="font-bold" {...(undefined as any)}>
            Edit Existing Event
          </Typography>
          <div className="flex space-x-4">
            <NavLink to="/dashboard/events">
              <Button variant="text" color="white" {...(undefined as any)}>
                View all events
              </Button>
            </NavLink>
          </div>
        </div>
      </Navbar>

      <div className="p-6 flex justify-center items-center bg-gray-50 min-h-screen">
        <Card className="w-full max-w-4xl p-6 shadow-lg rounded-lg" {...(undefined as any)}>
          <Typography variant="h4" className="text-center mb-6" {...(undefined as any)}>
            Edit Event
          </Typography>

          {/* Show error message if there's an error */}
          {isError && (
            <Typography color="red" className="text-center" {...(undefined as any)}>
              {error && 'data' in error ? (error.data as { message: string }).message : 'Failed to Update event'}
            </Typography>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
              {/* Column 1 */}
              <div className="w-full md:w-1/2 space-y-4">
                <Input
                  type="text"
                  label="Event Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full"
                  {...(undefined as any)}
                />
                <div>
                  <Typography className="mb-2 text-gray-600" {...(undefined as any)}>Event Date</Typography>
                  <DatePicker
                    selected={date}
                    onChange={(selectedDate) => setDate(selectedDate)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    dateFormat="MMMM d, yyyy"
                    placeholderText="Select event date"
                    
                  />
                </div>
                <Input
                  type="text"
                  label="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full"
                  {...(undefined as any)}
                />
                <Input
                  type="number"
                  label="Capacity"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  {...(undefined as any)}
                />
                <div>
                  <Typography className="mb-2 text-gray-600" {...(undefined as any)}>Category</Typography>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="category-select" className="text-sm font-medium text-gray-700">
                      Select Category
                    </label>
                    <select
                      id="category-select"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="block w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:border-[#EFF2F3] focus:ring-blue-500"
                    >
                      <option value="" disabled>Select a category</option>
                      {categories?.data?.map(({ _id, name }: Category) => (
                        <option key={_id} value={_id}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>

 
                </div>
                <div>
                  <Typography className="mb-2 text-gray-600" {...(undefined as any)}>Status</Typography>
                  <Select
                    label="Select Status"
                    value={status}
                    onChange={(value) => setStatus(value as string)}
                    required
                    {...(undefined as any)}
                  >
                    <Option value="active">Active</Option>
                    <Option value="pending">Pending</Option>
                    <Option value="completed">Completed</Option>
                  </Select>

 
                </div>
              </div>

              {/* Column 2 */}
              <div className="w-full md:w-1/2 space-y-4">
                <div className="flex flex-col items-center">
                  {imagePreview ? (
                    <Avatar src={imagePreview} alt="Event Image Preview" className="w-32 h-32 mb-4" {...(undefined as any)} />
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
                    {...(undefined as any)}
                  />
                </div>
                <Input
                  type="number"
                  label="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full"
                  {...(undefined as any)}
                />
                <Textarea
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full"
                  {...(undefined as any)}
                />
              </div>
            </div>
            <div className="text-center">
            <Button type="submit" className="w-full" color="blue-gray" loading={isLoading} {...(undefined as any)}>
                 Update Event
            </Button>
          </div>
          </form>
        </Card>
      </div>
    </>
  );
};

export default EditEvent;
