/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList, Switch, Text} from 'react-native';
import MapView, {Geojson, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import GeoJsonGeometriesLookup from 'geojson-geometries-lookup';

import data from './vietnam.json';

const glookup = new GeoJsonGeometriesLookup(data);

const places = [
  {
    key: '1',
    name: 'Văn Miếu',
    long: 105.83578487,
    lat: 21.02893885,
  },
  {
    key: '2',
    name: 'Dinh Độc lập',
    long: 106.69547703,
    lat: 10.77716625,
  },
];

const App = () => {
  const [selected, setSelected] = useState([]);
  const [highlighted, setHighlighted] = useState([]);

  useEffect(() => {
    const matchedAreas = places
      .filter(place => selected.includes(place.key))
      .map(place => {
        return glookup.getContainers({
          type: 'Point',
          coordinates: [place.long, place.lat],
        });
      });

    const joined = matchedAreas.reduce((total, area) => {
      const {features} = area;

      return total.concat(features);
    }, []);

    setHighlighted(joined);
  }, [selected]);
  return (
    <>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
        }}>
        <View
          style={{
            height: 660,
            width: 400,
          }}>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={{
              ...StyleSheet.absoluteFillObject,
            }}
            customMapStyle={[
              {
                featureType: 'poi',
                stylers: [
                  {
                    visibility: 'off',
                  },
                ],
              },
              {
                featureType: 'road',
                stylers: [
                  {
                    visibility: 'off',
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
            ]}
            mapType="standard"
            region={{
              latitude: 15.8,
              longitude: 106,
              latitudeDelta: 16,
              longitudeDelta: 10,
            }}>
            {places.map(place => {
              return (
                <Marker
                  key={`marker-${place.key}`}
                  coordinate={{
                    latitude: place.lat,
                    longitude: place.long,
                  }}
                  title={place.name}
                />
              );
            })}
            <Geojson
              geojson={{
                features: highlighted,
              }}
            />
          </MapView>
        </View>
        <View>
          <FlatList
            data={places}
            renderItem={({item, index, separators}) => (
              <>
                <Text>{item.name}</Text>
                <Switch
                  value={selected.includes(item.key)}
                  onValueChange={enabled => {
                    if (enabled) {
                      return setSelected([...selected, item.key]);
                    }

                    return setSelected(selected.filter(s => s !== item.key));
                  }}
                />
              </>
            )}
          />
        </View>
      </View>
    </>
  );
};

export default App;
