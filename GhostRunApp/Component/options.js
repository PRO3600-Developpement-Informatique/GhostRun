import React from 'react';
import ReactNativeSettingsPage, {
  SectionRow,
  NavigateRow,
  CheckRow,
  SwitchRow,
  SliderRow,
} from 'react-native-settings-page';
var mapStyle = [];
export {mapStyle};

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
} from 'react-native';
var dark = 1;

export default class PageOptions extends React.Component {
  state = {
    check: false,
    switch: false,
    value: 40,
  };

  render() {
    return (
      <ReactNativeSettingsPage>
        <SectionRow text="Options">
          <SwitchRow
            text="Thème sombre (Carte)"
            iconName="diamond"
            _value={this.state.switch}
            _onValueChange={() => {
              dark = dark + 1;
              if (dark % 2 == 0) {
                this.setState({switch: !this.state.switch});
                mapStyle = [
                  {
                    elementType: 'geometry',
                    stylers: [
                      {
                        color: '#242f3e',
                      },
                    ],
                  },
                  {
                    elementType: 'labels.text.fill',
                    stylers: [
                      {
                        color: '#746855',
                      },
                    ],
                  },
                  {
                    elementType: 'labels.text.stroke',
                    stylers: [
                      {
                        color: '#242f3e',
                      },
                    ],
                  },
                  {
                    featureType: 'administrative.land_parcel',
                    stylers: [
                      {
                        visibility: 'off',
                      },
                    ],
                  },
                  {
                    featureType: 'administrative.locality',
                    elementType: 'labels.text.fill',
                    stylers: [
                      {
                        color: '#d59563',
                      },
                    ],
                  },
                  {
                    featureType: 'administrative.neighborhood',
                    stylers: [
                      {
                        visibility: 'off',
                      },
                    ],
                  },
                  {
                    featureType: 'poi',
                    elementType: 'labels.text',
                    stylers: [
                      {
                        visibility: 'off',
                      },
                    ],
                  },
                  {
                    featureType: 'poi',
                    elementType: 'labels.text.fill',
                    stylers: [
                      {
                        color: '#d59563',
                      },
                    ],
                  },
                  {
                    featureType: 'poi.business',
                    stylers: [
                      {
                        visibility: 'off',
                      },
                    ],
                  },
                  {
                    featureType: 'poi.park',
                    elementType: 'geometry',
                    stylers: [
                      {
                        color: '#263c3f',
                      },
                    ],
                  },
                  {
                    featureType: 'poi.park',
                    elementType: 'labels.text.fill',
                    stylers: [
                      {
                        color: '#6b9a76',
                      },
                    ],
                  },
                  {
                    featureType: 'road',
                    elementType: 'geometry',
                    stylers: [
                      {
                        color: '#38414e',
                      },
                    ],
                  },
                  {
                    featureType: 'road',
                    elementType: 'geometry.stroke',
                    stylers: [
                      {
                        color: '#212a37',
                      },
                    ],
                  },
                  {
                    featureType: 'road',
                    elementType: 'labels',
                    stylers: [
                      {
                        visibility: 'off',
                      },
                    ],
                  },
                  {
                    featureType: 'road',
                    elementType: 'labels.icon',
                    stylers: [
                      {
                        visibility: 'off',
                      },
                    ],
                  },
                  {
                    featureType: 'road',
                    elementType: 'labels.text.fill',
                    stylers: [
                      {
                        color: '#9ca5b3',
                      },
                    ],
                  },
                  {
                    featureType: 'road.highway',
                    elementType: 'geometry',
                    stylers: [
                      {
                        color: '#746855',
                      },
                    ],
                  },
                  {
                    featureType: 'road.highway',
                    elementType: 'geometry.stroke',
                    stylers: [
                      {
                        color: '#1f2835',
                      },
                    ],
                  },
                  {
                    featureType: 'road.highway',
                    elementType: 'labels.text.fill',
                    stylers: [
                      {
                        color: '#f3d19c',
                      },
                    ],
                  },
                  {
                    featureType: 'transit',
                    stylers: [
                      {
                        visibility: 'off',
                      },
                    ],
                  },
                  {
                    featureType: 'transit',
                    elementType: 'geometry',
                    stylers: [
                      {
                        color: '#2f3948',
                      },
                    ],
                  },
                  {
                    featureType: 'transit.station',
                    elementType: 'labels.text.fill',
                    stylers: [
                      {
                        color: '#d59563',
                      },
                    ],
                  },
                  {
                    featureType: 'water',
                    elementType: 'geometry',
                    stylers: [
                      {
                        color: '#17263c',
                      },
                    ],
                  },
                  {
                    featureType: 'water',
                    elementType: 'labels.text',
                    stylers: [
                      {
                        visibility: 'off',
                      },
                    ],
                  },
                  {
                    featureType: 'water',
                    elementType: 'labels.text.fill',
                    stylers: [
                      {
                        color: '#515c6d',
                      },
                    ],
                  },
                  {
                    featureType: 'water',
                    elementType: 'labels.text.stroke',
                    stylers: [
                      {
                        color: '#17263c',
                      },
                    ],
                  },
                ];
              }
              if (dark % 2 == 1) {
                this.setState({switch: !this.state.switch});
                mapStyle = [];
              }
            }}
          />
          <CheckRow
            text="CheckRow"
            iconName="your-icon-name"
            _color="#000"
            _value={this.state.check}
            _onValueChange={() => {
              this.setState({check: !this.state.check});
            }}
          />
          <SliderRow
            text="Slider Row"
            iconName="your-icon-name"
            _color="#000"
            _min={0}
            _max={100}
            _value={this.state.value}
            _onValueChange={value => {
              this.setState({value});
            }}
          />
        </SectionRow>
      </ReactNativeSettingsPage>
    );
  }
}
