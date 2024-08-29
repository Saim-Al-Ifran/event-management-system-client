import { Carousel, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";


const image2 = 'https://www.aljazeera.com/wp-content/uploads/2023/12/349C3KD-Preview-1704042429.jpg?resize=1170%2C780&quality=80';
const image1 = 'https://assets.editorial.aetnd.com/uploads/2010/02/lunarnewyearfestival.jpg';
const image3 = 'https://www.kayak.co.uk/news/wp-content/uploads/sites/5/2022/01/dest_thailand_chiang-mai_yi_peng-festival_gettyimages-687006760_universal_within-usage-period_26382.jpg';


const Banner = () => {
  return (
    <>
 
      <Carousel
        transition={{ duration: 2 }}
        className="rounded-xl h-[500px] mt-4 mb-4" // Set a consistent height for the carousel
        controls={false} // Remove arrows
        autoplay={true} // Set autoplay to true
        loop={true}
        indicators={true}
        autoplayDelay={6000}
        prevArrow={false}
        nextArrow={false}
        {...(undefined as any)}

      >
        <div className="relative flex items-center justify-center h-full">
          <img
            src={image1}
            alt="image 1"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h2 className="text-white text-4xl font-bold mb-4">
             Plan Your Perfect Event
            </h2>
            <p className="text-white text-lg mb-6">
             Create memorable events with our comprehensive management tools
            </p>
            <Link to="/events">
                <Button
                  size="lg"
                  className="bg-[#3F51B5]"
                  {...(undefined as any)}
                >
                  Explore Events
                </Button>
            </Link>

          </div>
        </div>
        <div className="relative flex items-center justify-center h-full">
          <img
            src={image2}
            alt="image 2"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h2 className="text-white text-4xl font-bold mb-4">
               Efficient Event Coordination
            </h2>
            <p className="text-white text-lg mb-6">
              Connect with like-minded learners and experts.
            </p>
            <Link to="/events">
                <Button
                  size="lg"
                  className="bg-[#3F51B5]"
                  {...(undefined as any)}
                >
                  Explore Events
                </Button>
            </Link>
          </div>
        </div>
        <div className="relative flex items-center justify-center h-full">
          <img
            src={image3}
            alt="image 3"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h2 className="text-white text-4xl font-bold mb-4">
              Start Your Journey
            </h2>
            <p className="text-white text-lg mb-6">
              Take the first step towards your educational goals.
            </p>
            <Link to="/events">
              <Button
                size="lg"
                className="bg-[#3F51B5]"
                {...(undefined as any)}
              >
                Explore Events
              </Button>
            </Link>

          </div>
        </div>
      </Carousel>
    </>
  );
};

export default Banner;

