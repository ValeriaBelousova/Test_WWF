import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import actionLegend from './actions/actionLegend';
import './css/legend.css';
import { Row, Col } from 'antd';

const Legend = (props) => {
    //const { appStore, sidebarMenuFiltersStore } = useStores();
  
    return (
      <div
        type="flex"
        justify="center"
        align="middle"
        className="legend"
      >
        <Row className="legend-title">
          <Col span={24}>Температура, °C</Col>
        </Row>
        <div type="flex" justify="center" align="middle" className="legendInner">
        <Row>
          {props.layers[props.layers[0].value].colors.map((c, i) => {
            const enterCursore = (e) => {
              let key_id = {};
              if (props.layers[0].value === 1) {
                //console.log('key_id');
                key_id = {0:11, 1:10, 2:9, 3:8, 4:7, 5:6, 6:5, 7:4, 8:3, 9:2, 10:1, 11:12, 12:13, 13:14};
              }
              else {
                key_id = {0:1, 1:2, 2:3, 3:4, 4:5, 5:6, 6:7, 7:8, 8:9};
              }
                //let key_id = {0:11, 1:10, 2:9, 3:8, 4:7, 5:6, 6:5, 7:4, 8:3, 9:2, 10:1, 11:12, 12:13, 13:14};
                props.setHoveredStateId(key_id[e.target.accessKey], false);
                };
            const outCursore = (e) => {
                props.setHoveredStateId(null, true);
                };
            return <Col onMouseOver={enterCursore} onMouseOut={outCursore} 
                    accessKey={i} flex={2} key={i} 
                    style={{ backgroundColor: c, height: '25px', borderColor: 'black', borderStyle: ''}}></Col>;
          })}
        </Row>
        <Row>
          {props.layers[props.layers[0].value].limits.map((l, i) => {
            return (
              <Col key={i} flex={2}>
                {' '}
                {l}{' '}
              </Col>
            );
          })}
        </Row>
        </div>
      </div>
    );
  };
  const mapStateToProps = (state) => {
    return {
      layers: state.layers
    };
  };
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      setHoveredStateId: actionLegend,
      
    }, dispatch);
  };
  export default connect(mapStateToProps, mapDispatchToProps)(Legend);