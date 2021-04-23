import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import SplashScreen from "../screens/SplashScreen";
import RoleSelection from "../screens/RoleSelection";

import CustomerLogin from "../screens/CustomerLogin";
import CustomerSignup from "../screens/CustomerSignup";
import CustomerSignupDetails from "../screens/CustomerSignupDetails";
import CustomerOTPVerification from "../screens/CustomerOTPVerification";

import SellerLogin from "../screens/SellerLogin";
import SellerSignup from "../screens/SellerSignup";
import SellerSignupDetails from "../screens/SellerSignupDetails";
import SellerOTPVerification from "../screens/SellerOTPVerification";

const stack = createStackNavigator();

const StackNavigation = ({ navigation }) => (
    <stack.Navigator headerMode="none">
        <stack.Screen name="SplashScreen" component={SplashScreen} />
        <stack.Screen name="RoleSelection" component={RoleSelection} />

        <stack.Screen name="CustomerLogin" component={CustomerLogin} />
        <stack.Screen name="CustomerSignup" component={CustomerSignup} />
        <stack.Screen
            name="CustomerSignupDetails"
            component={CustomerSignupDetails}
        />
        <stack.Screen
            name="CustomerOTPVerification"
            component={CustomerOTPVerification}
        />

        <stack.Screen name="SellerLogin" component={SellerLogin} />
        <stack.Screen name="SellerSignup" component={SellerSignup} />
        <stack.Screen
            name="SellerSignupDetails"
            component={SellerSignupDetails}
        />
        <stack.Screen
            name="SellerOTPVerification"
            component={SellerOTPVerification}
        />
    </stack.Navigator>
);

export default StackNavigation;
