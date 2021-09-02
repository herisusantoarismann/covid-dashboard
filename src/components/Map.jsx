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
      .get("https://disease.sh/v3/covid-19/countries")
      .then((res) => setData(res.data));
  };
  useEffect(() => {
    getData();
  }, []);
  console.log(data);
  return (
    <MapContainer center={{ lat: 51.505, lng: -0.09 }} zoom={2}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data != undefined
        ? data.map((item, idx) => {
            return (
              <Marker
                position={[item.countryInfo.lat, item.countryInfo.long]}
                key={idx}
              >
                <Popup>
                  <img src={item.countryInfo.flag} alt="" height={10} />
                  {item.country} <br />
                  Confirm : {item.cases} <br />
                  Deaths : {item.deaths} <br />
                  Recovered : {item.recovered} <br />
                  Last Update : {item.updated}
                </Popup>
              </Marker>
            );
          })
        : ""}
    </MapContainer>
  );
};
