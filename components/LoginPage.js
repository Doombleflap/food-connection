import React, { Component } from 'react';
import { AppRegistry,StyleSheet,Image, ImageBackground, Text, View, Button,Dimensions, Alert,TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { TextInput } from 'react-native-gesture-handler';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import HealthScoreCalculator from '../tools/HealthScoreCalculator';
const image = {uri: "https://www.flavorofindia.com/wp-content/uploads/2014/07/photodune-6761938-food-background-on-dark-slate-m1-1024x1024.jpg"}
const {width,height} = Dimensions.get("window");

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

    setHealthScores = () => {
        const foods = JSON.parse(JSON.stringify(this.props.foods.list));
        HealthScoreCalculator.setHealthScore(foods, this.props.user.diet);
        this.props.setFoods(foods);
    }

    getFoods = () => {
        this.setState({ isLoadingFoods: true });
        fetch('http://192.168.1.10:5000/foods', {
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

    onLogin = () => {
        this.setState({ isLoading: true });
        fetch('http://192.168.1.10:5000/users/login', {
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
                <ImageBackground style ={styles.backgroundImage} source={image} >
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
                </View>
                <View style={styles.wrapper}>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="white"
                    onChangeText={text => { this.setState({ password: text }) }}
                    value={this.state.password}
                    secureTextEntry
                />
                </View>
                
                <View style = {styles.button}>
                <Button onPress={this.onLogin} title="Login" style = {styles.button} />
                </View>
            </ImageBackground>
            </View>
        
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent:"center",
    },
    markWrap: {
      flex: 1,
      paddingVertical: 30,
    },
    mark: {
      width: null,
      height: null,
      flex: 1,
    },
    background: {
      width,
      height,
    },
    wrapper: {
      marginTop: 10,
      
    },
    inputWrap: {
      flexDirection: "row",
      marginVertical: 5,
      height: 40,
      borderBottomWidth: 1,
      borderRadius: 25,
      paddingLeft: 25,
      backgroundColor: "rgba(0,0,0,0.35)",
    },
    iconWrap: {
      paddingHorizontal: 7,
      alignItems: "center",
      justifyContent: "center",
    },
    icon: {
      height: 20,
      width: 20,
    },
    input: {
      width: width - 55,
      height: 45,
      borderRadius: 25,
      fontSize: 16,
      backgroundColor: "rgba(0,0,0,.2)",
      marginHorizontal: 25,
      paddingLeft: 45,
      color: "rgba(255,255,255,0.7)",
    },
    button: {
      width: width - 55,
      height: 45,
      borderRadius: 25,
      backgroundColor: "lightgreen",
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
      paddingLeft: 4,
      marginHorizontal: 25,
    },
    buttonText: {
      color: "rgba(255,255,255,0.7)",
      fontSize: 10,
      textAlign: 'center',
      
    },
    forgotPasswordText: {
      color: "#D8D8D8",
      backgroundColor: "transparent",
      textAlign: "right",
      paddingRight: 15,
    },
    signupWrap: {
      backgroundColor: "transparent",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    accountText: {
      color: "#D8D8D8"
    },
    signupLinkText: {
      fontWeight:'bold',
      color: "white",
      textAlign: 'center',
      fontSize: 40,
      paddingVertical: 0,
      marginBottom: 10,
      
    },
    backgroundImage: {
      flex: 1,
      width: '100%',
      height: '100%',
      justifyContent: "center",
     //alignItems: "center",
      //opacity: 0.7,
  },
  align: {
      marginBottom: 40,
  },
  });

const mapStateToProps = (state) => {
    return {
        user: state.user,
        foods: state.foods,
    };
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
