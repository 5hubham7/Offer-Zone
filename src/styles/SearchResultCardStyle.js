import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("screen").width;
const windowHeight = Dimensions.get("screen").height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    errorMessageText: {
        fontSize: 22,
        marginBottom: 20,
        fontWeight: "bold",
        color: "red",
        textAlign: "center",
    },
    cardView: {
        backgroundColor: "#DADADA",
        borderRadius: 20,
        overflow: "hidden",
        margin: 10,
        shadowColor: "#000",
        shadowOffset: { width: 5, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 3,
        width: windowWidth * 0.95,
    },
    cardImageView: {
        height: windowHeight * 0.17,
        width: windowWidth * 0.9,
        overflow: "hidden",
    },
    cardImage: {
        height: windowHeight * 0.2,
        width: windowWidth * 0.28,
    },
    cardImageTitle: {
        color: "#fff",
        textAlign: "center",
        marginTop: "auto",
        marginBottom: "auto",
        fontSize: 30,
        fontWeight: "bold",
    },
    cardData: {
        padding: 10,
        width: windowWidth * 0.9,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: "bold",
        width: windowWidth * 0.6,
        textAlign: "left",
        marginLeft: 10,
        marginTop: 10,
    },
    cardSubtitle: {
        color: "#000",
        marginTop: 5,
        marginLeft: 10,
        fontWeight: "bold",
    },
    cardSubtitle2: {
        fontSize: 14,
        marginTop: 5,
        color: "#595959",
        marginLeft: 10,
    },
    linearGradient: {
        flex: 1,
        width: "100%",
        borderRadius: 5,
        marginTop: -1,
    },
    cardFooter: {
        fontSize: 14,
        marginTop: 5,
        fontWeight: "bold",
    },
    line: {
        borderWidth: 0.5,
        borderColor: "gray",
        marginTop: 10,
    },
});

export default styles;
