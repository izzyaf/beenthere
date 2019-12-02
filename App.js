/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet, View} from 'react-native';

import MapView, {Geojson, PROVIDER_GOOGLE} from 'react-native-maps';

import data from './vietnam.json';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const App = () => {
  return (
    <>
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          mapType="standard"
          region={{
            latitude: 14.0583,
            longitude: 108.2772,
            latitudeDelta: 10,
            longitudeDelta: 3,
          }}>
          <Geojson geojson={data} />
        </MapView>
      </View>
    </>
  );
};

export default App;
