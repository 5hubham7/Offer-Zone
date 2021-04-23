import React from "react";
import { View, Text, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Modal from "react-native-modal";

const windowHeight = Dimensions.get("screen").height;

const NoInternalError = (props) => {
    return (
        <Modal
            isVisible={props.Network}
            animationIn="slideInUp"
            animationOut="bounceOut"
        >
            <View
                style={{ backgroundColor: "#fff", height: windowHeight * 0.33 }}
            >
                <LinearGradient
                    colors={["#C60000", "#FF4444", "#FF7C7C"]}
                    style={{ height: windowHeight * 0.33 }}
                >
                    <Text
                        style={{
                            fontSize: 25,
                            fontWeight: "bold",
                            textAlign: "center",
                            marginTop: 20,
                            color: "yellow",
                        }}
                    >
                        NO INTERNET ERROR
                    </Text>
                    <Text
                        style={{
                            fontSize: 21,
                            fontWeight: "bold",
                            textAlign: "center",
                            marginTop: 20,
                            color: "black",
                        }}
                    >
                        Your internet connection is lost. Please check your
                        connection and try again!
                    </Text>
                </LinearGradient>
            </View>
        </Modal>
    );
};

export default NoInternalError;
