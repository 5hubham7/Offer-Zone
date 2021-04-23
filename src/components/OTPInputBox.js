import React, { useEffect, useState, useRef } from "react";
import { View, TextInput } from "react-native";
import styles from "../styles/CustomerOTPVerificationStyles";
import { verificationContext } from "../components/context/VerificationContext";
var otpArray = [];

const OTPInputBox = (props) => {
    const [OTPData, setOTPData] = useState([]);

    // useEffect(() => {
    //     console.log("OTPInputbox auth", AuthContext)
    //     console.log("OTPInputbox Veri", verificationContext)
    // }, [])

    const { verifyOTP, setOTP } = React.useContext(verificationContext);

    // TextInput refs to focus programmatically while entering OTP
    const firstTextInputRef = useRef(null);
    const secondTextInputRef = useRef(null);
    const thirdTextInputRef = useRef(null);
    const fourthTextInputRef = useRef(null);
    const fifthTextInputRef = useRef(null);
    const sixthTextInputRef = useRef(null);
    //otpArray = props.data
    const setOtpArray = (val) => {
        otpArray = val;
        setOTPData(val);
    };

    const onOtpChange = (index) => {
        return (value) => {
            if (isNaN(Number(value))) {
                // do nothing when a non digit is pressed
                return;
            } //'3', '5', '6', '8', '4', '4'
            const otpArrayCopy = otpArray.concat();
            otpArrayCopy[index] = value;
            setOtpArray(otpArrayCopy);

            // auto focus to next InputText if value is not blank
            if (value !== "") {
                if (index === 0) {
                    secondTextInputRef.current.focus();
                } else if (index === 1) {
                    thirdTextInputRef.current.focus();
                } else if (index === 2) {
                    fourthTextInputRef.current.focus();
                } else if (index === 3) {
                    fifthTextInputRef.current.focus();
                } else if (index === 4) {
                    sixthTextInputRef.current.focus();
                }
            } else {
                if (index === 5) {
                    fifthTextInputRef.current.focus();
                } else if (index === 4) {
                    fourthTextInputRef.current.focus();
                } else if (index === 3) {
                    thirdTextInputRef.current.focus();
                } else if (index === 2) {
                    secondTextInputRef.current.focus();
                } else if (index === 1) {
                    firstTextInputRef.current.focus();
                }
            }
            //console.log(otpArray)
            if (otpArray.length === 6) {
                var flag = false;
                var OTPString = "";
                otpArray.map((digit) => {
                    OTPString += digit;
                    if (digit !== "") flag = true;
                    else flag = false;
                });

                if (flag) setOTP(OTPString);
            }
        };
    };

    return (
        <View style={{ flexDirection: "row", marginLeft: 0, marginTop: 20 }}>
            {[
                firstTextInputRef,
                secondTextInputRef,
                thirdTextInputRef,
                fourthTextInputRef,
                fifthTextInputRef,
                sixthTextInputRef,
            ].map((textInputRef, index) => (
                <TextInput
                    style={[styles.textInput, styles.InputBox]}
                    keyboardType="numeric"
                    maxLength={1}
                    value={OTPData[index]}
                    autoFocus={index === 0 ? true : false}
                    key={index}
                    onChangeText={onOtpChange(index)}
                    ref={textInputRef}
                    placeholder="-"
                    placeholderTextColor="#000"
                />
            ))}
        </View>
    );
};

export default OTPInputBox;
