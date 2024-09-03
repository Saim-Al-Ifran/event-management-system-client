// CreateEventForm.tsx
import React, { useState } from 'react';
import {
  Input,
  Button,
  Textarea,
  Typography,
  Card,
  Avatar,
  Select,
  Option,
  Navbar
} from '@material-tailwind/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { NavLink } from 'react-router-dom';

const AddEvent: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [date, setDate] = useState<Date | null>(null);
  const [location, setLocation] = useState<string>('');
  const [capacity, setCapacity] = useState<number | string>('');
  const [category, setCategory] = useState<string >('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [price, setPrice] = useState<number | string>('');
  const [description, setDescription] = useState<string>('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newEvent = {
      title,
      date,
      location,
      capacity: Number(capacity),
      category,
      image,
      price: Number(price),
      description,
    };

    console.log('New Event Created:', newEvent);

    // Reset form
    setTitle('');
    setDate(null);
    setLocation('');
    setCapacity('');
    setCategory('');
    setImage(null);
    setImagePreview('');
    setPrice('');
    setDescription('');
  };
 
  return (
  <>
    <Navbar className="bg-[#607D8B] p-4" {...(undefined as any)}>
        <div className="container mx-auto flex justify-between items-center">
          <Typography variant="h5" color="white" className="font-bold" {...(undefined as any)}>
            Create new event
          </Typography>
          <div className="flex space-x-4">
             <NavLink to="/dashboard/events">
                <Button
                  variant="text"
                  color="white"
                  {...(undefined as any)}
                >
                  View all events
                </Button>
             </NavLink>

  
          </div>
        </div>
     </Navbar>
    <div className="p-6 flex justify-center items-center bg-gray-50 min-h-screen">
      <Card className="w-full max-w-4xl p-6 shadow-lg rounded-lg" {...(undefined as any)}>
        <Typography variant="h4" className="text-center mb-6" {...(undefined as any)}>
          Create New Event
        </Typography>
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
                required
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
                  required
                />
              </div>
              <Input
                type="text"
                label="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full"
                required
                {...(undefined as any)}
              />
              <Input
                type="number"
                label="Capacity"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                className="w-full"
                required
                {...(undefined as any)}
              />
              <div>
                <Typography className="mb-2 text-gray-600" {...(undefined as any)}>Category</Typography>
                <Select
                  label="Select Category"
                  value={category}
                  onChange={(value:string) => setCategory(value)}
                  required
                  {...(undefined as any)}
                >
                  <Option value="Conference">Conference</Option>
                  <Option value="Workshop">Workshop</Option>
                  <Option value="Concert">Concert</Option>
                  <Option value="Seminar">Seminar</Option>
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
                  required
                  {...(undefined as any)}
                />
              </div>
              <Input
                type="number"
                label="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full"
                required
                {...(undefined as any)}
              />
              <Textarea
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full"
                required
                {...(undefined as any)}
              />
            </div>
          </div>
          <div className="text-center">
            <Button type="submit" className="w-full" color="blue-gray" {...(undefined as any)}>
              Create Event
            </Button>
          </div>
        </form>
      </Card>
    </div>
    </>
  );
};

export default AddEvent;
