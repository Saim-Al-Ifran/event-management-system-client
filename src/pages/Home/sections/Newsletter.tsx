import React from 'react';
import { Input, Button, Typography } from '@material-tailwind/react';

const Newsletter: React.FC = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container px-4 mx-auto text-center">
        {/* Title and Description */}
        <Typography variant="h2" className="text-3xl font-bold mb-4 text-[#3F51B5]" {...(undefined as any)}>
          Subscribe to Our Newsletter
        </Typography>
        <Typography variant="paragraph" className="mb-8 text-gray-600" {...(undefined as any)}>
          Stay updated with the latest events, offers, and news! Enter your email address below and join our mailing list.
        </Typography>

        {/* Input and Button */}
        <div className="flex justify-center items-center gap-4 max-w-md mx-auto">
          <Input
            type="email"
            color="blue"
            placeholder="Enter your email"
            className="flex-1 focus:border-[#3F51B5] focus:ring-[#3F51B5]"
            {...(undefined as any)}
          />
          <Button
            className="rounded-full bg-[#3F51B5] hover:bg-[#3F51B5] focus:bg-[#3F51B5]"
            {...(undefined as any)}
          >
            Subscribe
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
