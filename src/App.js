import './App.css';
import React from 'react';
import MapComponent from './components/Map/Map';
import Legend from './components/Legend/Legend';
import Radio from './components/Radio/Radio';
import Text from './components/Text/Text';
import { Layout } from 'antd';
import { Row, Col, Checkbox, Divider } from 'antd';
import 'mapbox-gl/dist/mapbox-gl.css';
import { OmitProps } from 'antd/lib/transfer/ListBody';

const { Sider, Content } = Layout;

function App() {
  return (
    <Layout className="main-layout">
    <Content>
      <div className='main-title'>
        <Row className="map-title">
          <Col span={24}>Распределение температуры в поверхностном слое</Col>
        </Row>
      </div>
      <div className="menu">
      
      <Row className="checkboxRow1">
        <Radio/>
      </Row>
      <Divider orientation="left" plain>Краткая характеристика</Divider>
      <Text/>
      </div>
      <MapComponent/>
      <Legend/>
    </Content>
    </Layout>
  );
}

export default App;
