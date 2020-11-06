/*
Documentation provided by Andrew Glenn and Trevor Templin 11/5/2020
*/
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

/* Components */
import SearchPage from './components/SearchPage';
import HistoryPage from './components/HistoryPage';
import DataPage from './components/DataPage';
import SettingsPage from './components/SettingsPage';
import FoodPage from './components/FoodPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import OpeningPage from './components/OpeningPage';
import SignUpLoadPage from './components/SignUpLoadPage';
import AdminPage from './components/AdminPage';
import AchievementsPage from './components/AchievementsPage';

/* Settings Screens */
import ChangeUsernamePage from './components/settings_subpages/ChangeUsernamePage';
import ChangeEmailPage from './components/settings_subpages/ChangeEmailPage';
import ChangeAgePage from './components/settings_subpages/ChangeAgePage';
import ChangeHeightPage from './components/settings_subpages/ChangeHeightPage';
import ChangeWeightPage from './components/settings_subpages/ChangeWeightPage';
import ChangeALPage from './components/settings_subpages/ChangeALPage';
import ChangeGenderPage from './components/settings_subpages/ChangeGenderPage';
import ChangeRacePage from './components/settings_subpages/ChangeRacePage';
import ChangeMajorPage from './components/settings_subpages/ChangeMajorPage';

/* Reducers */
import user from './reducers/UserReducer';
import foods from './reducers/FoodReducer';
import global from './reducers/GlobalReducer';

/* Opening Questions */
import AgeQPage from './components/questions_subpages/AgeQPage';
import GenderQPage from './components/questions_subpages/GenderQPage';
import HeightQPage from './components/questions_subpages/HeightQPage';
import MajorQPage from './components/questions_subpages/MajorQPage';
import RaceQPage from './components/questions_subpages/RaceQPage';
import WeightQPage from './components/questions_subpages/WeightQPage';
import ALQPage from './components/questions_subpages/ALQPage';

enableScreens();

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const store = createStore(combineReducers({user, foods, global}));

// Uses Drawer module to add pages in the app
// To do, test the super user implementation in the Drawer module
function DrawerNavigator() {
    return (
        <Drawer.Navigator
            initialRouteName="Search"
            drawerStyle={{ backgroundColor: '#664466', width: 250 }}
            edgeWidth={125}
            drawerContentOptions = {{labelStyle: {color: "white"}}}>
            <Drawer.Screen name = "Search"       component = {SearchPage}    />
            <Drawer.Screen name = "History"      component = {HistoryPage}   />
            <Drawer.Screen name = "Data"         component = {DataPage}      />
            <Drawer.Screen name = "Settings"     component = {SettingsPage}  />
            <Drawer.Screen name = "Achievements" component = {AchievementsPage} />
            <Drawer.Screen name = "Admin"        component = {AdminPage}     />
        </Drawer.Navigator>
    );
    // THIS NEEDS TESTING
    /*if (this.props.user.superUser = True){
        return (
            <Drawer.Navigator
                initialRouteName="Search"
                drawerStyle={{ backgroundColor: '#664466', width: 250 }}
                edgeWidth={125}
                drawerContentOptions = {{labelStyle: {color: "white"}}}>
                <Drawer.Screen name = "Search"      component = {SearchPage}    />
                <Drawer.Screen name = "History"     component = {HistoryPage}   />
                <Drawer.Screen name = "Data"        component = {DataPage}      />
                <Drawer.Screen name = "Settings"    component = {SettingsPage}  />
                <Drawer.Screen name = "Achievements" component = {AchievementsPage} />
                <Drawer.Screen name = "Admin"       component = {AdminPage}     />
            </Drawer.Navigator>
        );
    }
    else{
        return (
            <Drawer.Navigator
                initialRouteName="Search"
                drawerStyle={{ backgroundColor: '#664466', width: 250 }}
                edgeWidth={125}
                drawerContentOptions = {{labelStyle: {color: "white"}}}>
                <Drawer.Screen name = "Search"      component = {SearchPage}    />
                <Drawer.Screen name = "History"     component = {HistoryPage}   />
                <Drawer.Screen name = "Data"        component = {DataPage}      />
                <Drawer.Screen name = "Settings"    component = {SettingsPage}  />
                <Drawer.Screen name = "Achievements" component = {AchievementsPage} />
            </Drawer.Navigator>
        );
    }*/
}

export default class App extends React.Component {
    render() {
        return (
            <Provider store = {store}>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName = "Opening Page" screenOptions = {{headerTransparent: true, headerTitle: null}}>
                        <Stack.Screen name = "Drawer"               component = {DrawerNavigator}/>
                        <Stack.Screen name = "Food Page"            component = {FoodPage}/>
                        <Stack.Screen name = "Login Page"           component = {LoginPage}/>
                        <Stack.Screen name = "Signup Page"          component = {SignupPage}/>
                        <Stack.Screen name = "Signup Load Page"     component = {SignUpLoadPage}/>
                        <Stack.Screen name = "Opening Page"         component = {OpeningPage}/>
                        <Stack.Screen name = "Age Question Page"    component = {AgeQPage}/>
                        <Stack.Screen name = "Gender Question Page" component = {GenderQPage}/>
                        <Stack.Screen name = "Height Question Page" component = {HeightQPage}/>
                        <Stack.Screen name = "Major Question Page"  component = {MajorQPage}/>
                        <Stack.Screen name = "Race Question Page"   component = {RaceQPage}/>
                        <Stack.Screen name = "Weight Question Page" component = {WeightQPage}/>
                        <Stack.Screen name = "AL Question Page"     component = {ALQPage}/>
                        <Stack.Screen name = "Change Username Page" component = {ChangeUsernamePage}/>
                        <Stack.Screen name = "Change Email Page"    component = {ChangeEmailPage}/>
                        <Stack.Screen name = "Change Age Page"      component = {ChangeAgePage}/>
                        <Stack.Screen name = "Change Height Page"   component = {ChangeHeightPage}/>
                        <Stack.Screen name = "Change Weight Page"   component = {ChangeWeightPage}/>
                        <Stack.Screen name = "Change AL Page"       component = {ChangeALPage}/>
                        <Stack.Screen name = "Change Major Page"    component = {ChangeMajorPage}/>
                        <Stack.Screen name = "Change Gender Page"   component = {ChangeGenderPage}/>
                        <Stack.Screen name = "Change Race Page"     component = {ChangeRacePage}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </Provider>
        );
    }
}
