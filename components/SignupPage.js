import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Image, ImageBackground, Text, View, Button, Dimensions, Alert } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import styles from './frontendstyle';

const image = (require('../assets/background.jpg'));
class SignupPage extends Component {
    constructor() {
        super();
        this.state = {
            signUpError: '',
            username: '',
            email: '',
            password: '',
            isLoading: false,
            signUpSuccess: false,
            isLoadingFoods: false,
            foodPrepared: false,
        };
    }

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
                this.setState({
                    foodPrepared: true,
                });
                this.props.setFoods(json.foods);
            }
        }).catch(err => {
            console.log(err);
            this.setState({
                isLoading: false,
            });
        });
    }

    onSignUp = () => {
        this.setState({ isLoading: true });
        fetch('http://192.168.1.111:5000/users/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
            }),
        }).then(res => res.json()).then(json => {
            if (json.result == 1) {
                this.setState({
                    isLoading: false,
                    signUpSuccess: true,
                });
                this.props.setUser(json.user);
                this.getFoods();
            }
            else {
                Alert.alert("Warning: ", json.message);
                this.setState({
                    signUpError: json.message,
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

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <Text>Loading...</Text>
                </View>
            );
        }
        if (this.state.isLoadingFoods) {
            return (
                <View style={styles.container}>
                    <Text>Loading Foods...</Text>
                </View>
            );
        }
        if (this.state.signUpSuccess && this.state.foodPrepared) {
            this.props.navigation.navigate("Age Question Page");
        }
        return (
            <View style={styles.container}>
                <ImageBackground style={styles.backgroundImage} source={image} >
                    <View style={styles.align}>
                        <Text style={styles.signupLinkText}>
                            Sign Up
                </Text>
                    </View>
                    <View style={styles.wrapper}>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor="white"
                            placeholder="Username"
                            value={this.state.username}
                            onChangeText={text => { this.setState({ username: text }) }}
                        />
                        <TextInput
                            placeholderTextColor="white"
                            style={styles.input}
                            placeholder="Email"
                            value={this.state.email}
                            onChangeText={text => { this.setState({ email: text }) }}
                        />
                        <TextInput
                            style={styles.input}
                            placeholderTextColor="white"
                            placeholder="Password"
                            value={this.state.password}
                            onChangeText={text => { this.setState({ password: text }) }}
                            secureTextEntry
                        />
                    </View>
                    <View style = {styles.buttonContainerAlt}>
                        <Button onPress={this.onSignUp} title="Sign Up" style={styles.button} fontSize={20} />
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    const { user } = state
    return { user }
};

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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
