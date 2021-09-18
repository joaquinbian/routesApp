import Geolocation from '@react-native-community/geolocation';
import React, {useEffect, useRef, useState} from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import MapView, {LatLng, PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import useLocation from '../hooks/useLocation';
import LoadingSreen from '../screens/LoadingSreen';

const Map = () => {
  const [locations, setLocations] = useState<LatLng[]>([]);

  const setLocationMarker = (coordinate: LatLng) => {
    const {latitude, longitude} = coordinate;
    setLocations([...locations, {latitude, longitude}]);
  };

  const {location, hasLocation, getCurrentPosition} = useLocation();

  const mapView = useRef<MapView>();

  if (!hasLocation) {
    return <LoadingSreen />;
  }

  const setCameraPosition = async () => {
    //esto devuelve esto por el resolve de la promesa que le pusimos nosotro
    const {latitude, longitude} = await getCurrentPosition();
    mapView.current?.animateCamera({center: {latitude, longitude}});
  };

  return (
    <>
      <MapView
        ref={el => (mapView.current = el!)}
        style={{flex: 1}}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation
        onPress={({nativeEvent: {coordinate, position}}) =>
          setLocationMarker(coordinate)
        }>
        {locations.map((l, i) => (
          <Marker coordinate={l} key={i} />
        ))}
      </MapView>
      <Button
        containerStyle={{
          position: 'absolute',
          zIndex: 9999,
          bottom: 20,
          right: 20,
        }}
        buttonStyle={{
          backgroundColor: 'rgba(255,255,255,.4)',
          borderRadius: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        icon={<Icon name="compass-outline" size={25} />}
        onPress={setCameraPosition}
      />
    </>
  );
};

export default Map;
