import React, { useEffect } from "react";
import {
    RefreshControl,
    View,
    Text,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    Image,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import DoubleClick from "react-native-double-tap";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "../styles/CardStyles";
import { AuthContext } from "../components/context/Store";

const windowWidth = Dimensions.get("screen").width;

const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
};

const MyShopsCard = (props) => {
    const [refreshing, setRefreshing] = React.useState(false);
    const { startLoading, stopLoading } = React.useContext(AuthContext);
    const [userID, setUserID] = React.useState(false);

    const _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem("userToken");
            if (value !== null) {
                return value;
            }
        } catch (error) {}
    };

    const onSingleTap = (offer_id) => {
        alert("Clicked");
        //console.log(offer_id)
        // startLoading();
        // axios
        //     .get(`${axiosURL}/customer/getOffersById/${offer_id}`)
        //     .then((response) => {
        //         if (response.data.status === 200) {
        //             //setOfferDetails(response.data.response)
        //             stopLoading();
        //             props.navigation.navigate("OfferDetails", {
        //                 shopData: response.data.response,
        //                 location: props.location,
        //             });
        //         }
        //     })
        //     .catch((error) => {
        //         stopLoading();
        //         alert(error);
        //     });
    };

    useEffect(() => {
        _retrieveData().then((response) => {
            setUserID(response);
        });
    }, []);

    const onRefresh = React.useCallback((seller_id) => {
        setRefreshing(true);
        props.getMyShops(seller_id);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    return (
        <View style={styles.container}>
            {props.offerData != null ? (
                <View>
                    {props.offerData === "No Offers" ? (
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={() => {
                                        onRefresh(props.User);
                                    }}
                                    colors={["#fff", "red", "yellow"]}
                                    progressBackgroundColor={"#000"}
                                />
                            }
                            animation="fadeInRightBig"
                            contentContainerStyle={{
                                flexGrow: 1,
                                justifyContent: "center",
                            }}
                        >
                            <View style={{ alignItems: "center" }}>
                                <Text
                                    style={[
                                        styles.errorMessageText,
                                        { width: windowWidth * 0.9 },
                                    ]}
                                >
                                    Sorry, your current location don't have any
                                    offers! Try with another location.
                                </Text>
                                <Image
                                    source={require("../../assets/sad_folder.png")}
                                    style={{ width: 200, height: 200 }}
                                    resizeMode="stretch"
                                />
                            </View>
                        </ScrollView>
                    ) : (
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={() => {
                                        onRefresh(userID);
                                    }}
                                    colors={["#fff", "red", "yellow"]}
                                    progressBackgroundColor={"#000"}
                                />
                            }
                            style={{ marginBottom: 60 }}
                            animation="fadeInRightBig"
                        >
                            {props.shopData.map((element, index) => (
                                <View
                                    style={styles.cardView}
                                    elevation={3}
                                    key={index}
                                >
                                    <DoubleClick
                                        singleTap={() => {
                                            onSingleTap(element.shop_id);
                                        }}
                                        delay={500}
                                    >
                                        <View style={styles.cardData}>
                                            <Text
                                                style={styles.cardTitle}
                                                numberOfLines={1}
                                                ellipsizeMode="tail"
                                            >
                                                {element.shop_name}
                                            </Text>
                                            <Text
                                                style={styles.cardSubtitle}
                                                numberOfLines={1}
                                                ellipsizeMode="tail"
                                            >
                                                {element.category}
                                            </Text>
                                            <Text
                                                style={styles.cardSubtitle2}
                                                numberOfLines={1}
                                                ellipsizeMode="tail"
                                            >
                                                {element.shop_address}
                                            </Text>
                                            <Text style={styles.offerLikeCount}>
                                                {element.offer.length}
                                                {"  "}
                                                Offers
                                            </Text>
                                            <View style={styles.line} />
                                            <View
                                                style={{
                                                    flexDirection: "row",
                                                    marginTop: 10,
                                                }}
                                            >
                                                <TouchableOpacity
                                                    style={{
                                                        marginLeft:
                                                            windowWidth * 0.03,
                                                    }}
                                                >
                                                    <View
                                                        style={{
                                                            flexDirection:
                                                                "row",
                                                        }}
                                                    >
                                                        <FontAwesome5
                                                            name="edit"
                                                            color="#2E7D32"
                                                            size={25}
                                                        />
                                                    </View>
                                                </TouchableOpacity>

                                                <TouchableOpacity
                                                    style={{
                                                        marginLeft:
                                                            windowWidth * 0.09,
                                                    }}
                                                >
                                                    <View
                                                        style={{
                                                            flexDirection:
                                                                "row",
                                                        }}
                                                    >
                                                        <FontAwesome5
                                                            name="trash"
                                                            color="#C62828"
                                                            size={25}
                                                        />
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </DoubleClick>
                                </View>
                            ))}
                        </ScrollView>
                    )}
                </View>
            ) : (
                <View>
                    <Image
                        source={require("../../assets/tenor.gif")}
                        style={{ width: 200, height: 200 }}
                        resizeMode="stretch"
                    />
                </View>
            )}
        </View>
    );
};

export default MyShopsCard;
