import React, { useEffect } from "react";
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";
import Modal from "react-native-modal";
import styles from "../styles/OfferSortStyle";
import axios from "axios";
import axiosURL from "../helper/AxiosURL";
import SortToggleButton from "./SortToggleButton";
import { useTheme } from "@react-navigation/native";

const windowWidth = Dimensions.get("screen").width;
const windowHeight = Dimensions.get("screen").height;

const offerSort = (props) => {
    const { colors } = useTheme();
    const [state, setstate] = React.useState({
        selected: 0,
    });

    const [activeButton, setActiveButton] = React.useState(null);
    const [offers, setOffers] = React.useState(null);
    var today = new Date();
    var lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    var last = lastDay.getDate();

    const [ButtonNames, setButtonNames] = React.useState({
        start_date_asc: `Start Date : 1 to ${last}`,
        start_date_desc: `Start Date : ${last} to 1`,
        end_date_asc: `End Date : 1 to ${last}`,
        end_date_desc: `End Date : ${last} to 1`,
    });

    const distanceSort = () => {
        props.setScrollMethodCall(false);
        var sortOffers = props.currentOffers.sort((a, b) =>
            a.distance > b.distance ? 1 : -1
        );
        props.setCurrentOffers(sortOffers);
        props.onScrollUp();
        props.toggleModal();
    };

    const distanceSortReverse = () => {
        props.setScrollMethodCall(false);
        var sortOffers = props.currentOffers.sort((a, b) =>
            a.distance > b.distance ? 1 : -1
        );
        props.setCurrentOffers(sortOffers.reverse());
        props.onScrollUp();
        props.toggleModal();
    };

    const startDateSort = () => {
        props.setScrollMethodCall(false);
        var sortOffers = props.currentOffers.sort((a, b) =>
            a.start_date > b.start_date ? 1 : -1
        );
        props.setCurrentOffers(sortOffers);
        props.onScrollUp();
        props.toggleModal();
    };

    const startDateSortReverse = () => {
        props.setScrollMethodCall(false);
        var sortOffers = props.currentOffers.sort((a, b) =>
            a.start_date > b.start_date ? 1 : -1
        );
        props.setCurrentOffers(sortOffers.reverse());
        props.onScrollUp();
        props.toggleModal();
    };

    const endDateSort = () => {
        props.setScrollMethodCall(false);
        var sortOffers = props.currentOffers.sort((a, b) =>
            a.end_date > b.end_date ? 1 : -1
        );
        props.setCurrentOffers(sortOffers);
        props.onScrollUp();
        props.toggleModal();
    };

    const endDateSortReverse = () => {
        props.setScrollMethodCall(false);
        var sortOffers = props.currentOffers.sort((a, b) =>
            a.end_date > b.end_date ? 1 : -1
        );
        props.setCurrentOffers(sortOffers.reverse());
        props.onScrollUp();
        props.toggleModal();
    };

    const postDateSort = () => {
        props.setScrollMethodCall(false);
        var sortOffers = props.currentOffers.sort((a, b) =>
            a.post_time > b.post_time ? 1 : -1
        );
        props.setCurrentOffers(sortOffers.reverse());
        props.onScrollUp();
        props.toggleModal();
    };

    const offerTitleSort = () => {
        props.setScrollMethodCall(false);
        var sortOffers = props.currentOffers.sort((a, b) =>
            a.offer_title > b.offer_title ? 1 : -1
        );
        props.setCurrentOffers(sortOffers);
        props.onScrollUp();
        props.toggleModal();
    };

    const offerTitleSortReverse = () => {
        props.setScrollMethodCall(false);
        var sortOffers = props.currentOffers.sort((a, b) =>
            a.offer_title > b.offer_title ? 1 : -1
        );
        props.setCurrentOffers(sortOffers.reverse());
        props.onScrollUp();
        props.toggleModal();
    };

    const onResetPress = (latitude, longitude) => {
        setActiveButton(null);
        props.getOffers(latitude, longitude, 2);
        props.setScrollMethodCall(true);
        props.onScrollUp();
        props.toggleModal();
    };

    return (
        <Modal
            isVisible={!props.state}
            deviceWidth={windowWidth}
            deviceHeight={windowHeight}
            //onBackdropPress={() => { props.toggleModal() }}
            style={{ backgroundColor: colors.background }}
            animationIn="slideInUp"
            animationOut="slideOutRight"
        >
            <View style={{ flex: 1 }}>
                <View
                    style={[
                        styles.header,
                        {
                            backgroundColor: colors.headerColor,
                            justifyContent: "space-between",
                        },
                    ]}
                >
                    <View>
                        <AntDesign
                            name="closecircle"
                            color="#fff"
                            size={28}
                            style={styles.closeIcon}
                            onPress={() => {
                                props.toggleModal();
                            }}
                        />
                    </View>
                    <View>
                        <Text style={styles.title}>Sort</Text>
                    </View>
                    <View>
                        <FontAwesome
                            name="undo"
                            color="#FFF"
                            size={28}
                            style={styles.resetButton}
                            onPress={() => {
                                onResetPress(
                                    props.location.latitude,
                                    props.location.longitude
                                );
                            }}
                        />
                    </View>
                </View>
                <View>
                    <Text style={[styles.subTitle, { color: colors.text }]}>
                        Offers
                    </Text>
                    <View
                        style={{
                            width: "90%",
                            marginLeft: 20,
                            flexWrap: "wrap",
                            flexDirection: "row",
                        }}
                    >
                        <SortToggleButton
                            value="Title : A to Z"
                            status={
                                activeButton === "Title : A to Z"
                                    ? "checked"
                                    : "unchecked"
                            }
                            onPress={(value) => {
                                setActiveButton("Title : A to Z");
                                offerTitleSort();
                            }}
                        />
                        <SortToggleButton
                            value="Title : Z to A"
                            status={
                                activeButton === "Title : Z to A"
                                    ? "checked"
                                    : "unchecked"
                            }
                            onPress={(value) => {
                                setActiveButton("Title : Z to A");
                                offerTitleSortReverse();
                            }}
                        />
                    </View>
                </View>
                <View>
                    <Text style={[styles.subTitle, { color: colors.text }]}>
                        Dates
                    </Text>
                    <View
                        style={{
                            width: "90%",
                            marginLeft: 20,
                            flexWrap: "wrap",
                            flexDirection: "row",
                        }}
                    >
                        <SortToggleButton
                            value={ButtonNames.start_date_asc}
                            status={
                                activeButton === ButtonNames.start_date_asc
                                    ? "checked"
                                    : "unchecked"
                            }
                            onPress={(value) => {
                                setActiveButton(ButtonNames.start_date_asc);
                                startDateSort();
                            }}
                        />
                        <SortToggleButton
                            value={ButtonNames.start_date_desc}
                            status={
                                activeButton === ButtonNames.start_date_desc
                                    ? "checked"
                                    : "unchecked"
                            }
                            onPress={(value) => {
                                setActiveButton(ButtonNames.start_date_desc);
                                startDateSortReverse();
                            }}
                        />
                        <SortToggleButton
                            value={ButtonNames.end_date_asc}
                            status={
                                activeButton === ButtonNames.end_date_asc
                                    ? "checked"
                                    : "unchecked"
                            }
                            onPress={(value) => {
                                setActiveButton(ButtonNames.end_date_asc);
                                endDateSort();
                            }}
                        />
                        <SortToggleButton
                            value={ButtonNames.end_date_desc}
                            status={
                                activeButton === ButtonNames.end_date_desc
                                    ? "checked"
                                    : "unchecked"
                            }
                            onPress={(value) => {
                                setActiveButton(ButtonNames.end_date_desc);
                                endDateSortReverse();
                            }}
                        />
                        <SortToggleButton
                            value="Post Date"
                            status={
                                activeButton === "Post Date"
                                    ? "checked"
                                    : "unchecked"
                            }
                            onPress={(value) => {
                                setActiveButton("Post Date");
                                postDateSort();
                            }}
                        />
                    </View>
                    <View>
                        <Text style={[styles.subTitle, { color: colors.text }]}>
                            distance
                        </Text>
                        <View
                            style={{
                                width: "90%",
                                marginLeft: 20,
                                flexWrap: "wrap",
                                flexDirection: "row",
                            }}
                        >
                            <SortToggleButton
                                value="Min to Max"
                                status={
                                    activeButton === "Min to Max"
                                        ? "checked"
                                        : "unchecked"
                                }
                                onPress={(value) => {
                                    setActiveButton("Min to Max");
                                    distanceSort();
                                }}
                            />
                            <SortToggleButton
                                value="Max to Min"
                                status={
                                    activeButton === "Max to Min"
                                        ? "checked"
                                        : "unchecked"
                                }
                                onPress={(value) => {
                                    setActiveButton("Max to Min");
                                    distanceSortReverse();
                                }}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default offerSort;

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 4,
        color: "black",
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: "#929292",
        borderRadius: 8,
        color: "black",
        paddingRight: 30, // to ensure the text is never behind the icon
        marginTop: 10,
    },
});
