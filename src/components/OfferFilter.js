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
import styles, { pickerSelectStyles } from "../styles/OfferFilterStyle";
import Slider from "react-native-slider-x";
import RNPickerSelect from "react-native-picker-select";
import SortToggleButton from "./SortToggleButton";
import axios from "axios";
import axiosURL from "../helper/AxiosURL";
import { useTheme } from "@react-navigation/native";

const windowWidth = Dimensions.get("screen").width;
const windowHeight = Dimensions.get("screen").height;

const offerFilter = (props) => {
    const { colors } = useTheme();
    const [activeButton, setActiveButton] = React.useState(null);

    const [allCategories, setAllCategories] = React.useState([
        { label: "All", value: "All" },
    ]);
    const [allCities, setAllCities] = React.useState([
        { label: "Current", value: "Current" },
    ]);
    const [value, setValue] = React.useState({
        distance: 5,
        minDistance: 1,
        maxDistance: 20,
    });
    const placeholder = {
        label: "Select a Catogory..",
        value: null,
        color: "#9EA0A4",
    };

    const [selectCatogory, setSelectCatogory] = React.useState("All");
    const [selectCity, setSelectCity] = React.useState("Current");

    const resetFilters = () => {
        setSelectCatogory("All");
        props.setScrollMethodCall(true);
        setActiveButton(null);
        setSelectCity("Current");
        setValue({
            distance: 5,
            minDistance: 1,
            maxDistance: 20,
        });
    };

    const getAllCatogories = () => {
        axios.get(`${axiosURL}/customer/getAllCatogories`).then((response) => {
            if (response.data.status == 200) {
                response.data.response.map((element) => {
                    if (
                        !allCategories.includes({
                            label: element,
                            value: element,
                        })
                    )
                        allCategories.push({ label: element, value: element });
                });
            }
            else {
                alert("Something went wrong,please try after some time.")
            }

        });
    };

    const getAllCaities = () => {
        axios.get(`${axiosURL}/customer/getAllCities`).then((response) => {
            if (response.data.status == 200) {
                response.data.response.map((element) => {
                    if (!allCities.includes({ label: element, value: element }))
                        allCities.push({ label: element, value: element });
                });
            }
            else {
                alert("Something went wrong,please try after some time.")
            }

        });
    };

    useEffect(() => {
        getAllCatogories();
        getAllCaities();
    }, []);

    const onApplayPress = () => {
        props.setScrollMethodCall(false);
        filterParameter = {
            catogory: selectCatogory,
            city: selectCity,
            distance: value.distance,
            latitude: props.location.latitude,
            longitude: props.location.longitude,
        };
        axios
            .post(`${axiosURL}/customer/getFilterOffers`, filterParameter)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.response.length > 0) {
                        props.setCurrentOffers(response.data.response);
                        props.toggleModal();
                    } else {
                        props.setCurrentOffers("No Offers");
                        props.toggleModal();
                    }
                }
                else {
                    alert("Something went wrong,please try after some time.")
                }

            });
    };

    const getDateInFormat = (d) => {
        var dt = new Date(d);
        var dd = dt.getDate();
        var mm = dt.getMonth() + 1;
        var yyyy = dt.getFullYear();
        if (dd < 10) {
            dd = "0" + dd;
        }
        if (mm < 10) {
            mm = "0" + mm;
        }
        return yyyy + "-" + mm + "-" + dd;
    };

    /* get date array between sdate and end date */

    var getDateArray = function (start, end) {
        var arr = new Array(),
            dt = new Date(start);

        while (dt <= end) {
            arr.push(getDateInFormat(new Date(dt)));
            dt.setDate(dt.getDate() + 1);
        }
        return arr;
    };

    const onGoingSort = () => {
        props.setScrollMethodCall(false);
        var onGoingOffers = [];
        var today = new Date();
        props.currentOffers.forEach((element) => {
            var start_date = new Date(element.start_date);
            var end_date = new Date(element.end_date);
            if (
                getDateArray(start_date, end_date).includes(
                    getDateInFormat(today)
                )
            )
                onGoingOffers.push(element);
        });
        if (onGoingOffers.length > 0) props.setCurrentOffers(onGoingOffers);
        else props.setCurrentOffers("No Offers");
        props.onScrollUp();
        props.toggleModal();
    };

    const exporingSoonSort = () => {
        props.setScrollMethodCall(false);
        var exporingSoonOffers = [];
        var curr = new Date();
        var today = new Date();
        var lastday = new Date(
            today.setDate(today.getDate() - today.getDay() + 6)
        );
        let currentWeek = getDateArray(curr, lastday);
        props.currentOffers.forEach((element) => {
            var end_date = new Date(element.end_date);
            if (currentWeek.includes(getDateInFormat(end_date)))
                exporingSoonOffers.push(element);
        });
        if (exporingSoonOffers.length > 0)
            props.setCurrentOffers(exporingSoonOffers);
        else props.setCurrentOffers("No Offers");
        props.onScrollUp();
        props.toggleModal();
    };

    const todaySort = () => {
        props.setScrollMethodCall(false);
        var todaysOffers = [];
        var today = new Date();
        props.currentOffers.forEach((element) => {
            var start_date = new Date(element.start_date);
            var end_date = new Date(element.end_date);
            if (
                getDateArray(start_date, end_date).includes(
                    getDateInFormat(today)
                )
            )
                todaysOffers.push(element);
        });
        if (todaysOffers.length > 0) props.setCurrentOffers(todaysOffers);
        else props.setCurrentOffers("No Offers");
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
                            color="#FFF"
                            size={28}
                            style={styles.closeButton}
                            onPress={() => {
                                props.toggleModal();
                            }}
                        />
                    </View>
                    <View>
                        <Text style={styles.title}>Filter</Text>
                    </View>
                    <View>
                        <FontAwesome
                            name="undo"
                            color="#FFF"
                            size={28}
                            style={styles.resetButton}
                            onPress={() => {
                                resetFilters();
                            }}
                        />
                    </View>
                </View>
                <View>
                    <Text style={[styles.subTitle, { color: colors.text }]}>
                        Category
                    </Text>
                    <View style={{ width: "90%", marginLeft: 20 }}>
                        <RNPickerSelect
                            placeholder={placeholder}
                            value={selectCatogory}
                            items={allCategories}
                            onValueChange={(value) => {
                                setSelectCatogory(value);
                            }}
                            style={pickerSelectStyles}
                            useNativeAndroidPickerStyle={false}
                            Icon={() => {
                                return (
                                    <FontAwesome
                                        name="angle-down"
                                        size={24}
                                        color="#404040"
                                        style={{
                                            marginTop: 20,
                                            marginRight: 20,
                                        }}
                                    />
                                );
                            }}
                        />
                    </View>
                </View>
                <View>
                    <Text style={[styles.subTitle, { color: colors.text }]}>
                        City
                    </Text>
                    <View style={{ width: "90%", marginLeft: 20 }}>
                        <RNPickerSelect
                            placeholder={placeholder}
                            value={selectCity}
                            items={allCities}
                            onValueChange={(value) => {
                                setSelectCity(value);
                            }}
                            style={pickerSelectStyles}
                            useNativeAndroidPickerStyle={false}
                            Icon={() => {
                                return (
                                    <FontAwesome
                                        name="angle-down"
                                        size={24}
                                        color="#404040"
                                        style={{
                                            marginTop: 20,
                                            marginRight: 20,
                                        }}
                                    />
                                );
                            }}
                        />
                    </View>
                </View>
                <View>
                    <Text style={[styles.subTitle, { color: colors.text }]}>
                        Distance
                    </Text>
                    <Slider
                        onValueChange={(value) => {
                            setValue({
                                ...value,
                                distance: value,
                                minDistance: 1,
                                maxDistance: 20,
                            });
                        }}
                        value={value.distance}
                        minimumValue={1}
                        maximumValue={20}
                        step={1}
                        thumbTintColor="#00C3FF"
                        minimumTrackTintColor="#006BFF"
                        trackStyle={{ height: 10, width: "100%" }}
                        thumbStyle={{ width: 30, height: 30 }}
                        style={{ marginLeft: 20, width: "90%" }}
                    />
                    <View style={styles.textCon}>
                        <Text style={styles.colorGrey}>
                            {value.minDistance} km
                        </Text>
                        <Text style={styles.colorYellow}>
                            {value.distance + "km"}
                        </Text>
                        <Text style={styles.colorGrey}>
                            {value.maxDistance} km
                        </Text>
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
                            value="Today"
                            status={
                                activeButton === "Today"
                                    ? "checked"
                                    : "unchecked"
                            }
                            onPress={(value) => {
                                setActiveButton("Today");
                                todaySort();
                            }}
                        />

                        <SortToggleButton
                            value="On Going"
                            status={
                                activeButton === "On Going"
                                    ? "checked"
                                    : "unchecked"
                            }
                            onPress={(value) => {
                                setActiveButton("On Going");
                                onGoingSort();
                            }}
                        />

                        <SortToggleButton
                            value="Expiring Soon"
                            status={
                                activeButton === "Expiring Soon"
                                    ? "checked"
                                    : "unchecked"
                            }
                            onPress={(value) => {
                                setActiveButton("Expiring Soon");
                                exporingSoonSort();
                            }}
                        />
                    </View>
                </View>

                <View style={styles.bottomView}>
                    <TouchableOpacity
                        style={[
                            styles.applyButton,
                            { backgroundColor: colors.headerColor },
                        ]}
                        activeOpacity={0.7}
                        onPress={() => {
                            onApplayPress();
                        }}
                    >
                        <Text style={styles.buttonText}>Apply Filter</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default offerFilter;
