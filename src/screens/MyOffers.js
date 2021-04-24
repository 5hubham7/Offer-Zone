import React, { useEffect } from "react";
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    Platform,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { Searchbar } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import Modal from "react-native-modal";
import axios from "axios";
import Constants from "expo-constants";
import * as Location from "expo-location";

import { firebase } from "../helper/FirebaseConfig";
import styles from "../styles/HomeScreenStyles";
import OfferCard from "../components/OfferCard";
import axiosURL from "../helper/AxiosURL";

const windowWidth = Dimensions.get("screen").width;
const windowHeight = Dimensions.get("screen").height;

const MyOffers = ({ navigation }) => {
    const { colors } = useTheme();

    const [location, setLocation] = React.useState({
        latitude: "",
        longitude: "",
    });
    const [errorMessage, setErrorMessage] = React.useState(null);
    const [isModalVisible, setModalVisible] = React.useState(true);
    const [isModalVisible1, setModalVisible1] = React.useState(true);
    const [emailVerified, setEmailVerified] = React.useState(false);
    const [offerLike, setOfferLike] = React.useState({
        1234: false,
    });
    const [myOffers, setMyOffers] = React.useState([
        {
            data: "demo",
            likes: [1, 2, 3, 4],
        },
    ]);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const toggleModal1 = () => {
        setModalVisible1(!isModalVisible1);
    };

    const emailVerification = () => {
        firebase.auth().onAuthStateChanged(function (user) {
            //console.log(user)
            if (user && user.email !== null) {
                setEmailVerified(user.emailVerified);
                if (user.emailVerified === false) {
                    user.sendEmailVerification()
                        .then(function (res) {
                            console.log(res);
                        })
                        .catch(function (error) {
                            alert(error);
                        });
                }
            } else {
                //console.log("no current user")
                setEmailVerified(true);
            }
        });
    };

    const getMyOffers = (seller_id) => {
        var data = [];
        var options = [];
        axios
            // .get(
            //     `${axiosURL}/customer/getOffers/20.042818069458008/74.48754119873047`
            // )
            .get(`${axiosURL}/getMyOffers/seller_id`)
            .then((response) => {
                if (response.data.status === 200) {
                    setMyOffers(response.data.response);
                    response.data.response.map((element) => {
                        data.push(element.offer_id);
                        options.push(false);
                        //setOfferLike({ ...data })
                    });

                    var result = options.reduce(function (
                        result,
                        field,
                        index
                    ) {
                        result[data[index]] = field;
                        return result;
                    },
                    {});
                    //console.log("final result", result)
                    setOfferLike({ ...result });
                }
            });
    };

    const theme = useTheme();

    useEffect(() => {
        (async () => {
            if (Platform.OS === "android" && !Constants.isDevice) {
                setErrorMessage(
                    "Oops, this will not work on Snack in an Android emulator. Try it on your device!"
                );
                return;
            }
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMessage("Permission to access location was denied");
                return;
            }

            await Location.getCurrentPositionAsync({}).then((data) => {
                //console.log(data)
                setLocation(data.coords);
                getMyOffers(data.coords.latitude, data.coords.longitude);
            });
        })();
        emailVerification();
    }, []);

    return (
        <View style={styles.container}>
            <Animatable.View
                style={{ width: "100%", backgroundColor: "#000", height: 40 }}
                animation="fadeInRight"
            >
                <Searchbar
                    placeholder="Search here..."
                    style={{
                        width: windowWidth * 0.9,
                        height: 35,
                        marginLeft: "auto",
                        marginRight: "auto",
                        borderRadius: 10,
                    }}
                    //onChangeText={(text) => (alert(text))}
                    clearButtonMode="while-editing"
                />
            </Animatable.View>

            <OfferCard
                offerData={myOffers}
                getOffers={getMyOffers}
                navigation={navigation}
                location={location}
            />
            <Modal
                isVisible={!emailVerified}
                animationIn="slideInUp"
                animationOut="bounceOut"
            >
                <View
                    style={{
                        backgroundColor: "#fff",
                        height: windowHeight * 0.33,
                    }}
                >
                    <LinearGradient
                        colors={["#0054E9", "#018CF0", "#00BEF6"]}
                        style={{ height: windowHeight * 0.33 }}
                    >
                        <Text
                            style={{
                                fontSize: 25,
                                fontWeight: "bold",
                                textAlign: "center",
                                marginTop: 20,
                                color: "yellow",
                            }}
                        >
                            Your Email Is Not Verified !
                        </Text>
                        <Text
                            style={{
                                fontSize: 16,
                                textAlign: "center",
                                color: "#fff",
                                marginTop: 10,
                            }}
                        >
                            To verify your email, the verification link is send
                            to youe email. Verify it as soon as possible to use
                            the app.
                        </Text>
                        <TouchableOpacity
                            style={{
                                backgroundColor: "#000",
                                width: "50%",
                                height: 40,
                                borderTopStartRadius: 20,
                                marginLeft: windowWidth / 4.5,
                                marginTop: 20,
                            }}
                            onPress={() => {
                                setEmailVerified(true);
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: "bold",
                                    color: "#fff",
                                    textAlign: "center",
                                    marginTop: 7,
                                }}
                            >
                                Close
                            </Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </Modal>
        </View>
    );
};

export default MyOffers;
