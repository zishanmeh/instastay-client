import { Helmet } from "react-helmet";
import Banner from "../shared/Banner";
import Map from "../shared/MyMap";
import TopRooms from "../shared/TopRooms";
import Facilities from "../shared/Facilities";
import HomeAbout from "../shared/HomeAbout";

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
      <div className="mb-14">
        <TopRooms></TopRooms>
      </div>
      <div>
        <Facilities></Facilities>
      </div>
      <div>
        <HomeAbout></HomeAbout>
      </div>
    </div>
  );
};

export default Home;
