import React, { useEffect } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { LinearGradient } from "expo-linear-gradient";
import Modal from 'react-native-modal';
import styles from '../styles/OfferSortStyle'
import axios from 'axios'
import axiosURL from "../helper/AxiosURL";
import SortToggleButton from '../components/sortToggleButton'
import { useTheme } from "@react-navigation/native";


const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const offerSort = (props) => {
    const { colors } = useTheme();
    const [state, setstate] = React.useState({
        selected: 0,
    })
    var today = new Date();
    var lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    var last = lastDay.getDate()

    const [ButtonNames, setButtonNames] = React.useState({
        start_date_asc: `Start Date : 1 to ${last}`,
        start_date_desc: `Start Date : ${last} to 1`,
        end_date_asc: `End Date : 1 to ${last}`,
        end_date_desc: `End Date : ${last} to 1`,

    })


    return (
        <Modal
            isVisible={!props.state}
            deviceWidth={windowWidth}
            deviceHeight={windowHeight}
            //onBackdropPress={() => { props.toggleModal() }}
            style={{ backgroundColor: colors.background }}
            animationIn="slideInUp"
            animationOut="slideOutRight"
        >
            <View style={{ flex: 1 }}>
                <View style={styles.header}>
                    <AntDesign
                        name="closecircle"
                        color='#fff'
                        size={25}
                        style={styles.closeIcon}
                        onPress={() => { props.toggleModal() }}
                    />
                    <Text style={styles.title}>Sort</Text>
                    <TouchableOpacity
                        onPress={() => {
                            resetFilters()
                        }}
                    >
                        <Text
                            style={styles.resetButton}
                        >
                            Reset
                        </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={[styles.subTitle, { color: colors.text }]}>Offers</Text>
                    <View style={{ width: "90%", marginLeft: 20, flexWrap: 'wrap', flexDirection: 'row' }}>
                        <SortToggleButton
                            value="On Going"
                            onPress={(value) => {
                                console.log(value)
                            }}
                        />
                        <SortToggleButton
                            value="Title : A to Z"
                            onPress={(value) => {
                                console.log(value)
                            }}
                        />
                        <SortToggleButton
                            value="Title : Z to A"
                            onPress={(value) => {
                                console.log(value)
                            }}
                        />
                        <SortToggleButton
                            value="Expiring Soon"
                            onPress={(value) => {
                                console.log(value)
                            }}
                        />
                    </View>
                </View>
                <View>
                    <Text style={[styles.subTitle, { color: colors.text }]}>Dates</Text>
                    <View style={{ width: "90%", marginLeft: 20, flexWrap: 'wrap', flexDirection: 'row' }}>
                        <SortToggleButton
                            value="Today"
                            onPress={(value) => {
                                console.log(value)
                            }}
                        />
                        <SortToggleButton
                            value={ButtonNames.start_date_asc}
                            onPress={(value) => {
                                console.log(value)
                            }}
                        />
                        <SortToggleButton
                            value={ButtonNames.start_date_desc}
                            onPress={(value) => {
                                console.log(value)
                            }}
                        />
                        <SortToggleButton
                            value={ButtonNames.end_date_asc}
                            onPress={(value) => {
                                console.log(value)
                            }}
                        />
                        <SortToggleButton
                            value={ButtonNames.end_date_desc}
                            onPress={(value) => {
                                console.log(value)
                            }}
                        />
                        <SortToggleButton
                            value="Post Date"
                            onPress={(value) => {
                                console.log(value)
                            }}
                        />

                    </View>
                    <View>
                        <Text style={[styles.subTitle, { color: colors.text }]}>distance</Text>
                        <View style={{ width: "90%", marginLeft: 20, flexWrap: 'wrap', flexDirection: 'row' }}>
                            <SortToggleButton
                                value="Min to Max"
                                onPress={(value) => {
                                    console.log(value)
                                }}
                            />
                            <SortToggleButton
                                value="Max to Min"
                                onPress={(value) => {
                                    console.log(value)
                                }}
                            />

                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

export default offerSort

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#929292',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        marginTop: 10
    },
});