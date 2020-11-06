/*
Documentation provided by Andrew Glenn and Trevor Templin 11/6/2020
*/
import React from 'react';
import { AppRegistry,StyleSheet,Image, ImageBackground, Text, View, Button,Dimensions, Alert,TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants';
import styles from './frontendstyle';
import { render } from 'react-dom';

const {width,height} = Dimensions.get("window");
const image = (require('../assets/background.jpg'));

/* Creates a constructor class to render the real page for achievements.*/
export default class AdminPage {
    render(){
        return (
            <View style = {styles.container}>
            <ImageBackground style= {styles.backgroundImage} source= {image}> 
            <Text style = {styles.signupLinkText}>Admin Page</Text>
            </ImageBackground>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { user, global, foods } = state;
    return { user, global, foods };
};