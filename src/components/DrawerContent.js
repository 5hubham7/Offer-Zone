import React, { useContext } from "react";
import { View, ImageBackground } from "react-native";
import {
    useTheme,
    Avatar,
    Title,
    Drawer,
    Text,
    TouchableRipple,
    Switch,
} from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";

import { LinearGradient } from "expo-linear-gradient";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import axiosURL from "../helper/AxiosURL";
import { AuthContext } from "../components/context/Store";
import styles from "../styles/DrawerContentStyles";

export function DrawerContent(props) {
    const [userRole, setUserRole] = React.useState("");

    const [userName, setUserName] = React.useState("");

    const getUserData = (uid) => {
        axios
            .get(`${axiosURL}/customer/getCustomerData/${uid}`)
            .then((response) => {
                if (response.data.status === 200) {
                    setUserRole(response.data.response.role);
                }
            });
    };
    React.useEffect(() => {
        setTimeout(async () => {
            let UserName;
            try {
                UserName = await AsyncStorage.getItem("userName");
                setUserName(UserName);
                await AsyncStorage.getItem("userToken").then((response) => {
                    getUserData(response);
                });
            } catch (e) {
                console.log(e);
            }
        }, 1000);
    }, []);
    const paperTheme = useTheme();

    const { signOut, toggleTheme } = useContext(AuthContext);
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <ImageBackground
                        source={{
                            uri:
                                "https://i.pinimg.com/originals/9f/c2/5b/9fc25b1219200a94d4f090cc87318387.jpg",
                        }}
                        style={styles.cardImage}
                    >
                        <LinearGradient
                            locations={[0, 0]}
                            colors={["rgba(0,0,0,0.00)", "rgba(0,0,0,0.55)"]}
                            style={{ marginTop: -1 }}
                        >
                            <View style={styles.userInfoSection}>
                                <View style={styles.avtarDetails}>
                                    <Avatar.Image
                                        source={{
                                            uri:
                                                "https://i.pinimg.com/originals/cd/71/1f/cd711fca60134229d08e3f8e6604674b.jpg",
                                        }}
                                        size={50}
                                    />
                                    <View
                                        style={{
                                            marginLeft: 15,
                                            flexDirection: "column",
                                        }}
                                    >
                                        <Title style={styles.title}>
                                            {userName}
                                        </Title>
                                    </View>
                                </View>
                            </View>
                        </LinearGradient>
                    </ImageBackground>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <MaterialIcons
                                    name="home"
                                    color="#006064"
                                    size={size}
                                />
                            )}
                            label="HOME"
                            onPress={() => {
                                props.navigation.navigate("Home");
                            }}
                            pressColor="#006064"
                        />
                        {userRole === "Customer" ? (
                            <View>
                                <DrawerItem
                                    icon={({ color, size }) => (
                                        <MaterialCommunityIcons
                                            name="account-outline"
                                            color="#006064"
                                            size={size}
                                        />
                                    )}
                                    label="PROFILE"
                                    onPress={() => {
                                        props.navigation.navigate("profile");
                                    }}
                                    pressColor="#006064"
                                />
                            </View>
                        ) : (
                            <View>
                                <View>
                                    <DrawerItem
                                        icon={({ color, size }) => (
                                            <MaterialIcons
                                                name="local-offer"
                                                color="#006064"
                                                size={size}
                                            />
                                        )}
                                        label="MY OFFERS"
                                        onPress={() => {
                                            props.navigation.navigate(
                                                "MyOffers"
                                            );
                                        }}
                                        pressColor="#006064"
                                    />
                                </View>
                                <View>
                                    <DrawerItem
                                        icon={({ color, size }) => (
                                            <Entypo
                                                name="shop"
                                                color="#006064"
                                                size={size}
                                            />
                                        )}
                                        label="MY SHOPS"
                                        onPress={() => {
                                            props.navigation.navigate(
                                                "MyShops"
                                            );
                                        }}
                                        pressColor="#006064"
                                    />
                                </View>
                            </View>
                        )}
                        <DrawerItem
                            icon={({ color, size }) => (
                                <MaterialCommunityIcons
                                    name="bookmark-multiple"
                                    color="#006064"
                                    size={size}
                                />
                            )}
                            label="WISHLIST"
                            onPress={() => {
                                props.navigation.navigate("SaveOffers");
                            }}
                            pressColor="#006064"
                        />
                    </Drawer.Section>
                    <Drawer.Section title="Preferences">
                        <TouchableRipple
                            onPress={() => {
                                toggleTheme();
                            }}
                            rippleColor="#006064"
                        >
                            <View style={styles.preference}>
                                <Text style={{ color: "#616161" }}>
                                    DARK THEME
                                </Text>
                                <View pointerEvents="none">
                                    <Switch
                                        value={paperTheme.dark}
                                        color="#006064"
                                    />
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <MaterialIcons
                            name="logout"
                            color="#006064"
                            size={size}
                        />
                    )}
                    label="LOGOUT"
                    onPress={() => {
                        signOut();
                    }}
                />
            </Drawer.Section>
        </View>
    );
}
