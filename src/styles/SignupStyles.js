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
        flex: 4,
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
        marginBottom: 40,
    },
    headerTextMini: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
        marginBottom: 50,
    },
    // footerText: {
    //     color: "#05375a",
    //     fontSize: 18,
    // },
    signupButtonBG: {
        width: "100%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderTopLeftRadius: 20,
        backgroundColor: "#000",
        marginTop: 10,
    },
    signupButtonText: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        color: "#fff",
        width: "100%",
    },
    loginText: {
        flexDirection: "row",
        marginTop: 30,
        marginLeft: "auto",
        marginRight: "auto",
        width: width,
    },
    loginTextColor: {
        color: "#000",
        fontSize: 18,
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(31, 31, 31, 0.82)  ",
        position: "absolute",
        width: "100%",
        height: "100%",
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
    actionError: {
        flexDirection: "row",
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#FF0000",
        paddingBottom: 5,
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
        textAlign: "center",
        marginBottom: 5,
    },
});

export default styles;
