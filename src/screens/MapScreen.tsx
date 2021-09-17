import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Map from '../components/Map';

const MapScreen = () => {
  return (
    <View style={{flex: 1}}>
      <Map />
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({});
