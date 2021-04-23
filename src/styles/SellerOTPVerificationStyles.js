import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("screen");
const { width } = Dimensions.get("screen").width;

const height_logo = height * 0.3;

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
    footerText: {
        color: "#000",
        fontSize: 18,
        textAlign: "center",
        marginLeft: 20,
        marginTop: 20,
        lineHeight: 25,
        fontWeight: "bold",
    },
    Button: {
        width: "100%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderTopLeftRadius: 20,
        //borderRadius: 40,
        backgroundColor: "#000",
        marginTop: 10,
    },
    textSign: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        color: "#fff",
        width: "100%",
    },
    textPrivate: {
        flexDirection: "row",
        marginTop: 30,
        marginLeft: "auto",
        marginRight: "auto",
        width: width,
    },
    bottomText: {
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
        marginLeft: 0,
        marginRight: 5,
        height: 50,
        width: 50,
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
        paddingLeft: 20,
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
