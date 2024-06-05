import React, { useEffect, useState, useRef } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { IUser } from "../../interfaces/user";

interface LeafletMapProps {
  users?: IUser[];
  zoom?: number;
  setRow?: (e: IUser) => void;
}

const Skeleton: React.FC = () => <div className="h-72 bg-neutral-400 rounded"></div>;

const Maps: React.FC<LeafletMapProps> = ({ users, zoom = 1, setRow }) => {
  const [centerList, setCenterList] = useState<[number, number]>([0, 0]);
  const firstUpdate = useRef(true);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (users && users.length > 0) {
      const lats = users.map((user) => parseFloat(user.address.geo.lat));
      const lngs = users.map((user) => parseFloat(user.address.geo.lng));

      const minLat = Math.min(...lats);
      const maxLat = Math.max(...lats);
      const minLng = Math.min(...lngs);
      const maxLng = Math.max(...lngs);

      const newCenter: [number, number] = [(minLat + maxLat) / 2, (minLng + maxLng) / 2];
      setCenterList(newCenter);
      setKey((prevKey) => prevKey + 1);
    }
  }, [users]);

  return (
    <div className="w-full h-full">
      {centerList ? (
        <MapContainer
          key={key}
          center={centerList}
          zoom={zoom}
          scrollWheelZoom={false}
          style={{ width: "100%", height: "100%" }}
          dragging
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=fXmTwJM642uPLZiwzhA1"
          />
          {users?.map((user) => (
            <Marker
              key={user.id}
              eventHandlers={{
                click: () => {
                  if (setRow) {
                    setRow(user);
                  }
                },
              }}
              position={[parseFloat(user.address.geo.lat), parseFloat(user.address.geo.lng)]}
            />
          ))}
        </MapContainer>
      ) : (
        <Skeleton />
      )}
    </div>
  );
};

export default Maps;
