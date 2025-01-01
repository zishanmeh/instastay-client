import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const TopRooms = () => {
  const [topRooms, setTopROoms] = useState([]);
  useEffect(() => {
    axios
      .get("https://insta-stay-server.vercel.app/latestRoom")
      .then((res) => setTopROoms(res.data));
  }, []);
  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-10">
        Our top latest room
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-stretch gap-5">
        {topRooms.map((room) => (
          <Link className="card bg-base-100 shadow-xl " key={room._id}>
            <figure>
              <img src={room.image} alt={`Image of ${room.type}`} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {room.type}
                <div className="badge badge-secondary">
                  {room.availability ? "Available" : "Unavailable"}
                </div>
              </h2>
              <p className="text-left">{room.description}</p>
              <div className="card-actions justify-end">
                <Link
                  className="btn btn-neutral cursor-pointer hover:scale-105 duration-700"
                  to={`/room/${room._id}`}
                >
                  Book Now!
                </Link>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopRooms;
