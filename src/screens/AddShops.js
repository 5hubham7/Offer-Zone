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
import ImageResizer from "react-native-image-resizer";
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

const AddShops = ({ navigation, route }) => {
    const { colors } = useTheme();
    const [shopDetails, setShopDetails] = useState({
        shop_name: "",
        category: [],
        country: [],
        state: [],
        city: [],
        address: "",
        latitude: "",
        longitude: "",
        offer: [],
        shop_id: "",
    });

    const categories = [
        "All",
        "Automotive",
        "Baby & Toddler",
        "Clothing & Shoes",
        "Computers",
        "Electronics",
        "Entertainment & Arts",
        "Food & Gifts",
        "Health & Beauty",
        "Home & Garden",
        "Office & Professional Services",
        "Personal & Home Services",
        "Restaurants & Dining",
        "Software",
        "Sports & Outdoors",
        "Travel",
        "Other",
    ];

    const { startLoading, stopLoading } = React.useContext(AuthContext);
    const { shops, setShops } = React.useContext(AuthContext);
    // const [selectedCategory, setSelectedCategory] = useState(null);
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    // const [selectedCountry, setSelectedCountry] = useState(null);
    // const [selectedState, setSelectedState] = useState(null);
    // const [selectedCity, setSelectedCity] = useState(null);

    const handelShopNameChange = (val) => {
        setShopDetails({ ...shopDetails, shop_name: val });
    };

    const handelCategoryChange = (val) => {
        // setSelectedCategory(val);
        setShopDetails({ ...shopDetails, category: val });
    };

    const handelCountryChange = (val) => {
        // setSelectedCountry(val);
        setShopDetails({ ...shopDetails, country: val });
    };

    const handelStateChange = (val) => {
        // setSelectedState(val);
        setShopDetails({ ...shopDetails, state: val });
    };

    const handelCityChange = (val) => {
        // setSelectedCity(val);
        setShopDetails({ ...shopDetails, city: val });
    };

    const handelAddressChange = (val) => {
        setShopDetails({ ...shopDetails, address: val });
    };

    // getting shops:

    const getMyShops = (seller_id) => {
        var data = [];

        axios
            .get(`${AxiosURL}/seller/getMyShops/WjDIA3uLVkPU5eUg3Ql4r3XpFkh2`)
            // .get(`${AxiosURL}/seller/getMyShops/${seller_id}`)
            .then((response) => {
                if (response.data.status === 200) {
                    if (response.data.response.length > 0) {
                        response.data.response.map((element) => {
                            data.push(element.shop_name);
                        });
                    } else {
                        setShops([]);
                    }
                }
                setShops(data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // adding offer:

    const onAddShopPress = async () => {
        /*
        startLoading();
        let sellerID;

        try {
            sellerID = await AsyncStorage.getItem("userToken");
        } catch (error) {
            console.log(error);
        }

        let shop_name = shopName;
        let offer_title = shopDetails.offer_title;
        let image_url = "../images/offer.jpg";
        let details = shopDetails.details;
        let offer_id = sellerID + "_" + generateShopID(10);

        // uploadImage(image_url, offer_id);

        stopLoading();
        if (shop_name && offer_title && details) {
            let addShopDetails = {
                shop_name: "",
                category: "",
                country: "",
                state: "",
                city: "",
                address: "",
                latitude: "",
                longitude: "",
                offer: [],
                shop_id: "",
            };

            axios
                .post(`${AxiosURL}/seller/addShop/${sellerID}/`, addShopDetails)
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
        */
    };

    // helper functions:

    const generateShopID = (length) => {
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
            setShopDetails({
                shop_name: "",
                category: [],
                country: [],
                state: [],
                city: [],
                address: "",
                latitude: "",
                longitude: "",
                offer: [],
                shop_id: "",
            });
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
                    <View style={styles.inputBox}>
                        <View style={styles.action}>
                            <TextInput
                                placeholder="Shop Name"
                                placeholderTextColor="#666666"
                                style={[
                                    styles.textInput,
                                    {
                                        color: colors.text,
                                    },
                                ]}
                                autoCapitalize="none"
                                value={shopDetails.shop_name}
                                onChangeText={(val) =>
                                    handelShopNameChange(val)
                                }
                            />
                        </View>
                    </View>

                    <View style={styles.picker}>
                        <RNPickerSelect
                            placeholder={{
                                label: "Category",
                                value: null,
                                color: "#404040",
                            }}
                            value={shopDetails.category}
                            items={categories}
                            onValueChange={(value) => {
                                handelCategoryChange(value);
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

                    <View style={styles.picker}>
                        <RNPickerSelect
                            placeholder={{
                                label: "Country",
                                value: null,
                                color: "#404040",
                            }}
                            value={shopDetails.country}
                            items={countries}
                            onValueChange={(value) => {
                                handelCountryChange(value);
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

                    <View style={styles.picker}>
                        <RNPickerSelect
                            placeholder={{
                                label: "State",
                                value: null,
                                color: "#404040",
                            }}
                            value={shopDetails.state}
                            items={states}
                            onValueChange={(value) => {
                                handelStateChange(value);
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

                    <View style={styles.picker}>
                        <RNPickerSelect
                            placeholder={{
                                label: "City",
                                value: null,
                                color: "#404040",
                            }}
                            value={shopDetails.city}
                            items={cities}
                            onValueChange={(value) => {
                                handelCityChange(value);
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
                                placeholder="Address"
                                placeholderTextColor="#666666"
                                style={[
                                    styles.textInput,
                                    {
                                        color: colors.text,
                                    },
                                ]}
                                autoCapitalize="none"
                                value={shopDetails.address}
                                onChangeText={(val) => handelAddressChange(val)}
                            />
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={() => {
                            onAddShopPress();
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
                                Add Shop
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </ScrollView>
            </Animatable.View>
        </View>
    );
};

export default AddShops;
