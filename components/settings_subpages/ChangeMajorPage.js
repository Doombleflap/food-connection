import React, { Component } from 'react';
import { AppRegistry,StyleSheet,Image, ImageBackground, Text, View, Button,Dimensions, Alert,TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { TextInput } from 'react-native-gesture-handler';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import styles from '../frontendstyle';
const image = (require('../../assets/background.jpg'));
const {width,height} = Dimensions.get("window");

/* Constructs variables and sets the default state for the newRace 
and isLoading.*/
class ChangeMajorPage extends Component {
    constructor() {
        super();
        this.state = {
            newMajor: "",
            isLoading: false,
        };
    }

    /* Saves the changes made by the user by changing the state of
    isLoading to true, which then allows the user to change their
    major associated with their account.  After which, changes isLoading
    back to false so that the changes are applied, and displays a message
    that their major is being changed.*/
    save = () => {
        this.state.newMajor = this.state.newMajor.trim();
        if (this.state.newMajor === this.props.user.major) return;
        this.setState({isLoading: true});
        const newUser = JSON.parse(JSON.stringify(this.props.user));
        newUser.major = this.state.newMajor;
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
                this.props.changeMajor(this.state.newMajor);
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

    /* The style of the text/links/variable boxes for the page when the 
    user wants to change their major.  Also provides a link to a page 
    that allows a user to change their major and save the changes they made.*/
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
                    Change Major
                </Text>
                <Text style = {styles.logoText}>
                    Current Major: {this.props.user.major}
                </Text>
                <Text style = {styles.textStyle}></Text>
                <TextInput
                    placeholderTextColor = 'white'
                    style={styles.input}
                    placeholder="New Major"
                    value={this.state.newMajor}
                    onChangeText={text => { this.setState({newMajor: text}) }}
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
        changeMajor: (major) => {
            dispatch({
                type: "CHANGE_MAJOR",
                payload: major,
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeMajorPage);
