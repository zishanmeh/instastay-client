import { useEffect } from "react";
import { useState } from "react";
import Modal from "react-modal";
import offerImg from "../assets/offer.jpg";
Modal.setAppElement("#root");
const Promotional = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    // Open the modal when the component mounts
    setIsModalOpen(true);
  }, []);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="z-50">
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
            zIndex: 50,
          },
        }}
      >
        <h2 className="text-2xl font-bold text-center">
          Special Offers Just for You!
        </h2>
        <p className="w-2/3 mx-auto text-center my-5 text-gra">
          Book now and get up to 30% off on your next stay!
        </p>
        <img
          src={offerImg}
          alt="Special Offer"
          className="w-44 mx-auto"
          style={{ borderRadius: "10px", marginTop: "10px" }}
        />
        <button
          onClick={closeModal}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#ff6b6b",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default Promotional;
