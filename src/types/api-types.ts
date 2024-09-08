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
