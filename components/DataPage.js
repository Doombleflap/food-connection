/* Imports modules to be utilized */
import React from 'react';
import { AppRegistry,StyleSheet,Image, ImageBackground, Text, View, Button,Dimensions, Alert,TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants';
import styles from './frontendstyle';

/* Sets dimensions for the "window" on the app */
const {width,height} = Dimensions.get("window");
const image = (require('../assets/background.jpg'));

/* Creates a function to render the DataPage UI */
export default function DataPage({navigation}) {
    return (
        <View style = {styles.container}>
           <ImageBackground style= {styles.backgroundImage} source= {image}> 
            <Text style = {styles.signupLinkText}>Data Page</Text>
        </ImageBackground>
        </View>
    );
}


