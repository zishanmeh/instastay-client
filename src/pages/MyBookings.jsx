import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { Helmet } from "react-helmet";
import moment from "moment";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [startDate, setStartDate] = useState(new Date());

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:3000/room-bookings?email=${user?.email}`)
      .then((res) => setBookings(res.data));
  }, []);

  const handleConfirmUpdate = () => {
    const formattedDate = format(startDate, "dd/MM/yyyy");
    console.log(formattedDate);
    console.log(selectedBookingId);

    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking._id === selectedBookingId
          ? { ...booking, booking_day: formattedDate }
          : booking
      )
    );

    axios
      .patch(`http://localhost:3000/update-booking-date/${selectedBookingId}`, {
        booking_day: formattedDate,
      })
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your booking has been updated",
            showConfirmButton: false,
            timer: 1500,
          });
          document.getElementById("closeMyBookingModal").click();
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };

  const handleCancel = (id, id2, booking_day) => {
    const bookingDate = booking_day;
    const currentDate = moment();
    const parsedBookingDate = moment(bookingDate, "DD/MM/YYYY").startOf("day");
    const parsedCurrentDate = currentDate.startOf("day");
    const canCancel = parsedCurrentDate.isBefore(
      parsedBookingDate.clone().subtract(1, "day")
    );
    if (!canCancel) {
      Swal.fire({
        icon: "error",
        title: "Cannot cancel",
        text: "Booking date is too close or already passed.",
      });
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/delete/booking/${id}`)
          .then((res) => {
            if (res.status === 200) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              setBookings((prevBookings) =>
                prevBookings.filter((room) => room._id !== id)
              );
              axios
                .patch(`http://localhost:3000/update-availability-true/${id2}`)
                .then((res2) => console.log(res2.data));
            }
          });
        navigate("/my-bookings");
      }
    });
  };

  const openModal = (id) => {
    setSelectedBookingId(id);
    document.getElementById("update_booking_modal").showModal();
  };
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Bookings</title>
      </Helmet>

      <div className="w-fit mx-auto">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Type</th>
                <th>Details</th>
                <th>Update</th>
                <th>Delete</th>
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
                      Booking day :{room?.booking_day}
                      <br />
                      <span className="badge badge-ghost badge-sm">
                        Price: {room.price}$
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-neutral btn-xs"
                        onClick={() => openModal(room._id)}
                      >
                        Update Date
                      </button>
                    </td>
                    <th>
                      <button
                        className="btn btn-error btn-xs"
                        onClick={() =>
                          handleCancel(room._id, room.id, room.booking_day)
                        }
                      >
                        Cancel
                      </button>
                    </th>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      {/* <button className="btn" onClick={()=>document.getElementById('update_booking_modal').showModal()}>open modal</button> */}
      <dialog
        id="update_booking_modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update your booking date</h3>
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
          <div>
            <button
              className="btn btn-neutral btn-outline text-center mt-5"
              onClick={handleConfirmUpdate}
            >
              Confirm
            </button>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn" id="closeMyBookingModal">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyBookings;
