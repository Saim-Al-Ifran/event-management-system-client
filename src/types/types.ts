export interface IFormInput {
    email: string;
    password: string;
  }

export interface User {
    id: string;
    name: string;
    email: string;
    role: string; 
  }

export interface AuthState {
    accessToken?: string;
    user?: User;
  }
  
export interface UserLoginResponse {
    data: any;
    message:string;
    token: string;
    user: User;
  }

export interface DecodedToken {
    [key: string]: any;
} 

export interface CategoryFormData {
  name: string;
  description: string;
  image: FileList;
}
  
 