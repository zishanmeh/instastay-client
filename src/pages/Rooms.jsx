import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between items-stretch gap-5">
        {rooms.map((room) => (
          <Link
            className="card bg-base-100 shadow-xl cursor-pointer hover:scale-105 duration-700"
            key={room._id}
            to={`/room/${room._id}`}
          >
            <figure>
              <img src={room.image} alt={`Image of ${room.type}`} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {room.type}
                <div
                  className={`badge badge-secondary ${
                    room.availability
                      ? "bg-green-200 text-green-700"
                      : "bg-red-200 text-red-700"
                  } border-none`}
                >
                  {room.availability ? "Available" : "Unavailable"}
                </div>
              </h2>
              <p className="text-left">{room.description}</p>
              <div className="card-actions justify-end items-center">
                <p className="font-bold badge badge-neutral">
                  Price: {room.price}$
                </p>
                <div className="badge badge-outline">
                  {room.capacity} persons
                </div>
                <div className="badge badge-outline">{room.view} view</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Rooms;
