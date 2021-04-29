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

    const [shopData, setShopData] = React.useState(null);

    const getMyShops = (seller_id) => {
        var data = [];
        var options = [];
        // console.log(
        //     `${axiosURL}/seller/getMyOffers/WjDIA3uLVkPU5eUg3Ql4r3XpFkh2`
        // );
        axios
            .get(`${axiosURL}/seller/getMyShops/${seller_id}`)
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
