export interface UserLoginInput {
    email: string;
    password: string;
  }
export interface Category {
    _id: string;
    name: string;
    image:string;
    description: string;
  }

export interface CategoryRequest{
    page?: number;
    limit?: number;
    search?: string;
  }
export interface FeedbackRequest{
  page?: number;
  limit?: number;
}
export interface FeedbackResponse{
  _id:string,
  title: string,
  email: string,
  phoneNumber: string,
  message: string,
  status: string,
  author: string,
  createdAt: string,
}
