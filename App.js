import React, { useEffect } from "react";
import {
    View,
    ActivityIndicator,
    StatusBar,
    TouchableOpacity,
    LogBox,
} from "react-native";
import {
    NavigationContainer,
    DefaultTheme as NavigationDefaultTheme,
    DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";

import { createDrawerNavigator } from "@react-navigation/drawer";
import NetInfo from "@react-native-community/netinfo";
import {
    Provider as PaperProvider,
    DefaultTheme as PaperDefaultTheme,
    DarkTheme as PaperDarkTheme,
} from "react-native-paper";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { DrawerContent } from "./src/components/DrawerContent";
import NoInternetError from "./src/components/NoInternetError";
import RootStackScreen from "./src/navigation/StackNavigation";
import { AuthContext } from "./src/components/context/Store";
import { firebase } from "./src/helper/FirebaseConfig";
import styles from "./src/styles/AppStyles";
import HomeScreen from "./src/screens/HomeScreen";
import OfferDetails from "./src/screens/OfferDetails";
import MyOfferDetails from "./src/screens/MyOfferDetails";
import MyOffers from "./src/screens/MyOffers";
import MyShops from "./src/screens/MyShops";
import SaveOffers from "./src/screens/SaveOffers";
import AddOffers from "./src/screens/AddOffers";
import UpdateOffers from "./src/screens/UpdateOffers";
import UpdateShops from "./src/screens/UpdateShops";
import AddShops from "./src/screens/AddShops";
import ShopOffers from "./src/screens/ShopOffers";

LogBox.ignoreLogs([
    "Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.",
]);

const Drawer = createDrawerNavigator();

const App = () => {
    const [isDarkTheme, setIsDarkTheme] = React.useState(false);

    const [Network, setNetwork] = React.useState();

    const unsubscribe = NetInfo.addEventListener((state) => {
        return state.isConnected;
    });

    const initialState = {
        isLoading: false,
        userName: null,
        userToken: null,
    };

    const CustomDefaultTheme = {
        ...NavigationDefaultTheme,
        ...PaperDefaultTheme,
        colors: {
            ...NavigationDefaultTheme.colors,
            ...PaperDefaultTheme.colors,
            background: "#fff",
            text: "#333333",
            link: "#1B01A9",
            headerColor: "#006064",
            offerCard: "#D6D6D6",
            subtext: "#595959",
            icon: "#000",
            shareIcon: "#0277BD",
            deleteIcon: "#C62828",
            editIcon: "#2E7D32",
            formIcon: "#006064",
        },
    };

    const CustomDarkTheme = {
        ...NavigationDarkTheme,
        ...PaperDarkTheme,
        colors: {
            ...NavigationDarkTheme.colors,
            ...PaperDarkTheme.colors,
            background: "#333333",
            text: "#ffffff",
            link: "yellow",
            headerColor: "#1B1B1B",
            offerCard: "#4C4C4C",
            subtext: "#B4B4B4",
            icon: "#fff",
            shareIcon: "#039BE5",
            deleteIcon: "#E53935",
            editIcon: "#43A047",
            formIcon: "#fff",
        },
    };

    const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

    const StateReducer = (prevState, action) => {
        switch (action.type) {
            case "START_LOADING":
                return {
                    ...prevState,
                    isLoading: true,
                };
            case "STOP_LOADING":
                return {
                    ...prevState,
                    isLoading: false,
                };
            case "RETRIEVE_TOKEN":
                return {
                    ...prevState,
                    userToken: action.token,
                    isLoading: false,
                    userName: null,
                };
            case "LOGIN":
                return {
                    ...prevState,
                    userName: action.id,
                    userToken: action.token,
                    isLoading: false,
                };
            case "LOGOUT":
                return {
                    ...prevState,
                    userName: null,
                    userToken: null,
                    isLoading: false,
                };
            case "REGISTER":
                return {
                    ...prevState,
                    userName: action.id,
                    userToken: action.token,
                    isLoading: false,
                };
        }
    };

    const [State, dispatch] = React.useReducer(StateReducer, initialState);

    const authContext = React.useMemo(
        () => ({
            startLoading: async () => {
                dispatch({ type: "START_LOADING" });
            },
            stopLoading: async () => {
                dispatch({ type: "STOP_LOADING" });
            },
            signIn: async (userToken, userName) => {
                try {
                    await AsyncStorage.setItem("userToken", userToken);
                    await AsyncStorage.setItem("userName", userName);
                } catch (e) {
                    console.log(e);
                }
                // console.log('user token: ', userToken);
                dispatch({ type: "LOGIN", id: userName, token: userToken });
            },
            signOut: async () => {
                try {
                    await AsyncStorage.removeItem("userToken");
                    await AsyncStorage.removeItem("userName");
                    await AsyncStorage.removeItem("userRole");
                    firebase
                        .auth()
                        .signOut()
                        .then(() => console.log("User signed out!"));
                } catch (e) {
                    console.log(e);
                }
                dispatch({ type: "LOGOUT" });
            },
            signUp: async (userToken, userName) => {
                try {
                    await AsyncStorage.setItem("userToken", userToken);
                    await AsyncStorage.setItem("userName", userName);
                } catch (e) {
                    console.log(e);
                }
                // console.log('user token: ', userToken);
                dispatch({ type: "REGISTER", id: userName, token: userToken });
            },
            toggleTheme: () => {
                setIsDarkTheme((isDarkTheme) => !isDarkTheme);
            },
        }),
        []
    );

    useEffect(() => {
        setNetwork(unsubscribe());
        const abortController = new AbortController();
        Promise.all(
            setTimeout(async () => {
                let userToken;
                userToken = null;
                try {
                    userToken = await AsyncStorage.getItem("userToken");
                } catch (e) {
                    console.log(e);
                }
                // console.log('user token: ', userToken);
                dispatch({ type: "RETRIEVE_TOKEN", token: userToken });
            }, 2000)
        );
        return () => abortController.abort();
    }, []);

    return (
        <PaperProvider theme={theme}>
            <AuthContext.Provider value={authContext}>
                <StatusBar backgroundColor="#006064" barStyle="light-content" />
                <NavigationContainer theme={theme}>
                    {State.userToken !== null ? (
                        <Drawer.Navigator
                            drawerContent={(props) => (
                                <DrawerContent {...props} />
                            )}
                        >
                            <Drawer.Screen
                                name="HomeDrawer"
                                component={HomeScreen}
                            />
                            <Drawer.Screen
                                name="OfferDetails"
                                component={OfferDetails}
                            />
                            <Drawer.Screen
                                name="MyOfferDetails"
                                component={MyOfferDetails}
                            />
                            <Drawer.Screen
                                name="MyOffers"
                                component={MyOffers}
                            />
                            <Drawer.Screen
                                name="ShopOffers"
                                component={ShopOffers}
                            />
                            <Drawer.Screen
                                name="AddOffers"
                                component={AddOffers}
                            />
                            <Drawer.Screen
                                name="UpdateOffers"
                                component={UpdateOffers}
                            />
                            <Drawer.Screen name="MyShops" component={MyShops} />
                            <Drawer.Screen
                                name="AddShops"
                                component={AddShops}
                            />
                            <Drawer.Screen
                                name="UpdateShops"
                                component={UpdateShops}
                            />
                            <Drawer.Screen
                                name="SaveOffers"
                                component={SaveOffers}
                            />
                        </Drawer.Navigator>
                    ) : (
                        <RootStackScreen />
                    )}
                </NavigationContainer>
                {State.isLoading ? (
                    <View
                        style={styles.loader}
                        onMagicTap={() => {
                            dispatch({ type: "STOP_LOADING" });
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                dispatch({ type: "STOP_LOADING" });
                            }}
                        >
                            <ActivityIndicator size="large" color="red" />
                        </TouchableOpacity>
                    </View>
                ) : null}

                <NoInternetError Network={Network} />
            </AuthContext.Provider>
        </PaperProvider>
    );
};

export default App;
