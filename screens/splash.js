import {View, Text, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

const splash =() => {
    const navigation = useNavigation ();
    useEffect ( () => {
        setTimeout ( () => {
        navigation.navigate('SignUp');
        }, 2000) ;
    }, []);
    return(
        <View style = {styles.container}>
            <Text style =  {styles.text}>Splash</Text>
        </View>

    );
}
export default splash;

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'purple',
        justifyContent: 'center',
        alignItems:'center'
    },
    text : {
        color: 'white',
        fontSize: 25
    }
})