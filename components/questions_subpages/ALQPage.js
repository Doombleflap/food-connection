import React, { Component } from 'react';
import { AppRegistry, Picker, StyleSheet, Image, ImageBackground, Text, View, Button, Dimensions, Alert } from 'react-native';
import { connect } from 'react-redux';
import styles from '../frontendstyle';
const image = (require('../../assets/background.jpg'));

/* Constructs variables and sets the default state for the newAL,
isLoading, and updateSuccess.*/
class ALQPage extends Component {
    constructor() {
        super();
        this.state = {
            newAL: "Sedentary",
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
        newUser.activityLevel = this.state.newAL;
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
                this.props.changeActivityLevel(this.state.newAL);
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

    /* The style of the text/links/variable boxes for the page when the 
    user wants to change their AL.  Also provides a link to a page 
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
            this.props.navigation.navigate("Gender Question Page");
        }

        return (
            <View style={styles.container}>
                <ImageBackground style={styles.backgroundImage} source={image} >
                    <Text style={styles.signupLinkText}>
                        Set Activity Level
                    </Text>
                    <Picker
                        itemStyle={{ color: 'white' }}
                        selectedValue={this.state.newAL}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ newAL: itemValue })
                        }
                        prompt="New Activity Level">
                        <Picker.Item label="Sedentary" value="Sedentary" />
                        <Picker.Item label="Low Active" value="Low" />
                        <Picker.Item label="Active" value="Medium" />
                        <Picker.Item label="Very Active" value="High" />
                    </Picker>

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
        changeActivityLevel: (AL) => {
            dispatch({
                type: "CHANGE_ACTIVITY_LEVEL",
                payload: AL,
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ALQPage);
