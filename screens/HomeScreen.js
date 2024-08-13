import React, { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Button, Text } from '@rneui/themed';
import * as Location from 'expo-location';
import axios from 'axios';

export default function LandingScreen({ navigation }) {
    const [locationAddress, setLocationAddress] = useState('');

    const getRandomRestaurant = async () => {
        try {
            // access the device's location
            let { status } = await Location.requestForegroundPermissionsAsync();
            
            if (status !== 'granted') {
                console.error('Location permission denied');
                return;
            }

            // current location
            let location = await Location.getCurrentPositionAsync({});

            const { latitude, longitude } = location.coords;
                        
            // Reverse geocode to obtain address information
            let address = await Location.reverseGeocodeAsync({ latitude, longitude });
            const locationAddress = `${address[0].name}, ${address[0].city}, ${address[0].region} ${address[0].postalCode}`;

            // Make request to Yelp API
            const response = await axios.get('https://api.yelp.com/v3/businesses/search', {
                params: {
                    latitude,
                    longitude,
                    radius: 2000, // 2 kilometers
                    limit: 50, 
                    categories: 'restaurants', 
                },
                headers: {
                    Authorization: 'Bearer QHrW80chhE2MK6GR538fmh3VqF8dKP8Eha9xg-7f0L-HdJv78T2LmpwzFh1ivqUV9nVrAeagxdy13xSwo9GyhGe8Y8M9mWNXpeBWXGJOfSurT2QJuUJKu9mGAZwIZnYx',
                },
            });

            // Randomly select a restaurant from the response
            const randomIndex = Math.floor(Math.random() * response.data.businesses.length);
            const randomRestaurant = response.data.businesses[randomIndex];

            // Navigate to RandomDetailScreen with the random restaurant data
            navigation.navigate('RandomDetail', { ItemData: randomRestaurant });
        } catch (error) {
            console.error('Error getting location:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.pic}>
                <Image style={styles.titleImage} source={require('../assets/icon.png')} />
            </View>

            <View style={styles.homenav}>
                <Button
                    title="RANDOM NOW"
                    raised={true}
                    onPress={getRandomRestaurant}
                    buttonStyle={styles.customButton}
                />
                <Button
                    title="EXPLORE"
                    raised={true}
                    onPress={() => navigation.navigate('Explore')}
                    buttonStyle={styles.customButton}
                />
            </View>

            <View style={styles.locationAddress}>
                <Text>{locationAddress}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffe175',
    },
    pic: {
        alignItems: 'center',
        marginVertical: 50,
    },
    titleImage: {
        height: 333,
        width: 300,
    },
    homenav: {
        marginHorizontal: 16, 
        marginTop: 50,
    },
    customButton:{
        marginVertical: 10, 
    },
    locationAddress: {
        alignItems: 'center',
        marginTop: 20,
    },
});
