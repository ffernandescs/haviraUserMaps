import React, { useEffect, useState, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { UserSummary } from "../../interfaces/user";
import { Map } from "leaflet";

interface LeafletMapProps {
  users?: UserSummary[];
  zoom?: number;
  setRow?: (e: UserSummary) => void;
}

const Skeleton: React.FC = () => <div className="h-72 bg-neutral-400 rounded"></div>;

const Maps: React.FC<LeafletMapProps> = ({ users, zoom = 3, setRow }) => {
  const [centerList, setCenterList] = useState<[number, number]>([0, 0]);
  const firstUpdate = useRef(true);
  const mapRef = useRef<Map | null>(null);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (users && users.length > 0) {
      const lats = users.map((user) => user.lat);
      const lngs = users.map((user) => user.lng);

      const minLat = Math.min(...lats);
      const maxLat = Math.max(...lats);
      const minLng = Math.min(...lngs);
      const maxLng = Math.max(...lngs);

      const newCenter: [number, number] = [(minLat + maxLat) / 2, (minLng + maxLng) / 2];
      setCenterList(newCenter);
      if (mapRef.current) {
        mapRef.current.flyTo(newCenter, zoom);
      }
    }
  }, [users]);

  return (
    <div className="w-full h-full">
      {centerList ? (
        <MapContainer
          center={centerList}
          dragging={true}
          zoom={zoom}
          scrollWheelZoom={true}
          zoomControl={true}
          className="absolute z-0 h-full w-full"
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
              position={[user.lat, user.lng]}
            >
              <Popup>
                <div className="flex flex-col gap-2 w-full">
                  <div>
                    <span className="font-bold">Nome: </span>
                    <span className="">{user.name}</span>
                  </div>
                  <div>
                    <span className="font-bold">Email: </span>
                    <span className="">{user.email}</span>
                  </div>
                  <div>
                    <span className="font-bold">Cidade: </span>
                    <span className="">{user.city}</span>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      ) : (
        <Skeleton />
      )}
    </div>
  );
};

export default Maps;
