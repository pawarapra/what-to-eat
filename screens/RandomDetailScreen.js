import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Text, Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

export default function RandomDetailScreen({ route, navigation }) {
    const { ItemData: randomRestaurant } = route.params;
    const nav = useNavigation();

    const navigateToExploreDetail = () => {
        if (randomRestaurant && randomRestaurant.id) {
            nav.navigate('ExploreDetailScreen', { id: randomRestaurant.id });
        } else {
            console.error("Random restaurant data is undefined or does not contain 'id' property.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.restext} >{randomRestaurant.name}</Text>
            <View style={styles.pic}>
                <Image source={require('../assets/plate.png')} style={styles.titleImage} />
            </View>

            <View style={styles.buttonsize}>
                <Button style={styles.button} onPress={navigateToExploreDetail}>
                    Choose
                </Button>
            </View>

            <View style={styles.buttonsize2}>
                <TouchableOpacity style={styles.randomButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>Random Again</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffe175',
        paddingTop: 100,
    },
    restext: {
        fontSize: 20,
    },
    pic: {
        alignItems: 'center',
        marginTop: -40,
        marginBottom: 50,
    },
    titleImage: {
        height: 130,
        width: 310,
    },
    button: {
        marginTop: 20,
        borderRadius: 5,
    },
    buttonsize:{
    width: '90%',
    paddingBottom:20,
},

button2: {
    marginTop: 20,
    borderRadius: 5,
},
randomButton:{
    width: '50%',
    paddingBottom:20,
    },
    buttonText:{
        backgroundColor:'#ff724c',
        color:'#fff',
        padding:10,
        borderRadius:20,
    },
});
