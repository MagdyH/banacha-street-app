import React, { useState, useEffect } from 'react';
import './App.css';
import ReactMapboxGl, { ZoomControl } from 'react-mapbox-gl';
import Airport from './airport';
import data from './apiResult.json';

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoibWFnZHloODgiLCJhIjoiY2thMHJ0azFyMDRzMjNtbjJlOXdqd3J2aiJ9.mHk2dV-Xeg4tkOaji92ltA'
});

function App() {

  const [locations, setLocations] = useState(data.result);
  const [centerPoint, setCenterPoint] = useState({ lat: 52.1672369, lng: 20.9678911 });


  // this is to handle APi call depending on zoom change in real application
  useEffect(() => {
    //api call by zoom level
    //setLocations(data.result);
  });


  return (
    <div className="App" >
      <div>
        <Map
          center={[centerPoint.lng, centerPoint.lat]}
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: '100vh',
            width: '100vw'
          }}
          
          onMove={(map) => {
            
            setCenterPoint({ lat: map.getCenter().lat, lng: map.getCenter().lng });
          }}
          onStyleData={(map) => {
            map.setMaxZoom(15);
            map.setMinZoom(1.5);
            locations && locations.traffic.forEach((route) => {
              let data = locations.airports.filter(airport => airport.iata_code === route.airport_pair[0].type
                || airport.iata_code === route.airport_pair[1].type);
              let coordinates = [];
              if (data) {
                data.map(route => (
                  coordinates.push([route.longitude, route.latitude])
                ));
              }

              //add lines layer between airports 
              map.addLayer({
                "id": `${route.airport_pair[0].type}_${route.airport_pair[1].type}`,
                "type": "line",
                "source": {
                  "type": "geojson",
                  "data": {
                    "type": "Feature",
                    "properties": {},
                    "geometry": {
                      "type": "LineString",
                      "coordinates": coordinates
                    }
                  }
                },
                "layout": {
                  "line-join": "round",
                  "line-cap": "round"
                },
                "paint": {
                  "line-color": route.volume > 0 && route.volume <= 5 ? "#0000FF" :
                    route.volume > 5 && route.volume <= 10 ? "#FFA500" : route.volume > 10 ? "#FF0000" : "#888",
                  "line-width": route.volume > 10 ? 10 : route.volume
                }
              })

            })
          }}
        >

          {
            locations && locations.airports.map(airport => (
              <Airport airport={airport} />
            ))
          }

          <ZoomControl />
        </Map>;
        </div>
    </div>
  );
}

export default App;
