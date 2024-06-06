import React, { useEffect, useState, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { UserSummary } from "../../interfaces/user";
import { Map } from "leaflet";
import ComponentInput from "../ComponentInput";
import Logo from "../../assets/havira_logo.jpeg";

interface LeafletMapProps {
  users?: UserSummary[];
  setRow?: (e: UserSummary) => void;
  setSearchValeu?: (e: string) => void;
}

const Skeleton: React.FC = () => (
  <div className="bg-gray-300 w-full h-full flex items-center justify-center">
    <div className="relative">
      <div className="rounded-md overflow-hidden animate-pulse">
        <img src={Logo} width={80} alt="" className="w-20 h-20" />
      </div>
    </div>
  </div>
);

const Maps: React.FC<LeafletMapProps> = ({ users, setRow, setSearchValeu }) => {
  const [centerList, setCenterList] = useState<[number, number]>([0, 0]);
  const [zoom, setZoom] = useState(3);
  const firstUpdate = useRef(true);
  const mapRef = useRef<Map | null>(null);
  const [search, setSearch] = useState<string>("");

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

      setZoom(users.length > 1 ? 3 : 12);

      if (mapRef.current) {
        mapRef.current.flyTo(newCenter, zoom);
      }
    }
  }, [users, zoom]);

  return (
    <div className="w-full h-full relative">
      {users && (
        <div className="absolute top-0 left-10 z-[20] p-4 bg-transparent w-80 md:w-96">
          <ComponentInput
            label=""
            type="text"
            placeholder="Pesquisar usuário"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              if (setSearchValeu) {
                setSearchValeu(e.target.value);
              }
            }}
          />
        </div>
      )}

      {users?.length === 0 && (
        <div className="absolute top-20 left-14 z-10 px-4 py-2 bg-white w-72 md:w-[350px] rounded-sm transition ease-out duration-300">
          Nenhum resultado encontrado.
        </div>
      )}

      {users ? (
        <MapContainer
          center={centerList}
          dragging={true}
          zoom={zoom}
          scrollWheelZoom={true}
          zoomControl={true}
          className="absolute z-0 h-full w-full overflow-hidden"
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
                  <h1 className="font-bold text-lg text-center mb-2">Dados do usuário</h1>
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
