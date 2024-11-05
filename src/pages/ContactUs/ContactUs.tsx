import React, { useEffect, useState } from 'react';
import { useSendMessageMutation } from '../../features/contact/contactApi';
import toast from 'react-hot-toast';
import { Button } from '@material-tailwind/react';

const ContactUs: React.FC = () => {
  const [sendMessage, { isSuccess, isError,isLoading,error }] = useSendMessageMutation();
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  useEffect(()=>{
         if(isSuccess){
          setTitle("");
          setEmail("");
          setPhoneNumber("");
          setMessage("");
          toast.success("Feedback send successfully ");
         }    
         if(isError){
          console.log(error);
          
          toast.error("Something went wrong!");
         }

  },[isSuccess,isError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendMessage({ 
        title,
        email,
        phoneNumber,
        message
      });

      
 
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <section
      className="relative py-16 bg-cover bg-center"
      style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0)' }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Contact Us</h2>
          <p className="text-white">We'd love to hear from you! Whether you have a question or need support, feel free to reach out.</p>
        </div>

        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Get in Touch</h3>
              <p className="text-gray-600 mb-4">Feel free to contact us using the following details:</p>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <i className="fa-solid fa-envelope text-[#3F51B5] text-2xl mr-3"></i>
                  <span className="text-gray-600">info@example.com</span>
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-phone text-[#3F51B5] text-2xl mr-3"></i>
                  <span className="text-gray-600">+1 234 567 890</span>
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-map-marker-alt text-[#3F51B5] text-2xl mr-3"></i>
                  <span className="text-gray-600">123 Main Street, Anytown, USA</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full md:w-1/2 px-4">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Send Us a Message</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Title
                  </label>
                  <input
                    className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:bg-white focus:border-[#3F51B5]"
                    id="title"
                    type="text"
                    placeholder="Your Name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:bg-white focus:border-[#3F51B5]"
                    id="email"
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
                    Phone Number
                  </label>
                  <input
                    className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:bg-white focus:border-[#3F51B5]"
                    id="phoneNumber"
                    type="tel"
                    placeholder="Your Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:bg-white focus:border-[#3F51B5]"
                    id="message"
                    rows={4}
                    placeholder="Your Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="text-left">
                  <Button
                    type="submit"
                    className="px-6 py-2 bg-[#3F51B5] text-white font-bold rounded-lg hover:bg-[#2C3E50] transition duration-300"
                    loading={isLoading}
                    {...(undefined as any)}
                  >
                    Send Message
                  </Button>
                </div>
 
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
