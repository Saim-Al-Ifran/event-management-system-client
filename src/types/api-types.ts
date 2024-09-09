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

export interface GetBookingsParams extends PaginationParams {}