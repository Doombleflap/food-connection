/*
Documentation provided by Andrew Glenn and Trevor Templin 11/5/2020
*/
// Import module used to interact with the backend and draw on the app
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Image, ImageBackground, Text, View, Button, Dimensions, Alert, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import styles from './frontendstyle';

const image = (require('../assets/background.jpg'));

// Constructor class
class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            foods: this.props.foods.list,
        };
    }

    searchList = () => {
        const newFoods = [];
        const allFoods = this.props.foods.list;
        var searchText = this.state.text.toLowerCase().trim();
        allFoods.forEach((item) => {
            var itemName = item.name.toLowerCase();
            if (itemName.indexOf(searchText) !== -1) {
                newFoods.push(item);
            }
        });
        this.setState({ foods: newFoods });
    }

    FoodItem = ({ food }) => {
        return (
            <TouchableHighlight activeOpacity={1.0} underlayColor="#000000" onPress={() => {
                this.props.selectFood(food);
                this.props.navigation.navigate("Food Page");
            }}>
                <View style={styles.foodItem}>
                    <Text style={styles.foodName}>{food.healthScore} - {food.name}</Text>
                    <Text style={styles.foodName}>{food.restaurant.name}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    // Renders the styling to be used in the UI
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground style={styles.backgroundImage} source={image}>
                        <SearchBar
                            style = {styles.align}
                            round
                            searchIcon={{ size: 20 }}
                            onChangeText={(text) => {
                                this.setState({ text: text });
                                this.searchList();
                            }}
                            placeholder="Search for a food..."
                            value={this.state.text}
                            onKeyPress={({ nativeEvent }) => {
                                if (nativeEvent.key === 'Backspace') this.searchList();
                            }}
                        />
                    <FlatList
                        data={this.state.foods}
                        renderItem={({ item }) => <this.FoodItem food={item} />}
                        keyExtractor={item => item._id}
                    />
                    <Button color="#CC5CFF" onPress={() =>
                        this.setState({ foods: this.props.foods.list })
                    } title="Reload Health Scores" />
                </ImageBackground>
            </View>
        );
    }
}

// Updates the state of data to the interface
const mapStateToProps = (state) => {
    const { user, foods } = state;
    return { user, foods };
};

const mapDispatchToProps = (dispatch) => {
    return {
        selectFood: (food) => {
            dispatch({
                type: "SELECT_FOOD",
                payload: food,
            });
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);