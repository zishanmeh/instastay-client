import roomImg from "../assets/roomSlider2Sm.jpg";
const HomeAbout = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-6">
      <div className="md:w-1/2">
        <h1 className="text-3xl font-bold">About US</h1>
        <hr className="border border-b-neutral my-5 w-14" />
        <p className="text-gray-600">
          Welcome to InstaStay, your trusted partner for seamless hotel
          bookings! We specialize in connecting you with the perfect stays,
          offering a wide range of accommodations tailored to your preferences
          and budget. At InstaStay, we prioritize convenience, affordability,
          and exceptional customer service, ensuring every booking experience is
          smooth and hassle-free. Whether you’re planning a weekend getaway or a
          long vacation, InstaStay is here to make your travel dreams come true!
        </p>
      </div>
      <div className="md:w-1/2">
        <img src={roomImg} alt="Room" className="w-full" />
      </div>
    </div>
  );
};

export default HomeAbout;
