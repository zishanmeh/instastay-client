import { MdOutlineFreeBreakfast } from "react-icons/md";
import { FaWifi } from "react-icons/fa6";
import { FaTrainSubway } from "react-icons/fa6";
import { FaCity } from "react-icons/fa6";
const Facilities = () => {
  return (
    <div className="mb-14">
      <h1 className="text-4xl font-bold text-center">Our facilities</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 justify-center md:justify-between items-center gap-10 mt-10">
        <section className="flex justify-start gap-4 items-start">
          <div>
            <MdOutlineFreeBreakfast size={40}></MdOutlineFreeBreakfast>
          </div>
          <div className="ml-6">
            <h1 className="text-2xl font-semibold">Free breakfast</h1>
            <p className="text-gray-600 mt-4">
              You easily access our free breakfast facility and enjoy with your
              partner.
            </p>
          </div>
        </section>
        <section className="flex justify-start gap-4 items-start">
          <div>
            <FaWifi size={40}></FaWifi>
          </div>
          <div className="ml-6">
            <h1 className="text-2xl font-semibold">Free unlimited wifi</h1>
            <p className="text-gray-600 mt-4">
              You and your partner or your family member can easily access our
              free wifi services.
            </p>
          </div>
        </section>
        <section className="flex justify-start gap-4 items-start">
          <div>
            <FaTrainSubway size={40}></FaTrainSubway>
          </div>
          <div className="ml-6">
            <h1 className="text-2xl font-semibold">Subway nearby</h1>
            <p className="text-gray-600 mt-4">
              Subway is like 3 minutes walk from our hotel.
            </p>
          </div>
        </section>
        <section className="flex justify-start gap-4 items-start">
          <div>
            <FaCity size={40}></FaCity>
          </div>
          <div className="ml-6">
            <h1 className="text-2xl font-semibold">City nearby</h1>
            <p className="text-gray-600 mt-4">
              City is like 5 minutes walk from our hotel. You can buy your all
              necessery thing from there.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Facilities;
