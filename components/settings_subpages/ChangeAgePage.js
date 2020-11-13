import React, { Component } from 'react';
import { AppRegistry,StyleSheet,Image, ImageBackground, Text, View, Button,Dimensions, Alert,TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { TextInput } from 'react-native-gesture-handler';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import styles from '../frontendstyle';

const {width,height} = Dimensions.get("window");
const image = (require('../../assets/background.jpg'));

/* Constructs variables and sets the default state for the newAge 
and isLoading.*/
class ChangeAgePage extends Component {
    constructor() {
        super();
        this.state = {
            newAge: "",
            isLoading: false,
        };
    }

    /* Saves the changes made by the user by changing the state of
    isLoading to true, which then allows the user to change their
    age associated with their account.  After which, changes isLoading
    back to false so that the changes are applied, and displays a message
    that their age is being changed.*/
    save = () => {
        this.setState({isLoading: true});
        const newUser = JSON.parse(JSON.stringify(this.props.user));
        newUser.age = this.state.newAge;
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
                this.props.changeAge(this.state.newAge);
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
    user wants to change their age.  Also provides a link to a page 
    that allows a user to change their age and save the changes they made.*/
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
                    Change Age
                </Text>
                <Text style = {styles.logoText}>
                Changes will be reflected in Health Scores the next day. {"\n\n"}Current Age: {this.props.user.age}.
                </Text>
                <Text style = {styles.textStyle}></Text>
                <TextInput
                    placeholderTextColor = 'white'
                    style={styles.input}
                    keyboardType = "numeric"
                    placeholder="New Age"
                    value={this.state.newAge}
                    onChangeText={text => { this.setState({newAge: text}) }}
                />

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
        changeAge: (age) => {
            dispatch({
                type: "CHANGE_AGE",
                payload: age,
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeAgePage);
