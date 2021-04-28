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
                        <Image
                            source={{
                                uri:
                                    "https://img.freepik.com/free-vector/special-offer-sale-discount-banner_180786-46.jpg?size=626&ext=jpg",
                            }}
                            style={styles.cardImage}
                        />
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.cardTitle}>Summer Sale Flat 40 % Off</Text>
                        <Text style={styles.cardSubtitle}>Bhambare Cloth Store</Text>
                        <Text style={styles.cardSubtitle2}>10 days 2 hr ago       </Text>
                    </View>

                </View>
            </ScrollView>

        </View>
    )

}

export default SearchResultCard