const INITIAL_STATE =  [
    {
      id: 'map',
      hoveredStateId: null,
      hoveredLegend: true,
      viewport: {
        latitude: 66.9,
        longitude: -177,
        zoom: 3.6},
      currentMouse: {
        latitude: 66.9,
        longitude: -170
      },
      cursorStyle:'',
      id_temp: [9, 8, 7, 6, 5, 4, 3, 2, 1, 0, -1, 10, 11, 12],
      value: 1
    },
    {
      id: 1,
      name: 'Температура воды в поверхностном слое',
      type: 'geojson',
      options: {
        url: 'https://raw.githubusercontent.com/ValeriaBelousova/json_data/master/temp_surface_id.geojson',
      },
      colors: ["#2c4276", "#294888", "#4d89c5", "#78b2df", "#aed6f1", "#e0f1fc", "#fffbd1", "#f0b484", "#e08c6b", "#c66051",
      "#a2354e", "#792236", "#5e1727", "#462212"],
      limits: [ -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      id_temp: [9, 8, 7, 6, 5, 4, 3, 2, 1, 0, -1, 10, 11, 12],
      visible: false,
      toggleable: true
    },
    {
      id: 2,
      name: 'Температура воды на глубине 25 метров',
      type: 'geojson',
      options: {
        url: 'https://raw.githubusercontent.com/ValeriaBelousova/json_data/master/temp_25m_id.geojson'
      },
      colors: ["#1f345a", "#2c4276", "#294888", "#4d89c5", "#78b2df", "#aed6f1", "#e0f1fc", "#fffbd1", "#f0b484"],
      limits: [ -2, -1, 0, 1, 2, 3, 4, 5, 6],
      id_temp: [-2, -1, 0, 1, 2, 3, 4, 5, 6],
      visible: false,
      toggleable: true
    }
]

export default function (state=INITIAL_STATE, action) {
    // console.log(action);
    switch (action.type) {
        case 'HOVER_FEATURE':
          //console.log(action);
            return state.map(l => {
                if (l.id === 'map') {
                    l.hoveredStateId = action.payload.hoveredStateId;
                    l.cursorStyle = action.payload.cursorStyle;
                    l.currentMouse = action.payload.currentMouse;
                }
                return l;
            });
        case 'HOVER_LEGEND':
          console.log(action);
            return state.map(l => {
                if (l.id === 'map') {
                    l.hoveredStateId = action.payload.hoveredStateId;
                    l.hoveredLegend = action.payload.hoveredLegend;
                }
                return l;
            });
          case 'LAYER_CHANGE':
              console.log(action);
                return state.map(l => {
                    if (l.id === 'map') {
                        l.value = action.payload.radioValue;
                    }
                    return l;
                });
        default:
            return state
    };
}