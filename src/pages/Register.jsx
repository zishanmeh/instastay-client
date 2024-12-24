import { Link, useNavigate } from "react-router-dom";
import GoogleSIgnIn from "../shared/GoogleSIgnIn";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import registerAnim from "../assets/signupAnim.json";
import Lottie from "lottie-react";
import { Helmet } from "react-helmet";

const Register = () => {
  const { createNewUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password must me at least 6 characters, 1 uppercase and 1 lowercase",
      });
      return;
    }

    createNewUser(email, password)
      .then((result) => {
        updateUserProfile({ displayName: name, photoURL: photo })
          .then((res) => {
            Swal.fire({
              title: `Registration successfull`,
              icon: "success",
              draggable: false,
            });
            navigate("/");
          })
          .catch((err) => toast.error(err.message));
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  return (
    <div className="hero min-h-screen">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Register</title>
      </Helmet>
      <div className="hero-content flex-col lg:flex-row-reverse">
        {/* <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div> */}
        <Lottie className="" animationData={registerAnim}></Lottie>
        <div className="card bg-base-100 w-full shadow-2xl pb-5">
          <form className="card-body" onSubmit={handleRegister}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                className="input input-bordered"
                name="name"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                placeholder="Photo url"
                className="input input-bordered"
                name="photo"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                name="email"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                name="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-neutral">Register</button>
            </div>
            <div>
              <p>
                Already have an account?{" "}
                <Link to="/login" className="hover:link">
                  Login now!
                </Link>
              </p>
            </div>
          </form>
          <p className="mb-3 text-center">Or</p>
          <GoogleSIgnIn></GoogleSIgnIn>
        </div>
      </div>
    </div>
  );
};

export default Register;
