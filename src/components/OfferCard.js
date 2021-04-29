import React, { useEffect } from "react";
import {
    RefreshControl,
    Share,
    View,
    Text,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    ImageBackground,
    ToastAndroid,
    Image,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import DoubleClick from "react-native-double-tap";
import * as Animatable from "react-native-animatable";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import styles from "../styles/CardStyles";
import axiosURL from "../helper/AxiosURL";
import { AuthContext } from "../components/context/Store";

const windowWidth = Dimensions.get("screen").width;
const windowHeight = Dimensions.get("screen").height;

const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
};

const OfferCard = (props) => {
    const [refreshing, setRefreshing] = React.useState(false);
    const [likeDoubleTap, setLikeDobleTap] = React.useState(null);
    const [saveList, setSaveList] = React.useState([]);
    const [offerDislike, setofferDislike] = React.useState(null);
    const { startLoading, stopLoading } = React.useContext(AuthContext);
    const [User, setUser] = React.useState(null);

    const setData = () => {
        console.log("hello");
    };

    const _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem("userToken");
            if (value !== null) {
                // We have data!!
                //console.log(value);
                setUser(value);
                return value;
            }
        } catch (error) {
            // Error retrieving data
        }
    };

    const notifyMessage = (msg) => {
        if (Platform.OS === "android") {
            ToastAndroid.show(msg, ToastAndroid.SHORT);
        } else {
            AlertIOS.alert(msg);
        }
    };

    useEffect(() => {
        _retrieveData().then((response) => {
            //console.log(response)
            setUser(response);
            getUserData(response);
        });
    }, []);

    const dateFormatter = (postdate) => {
        const today = new Date();
        const endDate = new Date(postdate);
        const days = parseInt((today - endDate) / (1000 * 60 * 60 * 24));
        const hours = parseInt(
            (Math.abs(today - endDate) / (1000 * 60 * 60)) % 24
        );
        const minutes = parseInt(
            (Math.abs(endDate.getTime() - today.getTime()) / (1000 * 60)) % 60
        );
        const seconds = parseInt(
            (Math.abs(endDate.getTime() - today.getTime()) / 1000) % 60
        );
        if (hours === 0 && days <= 0) return `${minutes} min ${seconds} sec`;
        else if (hours >= 1 && days <= 0) return `${hours} hrs ${minutes} min`;
        else if (hours >= 0 && days >= 1) return `${days} days ${hours} hrs`;
        else return `${seconds} sec`;
    };

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const onRefresh = React.useCallback((latitude, longitude, user) => {
        setRefreshing(true);
        //console.log(latitude, longitude)
        props.getOffers(latitude, longitude);
        getUserData(user);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const onDoubleTap = React.useCallback(
        (offer_id, User, latitude, longitude) => {
            setLikeDobleTap(offer_id);
            like(offer_id, User, latitude, longitude);
            wait(2000).then(() => setLikeDobleTap(null));
        },
        []
    );

    const like = (offer_id, cust_id, latitude, longitude) => {
        axios
            .post(`${axiosURL}/customer/like/${offer_id}/${cust_id}`)
            .then((response) => {
                if (response.data.status === 200) {
                    props.getOffers(latitude, longitude);
                }
            });
    };

    const getUserData = (user) => {
        //console.log(User)
        axios
            .get(`${axiosURL}/customer/getCustomerData/${user}`)
            .then((response) => {
                //console.log(response.data.response)
                if (response.data.status === 200) {
                    setSaveList(response.data.response.saveList);
                }
            });
    };

    const disLike = (offer_id, cust_id, latitude, longitude) => {
        setofferDislike(offer_id);
        wait(2000).then(() => setofferDislike(null));
        axios
            .post(`${axiosURL}/customer/disLike/${offer_id}/${cust_id}`)
            .then((response) => {
                if (response.data.status === 200) {
                    props.getOffers(latitude, longitude);
                }
            });
    };

    const saveOffer = (offer_id, user) => {
        axios
            .post(`${axiosURL}/customer/saveList/${offer_id}/${User}`)
            .then((response) => {
                if (response.data.status === 200) {
                    getUserData(user);
                    notifyMessage("Offer Added to save list.");
                }
            });
    };

    const removeOffer = (offer_id, user) => {
        axios
            .post(`${axiosURL}/customer/removeList/${offer_id}/${User}`)
            .then((response) => {
                if (response.data.status === 200) {
                    getUserData(user);
                    notifyMessage("Offer Deleted from save list.");
                }
            });
    };

    const share = (data) => {
        var shareOption = {
            message: `This is ${data} offer`,
        };
        try {
            const ShareResponse = Share.share(shareOption);
        } catch (error) {
            console.log(error);
        }
    };

    const onSingleTap = (offer_id) => {
        //console.log(offer_id)
        startLoading();
        axios
            .get(`${axiosURL}/customer/getOffersById/${offer_id}`)
            .then((response) => {
                if (response.data.status === 200) {
                    //setOfferDetails(response.data.response)
                    stopLoading();
                    props.navigation.navigate("OfferDetails", {
                        offerData: response.data.response,
                        location: props.location,
                    });
                }
            })
            .catch((error) => {
                stopLoading();
                alert(error);
            });
    };

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
                                        onRefresh(
                                            props.location.latitude,
                                            props.location.longitude,
                                            props.User
                                        );
                                    }}
                                    colors={["#fff", "red", "yellow"]}
                                    progressBackgroundColor={"#000"}
                                />
                            }
                            animation="fadeInRightBig"
                            style={{ marginBottom: 60 }}
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
                                        onRefresh(
                                            props.location.latitude,
                                            props.location.longitude,
                                            props.User
                                        );
                                    }}
                                    colors={["#fff", "red", "yellow"]}
                                    progressBackgroundColor={"#000"}
                                />
                            }
                            style={{ marginBottom: 60 }}
                            animation="fadeInRightBig"
                        >
                            {props.offerData.map((element, index) => (
                                <View
                                    style={styles.cardView}
                                    elevation={3}
                                    key={index}
                                >
                                    <DoubleClick
                                        singleTap={() => {
                                            onSingleTap(element.offer_id);
                                        }}
                                        doubleTap={() => {
                                            onDoubleTap(
                                                element.offer_id,
                                                User,
                                                props.location.latitude,
                                                props.location.longitude
                                            );
                                        }}
                                        delay={500}
                                    >
                                        <View style={styles.cardImageView}>
                                            <ImageBackground
                                                source={{
                                                    uri:
                                                        "https://img.freepik.com/free-vector/special-offer-sale-discount-banner_180786-46.jpg?size=626&ext=jpg",
                                                }}
                                                style={styles.cardImage}
                                            >
                                                <LinearGradient
                                                    locations={[0, 0]}
                                                    colors={[
                                                        "rgba(0,0,0,0.00)",
                                                        "rgba(0,0,0,0.70)",
                                                    ]}
                                                    style={
                                                        styles.linearGradient
                                                    }
                                                >
                                                    <Text
                                                        style={
                                                            styles.cardImageTitle
                                                        }
                                                    >
                                                        {element.offer_title}
                                                    </Text>
                                                </LinearGradient>
                                            </ImageBackground>
                                        </View>
                                        {likeDoubleTap == element.offer_id ? (
                                            <Animatable.View
                                                animation="bounceIn"
                                                style={{ alignItems: "center" }}
                                            >
                                                <FontAwesome
                                                    name="heart"
                                                    color="#FF0000"
                                                    size={windowHeight * 0.1}
                                                    style={{
                                                        position: "absolute",
                                                        marginTop: -30,
                                                    }}
                                                />
                                            </Animatable.View>
                                        ) : null}
                                        {offerDislike == element.offer_id ? (
                                            <Animatable.View
                                                animation="bounceIn"
                                                style={{ alignItems: "center" }}
                                            >
                                                <FontAwesome5
                                                    name="heart-broken"
                                                    color="#FF0000"
                                                    size={windowHeight * 0.1}
                                                    style={{
                                                        position: "absolute",
                                                        marginTop: -30,
                                                    }}
                                                />
                                            </Animatable.View>
                                        ) : null}
                                        <View style={styles.cardData}>
                                            <Text
                                                style={styles.cardTitle}
                                                numberOfLines={1}
                                                ellipsizeMode="tail"
                                            >
                                                {element.offer_title}
                                            </Text>
                                            <Text
                                                style={styles.cardSubtitle}
                                                numberOfLines={1}
                                                ellipsizeMode="tail"
                                            >
                                                {element.details}
                                            </Text>
                                            <Text style={styles.cardSubtitle2}>
                                                {dateFormatter(
                                                    element.post_time
                                                )}{" "}
                                                ago
                                            </Text>
                                            <Text style={styles.cardFooter}>
                                                {numberWithCommas(
                                                    element.likes.length
                                                )}
                                                {"  "}
                                                Likes
                                            </Text>
                                            <View style={styles.line} />
                                            <View
                                                style={{
                                                    flexDirection: "row",
                                                    marginTop: 10,
                                                }}
                                            >
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        element.likes.includes(
                                                            User
                                                        )
                                                            ? disLike(
                                                                element.offer_id,
                                                                User,
                                                                props.location
                                                                    .latitude,
                                                                props.location
                                                                    .longitude
                                                            )
                                                            : like(
                                                                element.offer_id,
                                                                User,
                                                                props.location
                                                                    .latitude,
                                                                props.location
                                                                    .longitude
                                                            );
                                                    }}
                                                    style={{
                                                        marginLeft:
                                                            windowWidth * 0.03,
                                                    }}
                                                >
                                                    {element.likes.includes(
                                                        User
                                                    ) ? (
                                                        <View
                                                            style={{
                                                                flexDirection:
                                                                    "row",
                                                            }}
                                                        >
                                                            <FontAwesome
                                                                name="heart"
                                                                color="#F44336"
                                                                size={25}
                                                            />
                                                        </View>
                                                    ) : (
                                                        <View
                                                            style={{
                                                                flexDirection:
                                                                    "row",
                                                            }}
                                                        >
                                                            <FontAwesome
                                                                name="heart-o"
                                                                color="#000"
                                                                size={25}
                                                            />
                                                        </View>
                                                    )}
                                                </TouchableOpacity>

                                                <TouchableOpacity
                                                    onPress={() => {
                                                        saveList.includes(
                                                            element.offer_id
                                                        )
                                                            ? removeOffer(
                                                                element.offer_id,
                                                                props.User
                                                            )
                                                            : saveOffer(
                                                                element.offer_id,
                                                                props.User
                                                            );
                                                    }}
                                                    style={{
                                                        marginLeft:
                                                            windowWidth * 0.09,
                                                    }}
                                                >
                                                    {saveList.includes(
                                                        element.offer_id
                                                    ) ? (
                                                        <View
                                                            style={{
                                                                flexDirection:
                                                                    "row",
                                                            }}
                                                        >
                                                            <MaterialCommunityIcons
                                                                name="checkbox-multiple-marked"
                                                                color="#2E7D32"
                                                                size={25}
                                                            />
                                                        </View>
                                                    ) : (
                                                        <View
                                                            style={{
                                                                flexDirection:
                                                                    "row",
                                                            }}
                                                        >
                                                            <MaterialCommunityIcons
                                                                name="plus-box-multiple"
                                                                color="#000"
                                                                size={25}
                                                            />
                                                        </View>
                                                    )}
                                                </TouchableOpacity>

                                                <TouchableOpacity
                                                    onPress={() => {
                                                        share("First");
                                                    }}
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
                                                            name="share-alt"
                                                            color="#0277BD"
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

export default OfferCard;
