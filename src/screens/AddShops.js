import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    TextInput,
    ScrollView,
    Platform,
    ToastAndroid,
} from "react-native";
import * as Animatable from "react-native-animatable";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import * as firebase from "firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";
import * as Location from "expo-location";
import { useTheme } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

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

const AddShops = ({ navigation, route }) => {
    const { colors } = useTheme();
    const pickerSelectStyles = {
        inputIOS: {
            fontSize: 18,
            paddingHorizontal: 10,
            paddingVertical: 8,
            color: colors.text,
            paddingRight: 30, // to ensure the text is never behind the icon
        },
        inputAndroid: {
            fontSize: 18,
            paddingHorizontal: 10,
            paddingVertical: 8,
            color: colors.text,
            paddingRight: 30, // to ensure the text is never behind the icon
        },
        placeholder: { color: "#666666", fontSize: 18 },
    };

    const { startLoading, stopLoading } = React.useContext(AuthContext);
    const [shops, setShops] = useState([]);
    // const [token, setToken] = useState(null);
    // const token = "";
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [shopDetails, setShopDetails] = useState({
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
    });

    const categories = [
        { label: "Automotive", value: "Automotive" },
        { label: "Baby & Toddler", value: "Baby & Toddler" },
        { label: "Clothing & Shoes", value: "Clothing & Shoes" },
        { label: "Computers", value: "Computers" },
        { label: "Electronics", value: "Electronics" },
        { label: "Entertainment & Arts", value: "Entertainment & Arts" },
        { label: "Food & Gifts", value: "Food & Gifts" },
        { label: "Health & Beauty", value: "Health & Beauty" },
        { label: "Home & Garden", value: "Home & Garden" },
        {
            label: "Office & Professional Services",
            value: "Office & Professional Services",
        },
        {
            label: "Personal & Home Services",
            value: "Personal & Home Services",
        },
        { label: "Restaurants & Dining", value: "Restaurants & Dining" },
        { label: "Software", value: "Software" },
        { label: "Sports & Outdoors", value: "Sports & Outdoors" },
        { label: "Travel", value: "Travel" },
        { label: "Other", value: "Other" },
    ];

    const handelShopNameChange = (val) => {
        setShopDetails({ ...shopDetails, shop_name: val });
    };

    const handelCategoryChange = (val) => {
        setShopDetails({ ...shopDetails, category: val });
    };

    const handelCountryChange = (val) => {
        setShopDetails({ ...shopDetails, country: val });
        getStates(val);
    };

    const handelStateChange = (val) => {
        setShopDetails({ ...shopDetails, state: val });
        getCities(val);
    };

    const handelCityChange = (val) => {
        setShopDetails({ ...shopDetails, city: val });
    };

    const handelAddressChange = (val) => {
        setShopDetails({ ...shopDetails, address: val });
    };

    // const token =
    //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiI1aHViaGFtNy51bm9mZmljaWFsQGdtYWlsLmNvbSIsImFwaV90b2tlbiI6IjhRWkFZZlVFSEpkTDY1NEJfdDJtVEVCdHU4UjJYenNabXZHSms1REktbG11WGRyUWphTUZUNUpQaTdTT1dvV20waTQifSwiZXhwIjoxNjIwMDY1MTQ5fQ.nrWkVsiGJlkGTLeibbj6NBOXcq1TqTwPh7VV-px5ykA";

    const getToken = async () => {
        const config = {
            headers: {
                Accept: "application/json",
                "api-token":
                    "8QZAYfUEHJdL654B_t2mTEBtu8R2XzsZmvGJk5DI-lmuXdrQjaMFT5JPi7SOWoWm0i4",
                "user-email": "5hubham7.unofficial@gmail.com",
            },
        };

        let response = await axios.get(
            "https://www.universal-tutorial.com/api/getaccesstoken",
            config
        );
        if (response.status == 200) {
            return response.data.auth_token.toString();
        }

        // axios
        //     .get(
        //         "https://www.universal-tutorial.com/api/getaccesstoken",
        //         config
        //     )
        //     .then((response) => {
        //         if (response.status == 200) {
        //             console.log(response.data.auth_token);
        //             // setToken(response.data.auth_token);
        //             token = response.data.auth_token;
        //         }
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
    };

    const getCountries = async () => {
        let config = {
            headers: {
                Authorization: "Bearer " + (await getToken()),
            },
        };
        let countryData = [];

        axios
            .get("https://www.universal-tutorial.com/api/countries/", config)
            .then((response) => {
                if (response.status == 200) {
                    if (response.data.length > 0) {
                        response.data.map((element) => {
                            countryData.push({
                                label: element.country_name,
                                value: element.country_name,
                            });
                        });
                    } else {
                        setCountries([
                            {
                                label: "No Countries",
                                value: "No Countries",
                            },
                        ]);
                    }
                }
                setCountries(countryData);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getStates = async (countryName) => {
        let config = {
            headers: {
                Authorization: "Bearer " + (await getToken()),
            },
        };
        let stateData = [];

        axios
            .get(
                "https://www.universal-tutorial.com/api/states/" + countryName,
                config
            )
            .then((response) => {
                if (response.status == 200) {
                    if (response.data.length > 0) {
                        response.data.map((element) => {
                            stateData.push({
                                label: element.state_name,
                                value: element.state_name,
                            });
                        });
                    } else {
                        setStates([
                            {
                                label: "No States",
                                value: "No States",
                            },
                        ]);
                    }
                }
                setStates(stateData);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getCities = async (stateName) => {
        let config = {
            headers: {
                Authorization: "Bearer " + (await getToken()),
            },
        };
        let cityData = [];

        axios
            .get(
                "https://www.universal-tutorial.com/api/cities/" + stateName,
                config
            )
            .then((response) => {
                if (response.status == 200) {
                    if (response.data.length > 0) {
                        response.data.map((element) => {
                            cityData.push({
                                label: element.city_name,
                                value: element.city_name,
                            });
                        });
                    } else {
                        setCities([
                            {
                                label: "No Cities",
                                value: "No Cities",
                            },
                        ]);
                    }
                }
                setCities(cityData);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // getting shops:

    const getMyShops = async (seller_id) => {
        await getCountries();
        var data = [];

        axios
            // .get(`${AxiosURL}/seller/getMyShops/WjDIA3uLVkPU5eUg3Ql4r3XpFkh2`)
            .get(`${AxiosURL}/seller/getMyShops/${seller_id}`)
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
        alert("TODO");
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
                } = await Location.requestForegroundPermissionsAsync();
                if (status !== "granted") {
                    alert("Permission to access location was denied!");
                    navigation.goBack();
                }

                status = await Location.getCurrentPositionAsync({});
                if (status !== "granted") {
                    alert("Permission to access location was denied!");
                    navigation.goBack();
                }
            }
            try {
                const userID = await AsyncStorage.getItem("userToken");
                await getMyShops(userID);
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
                category: "",
                country: "",
                state: "",
                city: "",
                address: "",
                latitude: "",
                longitude: "",
                offer: [],
                shop_id: "",
            });
            try {
                const userID = await AsyncStorage.getItem("userToken");
                await getMyShops(userID);
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
                    <Text style={styles.headerText}>Add Shop</Text>
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
                                placeholder="Enter the Shop Name..."
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
                            <Entypo
                                name="shop"
                                size={25}
                                color={
                                    shopDetails.shop_name
                                        ? colors.formIcon
                                        : "#666666"
                                }
                                style={{ marginRight: 10 }}
                            />
                        </View>
                    </View>

                    <View style={styles.picker}>
                        <RNPickerSelect
                            placeholder={{
                                label: "Select a Category...",
                                value: null,
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
                                    <FontAwesome5
                                        name="chevron-down"
                                        size={25}
                                        color={
                                            shopDetails.category
                                                ? colors.formIcon
                                                : "#666666"
                                        }
                                        style={{
                                            marginTop: 10,
                                            marginRight: 10,
                                        }}
                                    />
                                );
                            }}
                        />
                    </View>

                    <View style={styles.picker}>
                        <RNPickerSelect
                            placeholder={{
                                label: "Select the Country...",
                                value: null,
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
                                    <FontAwesome5
                                        name="chevron-down"
                                        size={25}
                                        color={
                                            shopDetails.country
                                                ? colors.formIcon
                                                : "#666666"
                                        }
                                        style={{
                                            marginTop: 10,
                                            marginRight: 10,
                                        }}
                                    />
                                );
                            }}
                        />
                    </View>

                    <View style={styles.picker}>
                        <RNPickerSelect
                            placeholder={{
                                label: "Select the state...",
                                value: null,
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
                                    <FontAwesome5
                                        name="chevron-down"
                                        size={25}
                                        color={
                                            shopDetails.state
                                                ? colors.formIcon
                                                : "#666666"
                                        }
                                        style={{
                                            marginTop: 10,
                                            marginRight: 10,
                                        }}
                                    />
                                );
                            }}
                        />
                    </View>

                    <View style={styles.picker}>
                        <RNPickerSelect
                            placeholder={{
                                label: "Select the City...",
                                value: null,
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
                                    <FontAwesome5
                                        name="chevron-down"
                                        size={25}
                                        color={
                                            shopDetails.city
                                                ? colors.formIcon
                                                : "#666666"
                                        }
                                        style={{
                                            marginTop: 10,
                                            marginRight: 10,
                                        }}
                                    />
                                );
                            }}
                        />
                    </View>

                    <View style={styles.inputBox}>
                        <View style={styles.action}>
                            <TextInput
                                placeholder="Enter the Shop Address..."
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
                            <Entypo
                                name="address"
                                size={25}
                                color={
                                    shopDetails.address
                                        ? colors.formIcon
                                        : "#666666"
                                }
                                style={{ marginRight: 10 }}
                            />
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={() => {
                            onAddShopPress();
                        }}
                        style={[
                            styles.addOfferButtonBG,
                            { backgroundColor: colors.headerColor },
                        ]}
                    >
                        <Text style={styles.addOfferButtonText}>
                            <Entypo name="add-to-list" color="#fff" size={25} />
                            {"  "}
                            Add Shop
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </Animatable.View>
        </View>
    );
};

export default AddShops;
