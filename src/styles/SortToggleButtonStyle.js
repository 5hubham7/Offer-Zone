import { StyleSheet, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;
const styles = StyleSheet.create({
    uncheckButton: {
        borderColor: '#949494',
        borderWidth: 0.5,
        borderRadius: 10,
        marginTop: 5,
        backgroundColor: '#E6E6E6',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.10,
        shadowRadius: 4.84,
        elevation: 3
    },
    checkButton: {
        borderColor: '#FF0000',
        borderWidth: 2,
        borderRadius: 10,
        marginTop: 5,
        backgroundColor: '#E6E6E6',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.10,
        shadowRadius: 4.84,
        elevation: 3
    },
    buttonText: {
        fontSize: 16,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 5,
        marginBottom: 5,
    }
})
export default styles

