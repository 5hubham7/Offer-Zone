import { StyleSheet } from "react-native";

// const { width } = Dimensions.get("screen").width;

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
    // footerText: {
    //     color: "#05375a",
    //     fontSize: 18,
    // },
    // signIn: {
    //     width: "100%",
    //     height: 50,
    //     justifyContent: "center",
    //     alignItems: "center",
    //     borderTopLeftRadius: 20,
    //     backgroundColor: "#000",
    //     marginTop: 10,
    // },
    // textSign: {
    //     fontSize: 18,
    //     fontWeight: "bold",
    //     textAlign: "center",
    //     color: "#fff",
    //     width: "100%",
    // },
    // textPrivate: {
    //     flexDirection: "row",
    //     flexWrap: "wrap",
    //     marginTop: 30,
    //     marginLeft: "auto",
    //     marginRight: "auto",
    //     width: width,
    // },
    // color_textPrivate: {
    //     color: "#000",
    //     fontSize: 18,
    // },
    // loader: {
    //     flex: 1,
    //     justifyContent: "center",
    //     alignItems: "center",
    //     backgroundColor: "rgba(31, 31, 31, 0.82)  ",
    //     position: "absolute",
    //     width: "100%",
    //     height: "100%",
    // },
});

export default styles;
