import { Helmet } from "react-helmet";
import MyMap from "../shared/MyMap";

const Contact = () => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Contact</title>
      </Helmet>
      <h1 className="font-bold text-4xl text-center mb-10">Visit us today</h1>
      <MyMap></MyMap>
    </div>
  );
};

export default Contact;
