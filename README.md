# Event Management System (EMS)

## Overview
The Event Management System (EMS) is a comprehensive platform designed to streamline event management processes for admins and users. It includes features for managing categories, events, bookings, feedback, and settings, with role-based access for Super-Admins, Admins, and Users.

This documentation provides details on the functionalities of the EMS Admin Panel and User Module.

---

## Admin Panel
The Admin Panel is designed for Super-Admins and Admins to efficiently manage the platform.

### **Super-Admin Features**
1. **Role Management**:
   - Assign roles (User, Admin).
   - Delete or block users (User, Admin).

2. **Category Management**:
   - Create, read, update, and delete categories.

3. **Event Management**:
   - Create, read, update, and delete events.

4. **Booking Management**:
   - View a list of booking data.
   - Delete booking data upon user request.

5. **Feedback Management**:
   - View feedback from users.

6. **Website Settings**:
   - Update website settings including:
     - Logo
     - Social links
     - Site name
     - Footer description

7. **Utility Features**:
   - Pagination and searching in:
     - User Management
     - Category Management
     - Event Management
     - Booking Management

### **Admin Features**
1. **User Management**:
   - Create users.
   - Delete or block users.

2. **Category Management**:
   - Create, read, update, and delete categories.

3. **Event Management**:
   - Create, read, update, and delete events.

4. **Booking Management**:
   - View and delete booking data upon user request.

5. **Feedback Management**:
   - View feedback from users.

6. **Website Settings**:
   - Same settings features as Super-Admins.

7. **Utility Features**:
   - Same pagination and searching functionalities as Super-Admins.

---

## User Module
The User Module is designed for end-users to interact with the platform.

### **Registration and Login**
1. **Registration**:
   - Register using Google (OAuth) or system registration.

2. **Login**:
   - Google login users cannot change their password.
   - System-registered users can change their password.

### **Profile Management**
- Users can update their profile information.

### **Event Booking**
1. **Book Events**:
   - Users can book events.

2. **Manage Bookings**:
   - Retrieve booking data.
   - Request deletion of booking data.

### **Categories and Events**
1. **Categories**:
   - View all categories (publicly accessible).

2. **Events**:
   - View event data with advanced features:
     - Filtering
     - Sorting
     - Searching
     - Pagination

### **Feedback**
- Users can send feedback through a "Contact Us" form.

---

## Features Summary
### Admin/Super-Admin
- User Role Management
- Category Management
- Event Management
- Booking Management
- Feedback Viewing
- Website Settings Customization
- Pagination and Searching in Management Modules

### Users
- Registration (Google OAuth/System Registration)
- Profile Management
- Event Booking and Management
- Public Viewing of Categories and Events
- Feedback Submission

---

## Technical Details
### **Technologies Used**
- **Backend**: Node.js, Express.js
- **Database**: MongoDB,Mongoose
- **Authentication**: Google OAuth(firebase), JWT
- **Frontend**: React,Typescript (Admin Panel & User Interface)
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit,RTK Query

### **Deployment**
- Hosted on firebase
- **Live Demo**: [View Application](https://event-management-system-26d04.web.app/)

## Contact
For further inquiries or support, contact us at:
- **Email**: phpmysql811@gmail.com

