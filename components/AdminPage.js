/*
Documentation provided by Andrew Glenn and Trevor Templin 11/5/2020
*/
import React from 'react';
import { AppRegistry,StyleSheet,Image, ImageBackground, Text, View, Button,Dimensions, Alert,TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants';
import styles from './frontendstyle';
import { render } from 'react-dom';
import { connect } from 'react-redux';

const {width,height} = Dimensions.get("window");
const image = (require('../assets/background.jpg'));

/* Creates a constructor class to render the real page for super users. If 
the user is NOT a super user, they will recieve a rejected page*/
class AdminPage extends React.Component {
    realPageView(){
        return (
            <View style = {styles.container}>
            <ImageBackground style= {styles.backgroundImage} source= {image}> 
            <Text style = {styles.signupLinkText}>Admin Page</Text>
            </ImageBackground>
            </View>
        );
    }
    rejectedPageView(){
        return (
            <View style = {styles.container}>
            <ImageBackground style= {styles.backgroundImage} source= {image}> 
            <Text style = {styles.signupLinkText}>Admin Page</Text>
            </ImageBackground>
            </View>
        );
    }

    render(){
        if (this.props.user.superUser = true){
            return this.realPageView
        }
        else return this.rejectedPageView;
        
    }
}

const mapStateToProps = (state) => {
    const {user} = state;
    return {user};
};

export default connect(mapStateToProps)(AdminPage);