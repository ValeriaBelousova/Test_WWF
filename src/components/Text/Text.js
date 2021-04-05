import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import './css/text.css';
import { Row, Col } from 'antd';

const Text = (props) => {
    //const { appStore, sidebarMenuFiltersStore } = useStores();
    return (
        <Row className="map-text">
          {(props.layers[0].value == 1) &&
          <Col span={24}>Гидрологический режим Чукотского моря определяется неравномерным поступлением солнечной радиации
           к поверхности воды в течение года и потоком воды тихоокеанского происхождения, проникающим в акваторию моря через
            Берингов пролив. В летний период теплые (+1 ... + 6°C) и соленые (31–32‰) воды Аляскинского течения проходят через
             восточную часть Берингова пролива на шельф Чукотского моря. Через западную часть пролива поступают более соленые
              ((32–33‰) и менее теплые (0 ... + 2°C) водные массы Берингова моря.</Col>}
          {(props.layers[0].value == 2) &&
          <Col span={24}>Температура воды в южной части Чукотского моря понижается с глубиной, однако даже в придонном горизонте 
          ее значения остаются положительными.
          В северной и северо-западной части Чукотского моря в придонном горизонте залегают холодные арктические воды с 
          температурой ниже нуля.</Col>
          }
        </Row>
    );
  };
  const mapStateToProps = (state) => {
    return {
      layers: state.layers
    };
  };
  export default connect(mapStateToProps)(Text);