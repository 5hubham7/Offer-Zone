import React, { useEffect } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, Pic } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { LinearGradient } from "expo-linear-gradient";
import Modal from 'react-native-modal';
import styles from '../styles/OfferFilterStyle'
import Slider from "react-native-slider-x";
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios'
import axiosURL from "../helper/AxiosURL";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const offerFilter = (props) => {
    const [allCategories, setAllCategories] = React.useState([
        { label: 'All', value: 'All' },
    ])
    const [value, setValue] = React.useState({
        distance: 5,
        minDistance: 1,
        maxDistance: 20
    })
    const placeholder = {
        label: 'Select a Catogory..',
        value: null,
        color: '#9EA0A4',
    };

    const [selectCatogory, setSelectCatogory] = React.useState("All")
    const [selectCity, setSelectCity] = React.useState("Current")

    const resetFilters = () => {
        setSelectCatogory("All")
        setSelectCity("Current")
        setValue({
            distance: 5,
            minDistance: 1,
            maxDistance: 20
        })
    }

    const getAllCatogories = () => {
        axios.get(`${axiosURL}/customer/getAllCatogories`).then((response) => {
            if (response.data.status == 200) {
                response.data.response.map(element => {
                    allCategories.push({ label: element, value: element })
                })
            }
        })
    }

    useEffect(() => {
        getAllCatogories()
    }, [])

    return (
        <Modal
            isVisible={!props.state}
            deviceWidth={windowWidth}
            deviceHeight={windowHeight}
            //onBackdropPress={() => { props.toggleModal() }}
            style={{ backgroundColor: '#fff' }}
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
                    <Text style={styles.title}>Filters</Text>
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
                    <Text style={styles.subTitle}>Category</Text>
                    <View style={{ width: "90%", marginLeft: 20 }}>
                        <RNPickerSelect
                            placeholder={placeholder}
                            value={selectCatogory}
                            items={allCategories}

                            onValueChange={value => {
                                setSelectCatogory(value)
                            }}
                            style={pickerSelectStyles}
                            useNativeAndroidPickerStyle={false}
                            Icon={() => {
                                return <FontAwesome name="angle-down" size={24} color="gray" style={{ marginTop: 20, marginRight: 20 }} />;
                            }}
                        />
                    </View>
                </View>
                <View>
                    <Text style={styles.subTitle}>City</Text>
                    <View style={{ width: "90%", marginLeft: 20 }}>
                        <RNPickerSelect
                            placeholder={placeholder}
                            value={selectCity}

                            items={[
                                { label: 'Current', value: 'Current' },
                                { label: 'Pune', value: 'Pune' },
                                { label: 'Mumbai', value: 'Mumbai' },
                                { label: 'Nashik', value: 'Nashik' },
                            ]}

                            onValueChange={value => {
                                setSelectCity(value)
                            }}
                            style={pickerSelectStyles}
                            useNativeAndroidPickerStyle={false}
                            Icon={() => {
                                return <FontAwesome name="angle-down" size={24} color="gray" style={{ marginTop: 20, marginRight: 20 }} />;
                            }}
                        />
                    </View>
                </View>
                <View>
                    <Text style={styles.subTitle}>Distance</Text>
                    <Slider
                        value={value.distance}
                        onValueChange={value => { setValue({ ...value, distance: value, minDistance: 1, maxDistance: 20 }) }}
                        minimumValue={1}
                        maximumValue={20}
                        step={1}
                        thumbTintColor="#00C3FF"
                        minimumTrackTintColor="#006BFF"
                        trackStyle={{ height: 10, width: "90%" }}
                        thumbStyle={{ width: 30, height: 30 }}
                        style={{ marginLeft: 20 }}
                    />
                    <View style={styles.textCon}>
                        <Text style={styles.colorGrey}>{value.minDistance} km</Text>
                        <Text style={styles.colorYellow}>
                            {value.distance + 'km'}
                        </Text>
                        <Text style={styles.colorGrey}>{value.maxDistance} km</Text>
                    </View>
                </View>

                <View style={styles.bottomView}>
                    <TouchableOpacity style={styles.applyButton} activeOpacity={0.7} >
                        <Text style={styles.buttonText}>Apply Filter</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

export default offerFilter

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