import { Helmet } from "react-helmet";
import { Link, useLoaderData } from "react-router-dom";

const Rooms = () => {
  const rooms = useLoaderData();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between items-stretch gap-5">
      <Helmet>
        <meta charSet="utf-8" />
        <title>All rooms</title>
      </Helmet>
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
              <div className="badge badge-secondary">
                {room.availability ? "Available" : "Unavailable"}
              </div>
            </h2>
            <p className="text-left">{room.description}</p>
            <div className="card-actions justify-end">
              <div className="badge badge-outline">{room.capacity} persons</div>
              <div className="badge badge-outline">{room.view} view</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Rooms;
