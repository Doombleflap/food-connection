import React, { Component } from 'react';
import { AppRegistry,Picker, StyleSheet,Image, ImageBackground, Text, View, Button,Dimensions, Alert,TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { TextInput } from 'react-native-gesture-handler';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import styles from '../frontendstyle';
const image = (require('../../assets/background.jpg'));
const {width,height} = Dimensions.get("window");

/* Constructs variables and sets the default state for the newRace 
and isLoading.*/
class ChangeRacePage extends Component {
    constructor() {
        super();
        this.state = {
            newRace: "White",
            isLoading: false,
        };
    }

    /* Saves the changes made by the user by changing the state of
    isLoading to true, which then allows the user to change their
    ethnicity associated with their account.  After which, changes isLoading
    back to false so that the changes are applied, and displays a message
    that their ethnicity is being changed.*/
    save = () => {
        if (this.state.newRace === this.props.user.race) return;
        this.setState({isLoading: true});
        const newUser = JSON.parse(JSON.stringify(this.props.user));
        newUser.race = this.state.newRace;
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
                this.props.changeRace(this.state.newRace);
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

    /* The style of the text/links/variable boxes for the page when the user wants to
    change their ethnicity.  Also provides a link to a page that allows a 
    user to change their ethnicity and save the changes they made.*/
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
                    Change Race
                </Text>
                <Text style = {styles.logoText}>
                    Current Race: {this.props.user.race}
                </Text>
                <Text style = {styles.textStyle}></Text>
                <Picker
                    itemStyle = {{color:'white'}}
                    selectedValue={this.state.newRace}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({ newRace: itemValue })
                    }
                    prompt = "New Race">
                    <Picker.Item label="White" value="White" />
                    <Picker.Item label="Black" value="Black" />
                    <Picker.Item label="Asian" value="Asian" />
                    <Picker.Item label="American Native" value="Native American" />
                    <Picker.Item label="Hawaiian Native" value="Native Hawaiian" />
                    <Picker.Item label="Other" value="Other" />
                    <Picker.Item label="Two or More Races" value="Multiracial" />
                </Picker>
                <Text style={styles.textStyle}> </Text>
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
        changeRace: (race) => {
            dispatch({
                type: "CHANGE_RACE",
                payload: race,
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeRacePage);
