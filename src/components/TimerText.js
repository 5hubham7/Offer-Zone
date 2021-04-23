import React from "react";
import { StyleSheet, Text } from "react-native";

const TimerText = (props) => {
    const { text, timer } = props;

    return (
        <Text style={styles.resendOtpTimerText}>
            {text} {timer}s
        </Text>
    );
};

const styles = StyleSheet.create({
    resendOtpTimerText: {
        fontSize: 14,
        color: "#000",
    },
});

export default TimerText;
