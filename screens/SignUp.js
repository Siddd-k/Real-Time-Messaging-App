import {View, Text, StyleSheet, TextInput, Button, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
// import firestore from '@react-native-firebase/firestore';
import { auth } from '../config/firebase';
import { db } from '../config/firebase';
import {doc, setDoc} from  'firebase/firestore';  
import uuid from 'react-native-uuid';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUp = () => {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [pass, setPass] = useState('');
    const [cpass, setCpass] = useState('');
    const navigation = useNavigation();
    
    const RegisterUser = async() => {
        userId = uuid.v4();
        await setDoc(doc(db, 'Users', userId), {
            name: name,
            email: email,
            phone:phone,
            pass: cpass,
            userId: userId

        })
        .then(res =>{
            console.log(res);
            navigation.navigate('Login');
        }).catch(error => {
            console.log(error);
        });
    }
    

        return(
        <View style  = {styles.container}>
            <Text style= {styles.title}>SignUp</Text>
            <TextInput style = {[styles.input, {marginTop:50}]} value = {name} onChangeText = {text=>setName(text)} placeholder='Enter your Name'/>
            <TextInput style = {[styles.input, {marginTop:20}]} keyboardType = 'number-pad' value = {phone} onChangeText = {text=>setPhone(text)} placeholder='Enter your Phone'/>
            <TextInput style = {[styles.input, {marginTop:20}]} value = {email} onChangeText = {text=>setEmail(text)} placeholder='Enter your Email'/>
            <TextInput style = {[styles.input, {marginTop:20}]} value = {pass} onChangeText = {text=>setPass(text)} placeholder='Enter your Password'/>
            <TextInput style = {[styles.input, {marginTop:20}]} value = {cpass} onChangeText = {text=>setCpass(text)} placeholder='Confirm your Password'/>

            <TouchableOpacity style = {styles.button} onPress={RegisterUser}>
                <Text style = {styles.buttontext} >Sign Up</Text>
            </TouchableOpacity>
            <Text style = {styles.login} onPress={() => {navigation.navigate('Login')}}>Or Login</Text>
        </View>

    );
}
export default SignUp;

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