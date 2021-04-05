import React, { useState } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import MapGL, { Source, Layer, FeatureState, NavigationControl, Popup } from '@urbica/react-map-gl';
import actionHover from './actions/actionHover';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from "mapbox-gl";
import { OmitProps } from 'antd/lib/transfer/ListBody';

const MapComponent = (props) => {

    const [hoveredStateId, setHoveredStateId] = useState(props.layers[0].hoveredStateId);
    const [viewport, setViewport] = useState(props.layers[0].viewport);

    const onHover = (event) => {
        //console.log(event.lngLat);
        let lat = event.lngLat.lat;
        let lng = event.lngLat.lng;
        if (event.features.length > 0) {
          const nextHoveredStateId = event.features[0].id;
          //console.log(props.layers[0].hoveredStateId);
          if (props.layers[0].hoveredStateId !== nextHoveredStateId) {
            props.setHoveredStateId(nextHoveredStateId, 'pointer', {latitude:lat, longitude:lng});
          }
        }
      };     
      const onLeave = () => {
        if (props.layers[0].hoveredStateId) {
          props.setHoveredStateId(null, '');
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
        maxZoom={7}
        minZoom={3}
        cursorStyle={props.layers[0].cursorStyle}
        onViewportChange={setViewport}
        {...viewport}
      >
        <NavigationControl showCompass showZoom position='top-right' />
        <Source
          id='states'
          type='geojson'
          //data='https://raw.githubusercontent.com/ValeriaBelousova/json_data/master/temp_surface_id.geojson'
          data={props.layers[props.layers[0].value].options.url}
        />
        <Layer
          id='state-fills'
          type='fill'
          source='states'
          paint={{
            'fill-color': ["match", ['get', 't'], 
                          -2, "#1f345a",
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
          onHover={onHover}
          onLeave={onLeave}
        />
        {(props.layers[0].hoveredStateId && props.layers[0].hoveredLegend) &&
          <Popup longitude={props.layers[0].currentMouse.longitude} latitude={props.layers[0].currentMouse.latitude} closeButton={false} closeOnClick={false}>
            {props.layers[props.layers[0].value].id_temp[props.layers[0].hoveredStateId - 1]}°C👋
          </Popup>}
        {props.layers[0].hoveredStateId && 
          <FeatureState id={props.layers[0].hoveredStateId} source='states' state={{ hover: true }} />}
    </MapGL>
      );
  };
  
  const mapStateToProps = (state) => {
    return {
      layers: state.layers
    };
  };
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      setHoveredStateId: actionHover,
      
    }, dispatch);
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(MapComponent);