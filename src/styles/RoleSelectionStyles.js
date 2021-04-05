import { StyleSheet, Dimensions } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const { height } = Dimensions.get("screen");

const height_logo = height * 0.3;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
    },
    // itemWrapper: {
    //     height: hp("100%"), // 70% of height device screen
    //     width: wp("100%"), // 80% of width device screen
    // },
    logo: {
        width: height_logo,
        height: height_logo,
        marginRight: "auto",
        marginLeft: "auto",
        marginBottom: 10,
    },
    header: {
        flex: 1,
        justifyContent: "flex-end",
        paddingHorizontal: 20,
        paddingBottom: 20,
        paddingTop: 50,
    },
    footer: {
        flex: 2,
        backgroundColor: "#fff",
        borderTopLeftRadius: 60,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    headerText: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 30,
        textAlign: "center",
        marginBottom: 10,
    },
    // text_mini_header: {
    //     color: "#000",
    //     fontWeight: "bold",
    //     fontSize: 20,
    //     textAlign: "center",
    // },
    // text_footer: {
    //     color: "#05375a",
    //     fontSize: 18,
    // },
    // InputBox: {
    //     marginTop: 5,
    //     borderWidth: 1,
    //     borderColor: "#f2f2f2",
    //     paddingBottom: 5,
    //     borderTopLeftRadius: 30,
    //     marginBottom: 10,
    // },
    // action: {
    //     flexDirection: "row",
    //     marginTop: 20,
    //     paddingBottom: 5,
    //     marginBottom: 10,
    // },
    // actionError: {
    //     flexDirection: "row",
    //     marginTop: 10,
    //     borderBottomWidth: 1,
    //     borderBottomColor: "#FF0000",
    //     paddingBottom: 5,
    // },
    // textInput: {
    //     flex: 1,
    //     marginTop: Platform.OS === "ios" ? 0 : -2,
    //     paddingLeft: 40,
    //     color: "#05375a",
    //     fontSize: 18,
    // },
    // errorMsg: {
    //     color: "#FF0000",
    //     fontSize: 14,
    //     textAlign: "center",
    //     marginBottom: 5,
    // },
    // button: {
    //     alignItems: "center",
    //     marginTop: 20,
    // },
    roleButtonBG: {
        width: "100%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderTopLeftRadius: 20,
        backgroundColor: "#000",
        marginTop: 10,
    },
    roleButtonText: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        color: "#fff",
        width: "100%",
    },
    // textPrivate: {
    //     flexDirection: "row",
    //     flexWrap: "wrap",
    //     marginTop: 30,
    //     marginLeft: "auto",
    //     marginRight: "auto",
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
