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
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNPickerSelect from "react-native-picker-select";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTheme } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import * as ImageManipulator from "expo-image-manipulator";
import * as firebase from "firebase";
import axios from "axios";

import { AuthContext } from "../components/context/Store";
import styles from "../styles/AddOffersStyles";
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
    const defaultImage =
        "https://img.freepik.com/free-vector/special-offer-sale-discount-banner_180786-46.jpg?size=626&ext=jpg";

    const { colors } = useTheme();

    const { startLoading, stopLoading } = React.useContext(AuthContext);
    const [shops, setShops] = useState([]);
    const [image, setImage] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showStartDate, setShowStartDate] = useState(false);
    const [showEndDate, setShowEndDate] = useState(false);
    const [mode, setMode] = useState("date");
    const [offerDetails, setOfferDetails] = useState({
        shop_name: "",
        offer_title: "",
        details: "",
        image_url: defaultImage,
        post_time: "",
        start_date: "",
        end_date: "",
        status: "",
        likes: [],
        offer_id: "",
        uid: "",
    });

    const pickerSelectStyles = {
        inputIOS: {
            fontSize: 18,
            paddingHorizontal: 10,
            paddingVertical: 8,
            color: offerDetails.shop_name ? colors.formIcon : "#666666",
            paddingRight: 30, // to ensure the text is never behind the icon
        },
        inputAndroid: {
            fontSize: 18,
            paddingHorizontal: 10,
            paddingVertical: 8,
            color: offerDetails.shop_name ? colors.formIcon : "#666666",
            paddingRight: 30, // to ensure the text is never behind the icon
        },
        placeholder: { color: "#666666", fontSize: 18 },
    };

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

    // input handlers:

    const handelOfferTitleChange = (val) => {
        setOfferDetails({ ...offerDetails, offer_title: val });
    };

    const handelDetailsChange = (val) => {
        setOfferDetails({ ...offerDetails, details: val });
    };

    const handelShopNameChange = (val) => {
        setOfferDetails({ ...offerDetails, shop_name: val });
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
            setOfferDetails({ ...offerDetails, image_url: result.uri });
            try {
                const resizedImage = await ImageManipulator.manipulateAsync(
                    result.uri,
                    [{ resize: { height: 750, width: 1000 } }],
                    { compress: 1, format: ImageManipulator.SaveFormat.PNG }
                );

                setOfferDetails({
                    ...offerDetails,
                    image_url: resizedImage.uri,
                });
            } catch (error) {
                setOfferDetails({
                    ...offerDetails,
                    image_url: defaultImage,
                });
                console.log(error);
            }
        }
    };

    // image upload function

    const uploadImage = async (imageURI, imageName) => {
        try {
            const response = await fetch(imageURI);
            const blob = await response.blob();
            var ref = firebase
                .storage()
                .ref()
                .child("Offer_Poster/" + imageName);
            return ref.put(blob);
        } catch (error) {
            console.log(error);
        }
    };

    const downloadImage = async (imageName) => {
        try {
            return await firebase
                .storage()
                .ref()
                .child(`Offer_Poster/${imageName}`)
                .getDownloadURL();
        } catch (error) {
            console.log(error);
            return defaultImage;
        }
    };

    // getting shops:

    const getMyShops = (seller_id) => {
        var data = [];

        axios
            // .get(`${AxiosURL}/seller/getMyShops/WjDIA3uLVkPU5eUg3Ql4r3XpFkh2`)
            .get(`${AxiosURL}/seller/getMyShops/${seller_id}`)
            .then((response) => {
                if (response.data.status === 200) {
                    if (response.data.response.length > 0) {
                        response.data.response.map((element) => {
                            // data.push(element.shop_name);
                            data.push({
                                label: element.shop_name,
                                value: element.shop_name,
                            });
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

        let shop_name = offerDetails.shop_name;
        let offer_title = offerDetails.offer_title;
        let image_url = defaultImage; //default image if user don't upload image
        let details = offerDetails.details;
        let offer_id = sellerID + "_o_" + generateOfferID(10);

        if (shop_name && offer_title && details) {
            if (image) {
                try {
                    await uploadImage(offerDetails.image_url, offer_id);
                    image_url = await downloadImage(offer_id);
                } catch (error) {
                    image_url = defaultImage;
                    console.log(error);
                }
            }

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

            axios
                .post(
                    `${AxiosURL}/seller/addOffer/${sellerID}/${shop_name}`,
                    addOfferDetails
                )
                .then((response) => {
                    if (response.data.status === 200) {
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
                shop_name: "",
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
                        <FontAwesome5
                            name="arrow-circle-left"
                            color={"#fff"}
                            size={30}
                            style={{
                                marginLeft: 0,
                                marginTop: 30,
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
                                label: "Select the Shop..",
                                value: null,
                            }}
                            value={offerDetails.shop_name}
                            items={shops}
                            onValueChange={(value) => {
                                handelShopNameChange(value);
                            }}
                            style={pickerSelectStyles}
                            useNativeAndroidPickerStyle={false}
                            Icon={() => {
                                return (
                                    <FontAwesome5
                                        name="angle-down"
                                        size={25}
                                        color={
                                            offerDetails.shop_name
                                                ? colors.formIcon
                                                : "#666666"
                                        }
                                        style={{
                                            marginTop: 10,
                                            marginRight: 15,
                                        }}
                                    />
                                );
                            }}
                        />
                    </View>

                    <View style={styles.inputBox}>
                        <View style={styles.action}>
                            <TextInput
                                placeholder="Enter the Offer Title..."
                                placeholderTextColor="#666666"
                                style={[
                                    styles.textInput,
                                    {
                                        color: offerDetails.offer_title
                                            ? colors.formIcon
                                            : "#666666",
                                    },
                                ]}
                                autoCapitalize="none"
                                value={offerDetails.offer_title}
                                onChangeText={(val) =>
                                    handelOfferTitleChange(val)
                                }
                            />
                            <MaterialCommunityIcons
                                name="format-title"
                                size={25}
                                color={
                                    offerDetails.offer_title
                                        ? colors.formIcon
                                        : "#666666"
                                }
                                style={{ marginRight: 10 }}
                            />
                        </View>
                    </View>

                    <View style={styles.inputBox}>
                        <View style={styles.action}>
                            <TextInput
                                multiline={true}
                                placeholder="Enter the Offer Details..."
                                placeholderTextColor="#666666"
                                style={[
                                    styles.textInput,
                                    {
                                        color: offerDetails.details
                                            ? colors.formIcon
                                            : "#666666",
                                    },
                                ]}
                                autoCapitalize="none"
                                value={offerDetails.details}
                                onChangeText={(val) => handelDetailsChange(val)}
                            />
                            <Entypo
                                name="text"
                                size={25}
                                color={
                                    offerDetails.details
                                        ? colors.formIcon
                                        : "#666666"
                                }
                                style={{ marginRight: 10 }}
                            />
                        </View>
                    </View>

                    <View style={styles.imagePickerBox}>
                        <View style={styles.action}>
                            <Text
                                style={[
                                    styles.textInput,
                                    image
                                        ? {
                                              color: colors.formIcon,
                                          }
                                        : {
                                              color: "#666666",
                                          },
                                ]}
                                onPress={pickImage}
                            >
                                {image ? "Reselect Image" : "Select Image"}
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
                                color={image ? colors.formIcon : "#666666"}
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
                                        color: startDate
                                            ? colors.formIcon
                                            : "#666666",
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
                                color={startDate ? colors.formIcon : "#666666"}
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
                                        color: endDate
                                            ? colors.formIcon
                                            : "#666666",
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
                                color={endDate ? colors.formIcon : "#666666"}
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

                    <Text style={{ color: colors.text }}>
                        NOTE: You can set offer period to maximum 7 days only.
                        After 7 days offer will be removed automatically from
                        homescreen.
                    </Text>

                    <TouchableOpacity
                        onPress={() => {
                            onAddOfferPress();
                        }}
                        style={[
                            styles.addOfferButtonBG,
                            { backgroundColor: colors.headerColor },
                        ]}
                    >
                        <Text style={styles.addOfferButtonText}>
                            <Entypo name="add-to-list" color="#fff" size={25} />
                            {"  "}
                            Add Offer
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </Animatable.View>
        </View>
    );
};

export default AddOffers;
