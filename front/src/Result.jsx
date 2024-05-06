import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import rawData from './output.json'; // Import the JSON data

function Result() {
  // Reverse the coordinates in the imported data
  const data = rawData.map(coord => coord.reverse());

  // Set initial position to the first coordinate in the data
  const [position, setPosition] = useState(data[0]);

  // Set destination to the last coordinate in the data
  const destination = data[data.length - 1];

  return (
    <div>
        the path cardinalitites:
        #########{data}#######

        <h1>Here is the path:</h1>
      <MapContainer center={position} zoom={13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={destination}>
          <Popup>
            Your Destination location = {destination[0]}==={destination[1]}
          </Popup>
        </Marker>
        <Polyline pathOptions={{ color: 'blue' }} positions={data} /> {/* Use the imported data */}
      </MapContainer>
    </div>
  )
}

export default Result;