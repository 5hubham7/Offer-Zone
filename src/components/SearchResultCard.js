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
import * as Animatable from "react-native-animatable";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import styles from "../styles/SearchResultCardStyle";
import axiosURL from "../helper/AxiosURL";
import { AuthContext } from "../components/context/Store";

const SearchResultCard = (props) => {

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ marginBottom: 60 }}
                animation="fadeInRightBig"
            >
                <View style={[styles.cardView, { flexDirection: 'row' }]}>
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
                        <Text style={styles.cardTitle}>Summer Sale Flat 40 % Off</Text>
                        <Text style={styles.cardSubtitle}>Bhambare Cloth Store</Text>
                        <Text style={styles.cardSubtitle2}>10 days 2 hr ago . 1000 Likes </Text>
                    </View>
                </View>
            </ScrollView>

        </View>
    )

}

export default SearchResultCard