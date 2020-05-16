import React from 'react';
import ReactNativeSettingsPage, {
  SectionRow,
  SwitchRow,
} from 'react-native-settings-page';
import {connect} from 'react-redux';
var mapStyle = [];
export {mapStyle};
import {Button} from 'react-native';
var dark = 1;

class PageOptions extends React.Component {
  state = {
    check: false,
    switch: false,
    value: 40,
  };

  render() {
    console.log(this.props);
    return (
      <ReactNativeSettingsPage>
        <SectionRow text="Options">
          <SwitchRow
            text="Thème sombre (Carte)"
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
        </SectionRow>
        <Button
          title={
            'déconnexion du compte ' +
            this.props.state.userCour.utilisateurCourant
          }
          onPress={() => {
            this.props.changementDeStatue();
          }}
        />
      </ReactNativeSettingsPage>
    );
  }
}
function mapStateToPros(state) {
  return {
    state,
  };
}
function mapDipatchToPros(dispatch) {
  return {
    changementDeStatue: () => dispatch({type: 'CHANGEMENT_DE_STATUE'}),
  };
}
export default connect(
  mapStateToPros,
  mapDipatchToPros,
)(PageOptions);
