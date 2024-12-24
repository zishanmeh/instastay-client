import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../Provider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const GoogleSIgnIn = () => {
  const { signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        Swal.fire({
          title: `welcome back ${user.displayName}`,
          icon: "success",
          draggable: false,
        });
        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };
  return (
    <div className="flex justify-center">
      <button
        className="flex items-center gap-2 btn btn-neutral btn-outline"
        onClick={handleGoogleSignIn}
      >
        <FcGoogle></FcGoogle> Sign in with google
      </button>
    </div>
  );
};

export default GoogleSIgnIn;
