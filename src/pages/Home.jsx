import { Helmet } from "react-helmet";
import Banner from "../shared/Banner";

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
    </div>
  );
};

export default Home;
