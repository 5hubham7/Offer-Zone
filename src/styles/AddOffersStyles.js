import { StyleSheet, Dimensions } from "react-native";
import { color } from "react-native-reanimated";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#006064",
    },
    header: {
        flex: 1,
        justifyContent: "flex-end",
        paddingHorizontal: 20,
    },
    footer: {
        flex: 4,
        backgroundColor: "#fff",
        borderTopLeftRadius: 60,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    headerText: {
        textTransform: "uppercase",
        color: "#fff",
        fontWeight: "bold",
        fontSize: 25,
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
    addOfferButtonBG: {
        width: "100%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderTopLeftRadius: 20,

        marginTop: 10,
    },
    addOfferButtonText: {
        fontSize: 18,
        fontWeight: "bold",
        textTransform: "uppercase",
        textAlign: "center",
        color: "#fff",
        width: "100%",
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
    inputBox: {
        marginTop: 5,
        borderWidth: 1,
        borderColor: "#9E9E9E",
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
        fontSize: 18,
    },
    imagePickerBox: {
        marginTop: 5,
        borderWidth: 1,
        borderColor: "#9E9E9E",
        borderTopLeftRadius: 20,
        marginBottom: 10,
    },
    picker: {
        borderWidth: 1,
        borderColor: "#9E9E9E",
        borderTopLeftRadius: 20,
        marginBottom: 10,
        paddingLeft: 30,
    },
    errorMessage: {
        color: "#FF0000",
        fontSize: 14,
        textAlign: "center",
        marginBottom: 5,
    },
});

export const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderRadius: 4,
        color: "black",
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        color: "black",
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});

export default styles;
