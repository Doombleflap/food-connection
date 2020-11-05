/*
Documentation provided by Trevor Templin 10/21/2020
*/
import React, { Component } from 'react';
import { AppRegistry,StyleSheet,Image, ImageBackground, Text, View, Button,Dimensions, Alert,TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { TextInput } from 'react-native-gesture-handler';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import styles from '../frontendstyle';
const image = (require('../../assets/background.jpg'));
const {width,height} = Dimensions.get("window");

/* Constructs variables and sets the default state for the newWeight 
and isLoading.*/
class ChangeWeightPage extends Component {
    constructor() {
        super();
        this.state = {
            newWeight: "",
            isLoading: false,
        };
    }

    /* Saves the changes made by the user by changing the state of
    isLoading to true, which then allows the user to change their
    weight associated with their account.  After which, changes isLoading
    back to false so that the changes are applied, and displays a message
    that their weight is being changed.*/
    save = () => {
        this.setState({isLoading: true});
        const newUser = JSON.parse(JSON.stringify(this.props.user));
        newUser.weight = this.state.newWeight;
        fetch('http://192.168.10.239:5000/users/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: newUser
            }),
        }).then(res => res.json()).then(json => {
            Alert.alert("Notification received: ", json.message);
            if (json.result == 1) {
                this.setState({
                    isLoading: false,
                });
                this.props.changeWeight(this.state.newWeight);
            }
            else {
                this.setState({
                    isLoading: false,
                });
            }
        }).catch(err => {
            console.log(err);
            this.setState({
                isLoading: false,
            });
        });
    }

    /* The style of the text/links/variable boxes for the page when the user wants to
    change their weight.  Also provides a link to a page that allows a 
    user to change their weight and save the changes they made.*/
    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.viewStyle}>
                    <Text>Loading...</Text>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <ImageBackground style ={styles.backgroundImage} source={image} >
                <Text style = {styles.signupLinkText}>
                    Change Weight
                </Text>
                <Text style = {styles.logoText}>
                    Changes will be reflected in Health Scores the next day. {"\n\n"}Current Weight: {this.props.user.weight + ` lbs.`}
                </Text>
                <Text style = {styles.textStyle}></Text>
                <TextInput
                    placeholderTextColor = 'white'
                    style={styles.input}
                    keyboardType = 'numeric'
                    placeholder="New Weight"
                    value={this.state.newWeight}
                    onChangeText={text => { this.setState({newWeight: text}) }}
                />
                <Text style = {styles.textStyle}> </Text>
                <Button onPress={this.save} title="Save"/>
            </ImageBackground>
            </View>
        )
    }  
}


/* Sets the state of the user and returns the value associated with
that user to be used by the rest of the class.*/
const mapStateToProps = (state) => {
    const { user } = state
    return { user }
};

/* Maps the changes that are made to be applied/used by other classes
associated with the application.*/
const mapDispatchToProps = (dispatch) => {
    return {
        changeWeight: (weight) => {
            dispatch({
                type: "CHANGE_WEIGHT",
                payload: weight,
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeWeightPage);
