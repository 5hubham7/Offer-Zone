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
    lineStyle: {
        borderWidth: 0.5,
        borderColor: "gray",
        marginTop: 10,
    },
    imageTitle: {
        color: "#fff",
        textAlign: "center",
        marginTop: "auto",
        marginBottom: "auto",
        fontSize: 30,
        fontWeight: "bold",
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
        height: windowHeight * 0.17,
        width: windowWidth * 0.9,
        overflow: "hidden",
    },
    cardImage: {
        height: windowHeight * 0.2,
        width: windowWidth * 0.9,
    },
    cardData: {
        padding: 10,
        width: windowWidth * 0.9,
    },
    offerTitle: {
        fontSize: 21,
    },
    offerDetails: {
        color: "#000",
        paddingTop: 5,
        width: windowWidth * 0.8,
    },
    offerTime: {
        fontSize: 12,
        marginTop: 5,
        color: "#595959",
    },
    offerLikeCount: {
        fontSize: 14,
        marginTop: 5,
        fontWeight: "bold",
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
