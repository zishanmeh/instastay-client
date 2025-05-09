import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { FaCity } from "react-icons/fa6";
import { BsSunset } from "react-icons/bs";
import { MdOutlinePersonAddAlt } from "react-icons/md";

import { Link, useLoaderData } from "react-router-dom";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    axios
      .get("https://insta-stay-server.vercel.app/")
      .then((res) => setRooms(res.data));
  }, []);
  const handleShortByPrice = () => {
    axios
      .get("https://insta-stay-server.vercel.app/roomsSortByPrice")
      .then((res) => setRooms(res.data));
  };
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>All rooms</title>
      </Helmet>
      <div className="flex justify-between items-center mb-10">
        <Link className="btn btn-neutral" to={-1}>
          Back
        </Link>
        <button
          className="btn btn-neutral btn-outline"
          onClick={handleShortByPrice}
        >
          Short by price
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 justify-between items-stretch gap-5">
        {rooms.map((room) => (
          <Link
            className="card bg-base-100 shadow-xl cursor-pointer hover:scale-105 duration-700"
            key={room._id}
            to={`/room/${room._id}`}
          >
            <figure className="">
              <p className="font-semibold badge badge-neutral badge-outline badge-sm text-white absolute left-2 top-2 z-30">
                {room.price} USD
              </p>
              <div
                className={`badge badge-secondary ${
                  room.availability
                    ? "bg-green-200 text-green-700"
                    : "bg-red-200 text-red-700"
                } border-none absolute z-30 right-2 top-2`}
              >
                {room.availability ? "Available" : "Unavailable"}
              </div>
              <img
                src={room.image}
                alt={`Image of ${room.type}`}
                className="relative"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title font-normal">{room.type}</h2>
              <p className="text-left text-sm font-normal">
                {room.description}
              </p>
              <div className="flex gap-3 justify-between items-center font-light">
                <div className="card-actions flex justify-center items-center text-sm gap-2">
                  <MdOutlinePersonAddAlt size={15} /> {room.capacity} persons
                </div>
                <div className="flex justify-center items-center text-sm gap-2">
                  <BsSunset size={15} /> {room.view} view
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Rooms;
