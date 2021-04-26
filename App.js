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
import Icon from "react-native-vector-icons/Ionicons";
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
import { createStackNavigator } from "@react-navigation/stack";
import { LinearGradient } from "expo-linear-gradient";
import { firebase } from "./src/helper/FirebaseConfig";
import styles from "./src/styles/AppStyles";
import HomeScreen from "./src/screens/HomeScreen";
import OfferDetails from "./src/screens/OfferDetails";
import MyOffers from "./src/screens/MyOffers";
import SaveOffers from './src/screens/SaveOffers';

LogBox.ignoreLogs([
    "Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.",
]);

const Drawer = createDrawerNavigator();
const HomeStack = createStackNavigator();
const MyOffersStack = createStackNavigator();
const SaveOffersStack = createStackNavigator();

const App = () => {
    const [isDarkTheme, setIsDarkTheme] = React.useState(false);

    const [Network, setNetwork] = React.useState();

    const unsubscribe = NetInfo.addEventListener((state) => {
        //console.log('Connection type', state.type);
        //console.log('Is connected?', state.isConnected);
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
            background: "#ffffff",
            text: "#333333",
            link: "#1B01A9",
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
                <StatusBar backgroundColor="#000" barStyle="light-content" />
                <NavigationContainer theme={theme}>
                    {State.userToken !== null ? (
                        <Drawer.Navigator
                            drawerContent={(props) => (
                                <DrawerContent {...props} />
                            )}
                        >
                            <Drawer.Screen
                                name="HomeDrawer"
                                component={HomeStackScreen}
                            />
                            <Drawer.Screen
                                name="OfferDetails"
                                component={OfferDetails}
                            />
                            <Drawer.Screen
                                name="MyOffers"
                                component={MyOffersStackScreen}
                            />
                            <Drawer.Screen
                                name="SaveOffers"
                                component={SaveOfferStackScreen}
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

const HomeStackScreen = ({ navigation }) => (
    <HomeStack.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: "#000",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                fontWeight: "bold",
                marginRight: 50,
                textAlign: "center",
                fontSize: 22,
            },
        }}
    >
        <HomeStack.Screen
            name="Home"
            component={HomeScreen}
            options={{
                title: "OFFER ZONE",

                headerLeft: () => (
                    <Icon.Button
                        name="ios-menu"
                        size={30}
                        backgroundColor="#000"
                        onPress={() => navigation.openDrawer()}
                    ></Icon.Button>
                ),
            }}
        />
    </HomeStack.Navigator>
);

const MyOffersStackScreen = ({ navigation }) => (
    <MyOffersStack.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: "#000",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                fontWeight: "bold",
                marginRight: 50,
                textAlign: "center",
                fontSize: 20,
            },
        }}
    >
        <MyOffersStack.Screen
            name="MyOffers"
            component={MyOffers}
            options={{
                title: "My Offers",
                headerLeft: () => (
                    <Icon.Button
                        name="ios-menu"
                        size={30}
                        backgroundColor="#000"
                        onPress={() => navigation.openDrawer()}
                    ></Icon.Button>
                ),
            }}
        />
    </MyOffersStack.Navigator>
);

const SaveOfferStackScreen = ({ navigation }) => (
    <SaveOffersStack.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: "#000",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                fontWeight: "bold",
                marginRight: 50,
                textAlign: "center",
                fontSize: 20,
            },
        }}
    >
        <SaveOffersStack.Screen
            name="SaveOffers"
            component={SaveOffers}
            options={{
                title: "Saved Offers",
                headerLeft: () => (
                    <Icon.Button
                        name="ios-menu"
                        size={30}
                        backgroundColor="#000"
                        onPress={() => navigation.openDrawer()}
                    ></Icon.Button>
                ),
            }}
        />
    </SaveOffersStack.Navigator>
);