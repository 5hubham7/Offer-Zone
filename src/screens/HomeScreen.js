import React, { useEffect } from "react";
import {
    View,
    Text,
    StatusBar,
    Dimensions,
    TouchableOpacity,
    Platform,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { Searchbar } from "react-native-paper";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign"
import { LinearGradient } from "expo-linear-gradient";
import Modal from "react-native-modal";
import axios from "axios";
import Constants from "expo-constants";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebase } from "../helper/FirebaseConfig";
import styles from "../styles/HomeScreenStyles";
import OfferCard from "../components/OfferCard";
import OfferFilter from "../components/OfferFilter";
import OfferSort from "../components/OfferSort";
import axiosURL from "../helper/AxiosURL";
import SearchResultCard from "../components/SearchResultCard";

const windowWidth = Dimensions.get("screen").width;
const windowHeight = Dimensions.get("screen").height;

const HomeScreen = ({ navigation }) => {

    const { colors } = useTheme();

    const [User, setUser] = React.useState(null);
    const [location, setLocation] = React.useState({
        latitude: "",
        longitude: "",
    });

    const [SearchQuery, setSearchQuery] = React.useState(null)
    const [SearchQueryData, setSearchQueryData] = React.useState(null)
    const [errorMessage, setErrorMessage] = React.useState(null);
    const [isModalVisible, setModalVisible] = React.useState(true);
    const [isModalVisible1, setModalVisible1] = React.useState(true);
    const [emailVerified, setEmailVerified] = React.useState(true);
    const [ToggelSearchAndOffers, setToggelSearchAndOffers] = React.useState(false)
    const [offerLike, setOfferLike] = React.useState({
        1234: false,
    });
    const [currentOffers, setCurrentOffers] = React.useState(null);

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

    const getOffers = (lat, long) => {
        var data = [];
        var options = [];
        axios
            .get(`${axiosURL}/customer/getOffers/${lat}/${long}`)
            // .get(
            //     `${axiosURL}/customer/getOffers/20.042818069458008/74.48754119873047`
            // )
            .then((response) => {
                //console.log(response.data.response);
                if (response.data.status === 200) {
                    if (response.data.response.length > 0) {
                        setCurrentOffers(response.data.response);
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
                    } else {
                        setCurrentOffers("No Offers");
                    }
                }
            }).catch((err) => {
                alert("Network Error ! Please restart application.")
            })
    };

    useEffect(() => {
        (async () => {
            _retrieveData();
            if (Platform.OS === "android" && !Constants.isDevice) {
                setErrorMessage(
                    "Oops, this will not work on Snack in an Android emulator. Try it on your device!"
                );
                return;
            }
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                alert("Permission to access location was denied!");
                return;
            }

            await Location.getCurrentPositionAsync({}).then((data) => {
                //console.log(data)
                setLocation(data.coords);
                getOffers(data.coords.latitude, data.coords.longitude);
            });
        })();
        emailVerification();
    }, []);

    const onSearchClick = () => {
        setToggelSearchAndOffers(true)
        axios.get(`${axiosURL}/customer/getSearchData/${SearchQuery}`)
            .then((response) => {
                //console.log(response.data)
                if (response.data.status === 200) {
                    if (response.data.response.length > 0)
                        setSearchQueryData(response.data.response)
                    else
                        setSearchQueryData("No data")
                }

            }).catch((err) => {
                alert("Network Error ! Please restart application.")
            });

    }
    return (
        <View style={styles.container}>
            <View
                style={{
                    width: "100%",
                    backgroundColor: "#006064",
                    height: 50,
                }}
            >
                <Searchbar
                    placeholder="Search Offers & Shop..."
                    style={{
                        width: windowWidth * 0.9,
                        height: 40,
                        marginLeft: "auto",
                        marginRight: "auto",
                        borderRadius: 10,
                    }}
                    value={SearchQuery}
                    onChangeText={(text) => {
                        setSearchQuery(text)
                    }}
                    onSubmitEditing={() => {
                        onSearchClick()
                    }}
                    onIconPress={() => { console.log("ico press") }}
                    clearButtonMode="while-editing"
                    clearIcon={() => {
                        return (
                            <AntDesign
                                name="close"
                                size={25}
                                color={colors.text}
                                onPress={() => {
                                    //console.log("clr press")
                                    setSearchQuery(null)
                                    setToggelSearchAndOffers(false)
                                    setSearchQueryData(null)
                                }}
                            />
                        )
                    }}
                />
            </View>
            <View style={styles.footerNav}>
                <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                        onPress={toggleModal}
                        style={styles.footerBtn}
                    >
                        <View style={{ flexDirection: "row" }}>
                            <FontAwesome name="filter" size={20} color="#fff" />
                        </View>
                        <Text style={{ color: "#fff", fontSize: 16 }}>
                            FILTER
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.btnSaperator}></Text>
                    <TouchableOpacity
                        onPress={toggleModal1}
                        style={styles.footerBtn}
                    >
                        <View style={{ flexDirection: "row" }}>
                            <FontAwesome name="sort" size={20} color="#fff" />
                        </View>
                        <Text style={{ color: "#fff", fontSize: 16 }}>
                            SORT
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {ToggelSearchAndOffers ?
                <SearchResultCard SearchQueryData={SearchQueryData} />
                :
                <OfferCard
                    offerData={currentOffers}
                    getOffers={getOffers}
                    navigation={navigation}
                    location={location}
                    User={User}
                />
            }

            <OfferFilter state={isModalVisible} toggleModal={toggleModal} />
            <OfferSort state={isModalVisible1} toggleModal={toggleModal1} />

            <Modal
                isVisible={!emailVerified}
                animationIn="slideInUp"
                animationOut="bounceOut"
            >
                <View
                    style={{
                        backgroundColor: "#fff",
                        height: 230,
                        borderRadius: 20,
                    }}
                >
                    <LinearGradient
                        colors={["#0054E9", "#018CF0", "#00BEF6"]}
                        style={{ height: 230, borderRadius: 20 }}
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
                            Your email is not verified!
                        </Text>
                        <Text
                            style={{
                                fontSize: 16,
                                textAlign: "center",
                                color: "#fff",
                                margin: 10,
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

export default HomeScreen;
