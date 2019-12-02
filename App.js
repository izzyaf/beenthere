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

const customMapStyle = [
  {
    featureType: 'administrative',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#444444',
      },
    ],
  },
  {
    featureType: 'administrative.country',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'administrative.country',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#99a1ab',
      },
      {
        weight: '1.00',
      },
      {
        gamma: '1.00',
      },
    ],
  },
  {
    featureType: 'administrative.province',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative.province',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative.neighborhood',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'landscape',
    elementType: 'all',
    stylers: [
      {
        color: '#f2f2f2',
      },
    ],
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'landscape',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#e6edf3',
      },
    ],
  },
  {
    featureType: 'landscape',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'landscape.man_made',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'landscape.natural.landcover',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'landscape.natural.terrain',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'all',
    stylers: [
      {
        saturation: -100,
      },
      {
        lightness: 45,
      },
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'off',
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
    featureType: 'road.highway',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'all',
    stylers: [
      {
        color: '#46bcec',
      },
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'on',
      },
      {
        color: '#9ca7b8',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
];

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
          pointerEvents="none"
          style={{
            height: 750,
            width: 500,
          }}>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={{
              ...StyleSheet.absoluteFillObject,
            }}
            customMapStyle={customMapStyle}
            mapType="standard"
            region={{
              latitude: 15.8,
              longitude: 107,
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
            <Geojson geojson={data} strokeColor="#99a1ab" fillColor="#FFF" />
            <Geojson
              strokeWidth={0}
              fillColor="#37a2fa"
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
