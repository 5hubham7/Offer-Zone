import { StyleSheet, Dimensions } from "react-native";
const windowWidth = Dimensions.get("screen").width;
const windowHeight = Dimensions.get("screen").height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    linearGradient: {
        flex: 1,
        width: "100%",
        borderRadius: 5,
        marginTop: -1,
    },
    footerNav: {
        position: "absolute",
        bottom: 0,
        backgroundColor: "#000",
        width: "100%",
    },
    footerBtn: {
        width: "50%",
        alignItems: "center",
        marginTop: 7,
        marginBottom: 7,
    },
    btnSaperator: {
        color: "#fff",
        borderColor: "#585858",
        borderRightWidth: 1,
    },
    buttons: {
        width: windowWidth * 0.3,
        height: windowHeight * 0.07,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    fab: {
        position: "absolute",
        margin: 16,
        right: 10,
        bottom: 10,
        backgroundColor: "#2E7D32",
    },
    errorMessageText: {
        fontSize: 22,
        marginBottom: 20,
        fontWeight: 'bold',
        textTransform: 'capitalize',
        color: 'red',
        textAlign: 'center'
    }
});

export default styles;
