import React, { Component } from 'react';
import { AppRegistry,Picker, StyleSheet,Image, ImageBackground, Text, View, Button,Dimensions, Alert,TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { TextInput } from 'react-native-gesture-handler';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import styles from '../frontendstyle';

const {width,height} = Dimensions.get("window");
const image = (require('../../assets/background.jpg'));

/* Constructs variables and sets the default state for the newAL 
and isLoading.*/
class ChangeALPage extends Component {
    constructor() {
        super();
        this.state = {
            newAL: "Sedentary",
            isLoading: false,
        };
    }

    /* Saves the changes made by the user by changing the state of
    isLoading to true, which then allows the user to change their
    AL associated with their account.  After which, changes isLoading
    back to false so that the changes are applied, and displays a message
    that their AL is being changed.*/
    save = () => {
        if (this.state.newAL === this.props.user.activityLevel) return;
        this.setState({ isLoading: true });
        const newUser = JSON.parse(JSON.stringify(this.props.user));
        newUser.activityLevel = this.state.newAL;
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
                this.props.changeActivityLevel(this.state.newAL);
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
    user wants to change their AL.  Also provides a link to a page 
    that allows a user to change their AL and save the changes they made.*/
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
                <Text style={styles.signupLinkText}>
                    Change Activity Level
                </Text>
                <Text style={styles.logoText}>
                    Changes will be reflected in Health Scores the next day. {"\n\n"}Current Activity Level: {this.props.user.activityLevel}
                </Text>
                <Text style={styles.textStyle}></Text>
                <Picker
                    itemStyle = {{color:'white'}}
                    selectedValue={this.state.newAL}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({ newAL: itemValue })
                    }
                    prompt = "New Activity Level">
                    <Picker.Item label="Sedentary" value="Sedentary" />
                    <Picker.Item label="Low Active" value="Low" />
                    <Picker.Item label="Active" value="Medium" />
                    <Picker.Item label="Very Active" value="High" />
                </Picker>
                <Text style={styles.textStyle}> </Text>
                <Button onPress={this.save} title="Save" />
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
        changeActivityLevel: (AL) => {
            dispatch({
                type: "CHANGE_ACTIVITY_LEVEL",
                payload: AL,
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeALPage);
