import React, { useEffect } from "react";
import { View, Dimensions } from "react-native";
import { useTheme } from "@react-navigation/native";
import { FAB } from "react-native-paper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Entypo from "react-native-vector-icons/Entypo";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "../styles/HomeScreenStyles";
import MyShopCard from "../components/MyShopCard";
import axiosURL from "../helper/AxiosURL";

const MyShopsStack = createStackNavigator();

const windowWidth = Dimensions.get("screen").width;

const MyShops = ({ navigation }) => {
    const { colors } = useTheme();

    const [shopData, setShopData] = React.useState(null);

    const getMyShops = (seller_id) => {
        var data = [];
        var options = [];
        // console.log(
        //     `${axiosURL}/seller/getMyOffers/WjDIA3uLVkPU5eUg3Ql4r3XpFkh2`
        // );
        axios
            // .get(`${axiosURL}/seller/getMyShops/WjDIA3uLVkPU5eUg3Ql4r3XpFkh2`)
            .get(`${axiosURL}/seller/getMyShops/${seller_id}`)
            .then((response) => {
                // console.log(response.data.response);
                if (response.data.status === 200) {
                    if (response.data.response.length > 0) {
                        setShopData(response.data.response);
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
                    } else {
                        setShopData("No Shops");
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const addShop = () => {
        alert("Add Shop");
        //navigation.navigate("AddShop");
    };

    useEffect(() => {
        (async () => {
            const userID = await AsyncStorage.getItem("userToken");
            // console.log("userID", userID);
            getMyShops(userID);
        })();
    }, []);

    return (
        <View style={styles.container}>
            <MyShopCard
                shopData={shopData}
                getMyShops={getMyShops}
                navigation={navigation}
            />
            <FAB
                style={[styles.fab, { backgroundColor: colors.headerColor }]}
                icon={({ color, size }) => (
                    <Entypo name="add-to-list" color={color} size={size} />
                )}
                animated="true"
                label="Add Shop"
                onPress={addShop}
            ></FAB>
        </View>
    );
};

const MyShopsStackScreen = ({ navigation }) => {
    const { colors } = useTheme();
    return (
        <MyShopsStack.Navigator
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
            <MyShopsStack.Screen
                name="MyShops"
                component={MyShops}
                options={{
                    title: "MY SHOPS",
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
        </MyShopsStack.Navigator>
    );
};
export default MyShopsStackScreen;
