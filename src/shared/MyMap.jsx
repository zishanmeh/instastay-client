import { Map, Marker } from "pigeon-maps";
const MyMap = () => {
  return (
    <div className="mt-10">
      <Map
        height={300}
        defaultCenter={[41.1652532, -8.6185147]}
        defaultZoom={15}
      >
        <Marker width={50} anchor={[41.1652532, -8.6185147]} />
      </Map>
    </div>
  );
};

export default MyMap;
