import Geolocation from '@react-native-community/geolocation';
import React, {useEffect, useRef, useState} from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import MapView, {
  LatLng,
  PROVIDER_GOOGLE,
  Marker,
  Polyline,
} from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import useLocation from '../hooks/useLocation';
import LoadingSreen from '../screens/LoadingSreen';

const Map = () => {
  const [locations, setLocations] = useState<LatLng[]>([]);
  const [showPolyline, setShowPolyline] = useState<boolean>(true);
  const isFollowing = useRef<boolean>(true);

  const setLocationMarker = (coordinate: LatLng) => {
    const {latitude, longitude} = coordinate;
    setLocations([...locations, {latitude, longitude}]);
  };

  const {
    location,
    hasLocation,
    getCurrentPosition,
    followUserLocation,
    userLocation,
    stopFollowUserLocation,
    routes,
  } = useLocation();

  const mapView = useRef<MapView>();

  useEffect(() => {
    //cuando se abre el mapa, empezamos a ejecutar la funcion
    //y ya la funcion se empieza a ejecutar cada cierto tiempo
    followUserLocation();

    //despues tengo que hacer el reutrn
    return () => {
      stopFollowUserLocation();
    };
  }, []);

  useEffect(() => {
    //si no esta haciendo el seguimiento, que retorne
    if (!isFollowing.current) return;

    //cadavez que cambie la location del usuario
    //ejecutamos esta animacion de la camra
    const {latitude, longitude} = userLocation;
    mapView.current?.animateCamera({center: {latitude, longitude}});
  }, [userLocation]);

  if (!hasLocation) {
    return <LoadingSreen />;
  }

  const setCameraPosition = async () => {
    //esto devuelve esto por el resolve de la promesa que le pusimos nosotro

    //cuando tocamos el boton para ver donde estamos, que lo setee en true
    isFollowing.current = true;
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
        }
        //lo que hace es que cuando nos movemos un poquito
        //es pq no queremos hacer el seguimiento de nuestra ubicacion
        //entonces lo setea en falso
        onTouchStart={() => (isFollowing.current = false)}>
        {showPolyline && (
          <Polyline coordinates={routes} strokeColor="black" strokeWidth={3} />
        )}
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
      <Button
        containerStyle={{
          position: 'absolute',
          zIndex: 9999,
          bottom: 80,
          right: 20,
        }}
        buttonStyle={{
          backgroundColor: 'rgba(255,255,255,.4)',
          borderRadius: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        icon={<Icon name="brush-outline" size={25} />}
        onPress={() => setShowPolyline(!showPolyline)}
      />
    </>
  );
};

export default Map;
