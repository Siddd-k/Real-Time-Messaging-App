import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GiftedChat, Bubble, BubbleProps, renderTime, Time } from 'react-native-gifted-chat';
import { collection, doc, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase'; // Assuming you exported your db from the firebase.js file
import { useContext } from 'react';
import {useRoute} from '@react-navigation/native';
import { UserContext } from '../config/usercontext';
import { useNavigation } from '@react-navigation/native';
const Chat = () => {
  const [messages, setMessages] = useState([]);
  const route = useRoute();
  const recipientId = route.params.recipientId;
  const UserName = route.params.UserName;
  const currentUser = route.params.id;

  const navigation = useNavigation();
  useEffect(() => {
    const chatId = getChatId();

    const unsubscribe = onSnapshot(
      collection(doc(db, 'chats', chatId), 'messages'),
      (snapshot) => {
        const newMessages = snapshot.docs.map((doc) => {

          const data = doc.data();
          // const time = data.createdAt ? data.createdAt.toDate() : new Date();
          const createdAt = data.createdAt ? data.createdAt.toDate() : null
          return {
            _id: doc.id,
            text: data.text,
            createdAt ,
            // : data.createdAt.toDate(),
            user: {
              _id: data.sendBy === currentUser ? currentUser : recipientId,
            },
          };
        });
        const sortedMessages = newMessages.sort(
          (a, b) => b.createdAt - a.createdAt
        );
        console.log('New Messages:', newMessages);
        setMessages(sortedMessages);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleSend = async (newMessages) => {
    const chatId = getChatId();
    console.log('Sending Message:', newMessages);

    await addDoc(collection(doc(db, 'chats', chatId), 'messages'), {
      sendBy: currentUser,
      sendTo: recipientId,
      text: newMessages[0].text,
      createdAt: serverTimestamp(),
    });
  };

  const getChatId = () => {
    const users = [currentUser, recipientId].sort();
    return `${users[0]}_${users[1]}`;
  };
  useEffect(() => {
    navigation.setOptions({ headerTitle: UserName});
  }, []);

  console.log('Messages:', messages);

  return (
    <SafeAreaView style = {{flex: 1}}>
        <GiftedChat
         messages={messages}
         onSend={handleSend}
         user={{ _id: currentUser }}

         renderBubble={props => {
           return (
             <Bubble
               {...props}
               wrapperStyle={{
                 left: {
                   backgroundColor: 'lightgrey',
                   marginLeft: recipientId!== currentUser ? -35 : 10
                 },
               }}
               textStyle={{
                 left: {
                   color: 'black',
                 },
               }}
             />
           );
         }}
     
      />

    </SafeAreaView>
   
  );
};

export default Chat;