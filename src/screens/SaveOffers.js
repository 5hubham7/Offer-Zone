import React, { useEffect } from "react";
import { View } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/HomeScreenStyles";
import SavedOfferCard from "../components/SavedOfferCard";
import axiosURL from "../helper/AxiosURL";
import { useTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";

const SaveOffersStack = createStackNavigator();

const SaveOffers = ({ navigation }) => {
    const [User, setUser] = React.useState(null);
    const { colors } = useTheme();

    const [currentOffers, setCurrentOffers] = React.useState(null);

    const _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem("userToken");
            if (value !== null) {
                setUser(value);
                getSaveOffers(value);
            }
        } catch (error) { }
    };

    const getSaveOffers = (user) => {
        var data = [];
        var options = [];
        axios
            .get(`${axiosURL}/customer/getSaveOffers/${user}`)
            // .get(
            //     `${axiosURL}/customer/getOffers/20.042818069458008/74.48754119873047`
            // )
            .then((response) => {
                //console.log(response.data.response);
                if (response.data.status === 200) {
                    if (response.data.response.length > 0) {
                        setCurrentOffers(response.data.response);
                        response.data.response.map((element) => {
                            data.push(element.offer_id);
                            options.push(false);
                        });
                    } else {
                        setCurrentOffers("No Offers");
                    }
                }
            });
    };

    useEffect(() => {
        _retrieveData();
    }, []);

    return (
        <View style={styles.container}>
            <SavedOfferCard
                offerData={currentOffers}
                getSaveOffers={getSaveOffers}
                navigation={navigation}
                User={User}
            />
        </View>
    );
};


const SaveOfferStackScreen = ({ navigation }) => {
    const { colors } = useTheme();
    return (
        <SaveOffersStack.Navigator
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
            <SaveOffersStack.Screen
                name="SaveOffers"
                component={SaveOffers}
                options={{
                    title: "WISHLIST",
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
        </SaveOffersStack.Navigator>
    )
};
export default SaveOfferStackScreen;
