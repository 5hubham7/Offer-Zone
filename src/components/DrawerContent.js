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
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";

import { AuthContext } from "./context/Store";
import styles from "../styles/DrawerContentStyles";

export function DrawerContent(props) {
    const [userName, setuserName] = React.useState({
        name: "",
    });

    React.useEffect(() => {
        setTimeout(async () => {
            let UserName;
            try {
                UserName = await AsyncStorage.getItem("userName");
                setuserName({ ...userName, name: UserName });
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
                                            {userName.name}
                                        </Title>
                                    </View>
                                </View>
                            </View>
                        </LinearGradient>
                    </ImageBackground>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="home-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => {
                                props.navigation.navigate("Home");
                            }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="account-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Profile"
                            onPress={() => {
                                props.navigation.navigate("profile");
                            }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="plus-box-multiple-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Save Offer"
                            onPress={() => {
                                props.navigation.navigate("BookmarkScreen");
                            }}
                        />
                    </Drawer.Section>
                    <Drawer.Section title="Preferences">
                        <TouchableRipple
                            onPress={() => {
                                toggleTheme();
                            }}
                        >
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={paperTheme.dark} />
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon name="exit-to-app" color={color} size={size} />
                    )}
                    label="Sign Out"
                    onPress={() => {
                        signOut();
                    }}
                />
            </Drawer.Section>
        </View>
    );
}
