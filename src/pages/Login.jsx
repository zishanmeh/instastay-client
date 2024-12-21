import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleSIgnIn from "../shared/GoogleSIgnIn";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";

const Login = () => {
  const { signInUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Password error",
        text: "Password must me at least 6 characters, 1 uppercase and 1 lowercase",
      });
      return;
    }

    signInUser(email, password)
      .then((result) => {
        const user = result.user;
        Swal.fire({
          title: `welcome back ${user.displayName}`,
          icon: "success",
          draggable: false,
        });
        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => toast.error(err.message));
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleLogin}>
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
                className="input input-bordered"
                name="password"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
            <div>
              <p>
                Don't have an account?{" "}
                <Link to="/register" className="hover:link">
                  Register now!
                </Link>
              </p>
            </div>
          </form>
          <p className="mb-3">Or</p>
          <GoogleSIgnIn></GoogleSIgnIn>
        </div>
      </div>
    </div>
  );
};

export default Login;
