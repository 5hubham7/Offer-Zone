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
import axios from "axios";
import axiosURL from "../helper/AxiosURL";
import { useTheme } from "@react-navigation/native";

const windowWidth = Dimensions.get("screen").width;
const windowHeight = Dimensions.get("screen").height;

const offerFilter = (props) => {
    const { colors } = useTheme();

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
        });
    };

    useEffect(() => {
        getAllCatogories();
        getAllCaities();
    }, []);

    const onApplayPress = () => {
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
            });
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
                        value={value.distance}
                        onValueChange={(value) => {
                            setValue({
                                ...value,
                                distance: value,
                                minDistance: 1,
                                maxDistance: 20,
                            });
                        }}
                        minimumValue={1}
                        maximumValue={20}
                        step={1}
                        thumbTintColor="#00C3FF"
                        minimumTrackTintColor="#006BFF"
                        trackStyle={{ height: 10, width: "90%" }}
                        thumbStyle={{ width: 30, height: 30 }}
                        style={{ marginLeft: 20 }}
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
