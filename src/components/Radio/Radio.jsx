import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import actionRadio from "./actions/actionRadio";
import { Radio } from 'antd';

const RadioMenu = (props) => {
    //const { appStore, sidebarMenuFiltersStore } = useStores();
    const onChange = e => {
      console.log('radio checked', e.target.value);
      props.setValue(e.target.value);
    };
    return (
      <Radio.Group onChange={onChange} value={props.layers[0].value}>
          <Radio value={1}>Распределение температур в поверхностном слое</Radio>
          <Radio style={{ marginTop: 6 }} value={2}>Распределение температур на глубине 25 метров</Radio>
        </Radio.Group>
    );
  };
  const mapStateToProps = (state) => {
    return {
      layers: state.layers
    };
  };
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      setValue: actionRadio,
      
    }, dispatch);
  };
  export default connect(mapStateToProps, mapDispatchToProps)(RadioMenu);