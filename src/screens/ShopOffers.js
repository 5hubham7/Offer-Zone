import React, { useEffect } from "react";
import { View, Dimensions, Platform, Text } from "react-native";
import { useTheme } from "@react-navigation/native";
import { FAB, Searchbar } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import Constants from "expo-constants";
import Icon from "react-native-vector-icons/Ionicons";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Entypo from "react-native-vector-icons/Entypo";
import { createStackNavigator } from "@react-navigation/stack";
import styles from "../styles/HomeScreenStyles";
import MyOfferCard from "../components/MyOfferCard";

const windowWidth = Dimensions.get("screen").width;
const ShopOffersStack = createStackNavigator();
const ShopOffers = ({ navigation, route }) => {
    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: colors.headerColor, height: 55, width: "100%", flexDirection: 'row' }}>
                <Icon
                    name="ios-menu"
                    size={30}
                    backgroundColor={colors.headerColor}
                    color="#fff"
                    style={{
                        marginTop: 10,
                        marginLeft: 4
                    }}
                    onPress={() => {
                        navigation.openDrawer()
                    }}
                ></Icon>
                <Text style={{
                    fontWeight: "bold",
                    width: windowWidth,
                    fontSize: 20,
                    color: "#fff",
                    marginTop: 12,
                    textAlign: 'center',
                    marginLeft: -30
                }}
                >
                    {route.params.shopName}
                </Text>
            </View>
            <MyOfferCard
                offerData={route.params.offerData}
                navigation={navigation}
            />
        </View>
    );
};

const ShopOffersStackScreen = ({ navigation, route }) => {
    const { colors } = useTheme();
    return (
        <ShopOffersStack.Navigator
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
            <ShopOffersStack.Screen
                name="MyOffers"
                component={ShopOffers}
                options={{
                    title: "SHOP OFFERS",
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
        </ShopOffersStack.Navigator>
    );
};

export default ShopOffers;
