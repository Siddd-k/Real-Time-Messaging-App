import {View, Text, StyleSheet, TextInput, Button, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { db } from '../config/firebase';
import {Collection, collection, getDocs} from  'firebase/firestore';
import { Filter } from 'firebase/firestore';
import { UserContext } from '../config/usercontext';
import { useContext } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const navigation = useNavigation();
    const { setCurrentUser } = useContext(UserContext);
    const [error, setError] = useState('');

    const loginUser = async () => {
      try {
        const users = collection(db, 'Users');
        const userSnapshot = await getDocs(users);
    
        const filteredUsers = userSnapshot.docs.filter((doc) => {
          const userData = doc.data();
          return userData.email === email && userData.pass === pass;
        });
    
        if (filteredUsers.length > 0) {
          // Login successful
          // Do something, such as navigate to the home screen
          const userId = filteredUsers[0].id; 
          navigation.navigate('Home', {currentId: userId});
          // Get the ID of the logged-in user
          setCurrentUser(userId);
          console.log('success: ', userId)
        } else {
          // Login failed
          setError('Invalid email or password');
        }
      } catch (error) {
        // Handle any other errors that may occur during the process
        setError('An error occurred. Please try again later.');
        console.error(error);
      }
    };
    
 

    return(
        <View style  = {styles.container}>
            <Text style= {styles.title}>Log In</Text>
            <TextInput style = {[styles.input, {marginTop:20}]} value = {email} onChangeText = {text=>setEmail(text)} placeholder='Enter your Email'/>
            <TextInput style = {[styles.input, {marginTop:20}]} value = {pass} onChangeText = {text=>setPass(text)} placeholder='Enter your Password'/>
 
            <TouchableOpacity style = {styles.button} onPress={loginUser}>
                <Text style = {styles.buttontext}>Log In</Text>
            </TouchableOpacity>
            <Text style = {styles.login} onPress={()=> {navigation.navigate('SignUp')}}>Sign Up Instead</Text>
        </View>

    );
};
export default Login;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',  
 
    },
    title:{
        fontSize: 30,
        color: 'black',
        alignSelf: 'center',
        fontWeight: 600,
        marginTop: 100,
    },
    input:{
        width: '90%',
        borderColor: 'lightgrey',
        paddingHorizontal: 10, 
        borderWidth: 0.5,
        height: 35,
        borderRadius: 10,
        alignSelf: 'center',
       
    },
    button :{
        width: '90%',
        borderColor:'purple',
        height: 50,
        backgroundColor: 'purple',
        alignSelf: 'center',
        marginTop: 40,
        borderRadius: 10,
        justifyContent: 'center',
        borderRadius: 10
        

    },
    buttontext:{
        color: 'white',
        alignSelf: 'center',
        fontSize: 17,
        fontWeight: 400
    },
    login: {
        alignSelf: 'center',
        marginTop:15,
        fontSize: 15,
        fontWeight: 200,
        color: 'grey',
        textDecorationLine: 'underline'
    }
})