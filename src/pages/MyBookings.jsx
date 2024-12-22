import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/room-bookings?email=${user?.email}`)
      .then((res) => setBookings(res.data));
  }, []);
  return (
    <div>
      <h1>This is my booking {bookings.length}</h1>

      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Type</th>
                <th>Details</th>
                <th>Update</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {bookings.length < 1 ? (
                <h1>No Booking Available</h1>
              ) : (
                bookings.map((room) => (
                  <tr key={room._id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img src={room.image} alt={room.type} />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{room.type}</div>
                          <div className="text-sm opacity-50">
                            {room.capacity} persons
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {room.description}
                      <br />
                      <span className="badge badge-ghost badge-sm">
                        Price: {room.price}$
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-neutral btn-xs">
                        Update Date
                      </button>
                    </td>
                    <th>
                      <button className="btn btn-error btn-xs">Cancel</button>
                    </th>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
