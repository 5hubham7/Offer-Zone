import { StyleSheet, Dimensions } from "react-native";
const windowWidth = Dimensions.get("screen").width;
const windowHeight = Dimensions.get("screen").height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    backgroundImage: {
        width: windowWidth,
        height: windowHeight * 0.3,
    },
    imageTitle: {
        color: "#fff",
        textAlign: "center",
        marginTop: windowHeight * 0.04,
        fontSize: 30,
        fontWeight: "bold",
        marginLeft: "4%",
    },
    offerTitle: {
        fontSize: 27,
        fontWeight: "bold",
        color: "#000",
        marginTop: "5%",
        textAlign: "left",
        marginLeft: "4%",
    },
    offerDetails: {
        color: "#626262",
        paddingTop: 5,
        textAlign: "justify",
        marginLeft: "4%",
        marginRight: "4%",
        fontSize: 16,
    },
    linearGradient: {
        flex: 1,
        width: "100%",
        borderRadius: 5,
        marginTop: -1,
    },
    offerTime: {
        fontSize: 16,
        marginTop: 5,
        color: "#404040",
        marginLeft: "4%",
        fontWeight: "bold",
    },
    lineStyle: {
        borderWidth: 0.5,
        borderColor: "#C8C8C8",
        marginTop: 10,
    },
    offer_subTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000",
        marginTop: "3%",
        textAlign: "left",
        marginLeft: "4%",
    },
    showMoreLink: {
        color: "#1B01A9",
        paddingTop: 5,
        textAlign: "right",
        textDecorationLine: "underline",
        marginLeft: "4%",
        marginRight: "4%",
        fontSize: 14,
        fontWeight: "bold",
    },
    mapView: {
        borderWidth: 2,
        borderColor: "#c9c9c9",
        width: "95%",
        marginTop: "3%",
        marginBottom: "3%",
    },
    map: {
        height: windowHeight * 0.5,
        width: "100%",
    },
});

export default styles;
