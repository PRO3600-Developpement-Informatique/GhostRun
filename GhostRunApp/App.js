import React from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Platform,
    PermissionsAndroid
} from "react-native";

import {request, PERMISSIONS} from 'react-native-permissions';

import MapView, {
    Marker,
    AnimatedRegion,
    Polyline,
    PROVIDER_GOOGLE
} from "react-native-maps";
import haversine from "haversine";

import Geolocation from 'react-native-geolocation-service';

// const LATITUDE = 29.95539;
// const LONGITUDE = 78.07513;
        const LATITUDE_DELTA = 0.009;
        const LONGITUDE_DELTA = 0.009;
        const LATITUDE = 37.78825;
        const LONGITUDE = -122.4324;
        const DEFAULT_PADDING = {top: 40, right: 40, bottom: 40, left: 40};

        const mapStyle = [
            {
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#242f3e"
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#746855"
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#242f3e"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#d59563"
                    }
                ]
            },
            {
                "featureType": "administrative.neighborhood",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#d59563"
                    }
                ]
            },
            {
                "featureType": "poi.business",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#263c3f"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#6b9a76"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#38414e"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#212a37"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9ca5b3"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#746855"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#1f2835"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#f3d19c"
                    }
                ]
            },
            {
                "featureType": "transit",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#2f3948"
                    }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#d59563"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#17263c"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#515c6d"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#17263c"
                    }
                ]
            }
        ];

        const styles = StyleSheet.create({
            container: {
                ...StyleSheet.absoluteFillObject,
                justifyContent: "flex-end",
                alignItems: "center"
            },
            map: {
                ...StyleSheet.absoluteFillObject
            },
            bubble: {
                flex: 1,
                backgroundColor: "rgba(255,255,255,0.7)",
                paddingHorizontal: 18,
                paddingVertical: 12,
                borderRadius: 20
            },
            latlng: {
                width: 200,
                alignItems: "stretch"
            },
            button: {
                width: 80,
                paddingHorizontal: 12,
                alignItems: "center",
                marginHorizontal: 10
            },
            buttonContainer: {
                flexDirection: "row",
                marginVertical: 20,
                backgroundColor: "transparent"
            }
        });


        export default class MainMapView extends React.Component {

            constructor(props) {
                super(props);

                this.state = {
                    latitude: LATITUDE,
                    longitude: LONGITUDE,
                    routeCoordinates: [],
                    distanceTravelled: 0,
                    prevLatLng: {},
                    coordinate: new AnimatedRegion({
                        latitude: LATITUDE,
                        longitude: LONGITUDE,
                        latitudeDelta: 0,
                        longitudeDelta: 0
                    }),
                    fitCoordinates: []
                };
            }

            demande_permissions() {
                if (Platform.OS === "android") {
                    request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(result => {
                        // aaa
                    });
                } else {
                    request(PERMISSIONS.IOS.LOCATION_ALWAYS).then(result => {
                        // aaa
                    });
                }
            }


            affiche_marker_position_depart(position) {

                const {latitude, longitude} = position.coords;
                const newCoordinate = {
                    latitude,
                    longitude
                };

                if (Platform.OS === "android") {
                    if (this.start_marker) {
                        this.start_marker._component.animateMarkerToCoordinate(
                            newCoordinate,
                            500
                        );
                    }
                } else {
                    coordinate.timing(newCoordinate).start();
                }


            }

            mise_a_jour_current_position(position) {
                const {routeCoordinates, distanceTravelled} = this.state;
                const {latitude, longitude} = position.coords;

                const newCoordinate = {
                    latitude,
                    longitude
                };

                if (Platform.OS === "android") {
                    if (this.current_position_marker) {
                        this.current_position_marker._component.animateMarkerToCoordinate(
                            newCoordinate,
                            0
                        );
                    }
                } else {
                    coordinate.timing(newCoordinate).start();
                }

                this.setState({
                    latitude,
                    longitude,
                    routeCoordinates: routeCoordinates.concat([newCoordinate]),
                    distanceTravelled:
                        distanceTravelled + this.calcDistance(newCoordinate),
                    prevLatLng: newCoordinate
                });


            }

            fitToCoordinates() {
                this.map.fitToCoordinates(this.state.routeCoordinates, {
                    edgePadding: DEFAULT_PADDING,
                    animated: true,
                });
            }


            componentDidMount() {
                console.log("Bonjour!");
                this.demande_permissions();
                console.log("On a les permissions!");
                Geolocation.getCurrentPosition(position => {
                        this.affiche_marker_position_depart(position);
                        this.mise_a_jour_current_position(position);
                        this.fitToCoordinates();
                    },
                    error => console.log(error)
                );

                console.log("Initialisation statique terminée!");

                this.watchID = Geolocation.watchPosition(
                    position => {
                        console.log("Mise à jour de la position...");

                        this.mise_a_jour_current_position(position);
                        this.fitToCoordinates();
                    },
            error => console.log(error),
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000,
                distanceFilter: 1
            }
        );
    }

    componentWillUnmount() {
        Geolocation.clearWatch(this.watchID);
    }

    getMapRegion = () => ({
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
    });

    calcDistance = newLatLng => {
        const {prevLatLng} = this.state;
        return haversine(prevLatLng, newLatLng) || 0;
    };

    sauvegarderTrajet(trajet) {

    }

    envoyerMetadonnees(trajet) {

    }

    ConvertirTrajetEnJSON(trajet) {

    }




    render() {
        return (
            <View style={styles.container}>
                <MapView
                    ref={ref => {
                        this.map = ref;
                    }}
                    customMapStyle={mapStyle}
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    showUserLocation
                    followUserLocation
                    loadingEnabled
                    region={this.getMapRegion()}
                >
                    <Polyline coordinates={this.state.routeCoordinates}
                              strokeWidth={5}
                              strokeColor={"rgba(255,255,255,0.7)"}
                              lineCap={"butt"}
                              lineJoin={"round"}
                    />
                    <Marker.Animated
                        ref={marker => {
                            this.start_marker = marker;
                        }}
                        title={"Position de départ"}
                        coordinate={this.state.coordinate}
                    />
                    <Marker.Animated
                        ref={marker => {
                            this.current_position_marker = marker;
                        }}
                        title={"Position actuelle"}
                        coordinate={this.state.coordinate}
                    />
                </MapView>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.bubble, styles.button]}>
                        <Text style={styles.bottomBarContent}>
                            ＼（＾ ＾）／ {parseFloat(this.state.distanceTravelled).toFixed(3)} km
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
};