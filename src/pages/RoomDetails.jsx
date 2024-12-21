import { useLoaderData } from "react-router-dom";
import { FaBed } from "react-icons/fa6";
import { FaRegDotCircle } from "react-icons/fa";

const RoomDetails = () => {
  const room = useLoaderData();
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

  return (
    <div className="my-10">
      <h1 className="text-center text-4xl font-bold">{type}</h1>
      <div className="flex justify-center items-center gap-4 my-4">
        <p className="w-fit flex items-center justify-center gap-2">
          <FaBed color="#333"></FaBed> {capacity} Persons
        </p>
        <p className="w-fit flex items-center justify-center gap-2">
          <FaBed color="#333"></FaBed> {view} Persons
        </p>
        <p className="w-fit flex items-center justify-center gap-2">
          <FaBed color="#333"></FaBed> {size} Persons
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
      <div>
        <button className="btn text-center btn-neutral btn-outline my-5">
          Review Now
        </button>
      </div>

      {/* Modal for booking */}
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-5">Booking summary</h3>
          <div className="">
            <div>
              <img src={image} alt={type} />
            </div>
            <ul className="text-left w-fit mx-auto flex flex-col gap-2 mt-5">
              <li>Total: ${price}</li>
              <li>Room Type: {type}</li>
              <li>Capacity: {capacity} persons</li>
              <li>Size: {size}</li>
              <li>View: {view}</li>
            </ul>
            <button className="btn btn-neutral btn-outline mt-4">
              Confirm
            </button>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default RoomDetails;
