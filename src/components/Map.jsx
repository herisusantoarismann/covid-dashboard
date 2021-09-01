import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import axios from "axios";

export const Map = () => {
  const [data, setData] = useState();
  const getData = () => {
    return axios
      .get("https://corona.lmao.ninja/v2/countries")
      .then((res) => setData(res.data));
  };
  useEffect(() => {
    getData();
  }, []);
  console.log(data);
  return (
    <MapContainer
      center={{ lat: 51.505, lng: -0.09 }}
      zoom={2}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data != undefined
        ? data.map((item, idx) => {
            console.log(item);
            return (
              <Marker
                position={[item.countryInfo.lat, item.countryInfo.long]}
                key={idx}
              >
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            );
          })
        : ""}
    </MapContainer>
  );
};
