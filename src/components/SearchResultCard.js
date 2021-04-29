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
import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles/SearchResultCardStyle";
const windowWidth = Dimensions.get("screen").width;
const windowHeight = Dimensions.get("screen").height;

const SearchResultCard = (props) => {


    useEffect(() => {
        console.log(props)
    }, [])

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

    return (
        <View style={styles.container}>
            {props.SearchQueryData != null ? (
                <View>
                    {props.SearchQueryData === "No data" ? (
                        <View style={{ alignItems: "center" }}>
                            <Text
                                style={[
                                    styles.errorMessageText,
                                    { width: windowWidth * 0.9 },
                                ]}
                            >
                                Sorry, your search query don't have any results ! Try with another query.
                            </Text>
                            <Image
                                source={require("../../assets/sad_folder.png")}
                                style={{ width: 200, height: 200 }}
                                resizeMode="stretch"
                            />
                        </View>
                    ) : (

                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            style={{ marginBottom: 60 }}
                            animation="fadeInRightBig"
                        >
                            {props.SearchQueryData.map((element, index) => (

                                <View style={[styles.cardView, { flexDirection: 'row' }]} key={index}>
                                    <View>
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
                                                    "rgba(0,0,0,0.30)",
                                                ]}
                                                style={
                                                    styles.linearGradient
                                                }
                                            >

                                            </LinearGradient>
                                        </ImageBackground>
                                    </View>
                                    <View >
                                        <Text style={styles.cardTitle}>{element.offer_title}</Text>
                                        <Text style={styles.cardSubtitle}>{element.shop_name} </Text>
                                        <Text style={styles.cardSubtitle2}>{dateFormatter(element.post_time)} . {numberWithCommas(element.likes.length)} Likes </Text>
                                    </View>
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
    )
}

export default SearchResultCard