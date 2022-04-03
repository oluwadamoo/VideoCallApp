import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CallActionBox from '../../components/CallActionBox';

export default function CallScreen() {
  const color = '#fff';
  return (
    <View style={styles.page}>
      <View style={styles.cameraPreview}>
        <View style={styles.friendPreview}></View>

        <View />
        <CallActionBox />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  cameraPreview: {
    backgroundColor: '#7b4e80',
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  friendPreview: {
    position: 'absolute',
    height: 150,
    width: 100,
    backgroundColor: 'red',
    borderRadius: 10,
    right: 10,
    top: 50,
  },
});
