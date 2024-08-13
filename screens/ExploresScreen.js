import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { Text, Icon, Button, Avatar } from '@rneui/themed';
import axios from 'axios';
import * as Location from 'expo-location';
import { reverseGeocodeAsync } from 'expo-location';

import Foodcard from '../components/Foodcard';

export default function ExploresScreen({ navigation }) {
    const [restaurants, setRestaurants] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [locationName, setLocationName] = useState('');

    

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    console.error('Location permission denied');
                    return;
                }

                const location = await Location.getCurrentPositionAsync({});
                setUserLocation(location);

                if (location) {
                    const address = await reverseGeocodeAsync({ latitude: location.coords.latitude, longitude: location.coords.longitude });
                    const locationName = address.length > 0 ? address[0].name : 'Location not found';
                    setLocationName(locationName);

                    const response = await axios.get('https://api.yelp.com/v3/businesses/search', {
                        headers: {
                            Authorization: 'Bearer QHrW80chhE2MK6GR538fmh3VqF8dKP8Eha9xg-7f0L-HdJv78T2LmpwzFh1ivqUV9nVrAeagxdy13xSwo9GyhGe8Y8M9mWNXpeBWXGJOfSurT2QJuUJKu9mGAZwIZnYx',
                        },
                        params: {
                            term: 'restaurants',
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        },
                    });
                    setRestaurants(response.data.businesses);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleFilter = async (filter) => {
        try {
            let params = {
                term: 'restaurants',
                latitude: userLocation.coords.latitude,
                longitude: userLocation.coords.longitude,
            };

            switch (filter) {
                case 'DEAL':
                    params.price = 1;
                    break;
                case '1KM':
                    params.radius = 1000;
                    break;
                case 'GRAB&GO':
                    params.transactions = 'pickup';
                    break;
                case 'OURFAV':
                    params.rating = 4;
                    break;
                default:
                    break;
            }

            const response = await axios.get('https://api.yelp.com/v3/businesses/search', {
                headers: {
                    Authorization: 'Bearer QHrW80chhE2MK6GR538fmh3VqF8dKP8Eha9xg-7f0L-HdJv78T2LmpwzFh1ivqUV9nVrAeagxdy13xSwo9GyhGe8Y8M9mWNXpeBWXGJOfSurT2QJuUJKu9mGAZwIZnYx',
                },
                params: params,
            });
            setRestaurants(response.data.businesses);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const navigateToSearchLocation = () => {
        navigation.navigate('#');
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.locationcontainer}>
                    <Text h4 > YOUR LOCATION </Text>
                    <TouchableOpacity onPress={navigateToSearchLocation}>
                        <View style={styles.location}>
                            <Text h2>{locationName}</Text>
                            <Icon type='ionicon' name='caret-down-outline' style={styles.icon} />
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.paddingadd}>
                    <View style={styles.mainfilter}>
                        <View style={styles.allcardcontainer}>
                            <TouchableOpacity onPress={() => handleFilter('DEAL')}>
                                <View style={styles.cardContainer}>
                                    <Avatar source={require('../assets/filter1.png')}  rounded />
                                    <Text style={styles.itemName}>DEAL</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleFilter('1KM')}>
                                <View style={styles.cardContainer}>
                                <Avatar source={require('../assets/filter2.png')}  rounded />
                                    <Text style={styles.itemName}>&lt; 1KM</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleFilter('GRAB&GO')}>
                                <View style={styles.cardContainer}>
                                <Avatar source={require('../assets/filter3.png')}  rounded />
                                    <Text style={styles.itemName}>GRAB&GO</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleFilter('OURFAV')}>
                                <View style={styles.cardContainer}>
                                <Avatar source={require('../assets/filter4.png')}  rounded />
                                    <Text style={styles.itemName}>OUR FAV</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.listtext}>
                    <View style={styles.listtexthead}>
                        <Text h2> RANDOM LIST </Text>
                        {/* <Icon type='ionicon' name='options-outline' size={28} color='#333' style={styles.outline} /> */}
                    </View>
                </View>
                <FlatList
                    style={styles.List}
                    data={restaurants}
                    renderItem={({ item }) => (
                        <Foodcard
                            ItemData={{
                                id: item.id,
                                name: item.name,
                                image: item.image_url,
                                type: item.categories.length > 0 ? item.categories[0].title : 'No Category',
                                location: item.location ? item.location.address1 : 'Address not available',
                                distance: item.distance,
                                rating: item.rating.toFixed(1),
                                price: item.price,
                                url: item.url,
                            }}
                            navigatorRef={navigation}
                        />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            </ScrollView>
            <View style={styles.buttonContainer}>
            <Button
    title="START RANDOM"
    raised={true}
    onPress={() => {
        if (restaurants.length > 0) {
            const randomIndex = Math.floor(Math.random() * restaurants.length);
            const randomRestaurant = restaurants[randomIndex];
            console.log(randomRestaurant);
            navigation.navigate('RandomDetail', { ItemData: randomRestaurant });
        }
    }}
    buttonStyle={styles.customButton}
/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollView: {
        flexGrow: 1,
    },
    locationcontainer: {
        backgroundColor: '#ffe175',
        height: 120,
        paddingHorizontal: 30,
        paddingTop:10,
        marginBottom: -35,
        borderBottomEndRadius:20,
        borderBottomStartRadius:20
    },
    location: {
        paddingLeft:5,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop:-15,
    },
    icon: {
        marginLeft: 10,
    },
    paddingadd: {
        paddingHorizontal: 16,
    },
    mainfilter: {
        backgroundColor: '#ff724c',
        padding: 10,
        borderRadius: 20,
    },
    listtext: {
        height: 100,
        paddingHorizontal: 10,
    },
    listtexthead: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop:5,
    },
    outline: {    
        padding: 5,
    },
    List: {
        width: '100%',
        marginTop:-50,
    },
    buttonContainer: {
        justifyContent: 'flex-end',
        marginHorizontal: 16,
        marginBottom: 20,
        backgroundColor: '#ff724c',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderRadius: 40,
    },
    customButton: {
        backgroundColor: '#ff724c',
    },
    allcardcontainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardContainer: {
        alignItems: 'center',
    },
    itemName: {
        marginTop: 5,
        textAlign: 'center',
    },
});
