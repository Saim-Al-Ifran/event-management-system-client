import { User } from "./types";

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface UserLoginInput {
  email: string;
  password: string;
}

export interface Category {
  _id: string;
  name: string;
  image: string;
  description: string;
}
export interface CategoryRequest extends PaginationParams {}

export interface FeedbackRequest extends PaginationParams {}

export interface FeedbackResponse {
  _id: string;
  title: string;
  email: string;
  phoneNumber: string;
  message: string;
  status: string;
  author: string;
  createdAt: string;
}

export interface Event {
  _id: string;
  title: string;
  description: string;
  date: string; 
  location: string;
  capacity: number;
  image: string;
  category: string;
  price: number;
  status: string;
  author: string;
  __v: number;
}

export interface Booking {
  _id: string;
  eventId: string;
  event:Event;
  attendeId: string;
  requestToDelete: boolean;
  ticketQuantity: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface BookingResponse {
  data: Booking[];
  totalRecords: number;
  totalPages: number;
  prevPage: number | null;
  nextPage: number | null;
  page: number;
}

export interface GetBookingsParams extends PaginationParams {
  categoryFilter?:string;
  sort?:string
}

export interface Event{
  _id: string;
  title: string;
  description: string;
  date: string;
  capacity: number;
  image: string;
  category:string;
  price: number;
  status: string;
  author: string;
}

export interface EventResponse{
  data: Event[];
  totalRecords: number;
  totalPages: number;
  prevPage: number | null;
  nextPage: number | null;
  page: number;
}

export interface GetEventsParams extends PaginationParams{}

export interface UserRequest{
     id:string;
     role:"admin" | "super-admin";
     entity:"entities" | "users";
     data:User;
}

export interface UserUpdateResponse{
      message:string;
      user:User
}
export interface AllUserResponse{
  message:string;
  data:User[];
}

export interface GetUsersParams extends PaginationParams{
  role:"admin" | "super-admin";
  entity:"entities" | "users";
}

export interface CreateUserResponse{
   message:string;
   user:User;  
}

export interface UserDeleteRequest{
  id:string;
  role:"admin" | "super-admin";
  entity:"entities" | "users";
  
}

export interface SingleUserResponse{
  message:string;
  user:User;
}