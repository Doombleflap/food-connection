import React, { Component } from 'react';
import { AppRegistry,StyleSheet,Image, ImageBackground, Text, View, Button,Dimensions, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import styles from '../frontendstyle';
const image = (require('../../assets/background.jpg'));

/* Constructs variables and sets the default state for the newWeight,
isLoading, and updateSuccess.*/
class WeightQPage extends Component {
    constructor() {
        super();
        this.state = {
            newWeight: "",
            isLoading: false,
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
            if (json.result == 1) {
                this.setState({
                    isLoading: false,
                });
                this.props.changeWeight(this.state.newWeight);
                this.props.navigation.navigate("Signup Load Page");
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
    user wants to change their weight.  Also provides a link to a page 
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
                <ImageBackground style ={styles.backgroundImage} source={image} >
                <Text style={styles.signupLinkText}>
                    Set Weight
                </Text>
                <TextInput
                    placeholderTextColor = 'white'
                    style={styles.input}
                    placeholder="Weight"
                    value={this.state.newWeight}
                    keyboardType = 'numeric'
                    onChangeText={text => { this.setState({ newWeight: text }) }}
                />
                <View style = {styles.buttonContainerAlt}>
                    <Button onPress={this.save} style={styles.button} title="Finish" />
                </View>
            </ImageBackground>
            </View>
        )
    }
}

/* Sets the state of the user and returns the value associated with
that user to be used by the rest of the class.*/
const mapStateToProps = (state) => {
    const { user, foods } = state
    return { user, foods }
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
        },
        setFoods: (foods) => {
            dispatch({
                type: "SET_FOODS",
                payload: foods,
            });
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeightQPage);
