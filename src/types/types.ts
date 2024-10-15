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

export interface SocialLinks {
  facebook: string;
  twitter: string;
  instagram: string;
}

export interface SettingsState {
  siteName: string;
  siteLogo: File | null;  
  footerDescription: string;
  socialLinks: SocialLinks;
}

export interface User{
  _id:string;
  image:string;
  username:string;
  email:string;
  role:string;
  isBlocked:boolean;
  phoneNumber:string
}
  
export interface TriangleBarProps {
  fill: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export  interface ChartDataPoint {
  name: string;
  uv: number;
  [key: string]: any;
}

export interface RegistrationcFormData {
  username: string;
  phoneNumber: string;
  email: string;
  password: string;
}
export interface LoginFormData {
  email: string;
  password: string;
}

export interface ProfileData {
  username: string;
  email: string;
  phoneNumber: string;
  image: string;
}

export interface Booking {
  _id: string;
  eventId: Event;
  attendeEmail: string;
  requestToDelete: boolean;
  amount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CustomModalProps {
  openModal: boolean;  
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>; 
  handlePaymentSubmit: () => void;  
}