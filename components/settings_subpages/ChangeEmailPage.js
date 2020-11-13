import React, { Component } from 'react';
import { AppRegistry,StyleSheet,Image, ImageBackground, Text, View, Button,Dimensions, Alert,TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { TextInput } from 'react-native-gesture-handler';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import styles from '../frontendstyle';
const {width,height} = Dimensions.get("window");
const image = (require('../../assets/background.jpg'));

/* Constructs variables and sets the default state for the newEmail 
and isLoading.*/
class ChangeEmailPage extends Component {
    constructor() {
        super();
        this.state = {
            newEmail: "",
            isLoading: false,
        };
    }

    /* Saves the changes made by the user by changing the state of
    isLoading to true, which then allows the user to change their
    email associated with their account.  After which, changes isLoading
    back to false so that the changes are applied, and displays a message
    that their email is being changed.*/
    save = () => {
        this.setState({isLoading: true});
        const newUser = JSON.parse(JSON.stringify(this.props.user));
        newUser.email = this.state.newEmail;
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
                this.props.changeEmail(this.state.newEmail);
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
    user wants to change their email.  Also provides a link to a page 
    that allows a user to change their email and save the changes they made.*/
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
                <ImageBackground style= {styles.backgroundImage} source= {image}>
                <Text style = {styles.signupLinkText}>
                    Change Email
                </Text>
                <Text style = {styles.logoText}>
                    Current Email: {this.props.user.email}
                </Text>
                <Text style = {styles.textStyle}></Text>
                <TextInput
                    placeholderTextColor = 'white'
                    style={styles.input}
                    placeholder="New Email"
                    value={this.state.newEmail}
                    onChangeText={text => { this.setState({newEmail: text}) }}
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
        changeEmail: (email) => {
            dispatch({
                type: "CHANGE_EMAIL",
                payload: email,
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeEmailPage);
