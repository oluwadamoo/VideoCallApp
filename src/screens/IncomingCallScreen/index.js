import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Voximplant} from 'react-native-voximplant';

const bg = require('../../../assets/images/ios_bg.png');

export default function IncomingCallScreen({route, navigation}) {
  const [caller, setCaller] = React.useState('');
  const {call} = route.params;

  React.useEffect(() => {
    setCaller(call.getEndpoints()[0].displayName);

    call.on(Voximplant.CallEvents.Disconnected, callEvent => {
      navigation.navigate('Contacts');
    });
    return () => {
      call.off(Voximplant.CallEvents.Disconnected);
    };
  }, []);
  const onDecline = () => {
    call.decline();
  };
  const onAccept = () => {
    navigation.navigate('Calling', {call, isIncomingCall: true});
  };
  const color = '#fff';
  return (
    <ImageBackground source={bg} style={styles.bg}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.name}>{caller}</Text>
        <Text style={styles.phoneNumber}>Video Call</Text>
      </View>

      <View style={[styles.row, {marginTop: 'auto'}]}>
        <Pressable style={styles.iconContainer}>
          <Ionicons name="alarm" color={color} size={20} />
          <Text style={styles.iconText}>Remind me</Text>
        </Pressable>
        <Pressable style={styles.iconContainer}>
          <Entypo name="message" color={color} size={20} />
          <Text style={styles.iconText}>Message</Text>
        </Pressable>
      </View>

      <View style={[styles.row, {paddingBottom: 40}]}>
        {/* Decline */}
        <Pressable onPress={onDecline} style={styles.iconContainer}>
          <View style={styles.iconButtonContainer}>
            <Feather name="x" color={color} size={40} />
          </View>
          <Text style={styles.iconText}>Decline</Text>
        </Pressable>

        {/* Accept */}
        <Pressable onPress={onAccept} style={styles.iconContainer}>
          <View
            style={[styles.iconButtonContainer, {backgroundColor: '#2e7bff'}]}>
            <Feather name="check" color={color} size={40} />
          </View>
          <Text style={styles.iconText}>Accept</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    flex: 1,
  },
  name: {
    marginTop: 50,
    marginBottom: 15,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  phoneNumber: {
    fontSize: 20,
    color: '#fff',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  iconContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  iconText: {
    color: '#fff',
    marginTop: 10,
  },
  iconButtonContainer: {
    backgroundColor: 'red',
    borderRadius: 50,
    padding: 15,
    margin: 10,
  },
});
