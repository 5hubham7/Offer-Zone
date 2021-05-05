import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    StyleSheet,
    Pic,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import styles from "../styles/SortToggleButtonStyle";
const windowWidth = Dimensions.get("screen").width;
const windowHeight = Dimensions.get("screen").height;

const SortToggleButton = (props) => {
    const [state, setstate] = useState({
        status: props.status,
    });

    const onPress = async () => {
        setstate({
            ...state,
            status: state.status === "unchecked" ? "checked" : "unchecked",
        });
        props.onPress(state.status);
    };
    return (
        <View style={{ marginRight: 10 }}>
            {props.status === "unchecked" ? (
                <TouchableOpacity
                    style={styles.uncheckButton}
                    onPress={() => {
                        onPress();
                    }}
                >
                    <Text style={styles.buttonText}>{props.value}</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    onPress={() => {
                        onPress();
                    }}
                    style={styles.checkButton}
                >
                    <Text style={styles.buttonText}>{props.value}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default SortToggleButton;
