import React, {useState} from 'react';
import {View, Text} from 'react-native';
import MapView, {LatLng, PROVIDER_GOOGLE, Marker} from 'react-native-maps';

const Map = () => {
  const [location, setLocation] = useState<LatLng>({
    latitude: 0,
    longitude: 0,
  });

  const setLocationMarker = (coordinate: LatLng) => {
    const {latitude, longitude} = coordinate;
    setLocation({...location, longitude, latitude});
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
      <Marker coordinate={location} />
    </MapView>
  );
};

export default Map;
