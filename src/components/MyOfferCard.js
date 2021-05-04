import React, { useEffect } from "react";
import {
    RefreshControl,
    View,
    Text,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    ImageBackground,
    Image,
} from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useTheme } from "@react-navigation/native";
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

const MyOfferCard = (props) => {
    const { colors } = useTheme();
    const [refreshing, setRefreshing] = React.useState(false);
    const [likeDoubleTap, setLikeDobleTap] = React.useState(null);
    const [saveList, setSaveList] = React.useState([]);
    const [offerDislike, setofferDislike] = React.useState(null);
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
        startLoading();
        axios
            .get(`${axiosURL}/customer/getOffersById/${offer_id}`)
            .then((response) => {
                if (response.data.status === 200) {
                    //setOfferDetails(response.data.response)
                    stopLoading();
                    props.navigation.navigate("MyOfferDetails", {
                        offerData: response.data.response,
                    });
                }
            })
            .catch((error) => {
                stopLoading();
                alert(error);
            });
    };

    useEffect(() => {
        _retrieveData().then((response) => {
            setUserID(response);
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

    const onRefresh = React.useCallback((seller_id) => {
        setRefreshing(true);
        props.getMyOffers(seller_id);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    return (
        <View style={styles.container}>
            {props.offerData !== null ? (
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
                            style={{ marginBottom: 20 }}
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
                                    Sorry, you haven't posted any offers!
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
                            style={{ marginBottom: 10, marginTop: 5 }}
                            animation="fadeInRightBig"
                        >
                            {props.offerData.map((element, index) => (
                                <View
                                    style={[
                                        styles.cardView,
                                        { backgroundColor: colors.offerCard },
                                    ]}
                                    elevation={3}
                                    key={index}
                                >
                                    <DoubleClick
                                        singleTap={() => {
                                            onSingleTap(element.offer_id);
                                        }}
                                        delay={500}
                                    >
                                        <View style={styles.cardImageView}>
                                            <ImageBackground
                                                source={{
                                                    uri: element.image_url,
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
                                                style={[
                                                    styles.cardTitle,
                                                    { color: colors.text },
                                                ]}
                                                numberOfLines={1}
                                                ellipsizeMode="tail"
                                            >
                                                {element.offer_title}
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.cardSubtitle,
                                                    { color: colors.text },
                                                ]}
                                                numberOfLines={1}
                                                ellipsizeMode="tail"
                                            >
                                                {element.details}
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.cardSubtitle2,
                                                    { color: colors.subtext },
                                                ]}
                                            >
                                                {dateFormatter(
                                                    element.post_time
                                                )}{" "}
                                                ago
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.cardFooter,
                                                    { color: colors.text },
                                                ]}
                                            >
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
                                                            color={
                                                                colors.editIcon
                                                            }
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
                                                            color={
                                                                colors.deleteIcon
                                                            }
                                                            size={25}
                                                            onPress={() => {
                                                                props.deleteOfferHandler(
                                                                    element.offer_id
                                                                );
                                                            }}
                                                        />
                                                    </View>
                                                </TouchableOpacity>

                                                <TouchableOpacity
                                                    style={{
                                                        marginLeft:
                                                            windowWidth * 0.11,
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
                                                            color={
                                                                colors.shareIcon
                                                            }
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

export default MyOfferCard;
