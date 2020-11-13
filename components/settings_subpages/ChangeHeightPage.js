import React, { Component } from 'react';
import { AppRegistry,StyleSheet,Image, ImageBackground, Text, View, Button,Dimensions, Alert,TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { TextInput } from 'react-native-gesture-handler';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import styles from '../frontendstyle';

/* Constructs variables and sets the default state for the newHeight 
and isLoading.*/
const {width,height} = Dimensions.get("window");
const image = (require('../../assets/background.jpg'));
class ChangeHeightPage extends Component {
    constructor() {
        super();
        this.state = {
            newHeight: "",
            isLoading: false,
        };
    }

    /* Saves the changes made by the user by changing the state of
    isLoading to true, which then allows the user to change their
    height associated with their account.  After which, changes isLoading
    back to false so that the changes are applied, and displays a message
    that their height is being changed.*/
    save = () => {
        this.setState({isLoading: true});
        const newUser = JSON.parse(JSON.stringify(this.props.user));
        newUser.height = this.state.newHeight;
        fetch('http://192.168.1.111:5000/users/update', {
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
                this.props.changeHeight(this.state.newHeight);
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

    /* Takes the height in inches input by the user and converts it to
    a feet and inches measurement, then returns the value as *ft. *in.*/
    convertHeight = (heightInInches) => {
        var height = Number(heightInInches);
        var feet = ~~(height / 12);
        var inches = height % 12;
        return feet.toString() + " ft. " + inches.toString() + " in."
    }

    /* The style of the text/links/variable boxes for the page when the 
    user wants to change their height.  Also provides a link to a page 
    that allows a user to change their height and save the changes they made.*/
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
                    Change Height
                </Text>
                <Text style = {styles.logoText}>
                    Changes will be reflected in Health Scores the next day. {"\n\n"}Current Height: {this.convertHeight(this.props.user.height)}
                </Text>
                <Text style = {styles.textStyle}></Text>
                <TextInput
                    placeholderTextColor = 'white'
                    style={styles.input}
                    keyboardType = 'numeric'
                    placeholder="New Height (in inches)"
                    value={this.state.newHeight}
                    onChangeText={text => { this.setState({newHeight: text}) }}
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
        changeHeight: (height) => {
            dispatch({
                type: "CHANGE_HEIGHT",
                payload: height,
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeHeightPage);
