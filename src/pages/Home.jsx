import { Helmet } from "react-helmet";
import Banner from "../shared/Banner";
import Map from "../shared/MyMap";

const Home = () => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home- InstaStay</title>
      </Helmet>
      <div>
        <Banner></Banner>
      </div>
      <div className="my-14">
        <h1 className="text-center text-3xl font-bold">Visit our place</h1>
        <Map></Map>
      </div>
    </div>
  );
};

export default Home;
