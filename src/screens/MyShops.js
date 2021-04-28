import React, { useEffect } from "react";
import { View, Dimensions } from "react-native";
import { useTheme } from "@react-navigation/native";
import { FAB } from "react-native-paper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Entypo from "react-native-vector-icons/Entypo";

import styles from "../styles/HomeScreenStyles";
import MyShopCard from "../components/MyShopCard";
import axiosURL from "../helper/AxiosURL";

const windowWidth = Dimensions.get("screen").width;

const MyShops = ({ navigation }) => {
    const { colors } = useTheme();

    const [shopData, setShopData] = React.useState([
        {
            shop_name: "[Shop Name]",
            category: "[Category]",
            shop_address: "[Address]",
            offer: [],
        },
    ]);

    const getMyShops = (seller_id) => {
        var data = [];
        var options = [];
        // console.log(
        //     `${axiosURL}/seller/getMyShops/WjDIA3uLVkPU5eUg3Ql4r3XpFkh2`
        // );
        axios
            .get(`${axiosURL}/seller/getMyShops/${seller_id}`)
            .then((response) => {
                if (response.data.status === 200) {
                    // console.log(response.data.response);
                    setShopData(response.data.response);
                    response.data.response.map((element) => {
                        data.push(element.offer_id);
                        options.push(false);
                    });

                    options.reduce(function (result, field, index) {
                        result[data[index]] = field;
                        // console.log("shopData", shopData);
                        return result;
                    }, {});
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
                style={styles.fab}
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

export default MyShops;
