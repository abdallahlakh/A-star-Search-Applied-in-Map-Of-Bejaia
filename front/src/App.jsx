import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import "leaflet/dist/leaflet.css";


function App() {
  const [position, setPosition] = useState([36.7343865,5.0096411]);
  const [position2, setPosition2] = useState([36.7422528,5.0340447]);
  const [data, setData] = useState(null);
  const [organizedCoords, setOrganizedCoords] = useState([]);
  const [draw, setDraw] = useState([36.7343865,5.0096411]);
  
  const handleClick = (e) => {
    const { lat, lng } = e.latlng;
    setPosition([lat, lng]);
  };

  const handleClick2 = (e) => {
    const { lat, lng } = e.latlng;
    setPosition2([lat, lng]);
  };

  const ClickEvents = () => {
    useMapEvents({
      click: handleClick,
    });
    return null;
  };

  const ClickEvents2 = () => {
    useMapEvents({
      click: handleClick2,
    });
    return null;
  };

  useEffect(() => {
    if (data) {
      setOrganizedCoords(data);
    }
  }, [data]);

  return (
    <div>
      <h1>Give me Here Your Source Location:</h1>
      <MapContainer center={position} zoom={13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            Your Source location = {position[0]}==={position[1]}
          </Popup>
        </Marker>
        <ClickEvents />
      </MapContainer>

      <h1>Give me Your Destination Location:</h1>

      <MapContainer center={position} zoom={13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            Your Source location = {position[0]}==={position[1]}
          </Popup>
        </Marker>
        <Marker position={position2}>
          <Popup>
            Your Target location = {position2[0]}==={position2[1]}
          </Popup>
        </Marker>
        <ClickEvents2 />
      </MapContainer>

      

      <button onClick={async (e) => {
  e.preventDefault();
  try {
    const res = await fetch('http://localhost:5000', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        start_city: [position],
        end_city: [position2]
      })
    })
    if (!res.ok) throw new Error(res.status);
  } catch (error) {
    console.error('Error:', error);
  }
}}>
  Start
  </button>
  </div>
  )
}

export default App;




