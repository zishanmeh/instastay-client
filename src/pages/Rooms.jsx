import { useLoaderData } from "react-router-dom";

const Rooms = () => {
  const rooms = useLoaderData();
  return (
    <div>
      <h1>Here is all the rooms {rooms.length}</h1>
    </div>
  );
};

export default Rooms;
