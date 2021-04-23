import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { View, StatusBar } from "react-native";
import * as Animatable from "react-native-animatable";
import RoleSelection from "../screens/RoleSelection";
import styles from "../styles/SplashScreenStyles";

const SplashScreen = ({ navigation }) => {
    const [state, setstate] = useState({
        isVisible: true,
    });

    const componentDidMount = () => {
        setTimeout(function () {
            setstate({ ...state, isVisible: false });
            navigation.navigate("RoleSelection");
        }, 2000);
    };

    useEffect(() => {
        componentDidMount();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#000" barStyle="light-content" />

            {state.isVisible ? (
                <LinearGradient
                    style={{ flex: 1 }}
                    colors={["#2E2E2E", "#000000"]}
                >
                    <View style={styles.header}>
                        <Animatable.Image
                            animation="zoomIn"
                            duraton="1500"
                            source={require("../../assets/logo.png")}
                            style={styles.logo}
                            resizeMode="stretch"
                        />
                    </View>
                </LinearGradient>
            ) : (
                <RoleSelection />
            )}
        </View>
    );
};

export default SplashScreen;
