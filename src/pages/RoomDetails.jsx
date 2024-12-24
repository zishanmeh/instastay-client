import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { FaBed } from "react-icons/fa6";
import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";
import StarRatings from "react-star-ratings";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import Rating from "react-rating-stars-component";
import { MdOutlineStreetview } from "react-icons/md";
import { IoIosResize } from "react-icons/io";
import { Helmet } from "react-helmet";
import noDataAnim from "../assets/noDataAnim.json";
import Lottie from "lottie-react";

const RoomDetails = () => {
  const room = useLoaderData();
  const { user } = useContext(AuthContext);
  const [startDate, setStartDate] = useState(new Date());
  const [bookings, setBookings] = useState([]);
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState("");
  const [review, setReview] = useState([]);
  console.log(room._id);
  console.log(bookings);
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/room-bookings?email=${user.email}`, {
          withCredentials: true,
        })
        .then((res) => setBookings(res.data))
        .catch((error) => console.error(error));
    }
  }, [user]);

  // load review
  useEffect(() => {
    axios
      .get(`http://localhost:3000/all-reviews?id=${room._id}`)
      .then((res) => {
        setReview(res.data);
      });
  }, []);
  const navigate = useNavigate();
  const {
    _id,
    type,
    capacity,
    size,
    view,
    description,
    image,
    facilities,
    price,
    availability,
  } = room;

  const handleBooking = () => {
    document.getElementById("closeBookingModal").click();
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You need to login first for booking",
      });

      navigate("/login");
      return;
    }
    if (!availability) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Room is not available",
      });
      return;
    }
    const formattedDate = format(startDate, "dd/MM/yyyy");
    const bookingSummary = {
      id: _id,
      booking_day: formattedDate,
      type,
      capacity,
      size,
      view,
      description,
      image,
      facilities,
      price,
      availability,
      userName: user?.displayName,
      userEmail: user?.email,
    };
    axios
      .post("http://localhost:3000/room/booking", bookingSummary)
      .then((data) => {
        axios
          .patch(`http://localhost:3000/update-availability-false/${_id}`)
          .then((res) => {
            if (data.data.insertedId) {
              setBookings((prevBookings) => [...prevBookings, bookingSummary]);
              Swal.fire({
                title: "Booking successfull",
                icon: "success",
                draggable: false,
              });
              navigate(`/room/${_id}`);
            }
          });
      });
  };

  // Rating

  const changeRating = (newRating) => {
    setRating(newRating);
  };

  const changeFeedback = (e) => {
    setFeedback(e.target.value);
  };
  // submitting review
  const handleSubmitReview = () => {
    document.getElementById("reviewModalClose").click();
    if (feedback.length < 1) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Write at least 1 character",
      });
      return;
    }
    const newReview = {
      rating,
      feedback,
      userName: user.displayName,
      roomId: room._id,
      image: user.photoURL,
    };
    axios.post("http://localhost:3000/review", newReview).then((res) => {
      if (res.status === 200) {
        setReview((prevReviews) => [newReview, ...prevReviews]);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Thanks for your review",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleOpenModal = () => {
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You have to login first",
      });
      return;
    }
    for (const book of bookings) {
      if (book.id === room._id) {
        document.getElementById("reviewModal").showModal();
        return;
      }
    }
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "You didn't book this room",
    });
  };

  return (
    <div className="my-10">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{room?.type}</title>
      </Helmet>
      <h1 className="text-center text-4xl font-bold">{type}</h1>
      <div className="flex justify-center items-center gap-4 my-4">
        <p className="w-fit flex items-center justify-center gap-2">
          <FaBed color="#333" size={20}></FaBed> {capacity} Persons
        </p>
        <p className="w-fit flex items-center justify-center gap-2">
          <MdOutlineStreetview color="#333" size={20}></MdOutlineStreetview>{" "}
          {view} view
        </p>
        <p className="w-fit flex items-center justify-center gap-2">
          <IoIosResize color="#333" size={20}></IoIosResize> {size}
        </p>
      </div>
      <div className="w-full relative">
        <img className="w-full rounded-md" src={image} alt={type} />
        <p
          className={`absolute top-2 right-4 ${
            availability
              ? "bg-green-200 text-green-700"
              : "bg-red-200 text-red-700"
          } px-4 py-2 rounded-full font-semibold`}
        >
          {availability ? "Available" : "Unavailable"}
        </p>
      </div>
      <div>
        <p className="text-center my-5">{description}</p>
      </div>
      <div className="flex justify-around items-center">
        <div>
          <h2 className="text-center text-3xl font-bold">Facilities</h2>
          <ul className="mt-5 text-left">
            {facilities.map((fac, idx) => (
              <li className="mx-auto mb-2" key={idx}>
                {fac}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-2xl font-bold">Room Price: ${price}</p>
          <button
            className="btn btn-neutral mt-3"
            onClick={() => document.getElementById("my_modal_5").showModal()}
          >
            Book Now!
          </button>
        </div>
      </div>
      {/* Review */}
      <div className="flex flex-col justify-center">
        <button
          className="btn text-center btn-neutral btn-outline my-5 w-fit mx-auto"
          // onClick={() => document.getElementById("reviewModal").showModal()}
          onClick={handleOpenModal}
        >
          Review Now
        </button>
      </div>
      <div>
        {/* <h1 className="text-3xl font-bold">There is no Review available</h1>
         */}
        <h1 className="text-4xl text-center font-bold mb-10">All reviews</h1>
        {review.length < 1 ? (
          <Lottie
            className="max-w-xs mx-auto"
            animationData={noDataAnim}
          ></Lottie>
        ) : (
          review.map((rev) => (
            <div
              key={rev._id}
              className="max-w-lg mx-auto bg-base-300 px-5 py-8 rounded-md shadow-md mb-5"
            >
              <div className="avatar flex flex-col justify-center">
                <div className="w-20 rounded-full mx-auto">
                  <img src={rev?.image} />
                </div>
              </div>
              <h1 className="text-sm text-gray-600 text-center">
                {rev?.userName}
              </h1>
              <div className="w-fit text-center mx-auto">
                <Rating
                  count={rev.rating} // Total stars
                  value={rev.rating} // Current rating value (e.g., 4)
                  size={24} // Size of stars
                  edit={false} // Disable editing
                  activeColor="#ffd700" // Yellow color for active stars
                  color="#d3d3d3" // Gray color for inactive stars
                />
              </div>
              <div className="text-center">
                <p className="w-fit mx-auto flex text-gray-800">
                  <FaQuoteLeft className="mr-2"></FaQuoteLeft>
                  {rev?.feedback}
                  <FaQuoteRight className="ml-2"></FaQuoteRight>
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal for booking */}
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-5">Booking summary</h3>
          <div className="w-fit mx-auto">
            <div>
              <img src={image} alt={type} />
            </div>

            <div className="flex justify-center mt-5 w-fit mx-auto items-center gap-2">
              <div>
                <p>Select your date: </p>
              </div>
              <div className=" border w-fit border-neutral mx-auto px-4 py-2 rounded-full">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  minDate={new Date()}
                  dateFormat="dd/MM/yy"
                />
              </div>
            </div>
            <ul className="text-left w-fit mx-auto flex flex-col gap-2 mt-5">
              <li>Total: ${price}</li>
              <li>Room Type: {type}</li>
              <li>Capacity: {capacity} persons</li>
              <li>Size: {size}</li>
              <li>View: {view}</li>
            </ul>
            <div className="flex justify-centers">
              <button
                className="btn btn-neutral btn-outline mt-4 w-fit mx-auto"
                onClick={handleBooking}
              >
                Confirm
              </button>
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn" id="closeBookingModal">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>

      {/* Modal for take reviews*/}
      <dialog id="reviewModal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div>
            <h1>Leave a Review</h1>
            <StarRatings
              rating={rating}
              starRatedColor="gold"
              changeRating={changeRating}
              numberOfStars={5}
              name="rating"
            />
          </div>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Username</span>
            </div>
            <input
              type="text"
              value={user?.displayName}
              disabled
              className="input input-bordered w-full"
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Write your feedback here</span>
            </div>
            <textarea
              onChange={changeFeedback}
              className="input input-bordered w-full"
            ></textarea>
          </label>
          <div>
            <button
              className="btn btn-neutral mt-4"
              onClick={handleSubmitReview}
            >
              Submit
            </button>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn" id="reviewModalClose">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default RoomDetails;
