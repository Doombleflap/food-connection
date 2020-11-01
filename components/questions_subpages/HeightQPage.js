import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Image, ImageBackground, Text, View, Button, Dimensions, Alert } from 'react-native';
import Constants from 'expo-constants';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import styles from '../frontendstyle';
const image = (require('../../assets/background.jpg'));

/* Constructs variables and sets the default state for the newHeight,
isLoading, and updateSuccess.*/
class HeightQPage extends Component {
    constructor() {
        super();
        this.state = {
            newHeight: "",
            isLoading: false,
            updateSuccess: false,
        };
    }

    /* Changes the state of isLoading to true so when a new user
    creates an account they can save their intitial input of information  
    to the database.  After which, it either confirms their input as valid
    or invalid and displays the appropriate message and changes isLoading
    back to false after the input is accepted.*/
    save = () => {
        this.setState({ isLoading: true });
        const newUser = JSON.parse(JSON.stringify(this.props.user));
        newUser.height = this.state.newHeight;
        fetch('http://192.168.10.239:5000/users/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: newUser
            }),
        }).then(res => res.json()).then(json => {
            if (json.result == 1) {
                this.setState({
                    isLoading: false,
                    updateSuccess: true,
                });
                this.props.changeHeight(this.state.newHeight);
            }
            else {
                Alert.alert("Warning: ", json.message);
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
    that allows a user to change their age and save the changes they made.*/
    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.viewStyle}>
                    <Text>Loading...</Text>
                </View>
            );
        }

        if (this.state.updateSuccess) {
            this.props.navigation.navigate("Major Question Page");
        }

        return (
            <View style={styles.container}>
                <ImageBackground style={styles.backgroundImage} source={image} >
                    <Text style={styles.signupLinkText}>
                        Set Height (in inches)
                </Text>
                    <View style={styles.wrapper}>
                        <TextInput
                            placeholderTextColor='white'
                            style={styles.input}
                            keyboardType={"numeric"}
                            placeholder="Height (in inches)"
                            value={this.state.newHeight}
                            onChangeText={text => { this.setState({ newHeight: text }) }}
                        />
                    </View>
                    <View style = {styles.buttonContainerAlt}>
                        <Button onPress={this.save} style={styles.button} title="Next" />
                    </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(HeightQPage);
