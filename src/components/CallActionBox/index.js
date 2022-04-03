import {View, Text, StyleSheet, Dimensions, Pressable} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const color = '#fff';
export default function CallActionBox({onHangupPress}) {
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);

  const onHangup = () => {
    onHangupPress();
  };
  const onReverseCamera = () => {
    console.warn('hangup');
  };
  const onToggleCamera = () => {
    setIsCameraOn(currentValue => !currentValue);
    console.warn('hangup');
  };
  const onToggleMic = () => {
    setIsMicOn(currentValue => !currentValue);
    console.warn('hangup');
  };
  return (
    <View style={styles.buttonContainer}>
      <Pressable onPress={onReverseCamera} style={styles.iconButton}>
        <Ionicons name="ios-camera-reverse" size={30} color={color} />
      </Pressable>
      <Pressable onPress={onToggleCamera} style={styles.iconButton}>
        <MaterialCommunityIcons
          name={isCameraOn ? 'camera-off' : 'camera'}
          size={30}
          color={color}
        />
      </Pressable>
      <Pressable onPress={onToggleMic} style={styles.iconButton}>
        <MaterialCommunityIcons
          name={isMicOn ? 'microphone-off' : 'microphone'}
          size={30}
          color={color}
        />
      </Pressable>
      <Pressable
        onPress={onHangup}
        style={[styles.iconButton, {backgroundColor: 'red'}]}>
        <MaterialCommunityIcons name="phone-hangup" size={30} color={color} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#333333',
    padding: 20,
    paddingBottom: 40,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    width: Dimensions.get('screen').width,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconButton: {
    backgroundColor: '#4a4a4a',
    padding: 10,
    borderRadius: 50,
  },
});
