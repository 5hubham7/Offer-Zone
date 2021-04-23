import React from "react";
import { View, Text, Dimensions } from "react-native";
import Modal from "react-native-modal";

const windowWidth = Dimensions.get("screen").width;
const windowHeight = Dimensions.get("screen").height;

const OfferFilter = (props) => {
    return (
        <Modal
            isVisible={!props.state}
            deviceWidth={windowWidth}
            deviceHeight={windowHeight}
            onBackdropPress={() => {
                props.toggleModal();
            }}
            style={{ backgroundColor: "#fff" }}
            animationIn="slideInUp"
            animationOut="slideOutRight"
        >
            <View style={{ flex: 1 }}>
                <Text>I am the modal content!</Text>
            </View>
        </Modal>
    );
};

export default OfferFilter;
