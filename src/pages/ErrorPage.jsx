import Lottie from "lottie-react";
import errorAnim from "../assets/errorPageAnim.json";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import { Link } from "react-router-dom";
const ErrorPage = () => {
  return (
    <div className="flex flex-col justify-center">
      <div>
        <Navbar></Navbar>
      </div>
      <div className="max-w-sm mx-auto">
        <Lottie animationData={errorAnim}></Lottie>
      </div>
      <Link to={"/"} className="btn btn-neutral my-5 text-center w-fit mx-auto">
        Back to home
      </Link>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default ErrorPage;
