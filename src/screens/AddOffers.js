import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    TextInput,
    ScrollView,
} from "react-native";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import { LinearGradient } from "expo-linear-gradient";
import * as firebase from "firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthContext } from "../components/context/Store";
import styles from "../styles/AddOffersStyles";

try {
    firebase.initializeApp({
        apiKey: "AIzaSyCzx4aZ64zF4Ocicz_fluGCb5zrLwrOtqU",
        authDomain: "offeer-zone.firebaseapp.com",
        databaseURL: "https://offeer-zone-default-rtdb.firebaseio.com",
        projectId: "offeer-zone",
        storageBucket: "offeer-zone.appspot.com",
        messagingSenderId: "946405576296",
        appId: "1:946405576296:web:801d05fd337ac8e4f3b5dd",
        measurementId: "G-J3L3F4N1BX",
    });
} catch (err) {}

const AddOffers = ({ navigation, route }) => {
    const [offerDetails, setOfferDetails] = useState({
        shop_name: "",
        offer_title: "",
        details: "",
        image_url: "",
        likes: [],
        post_time: "",
        start_date: "",
        end_date: "",
        status: "",
        uid: "",
    });

    const { startLoading, stopLoading } = React.useContext(AuthContext);

    const handelShopNameChange = (val) => {
        setOfferDetails({ ...offerDetails, shop_name: val });
    };

    const handelOfferTitleChange = (val) => {
        setOfferDetails({ ...offerDetails, offer_title: val });
    };

    const handelDetailsChange = (val) => {
        setOfferDetails({ ...offerDetails, details: val });
    };

    const handelImageURLChange = (val) => {
        setOfferDetails({ ...offerDetails, image_url: val });
    };

    const handelStartDateChange = (val) => {
        setOfferDetails({ ...offerDetails, start_date: val });
    };

    const handelEndDateChange = (val) => {
        setOfferDetails({ ...offerDetails, end_date: val });
    };

    const onAddOfferPress = async () => {
        alert("Add offer clicked!");
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#000" barStyle="light-content" />

            <View style={styles.header}>
                <Animatable.View animation="fadeInLeftBig" duration={1500}>
                    <Text style={styles.headerText}>Add Offer</Text>
                </Animatable.View>
            </View>
            <Animatable.View
                animation="fadeInLeftBig"
                duration={1500}
                style={[
                    styles.footer,
                    {
                        backgroundColor: "#fff",
                    },
                ]}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.inputBox}>
                        <View style={styles.action}>
                            <TextInput
                                placeholder="Shop Name"
                                placeholderTextColor="#666666"
                                style={[
                                    styles.textInput,
                                    {
                                        color: "#000",
                                    },
                                ]}
                                autoCapitalize="none"
                                onChangeText={(val) =>
                                    handelShopNameChange(val)
                                }
                            />
                        </View>
                    </View>

                    <View style={styles.inputBox}>
                        <View style={styles.action}>
                            <TextInput
                                placeholder="Offer Title"
                                placeholderTextColor="#666666"
                                style={[
                                    styles.textInput,
                                    {
                                        color: "#000",
                                    },
                                ]}
                                autoCapitalize="none"
                                onChangeText={(val) =>
                                    handelOfferTitleChange(val)
                                }
                            />
                        </View>
                    </View>

                    <View style={styles.inputBox}>
                        <View style={styles.action}>
                            <TextInput
                                placeholder="Details"
                                placeholderTextColor="#666666"
                                style={[
                                    styles.textInput,
                                    {
                                        color: "#000",
                                    },
                                ]}
                                autoCapitalize="none"
                                onChangeText={(val) => handelDetailsChange(val)}
                            />
                        </View>
                    </View>

                    <View style={styles.inputBox}>
                        <View style={styles.action}>
                            <TextInput
                                placeholder="Image URL"
                                placeholderTextColor="#666666"
                                style={[
                                    styles.textInput,
                                    {
                                        color: "#000",
                                    },
                                ]}
                                autoCapitalize="none"
                                onChangeText={(val) =>
                                    handelImageURLChange(val)
                                }
                            />
                        </View>
                    </View>

                    <View style={styles.inputBox}>
                        <View style={styles.action}>
                            <TextInput
                                placeholder="Start Date"
                                placeholderTextColor="#666666"
                                style={[
                                    styles.textInput,
                                    {
                                        color: "#000",
                                    },
                                ]}
                                autoCapitalize="none"
                                onChangeText={(val) =>
                                    handelStartDateChange(val)
                                }
                            />
                        </View>
                    </View>

                    <View style={styles.inputBox}>
                        <View style={styles.action}>
                            <TextInput
                                placeholder="End Date"
                                placeholderTextColor="#666666"
                                style={[
                                    styles.textInput,
                                    {
                                        color: "#000",
                                    },
                                ]}
                                autoCapitalize="none"
                                onChangeText={(val) => handelEndDateChange(val)}
                            />
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={() => {
                            onAddOfferPress();
                        }}
                    >
                        <LinearGradient
                            colors={["#4CAF50", "#388E3C", "#1B5E20"]}
                            style={[styles.addOfferButtonBG]}
                        >
                            <Text style={styles.addOfferButtonText}>
                                <Entypo
                                    name="add-to-list"
                                    color="#fff"
                                    size={25}
                                />
                                {"  "}
                                Add Offer
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </ScrollView>
            </Animatable.View>
        </View>
    );
};

export default AddOffers;
