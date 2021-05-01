import React, { useEffect } from "react";
import { View, Dimensions, Platform } from "react-native";
import { useTheme } from "@react-navigation/native";
import { FAB, Searchbar } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import axios from "axios";
import Constants from "expo-constants";
import Icon from "react-native-vector-icons/Ionicons";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Entypo from "react-native-vector-icons/Entypo";
import { createStackNavigator } from "@react-navigation/stack";
import styles from "../styles/HomeScreenStyles";
import MyOfferCard from "../components/MyOfferCard";
import axiosURL from "../helper/AxiosURL";

const windowWidth = Dimensions.get("screen").width;
const MyOffersStack = createStackNavigator();

const MyOffers = ({ navigation }) => {
    const { colors } = useTheme();

    const [location, setLocation] = React.useState({
        latitude: "",
        longitude: "",
    });
    const [errorMessage, setErrorMessage] = React.useState(null);
    const [offerLike, setOfferLike] = React.useState({
        1234: false,
    });
    const [offerData, setOfferData] = React.useState(null);

    const getMyOffers = (seller_id) => {
        var data = [];
        var options = [];
        // console.log(
        //     `${axiosURL}/seller/getMyOffers/WjDIA3uLVkPU5eUg3Ql4r3XpFkh2`
        // );
        axios
            .get(`${axiosURL}/seller/getMyOffers/${seller_id}`)
            // axios
            //     .get(`${axiosURL}/seller/getMyOffers/${seller_id}`)
            .then((response) => {
                // console.log(response.data.response);
                if (response.data.status === 200) {
                    if (response.data.response.length > 0) {
                        setOfferData(response.data.response);
                        response.data.response.map((element) => {
                            data.push(element.offer_id);
                            options.push(false);
                        });

                        var result = options.reduce(function (
                            result,
                            field,
                            index
                        ) {
                            result[data[index]] = field;
                            return result;
                        },
                        {});
                        setOfferLike({ ...result });
                    } else {
                        setOfferData("No Offers");
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const addOffer = () => {
        navigation.navigate("AddOffers");
    };

    const theme = useTheme();

    useEffect(() => {
        (async () => {
            if (Platform.OS === "android" && !Constants.isDevice) {
                setErrorMessage(
                    "Oops, this will not work on Snack in an Android emulator. Try it on your device!"
                );
                return;
            }
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMessage("Permission to access location was denied");
                return;
            }

            const userID = await AsyncStorage.getItem("userToken");
            getMyOffers(userID);
        })();
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", async () => {
            try {
                const userID = await AsyncStorage.getItem("userToken");
                getMyOffers(userID);
            } catch (error) {
                console.log(error);
            }
            return unsubscribe;
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View
                style={{
                    width: "100%",
                    backgroundColor: colors.headerColor,
                    height: 50,
                }}
                animation="fadeInRight"
            >
                <Searchbar
                    placeholder="Search offers..."
                    style={{
                        width: windowWidth * 0.9,
                        height: 40,
                        marginLeft: "auto",
                        marginRight: "auto",
                        borderRadius: 10,
                    }}
                    //onChangeText={(text) => (alert(text))}
                    clearButtonMode="while-editing"
                />
            </View>

            <MyOfferCard
                offerData={offerData}
                getMyOffers={getMyOffers}
                navigation={navigation}
                location={location}
            />
            <FAB
                style={[styles.fab, { backgroundColor: colors.headerColor }]}
                icon={({ color, size }) => (
                    <Entypo name="add-to-list" color={color} size={size} />
                )}
                animated="true"
                label="Add Offer"
                onPress={addOffer}
            ></FAB>
        </View>
    );
};

const MyOffersStackScreen = ({ navigation }) => {
    const { colors } = useTheme();
    return (
        <MyOffersStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.headerColor,
                    elevation: 0,
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    fontWeight: "bold",
                    marginRight: 50,
                    textAlign: "center",
                    fontSize: 20,
                },
            }}
        >
            <MyOffersStack.Screen
                name="MyOffers"
                component={MyOffers}
                options={{
                    title: "MY OFFERS",
                    headerLeft: () => (
                        <Icon.Button
                            name="ios-menu"
                            size={30}
                            backgroundColor={colors.headerColor}
                            color="#fff"
                            onPress={() => navigation.openDrawer()}
                        ></Icon.Button>
                    ),
                }}
            />
        </MyOffersStack.Navigator>
    );
};

export default MyOffersStackScreen;
