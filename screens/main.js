import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';// Replace with your Firebase configuration
import { UserContext } from '../config/usercontext';
import { useContext } from 'react';
import { useRoute  } from '@react-navigation/native';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
const ContactList = () => {
  const [users, setUsers] = useState([]);
  const route = useRoute();
  const currentUser = route.params.currentId;
  console.log(currentUser);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, 'Users');
        const usersSnapshot = await getDocs(usersCollection);
        
        const fetchedUsers = usersSnapshot.docs
          .filter(doc => doc.id !== currentUser)
          .map(doc => doc.data());

        setUsers(fetchedUsers);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, [currentUser]);
  const handleItemPress = item => {
    navigation.navigate('chat', { user: item, id: currentUser, recipientId : item.userId, UserName:  item.name});
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemPress(item)}>
      <View style={styles.chatItem}>
    {/* <Image source={{ uri: item.profilePic }} style={styles.profilePic} /> */}
      <View style={styles.chatDetails}>
      <Text style={styles.username}>{item.name}</Text>
      {/* <Text style={styles.username}>{item.userId}</Text> */}
      {/* <Text style={styles.message}>{item.lastMessage}</Text> */}
      </View>
    </View>

    </TouchableOpacity>
    
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Contact List</Text>

      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.userId}
        contentContainerStyle={styles.flatListContent}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  // },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  flatListContent: {
    paddingHorizontal: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  flatListContent: {
    paddingHorizontal: 16,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    height: 45,
    borderBottomColor: '#eee',
  },
  profilePic: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  chatDetails: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 14,
    color: '#888',
  },
});


export default ContactList;