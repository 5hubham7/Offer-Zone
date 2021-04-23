import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("screen").width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
    },
    header: {
        flex: 1,
        justifyContent: "flex-end",
        paddingHorizontal: 20,
        paddingBottom: 20,
        paddingTop: 0,
    },
    footer: {
        flex: 3,
        backgroundColor: "#fff",
        borderTopLeftRadius: 60,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    headerText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 30,
        textAlign: "center",
        marginBottom: 8,
    },
    headerTextMini: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
        marginBottom: 30,
    },
    footerText: {
        color: "#05375a",
        fontSize: 18,
    },
    loginButtonBG: {
        width: "100%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderTopLeftRadius: 20,
        backgroundColor: "#000",
        marginTop: 10,
    },
    loginButtonText: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        color: "#fff",
        width: "100%",
    },
    signupText: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 30,
        marginLeft: "auto",
        marginRight: "auto",
        width: width,
    },
    signupTextColor: {
        color: "#000",
        fontSize: 18,
    },
    InputBox: {
        marginTop: 5,
        borderWidth: 1,
        borderColor: "#c9c9c9",
        paddingBottom: 5,
        borderTopLeftRadius: 20,
        marginBottom: 10,
    },
    action: {
        flexDirection: "row",
        marginTop: 10,
        paddingBottom: 0,
        marginBottom: 10,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === "ios" ? 0 : 0,
        marginBottom: -8,
        paddingLeft: 40,
        color: "#05375a",
        fontSize: 18,
    },
    errorMessage: {
        color: "#FF0000",
        fontSize: 14,
        textAlign: "left",
        paddingLeft: 40,
        marginBottom: 5,
    },
});

export default styles;
