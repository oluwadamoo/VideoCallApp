import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Voximplant} from 'react-native-voximplant';
import {APP_NAME, ACC_NAME} from '../../constants/Constants';

export default function LoginScreen({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const voximplant = Voximplant.getInstance();

  useEffect(() => {
    const connect = async () => {
      const status = await voximplant.getClientState();
      if (status == Voximplant.ClientState.DISCONNECTED) {
        await voximplant.connect();
      } else if (status == Voximplant.ClientState.LOGGED_IN) {
        redirectHome();
      }
    };

    connect();
  }, []);
  const signIn = async () => {
    try {
      const fqUsername = `${username}@${APP_NAME}.${ACC_NAME}.voximplant.com`;
      await voximplant.login(fqUsername, password);

      redirectHome();
    } catch (e) {
      console.log(e);
      Alert.alert(e.name, `Error code: ${e.code}`);
    }
  };

  const redirectHome = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Contacts',
        },
      ],
    });
  };
  return (
    <View style={styles.page}>
      <TextInput
        placeholder="username"
        style={styles.input}
        onChangeText={setUsername}
        value={username}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Pressable onPress={signIn} style={styles.button}>
        <Text>Sign in</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 10,
    alignItems: 'stretch',
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'dodgerblue',
    marginVertical: 10,
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
});
