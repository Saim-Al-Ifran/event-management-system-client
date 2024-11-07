import React from 'react';
import { Typography } from '@material-tailwind/react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { useGetSettingsQuery } from '../../features/settings/settingsApi';

const Footer: React.FC = () => {
  const {data} = useGetSettingsQuery();
 
  const facebookLink = data?.socialLinks?.facebook;   
  const twitterLink = data?.socialLinks?.twitter;   
  const instagramLink = data?.socialLinks?.instagram;   
  return (
    <footer className="bg-[#3F51B5] text-white py-10">
      <div className="container px-4 mx-auto">
        {/* Top Section: About Us */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Description */}
          <div className="md:col-span-1">
            <Typography variant="h5" className="mb-4 font-semibold" {...(undefined as any)}>
              About Us
            </Typography>
            <Typography variant="paragraph" className="text-gray-200" {...(undefined as any)}>
              Discover events around you and never miss out on an amazing experience. Join us to stay updated on the latest events, offers, and news!
            </Typography>
          </div>
        </div>

        {/* Middle Section: Navigation Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <Typography variant="h6" className="mb-4 font-semibold" {...(undefined as any)}>
              Quick Links
            </Typography>
            <ul>
              <li className="mb-2">
                <a href="#" className="hover:underline">Home</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">Events</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">About Us</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">Contact</a>
              </li>
            </ul>
          </div>
          <div>
            <Typography variant="h6" className="mb-4 font-semibold" {...(undefined as any)}>
              Resources
            </Typography>
            <ul>
              <li className="mb-2">
                <a href="#" className="hover:underline">Blog</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">FAQs</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">Support</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">Privacy Policy</a>
              </li>
            </ul>
          </div>
          <div>
            <Typography variant="h6" className="mb-4 font-semibold" {...(undefined as any)}>
              Connect
            </Typography>
            <ul>
              <li className="mb-2">
                <a href={facebookLink} className="hover:underline">Facebook</a>
              </li>
              <li className="mb-2">
                <a href={twitterLink} className="hover:underline">Twitter</a>
              </li>
              <li className="mb-2">
                <a href={instagramLink} className="hover:underline">Instagram</a>
              </li>

            </ul>
          </div>
          <div>
            <Typography variant="h6" className="mb-4 font-semibold" {...(undefined as any)}>
              Address
            </Typography>
            <Typography variant="paragraph" className="text-gray-200" {...(undefined as any)}>
              123 Event Street, City Name, Country
            </Typography>
            <Typography variant="paragraph" className="text-gray-200 mt-2" {...(undefined as any)}>
              Email: info@events.com
            </Typography>
            <Typography variant="paragraph" className="text-gray-200" {...(undefined as any)}>
              Phone: +123 456 7890
            </Typography>
          </div>
        </div>

        {/* Bottom Section: Social Media Icons */}
        <div className="flex justify-center md:justify-between items-center py-4 border-t border-gray-700">
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-400">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-gray-400">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-gray-400">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-gray-400">
              <FaLinkedinIn />
            </a>
          </div>
          <Typography variant="paragraph" className="text-gray-400" {...(undefined as any)}>
            © 2024 Events. All rights reserved.
          </Typography>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
