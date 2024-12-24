import { Link } from "react-router-dom";
import room from "../assets/roomSlider2Sm.jpg";
import { Helmet } from "react-helmet";
const About = () => {
  return (
    <div className="hero min-h-screen rounded-lg">
      <Helmet>
        <meta charSet="utf-8" />
        <title>About</title>
      </Helmet>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src={room} className="max-w-lg rounded-lg shadow-2xl" />
        <div>
          <h1 className="text-5xl font-bold">Insta Stay</h1>
          <p className="py-6">
            Welcome to InstaStay, your trusted partner for seamless hotel
            bookings! We specialize in connecting you with the perfect stays,
            offering a wide range of accommodations tailored to your preferences
            and budget. At InstaStay, we prioritize convenience, affordability,
            and exceptional customer service, ensuring every booking experience
            is smooth and hassle-free. Whether you’re planning a weekend getaway
            or a long vacation, InstaStay is here to make your travel dreams
            come true!
          </p>
          <Link to="/rooms" className="btn btn-neutral">
            Get rooms
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
