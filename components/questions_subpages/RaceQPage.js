import React, { Component } from 'react';
import { AppRegistry,Picker, StyleSheet,Image, ImageBackground, Text, View, Button,Dimensions, Alert } from 'react-native';
import { connect } from 'react-redux';
import styles from '../frontendstyle';
const image = (require('../../assets/background.jpg'));

/* Constructs variables and sets the default state for the newRace,
isLoading, and updateSuccess.*/
class RaceQPage extends Component {
    constructor() {
        super();
        this.state = {
            newRace: "White",
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
        this.setState({isLoading: true});
        const newUser = JSON.parse(JSON.stringify(this.props.user));
        newUser.race = this.state.newRace;
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
                this.props.changeRace(this.state.newRace);
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
    user wants to change their ethnicity.  Also provides a link to a page 
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
            this.props.navigation.navigate("Weight Question Page");
        }

        return (
            <View style={styles.container}>
                <ImageBackground style ={styles.backgroundImage} source={image} >
                <Text style = {styles.signupLinkText}>
                    Set Race
                </Text>
                <Picker
                    itemStyle = {{color:"white"}}
                    selectedValue={this.state.newRace}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({ newRace: itemValue })
                    }
                    prompt = "Set Race">
                    <Picker.Item label="White" value="White" />
                    <Picker.Item label="Black" value="Black" />
                    <Picker.Item label="Asian" value="Asian" />
                    <Picker.Item label="American Native" value="Native American" />
                    <Picker.Item label="Hawaiian Native" value="Native Hawaiian" />
                    <Picker.Item label="Other" value="Other" />
                    <Picker.Item label="Two or More Races" value="Multiracial" />
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
        changeRace: (race) => {
            dispatch({
                type: "CHANGE_RACE",
                payload: race,
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RaceQPage);
