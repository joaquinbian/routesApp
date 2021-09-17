import React, {useState} from 'react';
import {View, Text} from 'react-native';
import MapView, {LatLng, PROVIDER_GOOGLE, Marker} from 'react-native-maps';

const Map = () => {
  const [locations, setLocations] = useState<LatLng[]>([]);
  const setLocationMarker = (coordinate: LatLng) => {
    const {latitude, longitude} = coordinate;
    setLocations([...locations, {latitude, longitude}]);
  };
  return (
    <MapView
      style={{flex: 1}}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      onPress={({nativeEvent: {coordinate, position}}) =>
        setLocationMarker(coordinate)
      }>
      {locations.map((l, i) => (
        <Marker coordinate={l} key={i} />
      ))}
    </MapView>
  );
};

export default Map;
