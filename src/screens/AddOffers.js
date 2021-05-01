import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    TextInput,
    ScrollView,
    Platform,
    Image,
    ToastAndroid,
} from "react-native";
import * as Animatable from "react-native-animatable";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import * as firebase from "firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNPickerSelect from "react-native-picker-select";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { useTheme } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as ImageManipulator from "expo-image-manipulator";

import { AuthContext } from "../components/context/Store";
import styles, { pickerSelectStyles } from "../styles/AddOffersStyles";
import AxiosURL from "../helper/AxiosURL";

try {
    firebase.initializeApp({
        apiKey: "AIzaSyCzx4aZ64zF4Ocicz_fluGCb5zrLwrOtqU",
        authDomain: "offeer-zone.firebaseapp.com",
        databaseURL: "https://offeer-zone-default-rtdb.firebaseio.com",
        projectId: "offeer-zone",
        storageBucket: "offeer-zone.appspot.com",
        messagingSenderId: "946405576296",
        appId: "1:946405576296:web:801d05fd337ac8e4f3b5dd",
        measurementId: "G-J3L3F4N1BX",
    });
} catch (err) {}

const AddOffers = ({ navigation, route }) => {
    const { colors } = useTheme();
    const [offerDetails, setOfferDetails] = useState({
        shop_name: shopName,
        offer_title: "",
        details: "",
        image_url: image,
        post_time: "",
        start_date: "",
        end_date: "",
        status: "",
        likes: [],
        offer_id: "",
        uid: "",
    });

    const { startLoading, stopLoading } = React.useContext(AuthContext);

    const [shopName, setShopName] = useState(null);
    const [shops, setShops] = useState([]);
    const [image, setImage] = useState(null);
    const [imageUri, setImageUri] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showStartDate, setShowStartDate] = useState(false);
    const [showEndDate, setShowEndDate] = useState(false);
    const [mode, setMode] = useState("date");

    // date handlers:

    const onStartDateSelect = (event, selectedDate) => {
        const currentDate = selectedDate || startDate;
        setStartDate(currentDate);
        setShowStartDate(Platform.OS === "ios" ? true : false);
    };

    const onEndDateSelect = (event, selectedDate) => {
        const currentDate = selectedDate || endDate;
        setEndDate(currentDate);
        setShowEndDate(Platform.OS === "ios" ? true : false);
    };

    const showStartDateMode = (currentMode) => {
        setShowStartDate(true);
        setMode(currentMode);
    };

    const showEndDateMode = (currentMode) => {
        setShowEndDate(true);
        setMode(currentMode);
    };

    const showStartDatepicker = () => {
        showStartDateMode("date");
    };

    const showEndDatepicker = () => {
        showEndDateMode("date");
    };

    // text input handlers:

    const handelOfferTitleChange = (val) => {
        setOfferDetails({ ...offerDetails, offer_title: val });
    };

    const handelDetailsChange = (val) => {
        setOfferDetails({ ...offerDetails, details: val });
    };

    // image handlers:

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
            offerDetails.image_url = image;
            // image resize:
            try {
                const resizedImage = await ImageManipulator.manipulateAsync(
                    result.uri,
                    [{ resize: { height: 750, width: 1000 } }],
                    { compress: 1, format: ImageManipulator.SaveFormat.PNG }
                );
                setImage(resizedImage.uri);
                offerDetails.image_url = image;
            } catch (error) {
                console.log(error);
            }
        }
    };

    const uploadImage = async (image, imageName) => {};

    // getting shops:

    const getMyShops = (seller_id) => {
        var data = [];
        var options = [];

        axios
            .get(`${AxiosURL}/seller/getMyShops/WjDIA3uLVkPU5eUg3Ql4r3XpFkh2`)
            // .get(`${AxiosURL}/seller/getMyShops/${seller_id}`)
            .then((response) => {
                if (response.data.status === 200) {
                    if (response.data.response.length > 0) {
                        response.data.response.map((element) => {
                            // data.push(element.shop_name);
                            data.push({
                                label: element.shop_name,
                                value: element.shop_name,
                            });
                            options.push(false);
                        });
                    } else {
                        setShops(["No Shops"]);
                        ToastAndroid.show(
                            "Sorry, you don't have any shop to add an offer! Please add shop first.",
                            ToastAndroid.LONG
                        );
                        navigation.navigate("MyShops");
                    }
                }
                console.log(data);
                setShops(data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // adding offer:

    const onAddOfferPress = async () => {
        startLoading();
        let sellerID;

        try {
            sellerID = await AsyncStorage.getItem("userToken");
        } catch (error) {
            console.log(error);
        }

        let shop_name = shopName;
        let offer_title = offerDetails.offer_title;
        // let image_url = image;
        let image_url = "../images/offer.jpg";
        let details = offerDetails.details;
        let offer_id = sellerID + "_" + generateOfferID(10);

        // uploadImage(image_url, offer_id);

        stopLoading();
        if (shop_name && offer_title && details) {
            let addOfferDetails = {
                offer_title: offer_title,
                details: details,
                image_url: image_url,
                post_time: new Date(),
                start_date: getDateInFormat(startDate),
                end_date: getDateInFormat(endDate),
                status: "Active",
                likes: [],
                offer_id: offer_id,
                uid: sellerID,
            };

            // alert(JSON.stringify(addOfferDetails));

            axios
                .post(
                    `${AxiosURL}/seller/addOffer/${sellerID}/${shop_name}`,
                    addOfferDetails
                )
                .then((response) => {
                    if (response.data.status === 200) {
                        console.log(response.data);
                        stopLoading();
                        ToastAndroid.show(
                            "Offer added successfully!",
                            ToastAndroid.LONG
                        );
                        navigation.navigate("MyOffers");
                    } else {
                        ToastAndroid.show(
                            "Something went wrong!",
                            ToastAndroid.LONG
                        );
                    }
                })
                .catch((error) => {
                    stopLoading();
                    console.log(error);
                });
        } else {
            stopLoading();
            ToastAndroid.show(
                "Please fill out all the necessary fields!",
                ToastAndroid.LONG
            );
        }
    };

    // helper functions:

    function getDateInFormat(d) {
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
    }

    const generateOfferID = (length) => {
        const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = " ";
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            );
        }

        return result;
    };

    const addDays = (date, days) => {
        var newDate = new Date(date);
        newDate.setDate(newDate.getDate() + days);
        return newDate;
    };

    // getting media access permission and getting shops of current user

    useEffect(() => {
        (async () => {
            if (Platform.OS !== "android") {
                const {
                    status,
                } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== "granted") {
                    alert(
                        "Sorry, we need camera roll permissions to make this work!"
                    );
                }
            }
            try {
                const userID = await AsyncStorage.getItem("userToken");
                getMyShops(userID);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    // resetting form values and getting shops of current user after relaunching the screen:

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", async () => {
            setOfferDetails({
                shop_name: shopName,
                offer_title: "",
                details: "",
                image_url: "",
                post_time: "",
                start_date: "",
                end_date: "",
                status: "",
                likes: [],
                offer_id: "",
                uid: "",
            });
            setImage(null);
            try {
                const userID = await AsyncStorage.getItem("userToken");
                getMyShops(userID);
            } catch (error) {
                console.log(error);
            }
            return unsubscribe;
        });
    }, [navigation]);

    return (
        <View
            style={[styles.container, { backgroundColor: colors.headerColor }]}
        >
            <StatusBar
                backgroundColor={colors.headerColor}
                barStyle="light-content"
            />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Animatable.View animation="fadeIn">
                        <FontAwesome
                            name="arrow-circle-left"
                            color="#fff"
                            size={30}
                            style={{
                                marginLeft: 20,
                                marginTop: 20,
                            }}
                        />
                    </Animatable.View>
                </TouchableOpacity>
                <Animatable.View animation="fadeInLeftBig" duration={1500}>
                    <Text style={styles.headerText}>Add Offer</Text>
                </Animatable.View>
            </View>
            <Animatable.View
                animation="fadeInLeftBig"
                duration={1500}
                style={[
                    styles.footer,
                    {
                        backgroundColor: colors.background,
                    },
                ]}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.picker}>
                        <RNPickerSelect
                            placeholder={{
                                label: "Select a Shop..",
                                value: null,
                                color: "#404040",
                            }}
                            value={shopName}
                            items={shops}
                            onValueChange={(value) => {
                                setShopName(value);
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
                                            marginTop: 10,
                                            marginRight: 20,
                                        }}
                                    />
                                );
                            }}
                        />
                    </View>

                    <View style={styles.inputBox}>
                        <View style={styles.action}>
                            <TextInput
                                placeholder="Offer Title"
                                placeholderTextColor="#666666"
                                style={[
                                    styles.textInput,
                                    {
                                        color: colors.text,
                                    },
                                ]}
                                autoCapitalize="none"
                                value={offerDetails.offer_title}
                                onChangeText={(val) =>
                                    handelOfferTitleChange(val)
                                }
                            />
                        </View>
                    </View>

                    <View style={styles.inputBox}>
                        <View style={styles.action}>
                            <TextInput
                                multiline={true}
                                placeholder="Details"
                                placeholderTextColor="#666666"
                                style={[
                                    styles.textInput,
                                    {
                                        color: colors.text,
                                    },
                                ]}
                                autoCapitalize="none"
                                value={offerDetails.details}
                                onChangeText={(val) => handelDetailsChange(val)}
                            />
                        </View>
                    </View>

                    <View style={styles.imagePickerBox}>
                        <View style={styles.action}>
                            <Text
                                style={[
                                    styles.textInput,
                                    {
                                        color: "#1976D2",
                                    },
                                ]}
                                onPress={pickImage}
                            >
                                {image ? "Reselect" : "Select"} Image
                            </Text>
                            {image && (
                                <Image
                                    source={{ uri: image }}
                                    style={{
                                        width: 30,
                                        height: 27,
                                        marginRight: 10,
                                    }}
                                />
                            )}

                            <MaterialCommunityIcons
                                name="image"
                                size={25}
                                color="#666666"
                                style={{ marginRight: 10 }}
                            />
                        </View>
                    </View>

                    <View style={styles.imagePickerBox}>
                        <View style={styles.action}>
                            <Text
                                style={[
                                    styles.textInput,
                                    {
                                        color: "#1976D2",
                                    },
                                ]}
                                onPress={showStartDatepicker}
                            >
                                {startDate && (
                                    <Text style={{ paddingLeft: 40 }}>
                                        {"Start Date: " +
                                            getDateInFormat(startDate)}
                                    </Text>
                                )}
                            </Text>
                            <MaterialCommunityIcons
                                name="calendar"
                                size={25}
                                color="#666666"
                                style={{ marginRight: 10 }}
                            />
                        </View>
                    </View>

                    {showStartDate && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            timeZoneOffsetInMinutes={0}
                            value={startDate}
                            mode="date"
                            is24Hour={false}
                            display="default"
                            minimumDate={new Date()}
                            maximumDate={addDays(startDate, 60)}
                            onChange={onStartDateSelect}
                        />
                    )}

                    <View style={styles.imagePickerBox}>
                        <View style={styles.action}>
                            <Text
                                style={[
                                    styles.textInput,
                                    {
                                        color: "#1976D2",
                                    },
                                ]}
                                onPress={showEndDatepicker}
                            >
                                {endDate && (
                                    <Text style={{ paddingLeft: 40 }}>
                                        {"End Date: " +
                                            getDateInFormat(endDate)}
                                    </Text>
                                )}
                            </Text>

                            <MaterialCommunityIcons
                                name="calendar"
                                size={25}
                                color="#666666"
                                style={{ marginRight: 10 }}
                            />
                        </View>
                    </View>

                    {showEndDate && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            timeZoneOffsetInMinutes={0}
                            value={endDate}
                            mode="date"
                            is24Hour={false}
                            display="default"
                            minimumDate={startDate}
                            maximumDate={addDays(startDate, 7)}
                            onChange={onEndDateSelect}
                        />
                    )}

                    <TouchableOpacity
                        onPress={() => {
                            onAddOfferPress();
                        }}
                    >
                        <LinearGradient
                            colors={["#009688", "#00796B", "#004D40"]}
                            style={[styles.addOfferButtonBG]}
                        >
                            <Text style={styles.addOfferButtonText}>
                                <Entypo
                                    name="add-to-list"
                                    color="#fff"
                                    size={25}
                                />
                                {"  "}
                                Add Offer
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </ScrollView>
            </Animatable.View>
        </View>
    );
};

export default AddOffers;
