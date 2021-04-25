import React, { useEffect } from "react";
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    Platform,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/HomeScreenStyles";
import OfferCard from "../components/OfferCard";
import axiosURL from "../helper/AxiosURL";

const SaveOffers = ({ navigation }) => {
    const { colors } = useTheme();

    const [User, setUser] = React.useState(null);

    const [errorMessage, setErrorMessage] = React.useState(null);
    const [isModalVisible, setModalVisible] = React.useState(true);
    const [isModalVisible1, setModalVisible1] = React.useState(true);
    const [emailVerified, setEmailVerified] = React.useState(true);
    const [offerLike, setOfferLike] = React.useState({
        1234: false,
    });

    const [currentOffers, setCurrentOffers] = React.useState([
        {
            data: "demo",
            likes: [1, 2, 3, 4],
        },
    ]);


    const _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem("userToken");
            if (value !== null) {
                // We have data!!
                //console.log(value);
                setUser(value)
                getSaveOffers(value)
            }
        } catch (error) {
            // Error retrieving data
        }
    };

    const getSaveOffers = (user) => {
        var data = [];
        var options = [];
        axios
            .get(`${axiosURL}/customer/getSaveOffers/${user}`)
            // .get(
            //     `${axiosURL}/customer/getOffers/20.042818069458008/74.48754119873047`
            // )
            .then((response) => {
                //console.log(response.data.response);
                if (response.data.status === 200) {
                    setCurrentOffers(response.data.response);
                    response.data.response.map((element) => {
                        data.push(element.offer_id);
                        options.push(false);
                        //setOfferLike({ ...data })
                    });
                    //console.log("final result", result)
                    setOfferLike({ ...result });
                }
            });
    };

    const theme = useTheme();

    useEffect(() => {
        _retrieveData()
    }, []);

    return (
        <View style={styles.container}>
            <OfferCard
                offerData={currentOffers}
                getOffers={getOffers}
                navigation={navigation}
                User={User}
            />
        </View>
    );
};

export default SaveOffers;
