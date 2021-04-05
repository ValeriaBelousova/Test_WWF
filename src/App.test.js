import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import MapGL, { Source, Layer, FeatureState, NavigationControl, Popup } from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


function App() {
  const [hoveredStateId, setHoveredStateId] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 66.9,
    longitude: -170,
    zoom: 4.2
  });
  const onHover = (event) => {
    if (event.features.length > 0) {
      const nextHoveredStateId = event.features[0].id;
      console.log(nextHoveredStateId);
      if (hoveredStateId !== nextHoveredStateId) {
        setHoveredStateId(nextHoveredStateId);
      }
    }
  };
  const onHoverPopup = (event) => {
    console.log(event.features[0]);
  }
  
  const onLeave = () => {
    if (hoveredStateId) {
      setHoveredStateId(null);
    }
  };
  
  return (
    <MapGL
      style={{ width: '100%', height: '700px' }}
      mapStyle='mapbox://styles/mapbox/light-v9'
      accessToken={'pk.eyJ1IjoidmFsZXJpYWJlbG91c292YSIsImEiOiJjanBmMmt0c2cwNjQyM3FsZ2gzY2dvemNvIn0.skr82NeiNVFPUi-zxKKqiw'}
      latitude={viewport.latitude}
      longitude={viewport.longitude}
      zoom={viewport.zoom}
      onViewportChange={setViewport}
      {...viewport}
    >
      <NavigationControl showCompass showZoom position='top-right' />
      <Source
        id='states'
        type='geojson'
        data='https://raw.githubusercontent.com/ValeriaBelousova/json_data/master/temp_surface_id.geojson'
      />
      <Layer
        id='state-fills'
        type='fill'
        source='states'
        paint={{
          'fill-color': ["match", ['get', 't'], 
                        -1, "#2c4276", 
                        0, "#294888", 
                        1, "#4d89c5", 
                        2, "#78b2df",
                        3, "#aed6f1",
                        4, "#e0f1fc",
                        5, "#fffbd1",
                        6, "#f0b484",
                        7, "#e08c6b",
                        8, "#c66051",
                        9, "#a2354e",
                        10, "#792236",
                        11, "#5e1727",
                        12, "#462212", "#a817b0"],
          'fill-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 1.1, 0.9],
        }}
        onHover={onHover, onHoverPopup}
        onLeave={onLeave}
      />
      <Popup longitude={viewport.longitude} latitude={viewport.latitude} closeButton={false} closeOnClick={true}>
        Hi there! 👋
      </Popup>
    {hoveredStateId && <FeatureState id={hoveredStateId} source='states' state={{ hover: true }} />}
  </MapGL>
  );
}

export default App;