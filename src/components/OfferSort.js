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

    const distanceSort = () => {
        var sortOffers = props.currentOffers.sort((a, b) => (a.distance > b.distance) ? 1 : -1)
        props.setCurrentOffers(sortOffers)
        props.toggleModal()
    }

    const distanceSortReverse = () => {
        var sortOffers = props.currentOffers.sort((a, b) => (a.distance > b.distance) ? 1 : -1)
        props.setCurrentOffers(sortOffers.reverse())
        props.toggleModal()
    }

    const startDateSort = () => {
        var sortOffers = props.currentOffers.sort((a, b) => (a.start_date > b.start_date) ? 1 : -1)
        props.setCurrentOffers(sortOffers)
        props.toggleModal()
    }

    const startDateSortReverse = () => {
        var sortOffers = props.currentOffers.sort((a, b) => (a.start_date > b.start_date) ? 1 : -1)
        props.setCurrentOffers(sortOffers.reverse())
        props.toggleModal()
    }

    const endDateSort = () => {
        var sortOffers = props.currentOffers.sort((a, b) => (a.end_date > b.end_date) ? 1 : -1)
        props.setCurrentOffers(sortOffers)
        props.toggleModal()
    }

    const endDateSortReverse = () => {
        var sortOffers = props.currentOffers.sort((a, b) => (a.end_date > b.end_date) ? 1 : -1)
        props.setCurrentOffers(sortOffers.reverse())
        props.toggleModal()
    }

    const postDateSort = () => {
        var sortOffers = props.currentOffers.sort((a, b) => (a.post_time > b.post_time) ? 1 : -1)
        props.setCurrentOffers(sortOffers.reverse())
        props.toggleModal()
    }

    const offerTitleSort = () => {
        var sortOffers = props.currentOffers.sort((a, b) => (a.offer_title > b.offer_title) ? 1 : -1)
        props.setCurrentOffers(sortOffers)
        props.toggleModal()
    }

    const offerTitleSortReverse = () => {
        var sortOffers = props.currentOffers.sort((a, b) => (a.offer_title > b.offer_title) ? 1 : -1)
        props.setCurrentOffers(sortOffers.reverse())
        props.toggleModal()
    }

    const onGoingSort = () => {
        var onGoingOffers = []
        var today = new Date();
        var currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        props.currentOffers.forEach((element) => {
            var start_date = new Date(element.start_date);
            var start_date = start_date.getFullYear() + '-' + (start_date.getMonth() + 1) + '-' + start_date.getDate()
            var end_date = new Date(element.end_date);
            var end_date = end_date.getFullYear() + '-' + (end_date.getMonth() + 1) + '-' + end_date.getDate()
            if (start_date == currentDate || end_date >= currentDate)
                onGoingOffers.push(element)
        })
        props.setCurrentOffers(onGoingOffers)
        props.toggleModal()
    }

    const exporingSoonSort = () => {
        var exporingSoonOffers = []
        var newDay = new Date(today.getFullYear(), today.getMonth(), 8);
        var lastWeekDay = newDay.getFullYear() + '-' + (newDay.getMonth() + 1) + '-' + newDay.getDate();
        props.currentOffers.forEach((element) => {
            var start_date = new Date(element.start_date);
            var start_date = start_date.getFullYear() + '-' + (start_date.getMonth() + 1) + '-' + start_date.getDate()
            var end_date = new Date(element.end_date);
            var end_date = end_date.getFullYear() + '-' + (end_date.getMonth() + 1) + '-' + end_date.getDate()
            if (end_date <= lastWeekDay)
                exporingSoonOffers.push(element)
        })
        props.setCurrentOffers(exporingSoon)
        props.toggleModal()
    }

    const todaySort = () => {
        var todaysOffers = []
        var today = new Date();
        var currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        props.currentOffers.forEach((element) => {
            var start_date = new Date(element.start_date);
            var start_date = start_date.getFullYear() + '-' + (start_date.getMonth() + 1) + '-' + start_date.getDate()
            var end_date = new Date(element.end_date);
            var end_date = end_date.getFullYear() + '-' + (end_date.getMonth() + 1) + '-' + end_date.getDate()
            if (start_date == currentDate || end_date == currentDate)
                todaysOffers.push(element)
        })
        props.setCurrentOffers(todaysOffers)
        props.toggleModal()
    }

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
                <View style={[styles.header, { backgroundColor: colors.headerColor }]}>
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
                                onGoingSort()
                            }}
                        />
                        <SortToggleButton
                            value="Title : A to Z"
                            onPress={(value) => {
                                offerTitleSort()
                            }}
                        />
                        <SortToggleButton
                            value="Title : Z to A"
                            onPress={(value) => {
                                offerTitleSortReverse()
                            }}
                        />
                        <SortToggleButton
                            value="Expiring Soon"
                            onPress={(value) => {
                                exporingSoonSort()
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
                                todaySort()
                            }}
                        />
                        <SortToggleButton
                            value={ButtonNames.start_date_asc}
                            onPress={(value) => {
                                startDateSort()
                            }}
                        />
                        <SortToggleButton
                            value={ButtonNames.start_date_desc}
                            onPress={(value) => {
                                startDateSortReverse()
                            }}
                        />
                        <SortToggleButton
                            value={ButtonNames.end_date_asc}
                            onPress={(value) => {
                                endDateSort()
                            }}
                        />
                        <SortToggleButton
                            value={ButtonNames.end_date_desc}
                            onPress={(value) => {
                                endDateSortReverse()
                            }}
                        />
                        <SortToggleButton
                            value="Post Date"
                            onPress={(value) => {
                                postDateSort()
                            }}
                        />

                    </View>
                    <View>
                        <Text style={[styles.subTitle, { color: colors.text }]}>distance</Text>
                        <View style={{ width: "90%", marginLeft: 20, flexWrap: 'wrap', flexDirection: 'row' }}>
                            <SortToggleButton
                                value="Min to Max"
                                onPress={(value) => { distanceSort() }}

                            />
                            <SortToggleButton
                                value="Max to Min"
                                onPress={(value) => { distanceSortReverse() }}
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