import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, ListItem } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

export default function Foodcard({ ItemData }) {
    const navigation = useNavigation();

    const metersToKilometers = (meters) => {
        return (meters / 1000).toFixed(2);
    };

    // const handlePress = () => {
    //     navigation.navigate('ExploreDetailScreen', {
    //         foodData: ItemData // Pass Yelp API data to ExploreDetailScreen
    //     });
    // };

    const handlePress = () => {
        navigation.navigate('ExploreDetailScreen', { id: ItemData.id });
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <ListItem containerStyle={{ backgroundColor: "#fff" }}>
                <ListItem.Content>
                    <View style={myStyles.cardcontainer}>
                        {ItemData.image ? (
                            <Image
                                style={myStyles.sizeImg}
                                source={{ uri: ItemData.image }}
                                resizeMode="cover"
                            />
                        ) : null}
                        <View style={myStyles.textstore}>
                            <Text>{ItemData.name}</Text>
                            <Text style={myStyles.texttypestyle}>{metersToKilometers(ItemData.distance)} km</Text>
                        </View>
                        <View style={myStyles.texttype}>
                            <Text style={myStyles.texttypestyle}>{ItemData.type}</Text>
                        </View>
                    </View>
                </ListItem.Content>
            </ListItem>
        </TouchableOpacity>
    );
}

const myStyles = StyleSheet.create({
    cardcontainer: {
        backgroundColor: '#ffe175',
        alignItems: 'center',
        borderRadius: 20,
        width: "100%",
    },
    sizeImg: {
        width: "100%",
        height: 160,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    textstore: {
        width: 340,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    texttype: {
        width: 340,
    },
    texttypestyle: {
        fontSize: 15,
        fontFamily: 'RobotoCondensed_400Regular',
    },
});
