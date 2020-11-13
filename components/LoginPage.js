/*
Documentation provided by Andrew Glenn and Trevor Templin 11/5/2020
*/
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Image, ImageBackground, Text, View, Button, Dimensions, Alert, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import HealthScoreCalculator from '../tools/HealthScoreCalculator';
import styles from './frontendstyle';

const image = (require('../assets/background.jpg'));

/* Creates a constructor to hold variables to hold values for username, password, 
sign in error message, loading pages, loading foods, and successful login.*/
class LoginPage extends Component {                 
    constructor(props) {                            
        super(props);                                
        this.state = {                              
            signInError: '',
            username: '',
            password: '',
            isLoading: false,
            isLoadingFoods: false,
            loginSuccess: false,
        };
    }

    /* Displays the health score of foods that gets calulated by the HealthScoreCalculator.*/
    setHealthScores = () => {
        const foods = JSON.parse(JSON.stringify(this.props.foods.list));
        HealthScoreCalculator.setHealthScore(foods, this.props.user.diet);
        this.props.setFoods(foods);
    }

    /* Loads the database to display the foods that have been put into the database, and
    shows the health score of the foods by changing the state referenced from the SignupPage,
    and catches potential errors changing the state again.*/
    getFoods = () => {
        this.setState({ isLoadingFoods: true });
        fetch('http://192.168.1.111:5000/foods', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json()).then(json => {
            this.setState({ isLoadingFoods: false });
            if (json.result == 1) {
                this.props.setFoods(json.foods);
                const currentDay = new Date();
                currentDay.setHours(0, 0, 0, 0);
                if (currentDay.getTime() !== new Date(this.props.user.diet.lastCalculated).getTime()) {
                    /* The day has changed, recalculate health scores based off of a day where we haven't eaten anything */
                    this.props.changeDiet(HealthScoreCalculator.createDiet(this.props.user));
                }
                this.setHealthScores();
                this.props.navigation.dispatch(CommonActions.reset({
                    index: 0,
                    routes: [
                        {
                            name: 'Drawer',
                        },
                    ],
                }));
            }
        }).catch(err => {
            console.log(err);
            this.setState({
                isLoading: false,
            });
        });
    }

    /* Takes the username and password input from the user and logs them into their account,
    while also connecting them to the database by changing the state.  If the user provides incorrect username
    and/or password displays a message notifying them.*/
    onLogin = () => {
        this.setState({ isLoading: true });
        fetch('http://192.168.1.111:5000/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            }),
        }).then(res => res.json()).then(json => {
            Alert.alert("Notification received: ", json.message);
            if (json.result == 1) {
                this.setState({
                    isLoading: false,
                    loginSuccess: true,
                });
                this.props.setUser(json.user);
                this.getFoods();
            }
            else {
                this.setState({
                    signInError: json.message,
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

    /* Notifies the user that the page is loading and shows the username and password
    they have input into the the page and provides a button that allows them to submit
    their input to the database and directs them to the appropriate page (either back to
    the login page if an incorrect username/password were entered or to their account page
    associated with their username and password if input correctly also referencing the state.*/
    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.viewStyle}>
                    <Text>Loading...</Text>
                </View>
            );
        }

        if (this.state.isLoadingFoods) {
            return (
                <View style={styles.viewStyle}>
                    <Text>Loading Foods...</Text>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <ImageBackground style={styles.backgroundImage} source={image} >
                    <Text style={styles.signupLinkText}>
                        Login
                    </Text>
                    <View style={styles.wrapper}>
                        <TextInput
                            style={styles.input}
                            placeholder="Username"
                            placeholderTextColor="white"
                            value={this.state.username}
                            onChangeText={text => { this.setState({ username: text }) }}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor="white"
                            onChangeText={text => { this.setState({ password: text }) }}
                            value={this.state.password}
                            secureTextEntry
                        />
                    </View>
                    <View style = {styles.buttonContainerAlt}>
                        <Button onPress={this.onLogin} title="Login" style={styles.button} />
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

// Returns the current state of the variables referenced.
const mapStateToProps = (state) => {            
    return {
        user: state.user,
        foods: state.foods,
    };
};

/* ??? Maps methods setUser, setFoods, and changeDiet to create an action that places the info
for user, foods, and diet into a payload (usable info) to be distributed when appropriate.*/
const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (user) => {
            dispatch({
                type: "SET_USER",
                payload: user,
            });
        },
        setFoods: (foods) => {
            dispatch({
                type: "SET_FOODS",
                payload: foods,
            });
        },
        changeDiet: (diet) => {
            dispatch({
                type: "CHANGE_DIET",
                payload: diet,
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
