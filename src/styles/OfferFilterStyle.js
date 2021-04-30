import { StyleSheet, Dimensions } from "react-native";
const windowWidth = Dimensions.get("screen").width;
const windowHeight = Dimensions.get("screen").height;
const styles = StyleSheet.create({
    header: {
        backgroundColor: "#006064",
        height: "10%",
        flexDirection: "row",
    },
    closeIcon: {
        marginLeft: 20,
        marginTop: "auto",
        marginBottom: "auto",
    },
    title: {
        color: "#fff",
        fontSize: 25,
        fontWeight: "bold",
        width: 100,
        marginLeft: 20,
        marginTop: "auto",
        marginBottom: "auto",
    },
    resetButton: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "600",
        width: 140,
        textAlign: "right",
        marginTop: "auto",
        marginBottom: "auto",
    },
    subTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 20,
        marginTop: 10,
        textTransform: "uppercase",
    },
    textCon: {
        width: "90%",
        marginLeft: 20,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    colorGrey: {
        color: "#555555",
    },
    colorYellow: {
        color: "#B20000",
    },
    applyButton: {
        backgroundColor: "#006064",
        height: "151%",
    },
    bottomView: {
        position: "absolute",
        bottom: 15,
        width: "100%",
    },
    buttonText: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: "auto",
        marginBottom: "auto",
    },
});

export const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 4,
        color: "black",
        backgroundColor: "#B2B2B2",
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: "#929292",
        borderRadius: 8,
        color: "black",
        backgroundColor: "#B2B2B2",
        paddingRight: 30, // to ensure the text is never behind the icon
        marginTop: 10,
    },
});

export default styles;
