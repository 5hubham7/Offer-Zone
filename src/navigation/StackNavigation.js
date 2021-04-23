import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import SplashScreen from "../screens/SplashScreen";
import RoleSelection from "../screens/RoleSelection";

import Login from "../screens/Login";
import Signup from "../screens/Signup";
import SignupDetails from "../screens/SignupDetails";
import OTPVerification from "../screens/OTPVerification";

const stack = createStackNavigator();

const StackNavigation = ({ navigation }) => (
    <stack.Navigator headerMode="none">
        <stack.Screen name="SplashScreen" component={SplashScreen} />
        <stack.Screen name="RoleSelection" component={RoleSelection} />

        <stack.Screen name="Login" component={Login} />
        <stack.Screen name="Signup" component={Signup} />
        <stack.Screen name="SignupDetails" component={SignupDetails} />
        <stack.Screen name="OTPVerification" component={OTPVerification} />
    </stack.Navigator>
);

export default StackNavigation;
