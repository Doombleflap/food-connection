/*
Documentation provided by Trevor Templin 10/21/2020
*/
import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import Constants from 'expo-constants';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import HealthScoreCalculator from '../tools/HealthScoreCalculator';
import styles from './frontendstyle';

/* This is the last page in the sign up process, so please call calculations for health score and other adjustments here. */

var diet = {};

class SignUpLoadPage extends Component {
    constructor(props) {
        super(props);
    }

    determineDietPlan = () => {                                     // Creates a diet plan for
        diet = HealthScoreCalculator.createDiet(this.props.user);   // the user based upon their
        this.props.changeDiet(diet);                                // health scores referenced from
        console.log("Diet calculated: " + JSON.stringify(diet));    // LoginPage.
    }

    setHealthScores = () => {                                               // Sets the users
        const foods = JSON.parse(JSON.stringify(this.props.foods.list));    // health score to be
        HealthScoreCalculator.setHealthScore(foods, diet);                  // applied to their diet.
        this.props.setFoods(foods);
    }

    save = () => {                                                      // Saves the new user to the 
        const newUser = JSON.parse(JSON.stringify(this.props.user));    // database and displays their
        newUser.diet = diet;                                            // info on the screen.  Otherwise
        fetch('http://192.168.1.111:5000/users/update', {                  // displays a message if an error
            method: 'POST',                                             // occurs.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: newUser
            }),
        }).then(res => res.json()).then(json => {
            if (json.result == 1) {
                this.props.navigation.dispatch(CommonActions.reset({
                    index: 0,
                    routes: [
                        {
                            name: 'Drawer',
                        },
                    ],
                }));
            }
            else {
                Alert.alert("Warning: ", json.message);
            }
        }).catch(err => {
            console.log(err);
        });
    }

    componentDidMount() {           // Mounts the methods to the current object and saves it.
        this.determineDietPlan();
        this.setHealthScores();
        this.save();
    }

    render() {                                  // Creates a loading screen while performing operations.
        return (
            <View style={styles.viewStyle}>
                <Text>Loading...</Text>
            </View>
        );
    }
}


const mapStateToProps = (state) => {    // Maps the constants user and foods to a state
    const { user, foods } = state       // and returns their states.
    return { user, foods }
};

/* ??? Maps methods setFoods and changeDiet to create an action that places the info
for user, foods, and diet into a payload (usable info) to be distributed when appropriate.*/
const mapDispatchToProps = (dispatch) => {  
    return {
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUpLoadPage);
