import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import contacts from '../../../assets/data/contacts.json';
import {Voximplant} from 'react-native-voximplant';

export default function ContactScreen({navigation}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredContacts, setFilteredContacts] = useState(contacts);

  const voximplant = Voximplant.getInstance();
  const callUser = user => {
    navigation.navigate('Calling', {user});
  };

  useEffect(() => {
    voximplant.on(Voximplant.ClientEvents.IncomingCall, incomingCallEvent => {
      navigation.navigate('IncomingCall', {call: incomingCallEvent.call});
    });
  }, []);
  useEffect(() => {
    const newContacts = contacts.filter(contact =>
      contact.user_display_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    );
    setFilteredContacts(newContacts);
  }, [searchTerm]);

  return (
    <View style={styles.page}>
      <TextInput
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder="Search..."
        style={styles.searchInput}
      />
      <FlatList
        data={filteredContacts}
        renderItem={({item, index}) => (
          <Pressable onPress={() => callUser(item)}>
            <Text style={styles.contactName} key={index}>
              {item.user_display_name}
            </Text>
          </Pressable>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 15,
    flex: 1,
    backgroundColor: '#fff',
  },
  contactName: {
    fontSize: 16,
    marginVertical: 10,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#f0f0f0',
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
  },
});
