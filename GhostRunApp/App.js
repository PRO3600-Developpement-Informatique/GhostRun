import MapView from 'react-native-maps';

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
    bigBlue: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 30,
    },
    red: {
        color: 'red',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    }
});


export default class GhostRunApp extends Component {
    render() {
        return (
            // Try setting `justifyContent` to `center`.
            // Try setting `flexDirection` to `row`.
            <MapView style={styles.map}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
        );
    }
};