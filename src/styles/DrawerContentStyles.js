import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    cardImage: {
        height: "auto",
        marginTop: -4,
    },
    userInfoSection: {
        paddingLeft: 20,
        borderBottomWidth: 1,
    },
    avtarDetails: {
        flexDirection: "row",
        marginTop: 15,
        marginBottom: 10,
    },
    title: {
        fontSize: 16,
        marginTop: 10,
        fontWeight: "bold",
        color: "#fff",
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    background: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height: 140,
    },
    row: {
        marginTop: 20,
        flexDirection: "row",
        alignItems: "center",
    },
    section: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 15,
    },
    paragraph: {
        fontWeight: "bold",
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: "#d9d9d9",
        borderTopWidth: 1,
    },
    preference: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});

export default styles;
