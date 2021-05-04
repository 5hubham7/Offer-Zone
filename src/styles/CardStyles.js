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
    linearGradient: {
        flex: 1,
        width: "100%",
        borderRadius: 5,
        marginTop: -1,
    },
    cardView: {
        backgroundColor: "#DADADA",
        borderRadius: 20,
        overflow: "hidden",
        margin: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
    },
    cardImageView: {
        width: windowWidth * 0.9,
        overflow: "hidden",
    },
    cardImage: {
        height: windowHeight * 0.2,
        width: windowWidth * 0.9,
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
        fontSize: 22,
        fontWeight: "bold",
    },
    cardSubtitle: {
        color: "#000",
        marginTop: 5,
    },
    cardSubtitle2: {
        fontSize: 14,
        marginTop: 5,
        color: "#595959",
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
    upButtonStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 0,
        bottom: 70,
    },
    scrollLodaer: {
        alignItems: 'center',
        justifyContent: 'center',
    }

});

export default styles;
