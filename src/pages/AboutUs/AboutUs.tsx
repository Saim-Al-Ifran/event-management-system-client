import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-[#3F51B5] mb-4">About Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We are dedicated to creating a platform that connects people with exciting events and experiences. Our mission is to inspire, inform, and facilitate the discovery of memorable moments.
          </p>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row items-center md:items-start">
          {/* Image */}
          <div className="w-full md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
              alt="About Us"
              className="rounded-lg shadow-lg"
            />
          </div>

          {/* Text Content */}
          <div className="w-full md:w-1/2 mt-8 md:mt-0 md:ml-8">
            <h3 className="text-2xl font-semibold text-[#3F51B5] mb-4">Our Story</h3>
            <p className="text-gray-700 mb-6">
              Founded in 2024, our platform has grown from a small startup to a leading event discovery service. We believe in the power of experiences to bring people together, create connections, and enrich lives.
            </p>
            <h3 className="text-2xl font-semibold text-[#3F51B5] mb-4">Our Mission</h3>
            <p className="text-gray-700 mb-6">
              Our mission is to make it easier for everyone to find and attend events that match their interests and passions. We strive to provide a diverse range of events, from music festivals to educational workshops, ensuring there is something for everyone.
            </p>
            <h3 className="text-2xl font-semibold text-[#3F51B5] mb-4">Our Values</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Inclusivity: We welcome all types of events and attendees.</li>
              <li>Integrity: We operate with transparency and fairness.</li>
              <li>Innovation: We constantly seek new ways to improve our platform.</li>
              <li>Community: We believe in the power of bringing people together.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
