import React, { useEffect } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { LinearGradient } from "expo-linear-gradient";
import Modal from 'react-native-modal';
import styles from '../styles/OfferFilterStyle'
import Slider from "react-native-slider-x";
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const offerFilter = (props) => {
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

    const [selectValue, setSelectValue] = React.useState({
        value: "All"
    })


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
                    <Text
                        style={styles.resetButton}
                    >
                        Reset
                    </Text>
                </View>
                <View>
                    <Text style={styles.subTitle}>Category</Text>
                    <View style={{ width: "90%", marginLeft: 20 }}>
                        <RNPickerSelect
                            placeholder={placeholder}
                            value={selectValue.value}
                            items={[
                                { label: 'Cloth Shop', value: 'Cloth Shop' },
                                { label: 'Cosmatic Shop', value: 'Cosmatic Shop' },
                                { label: 'Movie Theater', value: 'Movie Theater' },
                            ]}

                            onValueChange={value => {
                                console.log(value)
                            }}
                            style={pickerSelectStyles}
                            useNativeAndroidPickerStyle={false}
                        // ref={el => {
                        //   this.inputRefs.favSport1 = el;
                        // }}
                        />
                    </View>
                </View>
                <View>
                    <Text style={styles.subTitle}>Distance</Text>
                    <Slider
                        value={2}
                        onValueChange={value => { setValue({ ...value, distance: value, minDistance: 1, maxDistance: 20 }) }}
                        minimumValue={1}
                        maximumValue={20}
                        step={1}
                        thumbTintColor="#00C3FF"
                        minimumTrackTintColor="#006BFF"
                        trackStyle={{ height: 10, width: "90%" }}
                        thumbStyle={{ width: 30, height: 30 }}
                        //thumbImage={ require('../assets/arrows.png')}
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
                <View>
                    <TouchableOpacity style={styles.applyButton} activeOpacity={0.7}>
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