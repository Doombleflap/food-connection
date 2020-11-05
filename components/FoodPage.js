/*
Documentation provided by Andrew Glenn and Trevor Templin 11/5/2020
*/
// Import module used to interact with the backend and draw on the app
import React, { Component } from 'react';
import { Linking, AppRegistry, StyleSheet, Image, ImageBackground, Text, View, Button, Dimensions, Alert, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { connect } from 'react-redux';
import HealthScoreCalculator from '../tools/HealthScoreCalculator';
import styles from './frontendstyle';

// Background image
const image = (require('../assets/background.jpg'));

/* Creates a constructor to hold variables to hold values for setHealthScores, save (the state),
   and the render function to render the HTML function to the app
*/
class FoodPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        }
    }

    setHealthScores = () => {
        const foods = JSON.parse(JSON.stringify(this.props.foods.list));
        HealthScoreCalculator.setHealthScore(foods, this.props.user.diet);
        this.props.setFoods(foods);
    }

    // Saves data submitted to the database
    save = () => {
        this.setState({ isLoading: true });
        fetch('http://192.168.10.239:5000/users/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: this.props.user
            }),
        }).then(res => res.json()).then(json => {
            Alert.alert("Notification received: ", json.message);
            this.setState({
                isLoading: false,
            });
        }).catch(err => {
            console.log(err);
            this.setState({
                isLoading: false,
            });
        });
    }

    // Renders HTML elements
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
                <Text style={{ width: '100%', paddingTop: 40, paddingBottom: 15, backgroundColor: 'lightgreen', justifyContent: 'center', fontSize: 20, textAlign: 'center' }}>Additional Info </Text>

                <ImageBackground style={styles.backgroundImage} source={image}>
                    <View style={styles.textContainer3}>
                        <Text style={styles.restaurantStyle3}>
                            {this.props.global.selectedFood.restaurant.name} - {this.props.global.selectedFood.restaurant.location}
                        </Text>
                    </View>
                    <View style={styles.textContainer3}>
                        <Text style={styles.textStyle3}>
                            {this.props.global.selectedFood.name} - ${this.props.global.selectedFood.price}
                        </Text>
                    </View>
                    <View style={styles.textContainer3}>
                        <Text style={styles.textStyle3}>
                            Health Score: {this.props.global.selectedFood.healthScore}
                        </Text>
                        <Text style={styles.textStyle3}>
                            Calories: {this.props.global.selectedFood.calories}
                        </Text>
                    </View>
                    <View style={styles.textContainer3}>
                        <Text style={styles.textStyle3}>
                            Fat: {this.props.global.selectedFood.fat}g
                    </Text>
                        <Text style={styles.textStyle3}>
                            Carbs: {this.props.global.selectedFood.carbs}g
                    </Text>
                        <Text style={styles.textStyle3}>
                            Protein: {this.props.global.selectedFood.protein}g
                    </Text>
                    </View>
                    <View style={styles.textContainer3}>
                        <Text style={styles.textStyle3}>
                            Fiber: {this.props.global.selectedFood.fiber}g
                    </Text>
                        <Text style={styles.textStyle3}>
                            Added Sugars: {this.props.global.selectedFood.addedSugar ? "Yes" : "No"}
                        </Text>
                    </View>
                    <View style={styles.button}>
                        <Button onPress={() => {
                            this.props.logFood({ food: this.props.global.selectedFood, time: Date.now() });
                            this.setHealthScores();
                            this.save();
                        }} title="Log Food as Consumed" />
                    </View>
                    <View style={styles.button}>
                        <Button onPress={() =>
                            Linking.openURL(`https://maps.google.com/?q=` + this.props.global.selectedFood.restaurant.location)
                        } title="Click here to Navigate" />
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

// Updates the state of data to the interface
const mapStateToProps = (state) => {
    const { user, global, foods } = state;
    return { user, global, foods };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logFood: (food) => {
            dispatch({
                type: "ADD_FOOD_TO_HISTORY",
                payload: food,
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

export default connect(mapStateToProps, mapDispatchToProps)(FoodPage);