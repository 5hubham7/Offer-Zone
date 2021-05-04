import React from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import Entypo from "react-native-vector-icons/Entypo";
import Icon from "react-native-vector-icons/MaterialIcons";
import dateFormat from "dateformat";
import { useTheme } from "react-native-paper";

import styles from "../styles/OfferDetailsStyles";

const MyOfferDetails = ({ navigation, route }) => {
    const { colors } = useTheme();
    const [HideDetails, setHideDetails] = React.useState(false);
    const [HideShopDetails, setHideShopDetails] = React.useState(false);
    const dateFormatter = (postdate) => {
        //console.log(route.params.offerData)
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

    return (
        <View style={styles.container}>
            {route.params.offerData !== null ? (
                <View>
                    <ImageBackground
                        source={{
                            uri: route.params.offerData.offer.image_url,
                        }}
                        style={styles.backgroundImage}
                    >
                        <LinearGradient
                            locations={[0, 0]}
                            colors={["rgba(0,0,0,0.00)", "rgba(0,0,0,0.70)"]}
                            style={styles.linearGradient}
                        >
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                            >
                                <Animatable.View animation="fadeIn">
                                    <FontAwesome
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
                            <Text style={styles.imageTitle}>
                                {route.params.offerData.offer.offer_title}
                            </Text>
                        </LinearGradient>
                    </ImageBackground>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View>
                            <Text
                                style={[
                                    styles.offerTitle,
                                    ,
                                    { color: colors.text },
                                ]}
                            >
                                {route.params.offerData.offer.offer_title}
                            </Text>
                            <Text
                                style={[
                                    styles.offerDetails,
                                    { color: colors.text },
                                ]}
                            >
                                {route.params.offerData.offer.details}
                            </Text>
                        </View>
                        <View style={styles.lineStyle} />
                        <View>
                            <Text
                                style={[
                                    styles.offerSubtitle,
                                    { color: colors.text },
                                ]}
                            >
                                <Icon name="local-offer" size={18} /> {""}
                                Offer Info
                            </Text>
                            <View style={{ flexDirection: "row" }}>
                                <Text
                                    style={[
                                        styles.offerDetails,
                                        { color: "#00BB84" },
                                    ]}
                                >
                                    Status:{" "}
                                </Text>
                                <Text
                                    style={[
                                        styles.offerDetails,
                                        {
                                            marginLeft: "-3%",
                                            fontWeight: "bold",
                                            width: 100,
                                            color: colors.text,
                                        },
                                    ]}
                                >
                                    {route.params.offerData.offer.status}
                                </Text>
                            </View>
                            {HideDetails ? (
                                <View>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text
                                            style={[
                                                styles.offerDetails,
                                                { color: "green" },
                                            ]}
                                        >
                                            Start Date:{" "}
                                        </Text>
                                        <Text
                                            style={[
                                                styles.offerDetails,
                                                {
                                                    marginLeft: "-3%",
                                                    color: colors.text,
                                                },
                                            ]}
                                        >
                                            {dateFormat(
                                                route.params.offerData.offer
                                                    .start_date,
                                                "dddd, mmmm dS, yyyy"
                                            )}
                                        </Text>
                                    </View>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text
                                            style={[
                                                styles.offerDetails,
                                                { color: "red" },
                                            ]}
                                        >
                                            End Date:{" "}
                                        </Text>
                                        <Text
                                            style={[
                                                styles.offerDetails,
                                                {
                                                    marginLeft: "-3%",
                                                    color: colors.text,
                                                },
                                            ]}
                                        >
                                            {dateFormat(
                                                route.params.offerData.offer
                                                    .end_date,
                                                "dddd, mmmm dS, yyyy"
                                            )}
                                        </Text>
                                    </View>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text
                                            style={[
                                                styles.offerDetails,
                                                { color: "#0063D6" },
                                            ]}
                                        >
                                            Post Time:{" "}
                                        </Text>
                                        <Text
                                            style={[
                                                styles.offerTime,
                                                {
                                                    marginLeft: "-3%",
                                                    color: colors.text,
                                                },
                                            ]}
                                        >
                                            {dateFormatter(
                                                route.params.offerData.offer
                                                    .post_time
                                            )}{" "}
                                            ago
                                        </Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setHideDetails(!HideDetails);
                                        }}
                                    >
                                        <Text
                                            style={[
                                                styles.showMoreLink,
                                                { color: colors.link },
                                            ]}
                                        >
                                            Less Info
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <TouchableOpacity
                                    onPress={() => {
                                        setHideDetails(!HideDetails);
                                    }}
                                >
                                    <Text
                                        style={[
                                            styles.showMoreLink,
                                            { color: colors.link },
                                        ]}
                                    >
                                        More Info
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                        <View style={styles.lineStyle} />
                        <View style={{ marginBottom: 20 }}>
                            <Text
                                style={[
                                    styles.offerSubtitle,
                                    { color: colors.text },
                                ]}
                            >
                                <Entypo name="shop" size={18} /> Shop Info
                            </Text>
                            <View>
                                <Text
                                    style={[
                                        styles.offerDetails,
                                        { color: colors.text },
                                    ]}
                                >
                                    Name:{" "}
                                    <Text
                                        style={[
                                            styles.offerDetails,
                                            {
                                                textAlign: "justify",
                                                color: colors.text,
                                            },
                                        ]}
                                        lineBreakMode="tail"
                                    >
                                        {route.params.offerData.shop_name}
                                    </Text>
                                </Text>
                            </View>
                            <View>
                                <Text
                                    style={[
                                        styles.offerDetails,
                                        { color: colors.text },
                                    ]}
                                >
                                    Address:{" "}
                                    <Text
                                        style={[
                                            styles.offerDetails,
                                            {
                                                textAlign: "justify",
                                                color: colors.text,
                                            },
                                        ]}
                                        lineBreakMode="tail"
                                    >
                                        {route.params.offerData.shop_address},{" "}
                                        {route.params.offerData.city},{" "}
                                        {route.params.offerData.state},{" "}
                                        {route.params.offerData.country}
                                    </Text>
                                </Text>
                            </View>
                            {HideShopDetails ? (
                                <View>
                                    <View>
                                        <Text
                                            style={[
                                                styles.offerDetails,
                                                { color: colors.text },
                                            ]}
                                        >
                                            Owner Name:{" "}
                                            <Text
                                                style={[
                                                    styles.offerDetails,
                                                    {
                                                        textAlign: "justify",
                                                        color: colors.text,
                                                    },
                                                ]}
                                                lineBreakMode="tail"
                                            >
                                                {route.params.offerData.name}
                                            </Text>
                                        </Text>
                                    </View>
                                    <View>
                                        <Text
                                            style={[
                                                styles.offerDetails,
                                                { color: colors.text },
                                            ]}
                                        >
                                            Phone:{" "}
                                            <Text
                                                style={[
                                                    styles.offerDetails,
                                                    {
                                                        textAlign: "justify",
                                                        color: colors.text,
                                                    },
                                                ]}
                                                lineBreakMode="tail"
                                            >
                                                {route.params.offerData.phone}
                                            </Text>
                                        </Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setHideShopDetails(
                                                !HideShopDetails
                                            );
                                        }}
                                    >
                                        <Text
                                            style={[
                                                styles.showMoreLink,
                                                { color: colors.link },
                                            ]}
                                        >
                                            Less Info
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <TouchableOpacity
                                    onPress={() => {
                                        setHideShopDetails(!HideShopDetails);
                                    }}
                                >
                                    <Text
                                        style={[
                                            styles.showMoreLink,
                                            { color: colors.link },
                                        ]}
                                    >
                                        More Info
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </ScrollView>
                </View>
            ) : null
            }
        </View >
    );
};

export default MyOfferDetails;
